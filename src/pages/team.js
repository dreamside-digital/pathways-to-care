import React from "react";
import { graphql, Link } from "gatsby";
import { connect } from "react-redux";
import Button from "@material-ui/core/Button"
import {
  EditablesContext,
  theme,
  EditableText,
  EditableParagraph,
  EditableImageUpload
} from 'react-easy-editables';
import {
  updatePageContent,
  pushContentItem,
  removeContentItem,
  loadPageData,
} from "../redux/actions";

import { uploadImage } from "../firebase/operations";

import { DEFAULT_COMPONENT_CONTENT } from "../utils/constants"

import Layout from "../layouts/default.js";
import Profile from "../components/team/Profile"
import Collection from "../components/common/Collection"

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

const Logo = props => {
  const content = props.content || {};

  const handleSave = field => newContent => {
    props.onSave({ [field]: newContent })
  }

  return(
    <div className="col-lg-2 col-md-2 col-sm-6 xs-mt-5">
      <EditableImageUpload
        classes="img-center"
        content={content["logo"]}
        onSave={handleSave("logo")}
        onDelete={props.onDelete}
        uploadImage={uploadImage}
      />
    </div>
  )
}

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
    const teamMembers = content["team-members"] ? content["team-members"] : {};

    return (
      <Layout
        title={content["page-title"] ? content["page-title"]["text"] : "Team"}
        description={pageData["description"]}
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
                        <Link to="/team#team-members">Team</Link>
                      </li>
                      <li className="breadcrumb-item">
                        <Link to="/team#partners">Core Stakeholders</Link>
                      </li>
                    </ol>
                  </nav>
                </div>
              </div>
            </div>
            <div className="page-title-pattern"><img className="img-fluid" src={ headerBg } alt="" /></div>
          </section>


        <div className="page-content">

          <section className="bg-contain" data-bg-img="images/pattern/02.png" id="team-members">
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
                      <div className="col-12" key={`team-member-${key}`}>
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

          <section className="pos-r grey-bg" id="partners">
            <div className="container">
              <div className="row">
                <div className="col-lg-12">
                  <div className="section-title mb-0 text-center">
                    <h2 className="title">
                      <EditableText content={content["stakeholders-title"]} onSave={this.onSave("stakeholders-title")} />
                    </h2>
                  </div>
                </div>
              </div>

              <Collection
                classes="row justify-center"
                items={content["core-stakeholders"]}
                Component={Logo}
                onSave={this.onSave('core-stakeholders')}
                onAddItem={this.onAddItem('core-stakeholders')}
                onDeleteItem={this.onDeleteItem('core-stakeholders')}
                isEditingPage={this.props.isEditingPage}
                defaultContent={{ "logo": { "caption": "", "title": "", imageSrc: "https://www.nomadiclabs.ca/img/logo-03.png" } }}
              />

              <div className="row mt-4">
                <div className="col-12 mt-4 mb-4">
                  <EditableParagraph content={content["partners-description"]} onSave={this.onSave("partners-description")} />
                </div>
              </div>

              <div className="row mt-5">
                <div className="col-lg-12">
                  <div className="section-title mb-0 text-center">
                    <h2 className="title">
                      <EditableText content={content["toronto-partners-title"]} onSave={this.onSave("toronto-partners-title")} />
                    </h2>
                  </div>
                </div>
              </div>

              <Collection
                classes="row justify-center"
                items={content["toronto-partners"]}
                Component={Logo}
                onSave={this.onSave('toronto-partners')}
                onAddItem={this.onAddItem('toronto-partners')}
                onDeleteItem={this.onDeleteItem('toronto-partners')}
                isEditingPage={this.props.isEditingPage}
                defaultContent={{ "logo": { "caption": "", "title": "", imageSrc: "https://www.nomadiclabs.ca/img/logo-03.png" } }}
              />

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
      description
      slug
    }
  }
`;


