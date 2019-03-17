import React from "react";
import { graphql } from "gatsby";
import { connect } from "react-redux";
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
    pageData: state.page.data
  };
};

class HomePage extends React.Component {

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

    return (
      <Layout>

        <section className="no-padding">
          <Editable
            editor={PlainTextEditor}
            content={content["demo-title"]}
            handleSave={this.onSave("demo-title")}
          >
            {content["demo-title"]
              ? content["demo-title"]["text"]
              : "Title"}
          </Editable>
        </section>

        <section id="about" className="wow fadeIn">
          <Editable
            editor={RichTextEditor}
            content={content["demo-description"]}
            handleSave={this.onSave("demo-description")}
          >
            <div
              className="text-extra-large black-text"
              dangerouslySetInnerHTML={{
                __html: content["demo-description"]
                  ? content["demo-description"]["text"]
                  : "Description"
              }}
            />
          </Editable>
        </section>

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


