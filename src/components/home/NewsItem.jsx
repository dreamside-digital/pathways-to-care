import React from "react";
import PropTypes from "prop-types";

import {
  EditableText,
  EditableParagraph,
  EditableImageUpload,
  EditableLink,
  Editable
} from 'react-easy-editables';

import { uploadImage } from "../../firebase/operations"

class NewsItemEditor extends React.Component {
  constructor(props) {
    super(props);
    this.state = { content: this.props.content };
  }

  handleEditorChange = field => content => {
    console.log("content", content)
    this.setState({
      content: {
        ...this.state.content,
        [field]: content
      }
    });
  }

  render() {
    const { content } = this.state;

    return(
      <div className={`p-3`}>
        <div className={`post`}>
          <div className="post-image">
            <EditableImageUpload
              classes="img-fluid h-100 w-100"
              content={content["news-item-image"]}
              onSave={this.handleEditorChange("news-item-image")}
              uploadImage={uploadImage}
            />
          </div>
          <div className="post-desc">
            <div className="post-date">
              <EditableText
                content={content["news-item-date"]}
                onSave={this.handleEditorChange("news-item-date")}
              />
            </div>
            <div className="post-title">
              <h5>
                <EditableLink
                  content={content["news-item-link"] || {}}
                  onSave={this.handleEditorChange("news-item-link")}
                />
              </h5>
            </div>
            <EditableParagraph
              content={content["news-item-description"]}
              onSave={this.handleEditorChange("news-item-description")}
            />
          </div>
        </div>
      </div>
    )
  }
}

const NewsItem = props => {

  const content = props.content || {};
  console.log("news item content", content)
  const { imageSrc, caption } = content;

  const handleSave = newContent => {
    console.log("newContent", newContent);
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
          <a href={content["news-item-image"]["imageSrc"]} target="_blank">
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
            <h5>
              <a href={ content["news-item-link"]["link"] }>
                { content["news-item-link"]["anchor"] }
              </a>
            </h5>
          </div>
          <div dangerouslySetInnerHTML={ {__html: content["news-item-description"]["text"]} } />
        </div>
      </div>
    </Editable>
  );
};

export default NewsItem;
