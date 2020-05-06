import React from "react";
import { EditableParagraph } from "react-easy-editables";

export default (props) => {
  return (
    <EditableParagraph
      { ...props }
      classes={"paragraph"}
    />
  );
};

