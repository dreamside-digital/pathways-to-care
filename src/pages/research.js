import React from "react";
import { graphql } from "gatsby";
import { connect } from "react-redux";
import Button from "@material-ui/core/Button"

import { DEFAULT_COMPONENT_CONTENT } from "../utils/constants"

import {
  updatePageContent,
  pushContentItem,
  removeContentItem,
  loadPageData,
} from "../redux/actions";

import {
  EditableText,
  EditableParagraph,
  EditableImageUpload,
  EditableLink,
} from 'react-easy-editables';

import { uploadImage } from "../firebase/operations";

import Layout from "../layouts/default.js";
import Publication from "../components/common/Publication";
import Carousel from "../components/common/Carousel";

import headerPattern from "../assets/images/pattern/secondary-banner.png";
import headerBg from "../assets/images/bg/squiggle.svg";
import background02 from "../assets/images/bg/02.png";


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
    onLoadPageData: data => {
      dispatch(loadPageData(data));
    }
  };
};

const mapStateToProps = state => {
  return {
    pageData: state.page.data,
    isEditingPage: state.adminTools.isEditingPage,
  };
};

class ResearchPage extends React.Component {

  componentDidMount() {
    console.log(this.props)
    const initialPageData = {
      ...this.props.data.pages,
      content: JSON.parse(this.props.data.pages.content)
    };

    this.props.onLoadPageData(initialPageData);
  }

  onSave = id => content => {
    this.props.onUpdatePageContent(id, content);
  };

  onAddItem = id => content => {
    this.props.onPushContentItem(id, content);
  }

  onDeleteItem = id => itemId => {
    this.props.onRemoveContentItem(id, itemId)
  }

  addListItem = listId => () => {
    const list = this.props.pageData.content[listId] ? [...this.props.pageData.content[listId]] : [];
    const emptyItem = DEFAULT_COMPONENT_CONTENT[listId];
    list.push(emptyItem)
    this.props.onUpdatePageContent(listId, list)
  }

  editListItem = (listId, index) => field => content => {
    const list = [...this.props.pageData.content[listId]];
    const updated = {
      ...list[index],
      [field]: content
    };

    list[index] = updated;

    this.props.onUpdatePageContent(listId, list);
  }

  deleteListItem = (listId, index) => () => {
    const list = [...this.props.pageData.content[listId]]
    list.splice(index, 1)
    this.props.onUpdatePageContent(listId, list)
  }

  render() {
    const content = this.props.pageData ? this.props.pageData.content : {};

    return (
      <Layout>

          <section className="page-title o-hidden text-center grey-bg bg-contain animatedBackground" data-bg-img={ headerPattern }>
            <div className="container">
              <div className="row">
                <div className="col-md-12">
                  <h1 className="title">
                    <EditableText content={content["page-title"]} onSave={this.onSave("page-title")} />
                  </h1>
                </div>
              </div>
            </div>
            <div className="page-title-pattern"><img className="img-fluid" src={ headerBg } alt="" /></div>
          </section>


        <div className="page-content">


          <section className="pos-r o-hidden">
            <div className="container">

              <div className="row align-items-center">
                <div className="col-lg-6 col-md-12 md-mt-5">
                  <div className="section-title mb-4">
                    <h2 className="title">
                      <EditableText content={content["goals-title"]} onSave={this.onSave("goals-title")} />
                    </h2>
                  </div>
                  <EditableParagraph content={content["goals-description"]} onSave={this.onSave("goals-description")} />
                </div>

                <div className="col-lg-6 col-md-12">
                  <div className="info-img pos-r">
                    <EditableImageUpload
                      classes={"img-fluid"}
                      content={content["goals-image"]}
                      onSave={this.onSave("goals-image")}
                      uploadImage={uploadImage}
                    />
                  </div>
                </div>
              </div>
            </div>
          </section>


          <section className="grey-bg" data-bg-img={ background02 }>
            <div className="container">

              <div className="row">

                <div className="col-12 md-mt-5">
                  <div className="section-title mb-4">
                    <h2 className="title">
                      <EditableText content={content["toc-title"]} onSave={this.onSave("toc-title")} />
                    </h2>
                  </div>
                  <EditableParagraph content={content["toc-description"]} onSave={this.onSave("toc-description")} />
                </div>
              </div>

              <div className="row justify-content-center">

                <div className="col-12 col-md-8 mt-5">
                  <div className="info-img pos-r">
                    <EditableImageUpload
                      classes={"img-fluid"}
                      content={content["toc-image"]}
                      onSave={this.onSave("toc-image")}
                      uploadImage={uploadImage}
                    />
                  </div>
                </div>

              </div>
            </div>
          </section>


          <section>
            <div className="container">
              <div className="row">
                <div className="col-lg-12 col-md-12 ml-auto mr-auto">
                  <div className="section-title">
                    <h2 className="title">
                      <EditableText content={content["news-title"]} onSave={this.onSave("news-title")} />
                    </h2>
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col-12">
                  <Carousel
                    collection={content["related-publications"]}
                    SlideComponent={Publication}
                    onSave={this.onSave('related-publications')}
                    onAddItem={this.onAddItem('related-publications')}
                    onDeleteItem={this.onDeleteItem('related-publications')}
                    options={{slidesToShow: 3}}
                    isEditingPage={this.props.isEditingPage}
                    defaultContent={DEFAULT_COMPONENT_CONTENT['related-publications']}
                  />
                </div>
              </div>
            </div>
          </section>


        </div>

      </Layout>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ResearchPage);

export const query = graphql`
  query {
    pages(id: { eq: "research" }) {
      id
      content
      title
      slug
    }
  }
`;


