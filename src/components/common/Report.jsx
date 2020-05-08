import React from "react";
import PropTypes from "prop-types";

import {
  PlainTextEditor,
  RichTextEditor,
  ImageUploadEditor,
  LinkEditor,
  Editable
} from 'react-easy-editables';

import { uploadImage, uploadFile } from "../../firebase/operations"

const ReportEditor = ({ content, onContentChange }) => {

  const handleEditorChange = field => item => {
    onContentChange({
      ...content,
      [field]: {
        ...item
      }
    });
  }

  return(
    <div className={`p-3`}>
      <div className={`post`}>
        <div className="post-image">
          <ImageUploadEditor
            classes="img-fluid h-100 w-100"
            content={content["report-item-image"]}
            onContentChange={handleEditorChange("report-item-image")}
            uploadImage={uploadImage}
          />
        </div>
        <div className="post-desc">
          <div className="post-date">
            <PlainTextEditor
              content={content["report-item-date"]}
              onContentChange={handleEditorChange("report-item-date")}
            />
          </div>
          <div className="post-title mb-4">
            <h4>
              <PlainTextEditor
                content={content["report-item-title"]}
                onContentChange={handleEditorChange("report-item-title")}
              />
            </h4>
          </div>
          <RichTextEditor
            content={content["report-item-description"]}
            onContentChange={handleEditorChange("report-item-description")}
          />
          <LinkEditor
            content={content["report-item-link"]}
            onContentChange={handleEditorChange("report-item-link")}
          />
        </div>
      </div>
    </div>
  )
}

const Report = props => {

  const content = props.content || {};

  const handleSave = newContent => {
    props.onSave(newContent)
  }

  return (
    <Editable
      Editor={ReportEditor}
      handleSave={handleSave}
      content={content}
      {...props}
    >
      <div className={`post ${props.classes}`}>
        <div className="post-image">
          <a href={content["report-item-image"]["imageSrc"]} target="_blank">
            <img
              className="img-fluid h-100 w-100"
              src={content["report-item-image"]["imageSrc"]}
              alt={content["report-item-image"]["caption"]}
            />
          </a>
        </div>
        <div className="post-desc">
          <div className="post-date">
            {content["report-item-date"]["text"]}
          </div>
          <div className="post-title">
            <h4>
              { content["report-item-title"]["text"] }
            </h4>
          </div>
          <div dangerouslySetInnerHTML={ {__html: content["report-item-description"]["text"]} } />

          <div className="action-link">
            <a href={content["report-item-link"]["link"]} target="_blank" rel="noopener noreferrer">
              {content["report-item-link"]["anchor"]}
            </a>
          </div>
        </div>
      </div>
    </Editable>
  );
};

export default Report;
