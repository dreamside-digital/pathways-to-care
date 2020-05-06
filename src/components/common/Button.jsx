import React from "react";
import { EditableLink } from "react-easy-editables";


export default ({ classes, ...rest}) => {
  return (
    <div className="my-1">
      <EditableLink { ...rest } classes={`btn btn-primary ${classes || ""}`} />
    </div>
  );
};
