import React from "react";
import { graphql } from "gatsby";
import { connect } from "react-redux";
import { EditablesContext, theme, EditableText, EditableParagraph } from 'react-easy-editables';
import {
  updatePage,
  loadPageData,
} from "../redux/actions";

import Layout from "../layouts/default.js";
import Editable from "../components/editables/Editable";
import PlainTextEditor from "../components/editingTools/PlainTextEditor";
import RichTextEditor from "../components/editingTools/RichTextEditor";

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
    this.props.onUpdatePageData("home", id, content);
  };

  render() {
    const content = this.props.pageData ? this.props.pageData.content : {};
    const isEditingPage = this.props.isEditingPage;
    console.log(isEditingPage);

    return (
      <Layout>
        <EditablesContext.Provider value={ { showEditingControls: isEditingPage, theme: theme } }>

          <section className="page-title o-hidden text-center grey-bg bg-contain animatedBackground" data-bg-img="images/pattern/05.png">
            <div className="container">
              <div className="row align-items-center">
                <div className="col-md-12">
                  <h1 className="title">Team</h1>
                </div>
              </div>
            </div>
            <div className="page-title-pattern"><img className="img-fluid" src="../assets/images/bg/06.png" alt="" /></div>
          </section>


        <div className="page-content">

        <section className="bg-contain" data-bg-img="images/pattern/02.png">
          <div className="container">
            <div className="row text-center">
              <div className="col-lg-8 col-md-12 ml-auto mr-auto">
                <div className="section-title">
                  <h6>Creative Team</h6>
                  <h2 className="title">Meet Our Expert team member will ready for your service</h2>
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-lg-6 col-md-6">
                <div className="team-member">
                  <div className="team-images">
                    <img className="img-fluid" src="images/team/01.jpg" alt="" />
                  </div>
                  <div className="team-description"> <span>Project Manager</span>
                    <h5><a href="team-single.html">Fatimah Jackson-Best</a></h5>
                    <p>“My hope is that through the Pathways to Care Project we can centre and prioritize the needs of Black children, youth and their families across the province, and come up with solutions that adequately serve to meet their needs.”</p>
                    <div><a href="" className="btn btn-theme">Full bio</a></div>
                  </div>
                </div>
              </div>
              <div className="col-lg-6 col-md-6">
                <div className="team-member">
                  <div className="team-images">
                    <img className="img-fluid" src="images/team/02.jpg" alt="" />
                  </div>
                  <div className="team-description"> <span>Researcher</span>
                    <h5><a href="team-single.html">Tiyondah Fante-Coleman</a></h5>
                    <p>“My hope is that through the Pathways to Care Project we can centre and prioritize the needs of Black children, youth and their families across the province, and come up with solutions that adequately serve to meet their needs.”</p>
                    <div><a href="" className="btn btn-theme">Full bio</a></div>
                  </div>
                </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(TeamPage);

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


