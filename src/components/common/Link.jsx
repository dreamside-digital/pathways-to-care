import React from "react";
import { EditableLink } from "react-easy-editables";


export default (props) => {
  return (
    <div className="my-1">
      <EditableLink { ...props } />
    </div>
  );
};
