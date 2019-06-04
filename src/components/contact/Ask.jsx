import React from "react";

import {
  EditableText,
  EditableParagraph,
} from 'react-easy-editables';

const Ask = props => {
  const onSavePassthrough = id => editedContent => {
    const content = { ...props.content, [id]: editedContent }
    props.onSave(content);
  };

  const content = props.content || {};
  const number = props.index + 1;

  return (
    <div className="work-process style-2 mb-1">
      <div className="work-process-inner"> <span className="step-num">{ number }</span>
        <h4>
          <EditableText content={content["ask-title"]} onSave={props.onSave("ask-title")} />
        </h4>
        <EditableParagraph classes="mb-0" content={content["ask-description"]} onSave={props.onSave("ask-description")} />
      </div>
    </div>
  );
};

export default Ask;
