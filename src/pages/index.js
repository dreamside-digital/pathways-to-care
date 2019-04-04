import React from "react";
import { graphql } from "gatsby";
import { connect } from "react-redux";
import {
  EditablesContext,
  theme,
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
import backgroundPattern from "../assets/images/pattern/01.png";
import backgroundBanner from "../assets/images/banner/01.png";
import pattern03 from "../assets/images/pattern/03.png";
import background02 from "../assets/images/bg/02.png";

import FeaturedItem from "../components/home/FeaturedItem";
import NewsItem from "../components/home/NewsItem";

import firebase from "../firebase/init";


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
    this.props.onUpdatePageData("home", id, content);
  };

  uploadImage(image) {
    return new Promise(resolve => {
      const storage = firebase.storage().ref();
      const fileRef = storage.child(`images/${image.name}`);

      fileRef.put(image).then(snapshot => {
        console.log("snapshot.downloadURL", snapshot.downloadURL)
        resolve(snapshot.downloadURL)
      });
    })
  }

  render() {
    const content = this.props.pageData ? this.props.pageData.content : {};
    const isEditingPage = this.props.isEditingPage;

    return (
      <Layout>
      <EditablesContext.Provider value={ { theme: theme, showEditingControls: isEditingPage } }>
        <section className="fullscreen-banner p-0 banner o-hidden" data-bg-img={ backgroundPattern }>
          <div className="align-center">
            <div className="container">
              <div className="row align-items-center">
                <div className="col-lg-5 col-md-12 order-lg-12">
                  <div className="mouse-parallax">
                    <div className="bnr-img1 wow fadeInRight" data-wow-duration="1s" data-wow-delay="4s">
                      <img className="img-center rotateme" src={ backgroundBanner } alt="" />
                    </div>
                    <img className="img-center bnr-img2 wow zoomIn" data-wow-duration="2s" data-wow-delay="5s" src={ headerImage } alt="" />
                  </div>
                </div>
                <div className="col-lg-7 col-md-12 order-lg-1 md-mt-5">
                  <h1 className="mb-4 wow bounceInLeft" data-wow-duration="3s" data-wow-delay="2s">
                    <EditableText content={content["header-title"]} onSave={this.onSave("header-title")} />
                  </h1>
                  <div className="lead wow fadeInUp" data-wow-duration="1s" data-wow-delay="1s">
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
            <div className="pattern-3">
              <img className="img-fluid rotateme" src={ pattern03 } alt=""/>
            </div>
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
                <div className="col-lg-4 col-md-6">
                  <FeaturedItem classes="featured-item text-center" content={content["problem-item-1"]} onSave={this.onSave("problem-item-1")} />
                </div>

                <div className="col-lg-4 col-md-6">
                  <FeaturedItem classes="featured-item text-center" content={content["problem-item-2"]} onSave={this.onSave("problem-item-2")} />
                </div>

                <div className="col-lg-4 col-md-6">
                  <FeaturedItem classes="featured-item text-center" content={content["problem-item-3"]} onSave={this.onSave("problem-item-3")} />
                </div>

                <div className="col-lg-4 col-md-6">
                  <FeaturedItem classes="featured-item text-center" content={content["problem-item-4"]} onSave={this.onSave("problem-item-4")} />
                </div>

                <div className="col-lg-4 col-md-6">
                  <FeaturedItem classes="featured-item text-center" content={content["problem-item-5"]} onSave={this.onSave("problem-item-5")} />
                </div>

                <div className="col-lg-4 col-md-6">
                  <FeaturedItem classes="featured-item text-center" content={content["problem-item-6"]} onSave={this.onSave("problem-item-6")} />
                </div>

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
                      uploadImage={this.uploadImage}
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

                <div className="col-lg-4 col-md-12">
                  <FeaturedItem classes="featured-item text-center style-2" content={content["solution-item-1"]} onSave={this.onSave("solution-item-1")} />
                </div>

                <div className="col-lg-4 col-md-12">
                  <FeaturedItem classes="featured-item text-center style-2" content={content["solution-item-2"]} onSave={this.onSave("solution-item-2")} />
                </div>

                <div className="col-lg-4 col-md-12">
                  <FeaturedItem classes="featured-item text-center style-2" content={content["solution-item-3"]} onSave={this.onSave("solution-item-3")} />
                </div>

                <div className="col-lg-4 col-md-12">
                  <FeaturedItem classes="featured-item text-center style-2" content={content["solution-item-4"]} onSave={this.onSave("solution-item-4")} />
                </div>

                <div className="col-lg-4 col-md-12">
                  <FeaturedItem classes="featured-item text-center style-2" content={content["solution-item-5"]} onSave={this.onSave("solution-item-5")} />
                </div>

                <div className="col-lg-4 col-md-12">
                  <FeaturedItem classes="featured-item text-center style-2" content={content["solution-item-6"]} onSave={this.onSave("solution-item-6")} />
                </div>

                <div className="col-lg-4 col-md-12">
                  <FeaturedItem classes="featured-item text-center style-2" content={content["solution-item-7"]} onSave={this.onSave("solution-item-7")} />
                </div>

                <div className="col-lg-4 col-md-12">
                  <FeaturedItem classes="featured-item text-center style-2" content={content["solution-item-8"]} onSave={this.onSave("solution-item-8")} />
                </div>

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

                <div className="col-lg-4 col-md-12">
                  <NewsItem content={content["news-item-1"]} onSave={this.onSave("news-item-1")} uploadImage={this.uploadImage} />
                </div>

                <div className="col-lg-4 col-md-12">
                  <NewsItem content={content["news-item-2"]} onSave={this.onSave("news-item-2")} uploadImage={this.uploadImage} />
                </div>

                <div className="col-lg-4 col-md-12">
                  <NewsItem content={content["news-item-3"]} onSave={this.onSave("news-item-3")} uploadImage={this.uploadImage} />
                </div>

              </div>
            </div>
          </section>
        </div>
      </EditablesContext.Provider>
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


