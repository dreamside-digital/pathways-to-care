import React from "react";
import { EditableLightboxImageUpload } from "react-easy-editables";
import { uploadImage } from "../../firebase/operations";


export default (props) => {
  return (
    <div className={"my-4"}>
      <EditableLightboxImageUpload { ...props } uploadImage={uploadImage} showCaption={true} editCaption={true} />
    </div>
  );
};
