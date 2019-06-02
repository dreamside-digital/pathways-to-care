import React from "react";

import {
  EditableText,
  EditableParagraph,
  EditableImageUpload,
} from 'react-easy-editables';

const FeaturedItemWithImage = props => {
  const content = props.content || {};

  return (
    <div className={props.classes}>
      <div className="featured-icon">
        <EditableImageUpload
          content={content["featured-item-image"]}
          onSave={props.onSave("featured-item-image")}
          uploadImage={props.uploadImage}
        />
      </div>
      <div className="featured-title">
        <h5><EditableText content={content["featured-item-title"]} onSave={props.onSave("featured-item-title")} /></h5>
      </div>
      <div className="featured-desc">
        <EditableParagraph content={content["featured-item-description"]} onSave={props.onSave("featured-item-description")} />
      </div>
    </div>
  );
};

export default FeaturedItemWithImage;