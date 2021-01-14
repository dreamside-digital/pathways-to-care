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
  showNotification,
} from "../redux/actions";

import Layout from "../layouts/default.js";

import headerImage from "../assets/images/ptc-header.png";
import headerPattern from "../assets/images/pattern/home-banner3.png";
import backgroundBanner from "../assets/images/banner/blob-home.svg";
import background02 from "../assets/images/bg/02.png";

import FeaturedItem from "../components/home/FeaturedItem";
import FeaturedItemWithTitle from "../components/home/FeaturedItemWithTitle";
import FeaturedItemWithImage from "../components/home/FeaturedItemWithImage";
import NewsItem from "../components/home/NewsItem";
import Carousel from "../components/common/Carousel";
import MailchimpSubscriptionForm from "../components/common/MailchimpSubscriptionForm"

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
    },
    showNotification: message => {
      dispatch(showNotification(message));
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

    window.setTimeout(() => {
      this.props.showNotification("If you are in crisis, please call 911 or go to your nearest emergency department for assistance.")
    }, 3000)
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
    const pageData = this.props.pageData ? this.props.pageData : this.props.data.pages;
    const title = pageData.displayTitle ? pageData.displayTitle : pageData.title;
    const content = this.props.pageData ? this.props.pageData.content : JSON.parse(this.props.data.pages.content);
    const problemItems = content["problem-items"] ? content["problem-items"] : {};
    const outcomeItems = content["outcome-items"] ? content["outcome-items"] : {};
    const newsItems = content["news-items"] ? content["news-items"] : {};

    return (
      <Layout title={title} description={pageData["description"]}>
        <section className="fullscreen-banner p-0 banner o-hidden" data-bg-img={ headerPattern }>
          <div className="align-center">
            <div className="container">
              <div className="row align-items-center">
                <div className="col-lg-6 col-md-12 order-lg-12">
                  <div className="mouse-parallax">
                    <div className="bnr-img1 wow fadeInRight" data-wow-duration="500ms" data-wow-delay="500ms">
                      <img className="img-center rotateme" src={ backgroundBanner } />
                    </div>
                    <img className="img-center bnr-img2 wow zoomIn" data-wow-duration="1s" data-wow-delay="1s" src={ headerImage } alt="Illustration of a diverse group of smiling black people" />
                  </div>
                </div>
                <div className="col-lg-6 col-md-12 order-lg-1 md-mt-5">
                  <h1 className="mb-4 wow bounceInLeft" data-wow-duration="500ms" data-wow-delay="500ms">
                    <EditableText content={content["header-title"]} onSave={this.onSave("header-title")} />
                  </h1>
                  <div className="lead wow fadeInUp" data-wow-duration="500ms">
                    <EditableText content={content["header-subtitle"]} onSave={this.onSave("header-subtitle")} />
                  </div>
                </div>
              </div>
            </div>
           </div>
        </section>

        <div className="page-content">

          <section className="dark-bg pos-r" id="problem">
            <div className="container">
              <div className="section-title">
                <h6>
                  <EditableText content={content["problem-tag"]} onSave={this.onSave("problem-tag")} />
                </h6>
                <h2 className="title">
                  <EditableText content={content["problem-title"]} onSave={this.onSave("problem-title")} />
                </h2>
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

              <div className="row mt-3">
                <div className="col-lg-12 col-md-12 text-white">
                  <EditableParagraph content={content["problem-summary"]} onSave={this.onSave("problem-summary")} />
                </div>
              </div>
            </div>
          </section>

          <section className="pos-r" id="solution">
            <div className="container">
              <div className="row">
                <div className="col-lg-6 col-md-12">
                  <div className="section-title">
                    <h6>
                      <EditableText content={content["solution-tag"]} onSave={this.onSave("solution-tag")} />
                    </h6>
                    <h2 className="title">
                      <EditableText content={content["solution-title"]} onSave={this.onSave("solution-title")} />
                    </h2>
                  </div>
                  <div className="">
                    <EditableParagraph content={content["solution-summary"]} onSave={this.onSave("solution-summary")} />
                    <EditableLink classes="btn btn-theme mt-3" content={content["solution-read-more"]} onSave={this.onSave("solution-read-more")} />
                  </div>
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
            </div>
          </section>

          <section className="grey-bg pos-r" id="outcomes">
            <div className="container">

            <div className="row">
              <div className="col-lg-12 col-md-12 ml-auto mr-auto">
                <div className="section-title">
                  <h6>
                    <EditableText content={content["outcomes-tag"]} onSave={this.onSave("outcomes-tag")} />
                  </h6>
                  <h2 className="title">
                    <EditableText content={content["outcomes-title"]} onSave={this.onSave("outcomes-title")} />
                  </h2>
                </div>
                <div className="">
                  <EditableParagraph content={content["outcomes-summary"]} onSave={this.onSave("outcomes-summary")} />
                </div>
              </div>
            </div>

              <div className="row">
                {
                  Object.keys(outcomeItems).map(key => {
                    const content = outcomeItems[key];

                    return (
                      <div className="col-lg-4 col-md-6" key={`outcome-item-${key}`}>
                        <FeaturedItemWithImage
                          classes="featured-item text-center style-2"
                          content={content}
                          onSave={this.editListItem("outcome-items", key)}
                          uploadImage={uploadImage}
                        />
                        { this.props.isEditingPage &&
                          <div className="row">
                            <Button onClick={this.deleteListItem("outcome-items", key)}>Delete</Button>
                          </div>
                        }
                      </div>
                    )
                  })
                }
                {
                  this.props.isEditingPage &&
                  <div className="col-lg-4 col-md-6 row align-items-center">
                    <Button onClick={this.addListItem("outcome-items")}>Add list item</Button>
                  </div>
                }

              </div>

              <div className="row">
                <div className="col-12 text-center">
                  <EditableLink classes="btn btn-theme mt-5" content={content["outcomes-read-more"]} onSave={this.onSave("outcomes-read-more")} />
                </div>
              </div>

            </div>
          </section>

          <section className="dark-bg" id="map">
            <div className="container">
              <div className="row">
                <div className="col-12">
                  <div className="section-title">
                    <h6>
                      <EditableText content={content["map-tag"]} onSave={this.onSave("map-tag")} />
                    </h6>
                    <h2 className="title">
                      <EditableText content={content["map-title"]} onSave={this.onSave("map-title")} />
                    </h2>
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col-12">
                  <div className="info-img pos-r">
                    <EditableImageUpload
                      classes="img-fluid"
                      content={content["map-image"]}
                      onSave={this.onSave("map-image")}
                      uploadImage={uploadImage}
                    />
                  </div>
                </div>
                <div className="col-12 text-center">
                  <EditableLink classes="btn btn-theme mt-5" content={content["map-read-more"]} onSave={this.onSave("map-read-more")} />
                </div>
              </div>
            </div>
          </section>

          <section className="" data-bg-img={ background02 } id="news">
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
                collection={newsItems}
                SlideComponent={NewsItem}
                onSave={this.onSave('news-items')}
                onAddItem={this.onAddItem('news-items')}
                onDeleteItem={this.onDeleteItem('news-items')}
                slidesToShow={3}
                isEditingPage={this.props.isEditingPage}
                defaultContent={DEFAULT_COMPONENT_CONTENT['news-items']}
                reverseOrder={true}
              />

              <div className="row">
                <div className="col-12 text-center">
                  <EditableLink classes="btn btn-theme mt-5" content={content["research-read-more"]} onSave={this.onSave("research-read-more")} />
                </div>
              </div>

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
      displayTitle
      description
      slug
    }
  }
`;


