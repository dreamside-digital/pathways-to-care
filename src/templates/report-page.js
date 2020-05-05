import React from "react";
import { graphql } from "gatsby";
import Helmet from "react-helmet";
import Container from "@material-ui/core/Container"
import { findIndex } from "lodash"

import { connect } from "react-redux";
import {
  EditableImageUpload,
  EditableParagraph,
  EditableText,
  EditableFileUpload,
  EditableEmbeddedIframe
} from "react-easy-editables";
import { uploadImage, uploadFile } from "../firebase/operations";

import {
  updatePageContent,
  pushContentItem,
  removeContentItem,
  loadPageData,
  updateTitle,
  updateHeaderImage,
} from "../redux/actions";

import { DEFAULT_COMPONENT_CONTENT } from "../utils/constants"

import Layout from "../layouts/default.js";
import headerImage from "../assets/images/ptc-header.png";
import headerPattern from "../assets/images/pattern/home-banner3.png";
import headerBg from "../assets/images/bg/squiggle-dark.svg";
import Carousel from "../components/common/Carousel";
import Publication from "../components/common/Publication";


const mapDispatchToProps = dispatch => {
  return {
    onUpdatePageContent: (location, data) => {
      dispatch(updatePageContent(location, data));
    },
    onLoadPageData: data => {
      dispatch(loadPageData(data));
    },
    onUpdateTitle: title => {
      dispatch(updateTitle(title));
    },
    onUpdateHeaderImage: image => {
      dispatch(updateHeaderImage(image));
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


class ReportPage extends React.Component {
  constructor(props) {
    super(props)
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

  onUpdateTitle = content => {
    this.props.onUpdateTitle(content.text)
  }

  onUpdateHeaderImage = content => {
    this.props.onUpdateHeaderImage(content)
  }

  render() {
    const pageData = this.props.pageData ? this.props.pageData : this.props.data.pages;
    const content = this.props.pageData ? this.props.pageData.content : JSON.parse(this.props.data.pages.content);
    const sections = content.sections && content.sections.length > 0 ? content.sections : [{ content: [] }];
    const pageOrder = findIndex(this.props.orderedPages, p => p.id === pageData.id) + 1;
    const nextPage = this.props.pages[pageData.next];

    console.log("related-publications", content["related-publications"])

    return (
      <Layout
        title={pageData["title"]}
        pathname={this.props.location.pathname}
      >
        <section className="page-title o-hidden text-center grey-bg bg-contain animatedBackground" data-bg-img={ headerPattern }>
          <div className="container">
            <div className="row align-items-center">
              <div className="col-md-12">
                <h1 className="title">
                  <EditableText content={content["page-title"]} onSave={this.onSave("page-title")} />
                </h1>
                <nav aria-label="breadcrumb" className="page-breadcrumb">
                  <ol className="breadcrumb">
                    <li className="breadcrumb-item">
                      <EditableText content={content["page-subtitle"]} onSave={this.onSave("page-subtitle")} />
                    </li>
                  </ol>
                </nav>
              </div>
            </div>
          </div>
          <div className="page-title-pattern"><img className="img-fluid" src={ headerBg } alt="" /></div>
        </section>

        <section className="dark-bg pos-r o-hidden" id="report">
          <div className="container">
            <div className="row">
              <div className="col-12">
                <div className="info-img pos-r">
                  <EditableEmbeddedIframe
                    content={content["report-iframe"]}
                    onSave={this.onSave("report-iframe")}
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="grey-bg pos-r o-hidden" id="report-download">
          <div className="container">

            <div className="section-title mb-4">
              <h2 className="title">
                <EditableText content={content["download-title"]} onSave={this.onSave("download-title")} />
              </h2>
              <div className="download-link">
                <EditableFileUpload
                  linkClasses={'btn btn-theme'}
                  content={content["download-pdf"]}
                  onSave={this.onSave("download-pdf")}
                  uploadFile={uploadFile}
                />
              </div>
            </div>

          </div>
        </section>

        <section id="publications">
          <div className="container">
            <div className="row">
              <div className="col-lg-12 col-md-12 ml-auto mr-auto">
                <div className="section-title">
                  <h2 className="title">
                    <EditableText content={content["publications-title"]} onSave={this.onSave("publications-title")} />
                  </h2>
                </div>
              </div>
            </div>

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

          </div>
        </section>


      </Layout>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ReportPage);

export const query = graphql`
  query BasicPageQuery($slug: String!) {
    pages(slug: { eq: $slug }) {
      id
      content
      title
      description
      slug
      template
      next
      category
    }
  }
`;
