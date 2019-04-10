import React from "react";
import { graphql } from "gatsby";
import { connect } from "react-redux";
import { EditablesContext, theme, EditableText, EditableParagraph } from 'react-easy-editables';
import {
  updatePage,
  loadPageData,
} from "../redux/actions";

import Layout from "../layouts/default.js";
import Profile from "../components/team/Profile"

import headerPattern from "../assets/images/pattern/secondary-banner.png";
import headerBg from "../assets/images/bg/squiggle.svg";

const PAGE_ID = "team"

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
  };
};

class TeamPage extends React.Component {

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

  render() {
    const content = this.props.pageData ? this.props.pageData.content : {};

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
              <div className="col-lg-6 col-md-6">
                <Profile content={content["team-member-1"]} onSave={this.onSave("team-member-1")} />
              </div>
              <div className="col-lg-6 col-md-6">
                <Profile content={content["team-member-2"]} onSave={this.onSave("team-member-2")} />
              </div>

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


