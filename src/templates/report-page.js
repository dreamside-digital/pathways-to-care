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
import DynamicSection from "../components/editing/DynamicSection";
import headerImage from "../assets/images/ptc-header.png";
import headerPattern from "../assets/images/pattern/home-banner3.png";
import headerBg from "../assets/images/bg/squiggle-dark.svg";
import Carousel from "../components/common/Carousel";
import Publication from "../components/common/Publication";
import EditableEmbeddedVismeReport from "../components/editing/EditableEmbeddedVismeReport"


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
        <Helmet>
          <script src="https://my.visme.co/visme.js"></script>
        </Helmet>
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

        {
          sections.map((section, index) => {
            if (!section || !section.content) {
              return null
            }

            return(
              <DynamicSection
                content={ section.content }
                sectionIndex={index}
                key={index}
                type={ section.type }
                sectionTag={ section.tag }
              />
            )
          })
        }


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
