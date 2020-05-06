import React from "react";
import { EditableText } from "react-easy-editables";


export default (props) => {
  return (
    <h3 className="subheading">
      <EditableText { ...props } classes={""} />
    </h3>
  );
};
