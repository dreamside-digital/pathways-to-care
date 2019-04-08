import React from "react";
import { graphql } from "gatsby";
import { connect } from "react-redux";
import Button from "@material-ui/core/Button"

import { DEFAULT_COMPONENT_CONTENT } from "../utils/constants"

import {
  updatePage,
  loadPageData,
} from "../redux/actions";

import {
  EditableText,
  EditableParagraph,
  EditableImageUpload,
  EditableLink,
} from 'react-easy-editables';

import Layout from "../layouts/default.js";
import NewsItem from "../components/home/NewsItem";

import headerImage  from "../assets/images/pattern/05.png";
import headerBg from "../assets/images/bg/06.png";
import pattern03 from "../assets/images/pattern/03.png";
import background02 from "../assets/images/bg/02.png";

const PAGE_ID = "research"


const mapDispatchToProps = dispatch => {
  return {
    onUpdatePageData: (page, id, data) => {
      dispatch(updatePage(page, id, data));
    },
    onLoadPageData: data => {
      dispatch(loadPageData(data));
    },
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
    const relatedPublications = content["related-publications"] ? content["related-publications"] : [];

    return (
      <Layout>

          <section className="page-title o-hidden text-center grey-bg bg-contain animatedBackground" data-bg-img={ headerImage }>
            <div className="container">
              <div className="row align-items-center">
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
            <div className="pattern-3">
              <img className="img-fluid rotateme" src={ pattern03 } alt="" />
            </div>
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
                    <EditableImageUpload classes={"img-fluid"} content={content["goals-image"]} onSave={this.onSave("goals-image")} />
                  </div>
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

              {
                relatedPublications.map((content, index) => {
                  return (
                    <div className="col-lg-4 col-md-12" key={`related-publication-${index}`}>
                      <NewsItem
                        content={content["news-item-1"]}
                        onSave={this.editListItem("related-publications", index)}
                      />
                      { this.props.isEditingPage &&
                        <div className="justify-content-start">
                          <Button onClick={this.deleteListItem("related-publications", index)}>Delete</Button>
                        </div>
                      }
                    </div>
                  )
                })

              }
              {
                this.props.isEditingPage &&
                <div className="col-lg-12">
                  <Button onClick={this.addListItem("related-publications")}>Add list item</Button>
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


