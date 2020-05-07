import React from "react";
import { EditableFileUpload } from "react-easy-editables";
import { uploadFile } from "../../firebase/operations";


export default (props) => {
  return (
    <EditableFileUpload { ...props } uploadFile={uploadFile} linkClasses="btn btn-theme mt-4" />
  );
};
