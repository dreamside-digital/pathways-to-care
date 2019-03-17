import React from "react";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import CheckIcon from "@material-ui/icons/Check";

const innerContentStyles = {
  editContainer: {
    backgroundColor: "rgba(255,255,255,0.3)",
    border: "1px solid black",
    position: "relative",
    padding: "10px",
  },
  actions: {
    position: "absolute",
    left: "10px",
    top: "-15px",
    display: "flex",
    alignItems: "center",
    zIndex: "99",
    fontSize: "16px"
  },
  button: {
    border: "1px solid black",
    color: "black",
    backgroundColor: "#fff",
    height: "30px",
    width: "30px",
    borderRadius: "30px",
    cursor: "pointer",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    marginRight: "4px",
    "&:hover": {
      backgroundColor: "grey"
    }
  },
  icon: {
    fontSize: "16px"
  }
};

const fullWidthStyles = {
  ...innerContentStyles,
  editContainer: {
    padding: "0",
  },
  actions: {
    ...innerContentStyles.actions,
    top: "5px"
  }
};

const EditorWrapper = props => {
  const styles = props.fullWidth ? fullWidthStyles : innerContentStyles;

  return (
    <div
      className="edit-container"
      style={
        props.isEditing
          ? {
              ...styles.editContainer,
              backgroundColor: "rgba(255,255,255,0.9)",
              zIndex: '9999'
            }
          : styles.editContainer
      }
    >
      {props.isEditing && (
        <div className="actions" style={styles.actions}>
          <div
            className="save-icon"
            style={styles.button}
            onClick={props.handleSave}
          >
            <CheckIcon />
          </div>
        </div>
      )}
      {!props.isEditing && (
        <div className="actions" style={styles.actions}>
          <div
            className="edit-icon"
            style={styles.button}
            onClick={props.toggleEditing}
          >
            <EditIcon />
          </div>
          {props.handleDelete &&
            props.disableDelete !== true && (
              <div
                className="delete-icon"
                style={styles.button}
                onClick={props.handleDelete}
              >
                <DeleteIcon />
              </div>
            )}
        </div>
      )}
      {props.children}
    </div>
  );
};

export default EditorWrapper;
