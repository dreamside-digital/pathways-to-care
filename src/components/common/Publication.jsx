import React from "react";
import PropTypes from "prop-types";

import {
  PlainTextEditor,
  RichTextEditor,
  ImageUploadEditor,
  FileUploadEditor,
  Editable
} from 'react-easy-editables';

import { uploadImage, uploadFile } from "../../firebase/operations"

class PublicationEditor extends React.Component {
  constructor(props) {
    super(props);
    this.state = { content: this.props.content };
  }

  handleEditorChange = field => item => {
    this.setState({
      content: {
        ...this.state.content,
        [field]: {
          ...item
        }
      }
    });
  }

  render() {
    const { content } = this.state;

    return(
      <div className={`p-3`}>
        <div className={`post`}>
          <div className="post-image">
            <ImageUploadEditor
              classes="img-fluid h-100 w-100"
              content={content["publication-item-image"]}
              onContentChange={this.handleEditorChange("publication-item-image")}
              uploadImage={uploadImage}
            />
          </div>
          <div className="post-desc">
            <div className="post-date">
              <PlainTextEditor
                content={content["publication-item-date"]}
                onContentChange={this.handleEditorChange("publication-item-date")}
              />
            </div>
            <div className="post-title mb-4">
              <h4>
                <PlainTextEditor
                  content={content["publication-item-title"]}
                  onContentChange={this.handleEditorChange("publication-item-title")}
                />
              </h4>
            </div>
            <RichTextEditor
              content={content["publication-item-description"]}
              onContentChange={this.handleEditorChange("publication-item-description")}
            />
            <FileUploadEditor
              content={content["publication-item-file"]}
              onContentChange={this.handleEditorChange("publication-item-file")}
              uploadFile={uploadFile}
            />
          </div>
        </div>
      </div>
    )
  }
}

const Publication = props => {

  const content = props.content || {};

  const handleSave = newContent => {
    props.onSave(newContent)
  }

  return (
    <Editable
      Editor={PublicationEditor}
      handleSave={handleSave}
      content={content}
      {...props}
    >
      <div className={`post ${props.classes}`}>
        <div className="post-image">
          <a href={content["publication-item-image"]["imageSrc"]} target="_blank">
            <img
              className="img-fluid h-100 w-100"
              src={content["publication-item-image"]["imageSrc"]}
              alt={content["publication-item-image"]["caption"]}
            />
          </a>
        </div>
        <div className="post-desc">
          <div className="post-date">
            {content["publication-item-date"]["text"]}
          </div>
          <div className="post-title">
            <h4>
              { content["publication-item-title"]["text"] }
            </h4>
          </div>
          <div dangerouslySetInnerHTML={ {__html: content["publication-item-description"]["text"]} } />

          <div className="action-link">
            <a href={content["publication-item-file"]["filepath"]} target="_blank" rel="noopener noreferrer">
              { `Download publication`}
            </a>
          </div>
        </div>
      </div>
    </Editable>
  );
};

export default Publication;
