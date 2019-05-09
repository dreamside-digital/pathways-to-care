import React from "react";

import {
  EditableText,
  EditableParagraph,
  EditableImageUpload,
  EditableLink,
} from 'react-easy-editables';

import { uploadImage } from "../../firebase/operations"

const NewsItem = props => {

  const content = props.content || {};

  return (
    <div className={`p-3`}>
      <div className={`post ${props.classes}`}>
        <div className="post-image">
          <EditableImageUpload
            classes="img-fluid h-100 w-100"
            content={content["news-item-image"]}
            onSave={props.onSave("news-item-image")}
            uploadImage={uploadImage}
          />
        </div>
        <div className="post-desc">
          <div className="post-date">
            <EditableText
              content={content["news-item-date"]}
              onSave={props.onSave("news-item-date")}
            />
          </div>
          <div className="post-title">
            <h5>
              <EditableLink
                content={content["news-item-link"] || {}}
                onSave={props.onSave("news-item-link")}
              />
            </h5>
          </div>
          <EditableParagraph
            content={content["news-item-description"]}
            onSave={props.onSave("news-item-description")}
          />
        </div>
      </div>
    </div>
  );
};

export default NewsItem;
