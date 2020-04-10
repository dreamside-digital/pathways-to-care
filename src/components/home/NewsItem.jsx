import React from "react";
import PropTypes from "prop-types";

import {
  PlainTextEditor,
  RichTextEditor,
  ImageUploadEditor,
  LinkEditor,
  Editable
} from 'react-easy-editables';

import { uploadImage } from "../../firebase/operations"

class NewsItemEditor extends React.Component {
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
              content={content["news-item-image"]}
              onContentChange={this.handleEditorChange("news-item-image")}
              uploadImage={uploadImage}
            />
          </div>
          <div className="post-desc">
            <div className="post-date">
              <PlainTextEditor
                content={content["news-item-date"]}
                onContentChange={this.handleEditorChange("news-item-date")}
              />
            </div>
            <div className="post-title mb-4">
              <h4>
                <LinkEditor
                  content={content["news-item-link"]}
                  onContentChange={this.handleEditorChange("news-item-link")}
                />
              </h4>
            </div>
            <RichTextEditor
              content={content["news-item-description"]}
              onContentChange={this.handleEditorChange("news-item-description")}
            />
          </div>
        </div>
      </div>
    )
  }
}

const NewsItem = props => {

  const content = props.content || {};

  const handleSave = newContent => {
    props.onSave(newContent)
  }

  return (
    <Editable
      Editor={NewsItemEditor}
      handleSave={handleSave}
      content={content}
      {...props}
    >
      <div className={`post ${props.classes}`}>
        <div className="post-image">
          <a href={ content["news-item-link"]["link"] }>
            <img
              className="img-fluid h-100 w-100"
              src={content["news-item-image"]["imageSrc"]}
              alt={content["news-item-image"]["caption"]}
            />
          </a>
        </div>
        <div className="post-desc">
          <div className="post-date">
            {content["news-item-date"]["text"]}
          </div>
          <div className="post-title">
            <h4>
              <a href={ content["news-item-link"]["link"] }>
                { content["news-item-link"]["anchor"] }
              </a>
            </h4>
          </div>
          <div dangerouslySetInnerHTML={ {__html: content["news-item-description"]["text"]} } />
        </div>
      </div>
    </Editable>
  );
};

export default NewsItem;
