import React from "react";
import { graphql } from "gatsby";
import { connect } from "react-redux";
import Button from "@material-ui/core/Button"

import { DEFAULT_COMPONENT_CONTENT } from "../utils/constants"

import {
  EditableText,
  EditableParagraph,
  EditableImageUpload,
  EditableLink,
} from 'react-easy-editables';

import {
  updatePageContent,
  pushContentItem,
  removeContentItem,
  loadPageData,
} from "../redux/actions";

import Layout from "../layouts/default.js";

import headerImage from "../assets/images/ptc-header.png";
import headerPattern from "../assets/images/pattern/home-banner3.png";
import backgroundBanner from "../assets/images/banner/blob-home.svg";
import background02 from "../assets/images/bg/02.png";

import FeaturedItem from "../components/home/FeaturedItem";
import FeaturedItemWithTitle from "../components/home/FeaturedItemWithTitle";
import NewsItem from "../components/home/NewsItem";
import Carousel from "../components/common/Carousel";

import { uploadImage } from "../firebase/operations";


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

class HomePage extends React.Component {

  componentDidMount() {
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
    const emptyItem = DEFAULT_COMPONENT_CONTENT[listId];
    this.props.onPushContentItem(listId, emptyItem);
  }

  deleteListItem = (listId, itemId) => () => {
    this.props.onRemoveContentItem(listId, itemId)
  }

  editListItem = (listId, key) => field => content => {
    const list = {
      ...this.props.pageData.content[listId],
      [key]: {
        ...this.props.pageData.content[listId][key],
        [field]: content
      }
    };

    this.props.onUpdatePageContent(listId, list);
  }


  render() {
    const content = this.props.pageData ? this.props.pageData.content : {};
    const problemItems = content["problem-items"] ? content["problem-items"] : {};
    const solutionItems = content["solution-items"] ? content["solution-items"] : {};

    return (
      <Layout>
        <section className="fullscreen-banner p-0 banner o-hidden" data-bg-img={ headerPattern }>
          <div className="align-center">
            <div className="container">
              <div className="row align-items-center">
                <div className="col-lg-6 col-md-12 order-lg-12">
                  <div className="mouse-parallax">
                    <div className="bnr-img1 wow fadeInRight" data-wow-duration="1s" data-wow-delay="1s">
                      <img className="img-center rotateme" src={ backgroundBanner } alt="" />
                    </div>
                    <img className="img-center bnr-img2 wow zoomIn" data-wow-duration="2s" data-wow-delay="1.5s" src={ headerImage } alt="" />
                  </div>
                </div>
                <div className="col-lg-6 col-md-12 order-lg-1 md-mt-5">
                  <h1 className="mb-4 wow bounceInLeft" data-wow-duration="3s" data-wow-delay="500ms">
                    <EditableText content={content["header-title"]} onSave={this.onSave("header-title")} />
                  </h1>
                  <div className="lead wow fadeInUp" data-wow-duration="1s">
                    <EditableText content={content["header-subtitle"]} onSave={this.onSave("header-subtitle")} />
                  </div>
                </div>
              </div>
            </div>
           </div>
        </section>

        <div className="page-content">

          <section className="dark-bg pos-r">
            <div className="container">
              <div className="row">
                <div className="col-lg-12 col-md-12 ml-auto md-mt-5">
                  <div className="section-title mb-4">
                    <h6>
                      <EditableText content={content["featured-tag"]} onSave={this.onSave("featured-tag")} />
                    </h6>
                    <h2 className="title">
                      <EditableText content={content["featured-title"]} onSave={this.onSave("featured-title")} />
                    </h2>
                    <div className="text-white">
                      <EditableParagraph content={content["featured-body"]} onSave={this.onSave("featured-body")} />
                      <EditableLink content={content["featured-link"]} onSave={this.onSave("featured-link")} />
                    </div>
                  </div>
                </div>
              </div>

            </div>
          </section>


          <section className="grey-bg pos-r">
            <div className="container">
              <div className="row">
                <div className="col-lg-12 col-md-12 ml-auto mr-auto">
                  <div className="section-title">
                    <h6>
                      <EditableText content={content["problem-tag"]} onSave={this.onSave("problem-tag")} />
                    </h6>
                    <h2 className="title">
                      <EditableText content={content["problem-title"]} onSave={this.onSave("problem-title")} />
                    </h2>
                  </div>
                  <EditableParagraph content={content["problem-body"]} onSave={this.onSave("problem-body")} />
                </div>
              </div>
              <div className="row">
                {
                  Object.keys(problemItems).map(key => {
                    const content = problemItems[key];

                    return (
                      <div className="col-lg-4 col-md-6" key={`problem-item-${key}`}>
                        <FeaturedItemWithTitle
                          classes="featured-item text-center"
                          content={content}
                          onSave={this.editListItem("problem-items", key)}
                        />
                        { this.props.isEditingPage &&
                          <div className="row justify-content-end">
                            <Button onClick={this.deleteListItem("problem-items", key)}>Delete</Button>
                          </div>
                        }
                      </div>
                    )
                  })
                }
                {
                  this.props.isEditingPage &&
                  <div className="col-lg-12">
                    <Button onClick={this.addListItem("problem-items")}>Add list item</Button>
                  </div>
                }

              </div>
            </div>
          </section>


          <section className="pos-r">
            <div className="container">
              <div className="row">
                <div className="col-lg-12 col-md-12 ml-auto md-mt-5">
                  <div className="section-title mb-4">
                    <h6>
                      <EditableText content={content["solution-tag"]} onSave={this.onSave("solution-tag")} />
                    </h6>
                    <h2 className="title">
                      <EditableText content={content["solution-title"]} onSave={this.onSave("solution-title")} />
                    </h2>
                  </div>
                </div>
              </div>

              <div className="row align-items-center">
                <div className="col-lg-6 col-md-12 md-mt-5">
                  <EditableParagraph content={content["solution-description"]} onSave={this.onSave("solution-description")} />
                </div>

                <div className="col-lg-6 col-md-12">
                  <div className="info-img pos-r">
                    <EditableImageUpload
                      classes="img-fluid"
                      content={content["solution-image"]}
                      onSave={this.onSave("solution-image")}
                      uploadImage={uploadImage}
                    />
                  </div>
                </div>
              </div>

              <div className="row">
                <div className="col-lg-4 col-md-12">
                  <h2 className="text-center p-5 my-3">
                    <EditableText content={content["solution-items-header"]} onSave={this.onSave("solution-items-header")} />
                  </h2>
                </div>

                {
                  Object.keys(solutionItems).map(key => {
                    const content = solutionItems[key];

                    return (
                      <div className="col-lg-4 col-md-6" key={`solution-item-${key}`}>
                        <FeaturedItem
                          classes="featured-item text-center style-2"
                          content={content}
                          onSave={this.editListItem("solution-items", key)}
                        />
                        { this.props.isEditingPage &&
                          <div className="row">
                            <Button onClick={this.deleteListItem("solution-items", key)}>Delete</Button>
                          </div>
                        }
                      </div>
                    )
                  })
                }
                {
                  this.props.isEditingPage &&
                  <div className="col-lg-4 col-md-6 row align-items-center">
                    <Button onClick={this.addListItem("solution-items")}>Add list item</Button>
                  </div>
                }

              </div>

            </div>
          </section>


          <section className="grey-bg" data-bg-img={ background02 }>
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

              <Carousel
                collection={content["news-items"]}
                SlideComponent={NewsItem}
                onSave={this.onSave('news-items')}
                onAddItem={this.onAddItem('news-items')}
                onDeleteItem={this.onDeleteItem('news-items')}
                slidesToShow={3}
                isEditingPage={this.props.isEditingPage}
                defaultContent={DEFAULT_COMPONENT_CONTENT['news-items']}
              />

            </div>
          </section>
        </div>
      </Layout>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(HomePage);

export const query = graphql`
  query {
    pages(id: { eq: "home" }) {
      id
      content
      title
      slug
    }
  }
`;


