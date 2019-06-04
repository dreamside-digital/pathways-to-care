import React from "react";

import {
  EditableText,
} from 'react-easy-editables';


const FeaturedItem = props => {
  const content = props.content || {};

  return (
    <div className={props.classes}>
      <span className="step-num">{props.index + 1}</span>
      <div className="featured-desc">
        <EditableText content={content["featured-item-description"]} onSave={props.onSave("featured-item-description")} />
      </div>
    </div>
  );
};

export default FeaturedItem;
