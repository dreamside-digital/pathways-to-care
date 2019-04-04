import React from "react";

import {
  EditableText,
  EditableParagraph,
  EditableImageUpload,
  EditableLink,
} from 'react-easy-editables';

const NewsItem = props => {
  const onSavePassthrough = id => editedContent => {
    const content = { ...props.content, [id]: editedContent }
    props.onSave(content);
  };

  const content = props.content || {};

  return (
    <div className={`post ${props.classes}`}>
      <div className="post-image">
        <EditableImageUpload classes="img-fluid h-100 w-100" content={content["news-item-image"]} onSave={onSavePassthrough("news-item-image")} uploadImage={props.uploadImage} />
      </div>
      <div className="post-desc">
        <div className="post-date">
          <EditableText content={content["news-item-date"]} onSave={onSavePassthrough("news-item-date")} />
        </div>
        <div className="post-title">
          <h5>
            <EditableLink content={content["news-item-link"] || {}} onSave={onSavePassthrough("news-item-link")} />
          </h5>
        </div>
        <EditableParagraph content={content["news-item-description"]} onSave={onSavePassthrough("news-item-description")} />
      </div>
    </div>
  );
};

export default NewsItem;
