import React, { Fragment } from "react";
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

import { uploadImage } from "../firebase/operations";


import Layout from "../layouts/default.js";
import Ask from "../components/contact/Ask";

import headerImage from "../assets/images/ptc-graphic.png"
import headerPattern  from "../assets/images/pattern/secondary-banner.png";
import pattern07 from "../assets/images/pattern/07.png"
import bg02 from "../assets/images/bg/02.png"
import headerBg from "../assets/images/bg/06.png";

const PAGE_ID = "contact"

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

class ContactPage extends React.Component {

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
    const asks = content["asks"] || [];

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

          <section className="pos-r bg-contain bg-pos-r" data-bg-img={ bg02 }>
            <div className="container">
              <div className="row">
                <div className="col-lg-6 image-column bg-contain bg-pos-l" data-bg-img={ pattern07 }>
                <EditableImageUpload
                    classes="img-fluid"
                    content={content["header-image"]}
                    onSave={this.onSave("header-image")}
                    uploadImage={uploadImage}
                  />
                </div>
                <div className="col-lg-6 col-md-12 ml-auto md-mt-5 pl-lg-5">
                  <div className="section-title">
                    <h2 className="title">
                      <EditableText content={content["get-involved-title"]} onSave={this.onSave("get-involved-title")} />
                    </h2>
                  </div>
                  {
                    asks.map((content, index) => (
                      <Fragment key={`ask-${index}`}>
                        <Ask
                          content={content}
                          index={index}
                          onSave={this.editListItem("asks", index)}
                        />
                        { this.props.isEditingPage &&
                          <div className="row justify-content-end">
                            <Button onClick={this.deleteListItem("asks", index)}>Delete</Button>
                          </div>
                        }
                      </Fragment>
                    ))
                  }
                  {
                    this.props.isEditingPage &&
                    <div className="row justify-content-end">
                      <Button onClick={this.addListItem("asks")}>Add list item</Button>
                    </div>
                  }
                </div>
              </div>
            </div>
          </section>


          <section className="contact-1 bg-grey" data-bg-img="images/pattern/02.png">
            <div className="container">
              <div className="row align-items-center">
                <div className="col-lg-6 col-md-7">
                  <div className="section-title mb-2">
                    <h6>
                      <EditableText content={content["contact-form-tag"]} onSave={this.onSave("contact-form-tag")} />
                    </h6>
                    <h2>
                      <EditableText content={content["contact-form-heading"]} onSave={this.onSave("contact-form-heading")} />
                    </h2>
                  </div>
                  <div className="contact-main">
                    <form id="contact-form" className="row" method="post" action="php/contact.php">
                      <div className="messages"></div>
                      <div className="form-group col-md-6">
                        <input id="form_name" type="text" name="name" className="form-control" placeholder="Name" required="required" data-error="Name is required." />
                        <div className="help-block with-errors"></div>
                      </div>
                      <div className="form-group col-md-6">
                        <input id="form_email" type="email" name="email" className="form-control" placeholder="Email" required="required" data-error="Valid email is required." />
                        <div className="help-block with-errors"></div>
                      </div>
                      <div className="form-group col-md-12">
                        <input id="form_phone" type="tel" name="phone" className="form-control" placeholder="Phone" required="required" data-error="Phone is required" />
                        <div className="help-block with-errors"></div>
                      </div>
                      <div className="form-group col-md-12">
                        <textarea id="form_message" name="message" className="form-control" placeholder="Message" rows="4" required="required" data-error="Please,leave us a message."></textarea>
                        <div className="help-block with-errors"></div>
                      </div>
                      <div className="col-md-12">
                      <button className="btn btn-theme btn-radius"><span>Send Message</span>
                      </button>
                      </div>
                    </form>
                  </div>
                </div>
                <div className="col-lg-5 col-md-5 ml-auto sm-mt-5">
                  <ul className="contact-info list-unstyled">
                    <li className="mb-4">
                      <i className="flaticon-location"></i>
                      <EditableText content={content["address-label"]} onSave={this.onSave("address-label")} />
                      <EditableParagraph content={content["address"]} onSave={this.onSave("address")} />
                    </li>
                    <li className="mb-4">
                      <i className="flaticon-email"></i>
                      <span><EditableText content={content["email-label"]} onSave={this.onSave("email-label")} /></span>
                      <EditableLink content={content["email"]} onSave={this.onSave("email")} />
                    </li>
                    <li className="mb-4">
                      <i className="flaticon-call"></i>
                      <EditableText content={content["phone-label"]} onSave={this.onSave("phone-label")} />
                      <EditableParagraph content={content["phone"]} onSave={this.onSave("phone")} />
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </section>

        </div>

      </Layout>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ContactPage);

export const query = graphql`
  query {
    pages(id: { eq: "contact" }) {
      id
      content
      title
      slug
    }
  }
`;


