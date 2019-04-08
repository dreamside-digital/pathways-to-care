import React from "react";

import {
  EditableText,
  EditableParagraph,
} from 'react-easy-editables';

const FeaturedItem = props => {
  const content = props.content || {};

  return (
    <div className={props.classes}>
      <div className="featured-desc">
        <h3><EditableText content={content["featured-item-title"]} onSave={props.onSave("featured-item-title")} /></h3>
        <EditableParagraph content={content["featured-item-description"]} onSave={props.onSave("featured-item-description")} />
      </div>
    </div>
  );
};

export default FeaturedItem;
