import React from "react";
import Button from "@material-ui/core/Button"
import Grid from "@material-ui/core/Grid"
import { connect } from "react-redux";

import Publication from "./Publication"
import Carousel from "./Carousel"

import {
  updatePageContent,
  pushContentItem,
  removeContentItem,
} from "../../redux/actions";

import { DEFAULT_COMPONENT_CONTENT } from "../../utils/constants"

class Publications extends React.Component {
  onSave = id => content => {
    this.props.onUpdatePageContent(id, content);
  };

  onAddItem = id => content => {
    console.log("id", id)
    console.log("content", content)
    this.props.onPushContentItem(id, content);
  }

  onDeleteItem = id => itemId => {
    this.props.onRemoveContentItem(id, itemId)
  }

  render() {
    const { content } = this.props;
    console.log("publicatiosn props", this.props)

    return (
      <Carousel
        collection={content["related-publications"]}
        SlideComponent={Publication}
        onSave={this.onSave('related-publications')}
        onAddItem={this.onAddItem('related-publications')}
        onDeleteItem={this.onDeleteItem('related-publications')}
        slidesToShow={3}
        isEditingPage={this.props.isEditingPage}
        defaultContent={DEFAULT_COMPONENT_CONTENT['related-publications']}
      />
    );
  }
}

Publications.defaultProps = {
  content: {},
  classes: "",
  onSave: () => { console.log('Implement a function to save changes') }
}

const mapDispatchToProps = dispatch => {
  return {
    onUpdatePageContent: (location, data) => {
      dispatch(updatePageContent(location, data));
    },
    onPushContentItem: (location, data) => {
      dispatch(pushContentItem(location, data))
    },
    onRemoveContentItem: (location, itemId) => {
      dispatch(removeContentItem(location, itemId))
    },
  };
};

const mapStateToProps = state => {
  return {
    pageData: state.page.data,
    orderedPages: state.pages.orderedPages,
    pages: state.pages.pages,
    isEditingPage: state.adminTools.isEditingPage
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Publications)

