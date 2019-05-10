import React from "react";
import { graphql } from "gatsby";
import { connect } from "react-redux";
import Button from "@material-ui/core/Button"
import { EditablesContext, theme, EditableText, EditableParagraph } from 'react-easy-editables';
import {
  updatePageContent,
  pushContentItem,
  removeContentItem,
  loadPageData,
} from "../redux/actions";

import { DEFAULT_COMPONENT_CONTENT } from "../utils/constants"

import Layout from "../layouts/default.js";
import Profile from "../components/team/Profile"

import headerPattern from "../assets/images/pattern/secondary-banner.png";
import headerBg from "../assets/images/bg/squiggle.svg";


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

class TeamPage extends React.Component {

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
    const teamMembers = content["team-members"] ? content["team-members"] : {};

    return (
      <Layout>
          <section className="page-title o-hidden text-center grey-bg bg-contain animatedBackground" data-bg-img={ headerPattern }>
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

        <section className="bg-contain" data-bg-img="images/pattern/02.png">
          <div className="container">
            <div className="row text-center">
              <div className="col-lg-8 col-md-12 ml-auto mr-auto">
                <div className="section-title">
                  <h2 className="title">
                    <EditableText content={content["team-section-title"]} onSave={this.onSave("team-section-title")} />
                  </h2>
                </div>
              </div>
            </div>
            <div className="row">
              {
                Object.keys(teamMembers).map(key => {
                  const content = teamMembers[key];

                  return (
                    <div className="col-lg-6 col-md-6" key={`team-member-${key}`}>
                      <Profile content={content} onSave={this.editListItem("team-members", key)} />
                      { this.props.isEditingPage &&
                        <Button onClick={this.deleteListItem("team-members", key)}>Delete</Button>
                      }
                    </div>
                  )
                })
              }
              {
                this.props.isEditingPage &&
                <div className="col-lg-12">
                  <Button onClick={this.addListItem("team-members")}>Add item</Button>
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

export default connect(mapStateToProps, mapDispatchToProps)(TeamPage);

export const query = graphql`
  query {
    pages(id: { eq: "team" }) {
      id
      content
      title
      slug
    }
  }
`;


