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
                  <h1 className="title">Get involved</h1>
                </div>
              </div>
            </div>
            <div className="page-title-pattern"><img className="img-fluid" src="../assets/images/bg/06.png" alt="" /></div>
          </section>


        <div className="page-content">

        <section className="pos-r bg-contain bg-pos-r" data-bg-img="images/bg/02.png">
          <div className="container">
            <div className="row">
              <div className="col-lg-6 image-column bg-contain bg-pos-l" data-bg-img="images/pattern/07.png">
                <img className="img-fluid" src="images/about/01.png" alt="" />
              </div>
              <div className="col-lg-6 col-md-12 ml-auto md-mt-5 pl-lg-5">
                <div className="section-title">
                  <h2 className="title">Join our mission</h2>
                </div>
                <div className="work-process style-2">
                  <div className="work-process-inner"> <span className="step-num" data-bg-color="#cd113a">1</span>
                    <h4>Partner with us</h4>
                    <p className="mb-0">Fusce enim nulla mollis eu metus in sagittis fringilla lnim nulla</p>
                  </div>
                </div>
                <div className="work-process style-2 mt-5">
                  <div className="work-process-inner"> <span className="step-num" data-bg-color="#cd113a">2</span>
                    <h4>Volunteer</h4>
                    <p className="mb-0">Fusce enim nulla mollis eu metus in sagittis fringilla lnim nulla</p>
                  </div>
                </div>
                <div className="work-process style-2 mt-5">
                  <div className="work-process-inner"> <span className="step-num" data-bg-color="#cd113a">3</span>
                    <h4>Provincial  Community Consultations and Focus Groups</h4>
                    <p className="mb-0">Fusce enim nulla mollis eu metus in sagittis fringilla lnim nulla</p>
                  </div>
                </div>
                <div className="work-process style-2 mt-5">
                  <div className="work-process-inner"> <span className="step-num" data-bg-color="#cd113a">04</span>
                    <h4>Stay Informed</h4>
                    <p className="mb-0">Fusce enim nulla mollis eu metus in sagittis fringilla lnim nulla</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>


        <section className="contact-1 bg-grey" data-bg-img="images/pattern/02.png">
          <div className="container">
          <div className="row align-items-center">
            <div className="col-lg-6 col-md-7">
              <div className="section-title mb-2">
                <h6>Get In Touch</h6>
                <h2>Contact Us</h2>
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
                <li className="mb-4"><i className="flaticon-location"></i><span>Address:</span>
                  <p>423B, Road Wordwide Country, USA</p>
                </li>
                <li className="mb-4"><i className="flaticon-email"></i><span>Email</span><a href="mailto:themeht23@gmail.com"> themeht23@gmail.com</a>
                </li>
                <li className="mb-4"><i className="flaticon-call"></i><span>Phone:</span><a href="tel:+912345678900">+91-234-567-8900</a>
                </li>
                <li><i className="flaticon-user"></i><span>Fax:</span><a href="tel:+912345678900">+91-234-567-8900</a>
                </li>
              </ul>
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

export default connect(mapStateToProps, mapDispatchToProps)(ContactPage);

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


