import React from "react";
import { graphql, Link } from "gatsby";
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
  EditableFileUpload,
  EditableLink,
} from 'react-easy-editables';

import { uploadImage, uploadFile } from "../firebase/operations";

import Layout from "../layouts/default.js";
import Publication from "../components/common/Publication";
import Carousel from "../components/common/Carousel";
import Collection from "../components/common/Collection";

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

const ResearchGoal = props => {
  const content = props.content || {};

  const handleSave = field => newContent => {
    props.onSave({ [field]: newContent })
  }
  return(
    <div className="work-process style-2 mb-1">
      <div className="work-process-inner">
        <span className="step-num">{ props.index + 1 }</span>
        <h6>
          <EditableText
            classes="mb-0"
            content={content["description"]}
            onSave={handleSave("description")}
            onDelete={props.onDelete}
          />
        </h6>
      </div>
    </div>
  )
}

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

  render() {
    const content = this.props.pageData ? this.props.pageData.content : {};
    const researchGoals = content["research-goals-items"] || {};

    return (
      <Layout
        title={content["page-title"] ? content["page-title"]["text"] : "Research"}
        pathname={this.props.location.pathname}
        image={content["goals-image"] ? content["goals-image"]["imageSrc"] : null }
      >

          <section className="page-title o-hidden text-center grey-bg bg-contain animatedBackground" data-bg-img={ headerPattern }>
            <div className="container">
              <div className="row">
                <div className="col-md-12">
                  <h1 className="title">
                    <EditableText content={content["page-title"]} onSave={this.onSave("page-title")} />
                  </h1>
                  <nav aria-label="breadcrumb" className="page-breadcrumb">
                    <ol className="breadcrumb">
                      <li className="breadcrumb-item">
                        <Link to="#research-goals">Research Goals</Link>
                      </li>
                      <li className="breadcrumb-item">
                        <Link to="#theory-of-change">Theory of Change</Link>
                      </li>
                      <li className="breadcrumb-item">
                        <Link to="#scoping-review">Scoping Review</Link>
                      </li>
                    </ol>
                  </nav>
                </div>
              </div>
            </div>
            <div className="page-title-pattern"><img className="img-fluid" src={ headerBg } alt="" /></div>
          </section>


        <div className="page-content">

          <section className="pos-r o-hidden" id="research-goals">
            <div className="container">
              <div className="section-title mb-4">
                <h2 className="title">
                  <EditableText content={content["goals-title"]} onSave={this.onSave("goals-title")} />
                </h2>
                <EditableParagraph content={content["goals-description"]} onSave={this.onSave("goals-description")} />
              </div>

              <div className="row">
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

                <div className="col-lg-6 col-md-12 md-mt-5">
                  <Collection
                    items={content["research-goals"]}
                    Component={ResearchGoal}
                    onSave={this.onSave('research-goals')}
                    onAddItem={this.onAddItem('research-goals')}
                    onDeleteItem={this.onDeleteItem('research-goals')}
                    isEditingPage={this.props.isEditingPage}
                    defaultContent={DEFAULT_COMPONENT_CONTENT['research-goals']}
                  />
                </div>
              </div>
            </div>
          </section>


          <section className="grey-bg" data-bg-img={ background02 } id="theory-of-change">
            <div className="container">
              <div className="section-title mb-4">
                <h2 className="title">
                  <EditableText content={content["toc-title"]} onSave={this.onSave("toc-title")} />
                </h2>
              </div>

              <div className="row">

                <div className="col-md-4">
                  <div className={`post`}>
                    <div className="post-image">
                      <EditableImageUpload
                        classes={"img-fluid"}
                        content={content["toc-image"]}
                        onSave={this.onSave("toc-image")}
                        uploadImage={uploadImage}
                      />
                    </div>
                    <div className="post-desc">
                      <div className="post-title">
                        <h4 className="text-theme mb-3">
                          <EditableText content={content["toc-title"]} onSave={this.onSave("toc-title")} />
                        </h4>
                      </div>
                      <EditableParagraph classes="mb-3" content={content["toc-summary"]} onSave={this.onSave("toc-summary")} />

                      <div className="action-link">
                        <EditableFileUpload
                          content={content["toc-pdf"]}
                          onSave={this.onSave("toc-pdf")}
                          uploadFile={uploadFile}
                          linkClasses="btn btn-theme"
                          linkText="Download the PDF"
                        />
                      </div>
                    </div>
                  </div>
                </div>

                <div className="col-md-8 md-mt-5">
                  <EditableParagraph content={content["toc-description"]} onSave={this.onSave("toc-description")} />
                </div>
              </div>

            </div>
          </section>

          <section className="" id="scoping-review">
            <div className="container">
              <div className="section-title mb-4">
                <h2 className="title">
                  <EditableText content={content["scoping-review-title"]} onSave={this.onSave("scoping-review-title")} />
                </h2>
              </div>

              <div className="row">

                <div className="col-md-4">
                  <div className={`post`}>
                    <div className="post-image">
                      <EditableImageUpload
                        classes={"img-fluid"}
                        content={content["scoping-review-image"]}
                        onSave={this.onSave("scoping-review-image")}
                        uploadImage={uploadImage}
                      />
                    </div>
                    <div className="post-desc">
                      <div className="post-title">
                        <h4 className="text-theme mb-3">
                          <EditableText content={content["scoping-review-doc-title"]} onSave={this.onSave("scoping-review-doc-title")} />
                        </h4>
                      </div>
                      <EditableParagraph classes="mb-3" content={content["scoping-review-summary"]} onSave={this.onSave("scoping-review-summary")} />

                      <div className="action-link">
                        <EditableFileUpload
                          content={content["scoping-review-pdf"]}
                          onSave={this.onSave("scoping-review-pdf")}
                          uploadFile={uploadFile}
                          linkClasses="btn btn-theme"
                          linkText="Download the PDF"
                        />
                      </div>
                    </div>
                  </div>
                </div>

                <div className="col-md-8 md-mt-5">
                  <EditableParagraph content={content["scoping-review-description"]} onSave={this.onSave("scoping-review-description")} />
                </div>
              </div>

            </div>
          </section>

          {/*
          <section id="publications">
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
          */}


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


