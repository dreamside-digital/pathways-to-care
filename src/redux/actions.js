import axios from "axios";
import firebase from "../firebase/init";
import slugify from "slugify";
import { NOTIFICATION_MESSAGES } from "../utils/constants";

// AUTHENTICATION ------------------------

export function userLoggedIn(user = null) {
  return { type: "USER_LOGGED_IN", user };
}

export function userLoggedOut() {
  return { type: "USER_LOGGED_OUT" };
}

// NOTIFICATIONS ------------------------

export function showNotification(message, color="success") {
  return { type: "SHOW_NOTIFICATION", message, color };
}

export function closeNotification() {
  return { type: "CLOSE_NOTIFICATION" };
}

export function showNotificationByName(name) {
  return dispatch => {
    const message = NOTIFICATION_MESSAGES[name];
    dispatch( (message, "success"));
  };
}

// PAGE EDITING ------------------------

export function toggleEditing() {
  return { type: "TOGGLE_EDITING" };
}

export function toggleNewPageModal() {
  return { type: "TOGGLE_NEW_PAGE_MODAL" };
}

export function updatePageContent(location, content) {
  return (dispatch, getState) => {
    const db = firebase.database();
    const pageId = getState().page.data.id;

    console.log('content to update', content)

    db.ref(`pages/${pageId}/content/${location}/`).update(content, error => {
      if (error) {
        return dispatch(
          showNotification(
            `There was an error saving your changes: ${error}`,
            "success"
          )
        );
      }

      dispatch(updatePageContentState(location, content));
      dispatch(
        showNotification(
          "Your changes have been saved. Publish your changes to make them public.",
          "success"
        )
      );
    });
  };
}

export function pushContentItem(location, content) {
  return (dispatch, getState) => {
    const db = firebase.database();
    const pageId = getState().page.data.id;
    const newKey = db.ref(`pages/${pageId}/content/${location}/`).push().key;
    const newItem = { [newKey]: content }

    db.ref(`pages/${pageId}/content/${location}/`).update(newItem, error => {
      if (error) {
        return dispatch(
          showNotification(
            `There was an error saving your changes: ${error}`,
            "success"
          )
        );
      }

      dispatch(updatePageContentState(location, newItem));
      dispatch(
        showNotification(
          "Your changes have been saved. Publish your changes to make them public.",
          "success"
        )
      );
    })
  };
}

export function removeContentItem(location, itemId) {
  return (dispatch, getState) => {
    const db = firebase.database();
    const state = getState();
    const pageId = state.page.data.id;

    db.ref(`pages/${pageId}/content/${location}/`).update({[itemId]: null}, error => {
      if (error) {
        return dispatch(
          showNotification(
            `There was an error saving your changes: ${error}`,
            "success"
          )
        );
      }

      const newContent = { ...state.page.data.content[location] }
      delete newContent[itemId]

      dispatch(setPageContentState(location, newContent));
      dispatch(
        showNotification(
          "Your changes have been saved. Publish your changes to make them public.",
          "success"
        )
      );
    })
  };
}


export function deploy() {
  return dispatch => {
    const url = `${process.env.GATSBY_DEPLOY_ENDPOINT}`;
    console.log(`Deploy command sent to ${url}`);

    firebase
      .auth()
      .currentUser.getIdToken(/* forceRefresh */ true)
      .then(token => {
        return axios({
          method: "POST",
          url: url,
          headers: { Authorization: "Bearer " + token }
        });
      })
      .then(res => {
        console.log(res);
        if (res.data.status === "ok") {
          dispatch(
            showNotification(
              res.data.message,
              "success"
            )
          );
        } else {
          dispatch(
            showNotification(
              `There was an error deploying the site: ${res.data.message}`,
              "danger"
            )
          );
        }
      })
      .catch(err => {
        dispatch(
          showNotification(
            `There was an error deploying the site: ${err}`,
            "danger"
          )
        );
      });
  };
}

export function loadPageData(data) {
  return { type: "LOAD_PAGE_DATA", data };
}

export function updatePageContentState(location, content) {
  return { type: "UPDATE_PAGE_CONTENT", location, content };
}

export function setPageContentState(location, content) {
  return { type: "SET_PAGE_CONTENT", location, content };
}

// NAVIGATION ------------------------

export function openMenu() {
  return { type: "OPEN_MENU" };
}

export function closeMenu() {
  return { type: "CLOSE_MENU" };
}

// FORMS ------------------------

export function submitProjectFormSuccess() {
  return { type: "SUBMIT_PROJECT_FORM_SUCCESS" };
}

export function submitProjectFormError(error) {
  return { type: "SUBMIT_PROJECT_FORM_ERROR" };
}

export function updateForm(data) {
  return { type: "UPDATE_PROJECT_FORM", data };
}

export function submitProjectForm(formData, e) {
  return dispatch => {
    const db = firebase.database();
    const user = slugify(formData.name);
    const date = new Date();
    const dateString = `${date.getFullYear()}-${date.getMonth()}-${date.getDate()}-${date.getTime()}`;
    const submissionId = `${user}-${dateString}`;
    const status = "pending";

    const data = {
      ...formData,
      "submitted-on": date.toString(),
      status
    };

    db.ref(`projectSubmissions/${submissionId}`).update(data, error => {
      if (error) {
        console.log("Error submitting form", error);
        dispatch(submitProjectFormError(error));

        return dispatch(
          showNotification(
            `There was an error submitting your form: ${error}`,
            "success"
          )
        );
      }

      dispatch(submitProjectFormSuccess());
      e.target.submit();
    });
  };
}

// PROJECTS ------------------------

export function updateProjects(projects) {
  return { type: "UPDATE_PROJECTS", projects };
}

export function updateProject(projectId, projectData) {
  return { type: "UPDATE_PROJECT", projectId, projectData };
}

export function updateProjectStatus(projectId, status) {
  return dispatch => {
    const db = firebase.database();

    db
      .ref(`projectSubmissions/${projectId}/status`)
      .set(status)
      .then(err => {
        if (err) {
          return dispatch(
            showNotification(
              `There was an error updating this project: ${err}`,
              "error"
            )
          );
        }

        dispatch(updateProject(projectId, { status }));
        dispatch(
          showNotification(
            `This project has been marked as ${status}. Don't forget to publish your changes!`,
            "success"
          )
        );
      });
  };
}

export function getProjects() {
  return dispatch => {
    const db = firebase.database();

    db
      .ref(`projectSubmissions`)
      .once("value")
      .then(snapshot => {
        const projects = snapshot.val();
        dispatch(updateProjects(projects));
      });
  };
}
