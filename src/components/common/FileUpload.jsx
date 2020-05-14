import React from "react";
// import { EditableFileUpload } from 'react-easy-editables';
import EditableFileUpload from "../editing/EditableFileUpload";
import { uploadFile } from "../../firebase/operations";


export default (props) => {
  return (
    <EditableFileUpload { ...props } uploadFile={uploadFile} linkClasses="btn btn-theme mt-4" linkText={"Download the PDF"} />
  );
};
