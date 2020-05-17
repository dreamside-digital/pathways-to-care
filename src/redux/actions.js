import axios from "axios";
import firebase from "../firebase/init";
import { copyContentFromStaging } from "../firebase/operations"
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

export function toggleNewPageModal(options) {
  return { type: "TOGGLE_NEW_PAGE_MODAL", options };
}

export function updateSectionContent(sectionIndex, contentIndex, newContent) {
  return {
    type: "UPDATE_SECTION_CONTENT",
    sectionIndex,
    contentIndex,
    newContent
  };
}

export function addSection(sectionIndex, sectionType="default") {
  return { type: "ADD_SECTION", sectionIndex, sectionType };
}

export function duplicateSection(sectionIndex) {
  return { type: "DUPLICATE_SECTION", sectionIndex };
}

export function deleteSection(sectionIndex) {
  return { type: "DELETE_SECTION", sectionIndex };
}

export function addContentItem(sectionIndex, contentType) {
  return { type: "ADD_CONTENT_ITEM", sectionIndex, contentType };
}

export function updateContentItem(sectionIndex, contentIndex, content) {
  return { type: "UPDATE_CONTENT_ITEM", sectionIndex, contentIndex , content};
}

export function deleteContentItem(sectionIndex, contentIndex) {
  return { type: "DELETE_CONTENT_ITEM", sectionIndex, contentIndex };
}

export function updateTitle(title) {
  return (dispatch, getState) => {
    const db = firebase.database();
    const pageId = getState().page.data.id;

    db.ref(`pages/${pageId}/`).update({ title }, error => {
      if (error) {
        return dispatch(
          showNotification(
            `There was an error saving your changes: ${error}`,
            "success"
          )
        );
      }

      dispatch(updatePageTitle(title));
      dispatch(
        showNotification(
          "Your changes have been saved. Publish your changes to make them public.",
          "success"
        )
      );
    });
  };
}

export function savePage(pageData, pageId) {
  return (dispatch) => {
    const db = firebase.database();
    console.log("saving page", pageId)
    console.log("pageData", pageData)
    db
      .ref(`pages/${pageId}/`)
      .update(pageData)
      .then(snap => {
        dispatch(toggleNewPageModal());
        dispatch(
          showNotification(
            "Your page has been saved. Publish your changes to view and edit the page.",
            "success"
          )
        );
      });
  };
}

// rename to updateContent
export function updatePage(pageId, contentId, content) {
  return dispatch => {
    const db = firebase.database();

    db.ref(`pages/${pageId}/content/${contentId}/`).update(content, error => {
      if (error) {
        return dispatch(
          showNotification(
            `There was an error saving your changes: ${error}`,
            "success"
          )
        );
      }

      dispatch(updatePageData(contentId, content));
      dispatch(
        showNotification(
          "Your changes have been saved. Publish your changes to make them public.",
          "success"
        )
      );
    });
  };
}

export function savePageContent(innerFunction) {
  return (dispatch, getState) => {
    Promise.resolve(dispatch(innerFunction)).then(() => {
      const content = getState().page.data.content;
      const pageId = getState().page.data.id;

      console.log("content", content)
      console.log("pageId", pageId)

      const db = firebase.database();

      db.ref(`pages/${pageId}/content/`)
        .update(content)
        .then(res => {
          console.log('res', res)
          dispatch(
            showNotification(
              "Your changes have been saved. Publish your changes to make them public.",
              "success"
            )
          );
        })
        .catch(error => {
          console.log('error', error)
          return dispatch(
            showNotification(
              `There was an error saving your changes: ${error}`,
              "success"
            )
          );
        })
    });
  };
}

export function updateFirebaseData(updates, callback=null) {
  return (dispatch, getState) => {
    const db = firebase.database();
    console.log(updates)

    db.ref().update(updates, error => {
      if (error) {
        console.log('FIREBASE ERROR', error)
        return dispatch(
          showNotification(
            `There was an error saving your changes: ${error}`,
            "success"
          )
        );
      }

      if (callback) {
        callback()
      }

      dispatch(
        showNotification(
          "Your changes have been saved. Publish your changes to make them public.",
          "success"
        )
      );
    });
  };
}


export function setPages(pages) {
  return { type: "SET_PAGES", pages }
}

export function fetchPages() {
  return (dispatch, getState) => {
    const db = firebase.database();

    db.ref(`pages`)
      .once('value')
      .then(snap => {
        const pages = Object.entries(snap.val()).reduce((obj, [id, page]) => {
          obj[id] = {...page, id}
          return obj
        }, {})

        console.log("Fetched pages", pages)
        dispatch(setPages(pages));
      })
      .catch(error => {
        console.log("Error fetching pages", error)
      })
  };
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

export function deployWithStagingContent() {
  return dispatch => {
    copyContentFromStaging()
      .then(() => {
        dispatch(
          showNotification(
            "Your content has been copied from the staging site.",
            "success"
          )
        );
        dispatch(deploy())
      })
      .catch(err => {
        dispatch(
          showNotification(
            `There was an error copying the content from the staging site: ${err}`,
            "danger"
          )
        );
      })
  }
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
