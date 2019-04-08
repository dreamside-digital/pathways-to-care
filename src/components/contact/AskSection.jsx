import React from "react";

import {
  EditableText,
  EditableParagraph,
} from 'react-easy-editables';

const AskSection = props => {
  const onSavePassthrough = id => editedContent => {
    const content = { ...props.content, [id]: editedContent }
    props.onSave(content);
  };

  addListItem = listId => {
    const list = this.props.pageData.content[listId] ? [...this.props.pageData.content[listId]] : [];
    const emptyItem = DEFAULT_COMPONENT_CONTENT[listId];
    arr.push(emptyItem)
    this.props.onUpdatePageData(PAGE_ID, listId, arr)
  }

  editListItem = (listId, index, field) => content => {
    const arr = [...this.props.pageData.content[listId]];
    const updated = {
      ...arr[index],
      [field]: content
    };

    arr[index] = updated;

    this.props.onUpdatePageData(PAGE_ID, listId, arr);
  }

  deleteListItem = (listId, index) => () => {
    const arr = [...this.props.pageData.content[listId]]
    arr.splice(index, 1)
    this.props.onUpdatePageData(PAGE_ID, listId, arr)
  }

  return (
    <div className="work-process style-2">
      <div className="work-process-inner"> <span className="step-num" data-bg-color="#cd113a">{ number }</span>
        <h4>
          <EditableText content={content["ask-title"]} onSave={this.onSave("ask-title")} />
        </h4>
        <EditableParagraph classes="mb-0" content={content["ask-description"]} onSave={this.onSave("ask-description")} />
      </div>
    </div>
  );
};

export default Ask;
