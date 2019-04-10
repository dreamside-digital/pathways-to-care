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
  updatePage,
  loadPageData,
} from "../redux/actions";

import Layout from "../layouts/default.js";

import headerImage from "../assets/images/ptc-header.png";
import headerPattern from "../assets/images/pattern/home-banner.png";
import backgroundBanner from "../assets/images/banner/01.png";
import background02 from "../assets/images/bg/02.png";

import FeaturedItem from "../components/home/FeaturedItem";
import FeaturedItemWithTitle from "../components/home/FeaturedItemWithTitle";
import NewsItem from "../components/home/NewsItem";

import { uploadImage } from "../firebase/operations";

const PAGE_ID = "home";


const mapDispatchToProps = dispatch => {
  return {
    onUpdatePageData: (page, id, data) => {
      dispatch(updatePage(page, id, data));
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
    this.props.onUpdatePageData(PAGE_ID, id, content);
  };

  addListItem = listId => () => {
    const list = this.props.pageData.content[listId] ? [...this.props.pageData.content[listId]] : [];
    const emptyItem = DEFAULT_COMPONENT_CONTENT[listId];
    list.push(emptyItem)
    this.props.onUpdatePageData(PAGE_ID, listId, list)
  }

  editListItem = (listId, index) => field => content => {
    const list = [...this.props.pageData.content[listId]];
    const updated = {
      ...list[index],
      [field]: content
    };

    list[index] = updated;

    this.props.onUpdatePageData(PAGE_ID, listId, list);
  }

  deleteListItem = (listId, index) => () => {
    const list = [...this.props.pageData.content[listId]]
    list.splice(index, 1)
    this.props.onUpdatePageData(PAGE_ID, listId, list)
  }


  render() {
    const content = this.props.pageData ? this.props.pageData.content : {};
    const problemItems = content["problem-items"] ? content["problem-items"] : [];
    const solutionItems = content["solution-items"] ? content["solution-items"] : [];
    const newsItems = content["news-items"] ? content["news-items"] : [];

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
                  problemItems.map((content, index) => {
                    return (
                      <div className="col-lg-4 col-md-6" key={`problem-item-${index}`}>
                        <FeaturedItemWithTitle
                          classes="featured-item text-center"
                          content={content}
                          onSave={this.editListItem("problem-items", index)}
                        />
                        { this.props.isEditingPage &&
                          <div className="row justify-content-end">
                            <Button onClick={this.deleteListItem("problem-items", index)}>Delete</Button>
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
                  solutionItems.map((content, index) => {
                    return (
                      <div className="col-lg-4 col-md-6" key={`solution-item-${index}`}>
                        <FeaturedItem
                          classes="featured-item text-center style-2"
                          content={content}
                          onSave={this.editListItem("solution-items", index)}
                        />
                        { this.props.isEditingPage &&
                          <div className="row">
                            <Button onClick={this.deleteListItem("solution-items", index)}>Delete</Button>
                          </div>
                        }
                      </div>
                    )
                  })

                }
                {
                  this.props.isEditingPage &&
                  <div className="col-lg-4 col-md-6 row justify-content-center align-items-center">
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

              <div className="row">

              {
                newsItems.map((content, index) => {
                  return (
                    <div className="col-lg-4 col-md-12" key={`news-item-${index}`}>
                      <NewsItem
                        content={content}
                        onSave={this.editListItem("news-items", index)}
                      />
                      { this.props.isEditingPage &&
                        <div className="justify-content-start">
                          <Button onClick={this.deleteListItem("news-items", index)}>Delete</Button>
                        </div>
                      }
                    </div>
                  )
                })

              }
              {
                this.props.isEditingPage &&
                <div className="col-lg-12">
                  <Button onClick={this.addListItem("news-items")}>Add list item</Button>
                </div>
              }

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
      slug
    }
  }
`;


