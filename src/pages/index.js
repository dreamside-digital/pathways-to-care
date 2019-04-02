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
    const isEditingPage = this.props.isEditingPage;
    console.log(isEditingPage);

    return (
      <Layout>
        <EditablesContext.Provider value={ { showEditingControls: isEditingPage, theme: theme } }>

        <section className="fullscreen-banner p-0 banner o-hidden" data-bg-img="images/pattern/01.png">
          <div className="insideText">Loptus</div>
          <div className="align-center">
            <div className="container">
              <div className="row align-items-center">
                <div className="col-lg-5 col-md-12 order-lg-12">
                  <div className="mouse-parallax">
                    <div className="bnr-img1 wow fadeInRight" data-wow-duration="1s" data-wow-delay="4s">
                      <img className="img-center rotateme" src="images/banner/01.png" alt="" />
                    </div>
                    <img className="img-center bnr-img2 wow zoomIn" data-wow-duration="2s" data-wow-delay="5s" src="images/banner/02.png" alt="" />
                  </div>
                </div>
                <div className="col-lg-7 col-md-12 order-lg-1 md-mt-5">
                  <h1 className="mb-4 wow bounceInLeft" data-wow-duration="3s" data-wow-delay="2s">Looking For Most Powerfull <span className="font-w-5">Digital Marketing</span> Template</h1>
                  <p className="lead wow fadeInUp" data-wow-duration="1s" data-wow-delay="1s">Start working with an company that provide everything you need to generate awareness, drive traffic, connect with customers.</p>
                  <div className="d-flex align-items-center"> <a className="btn btn-theme" href="#"><span>Learn More</span></a>
                    <a className="play-btn popup-youtube ml-4 d-flex align-items-center" href="https://www.youtube.com/watch?v=P_wKDMcr1Tg"><span>Play Now</span><img className="img-fluid pulse radius-4" src="images/play.png" alt="" /></a>
                  </div>
                </div>
              </div>
            </div>
           </div>
        </section>



        <div className="page-content">


        <section className="dark-bg pos-r">
          <div className="container">
            <div className="row">
              <div className="col-lg-12 col-md-12 ml-auto md-mt-5">
                <div className="section-title mb-4">
                  <h6>Featured</h6>
                  <h2 className="title">Join our first Provincial Community Consultation</h2>
                  <p>Black Ontarians face significantly poorer mental health and addictions outcomes and barriers to the appropriate care due to anti-Black racism, and the failure of policy frameworks, and mainstream service providers to address the specific mental health and addictions needs of Black Ontarians.</p>
                </div>
              </div>
            </div>

          </div>
        </section>





        <section className="grey-bg pos-r">
          <div className="pattern-3">
            <img className="img-fluid rotateme" src="images/pattern/03.png" alt=""/>
          </div>
          <div className="container">
            <div className="row">
              <div className="col-lg-12 col-md-12 ml-auto mr-auto">
                <div className="section-title">
                  <h6>The Problem</h6>
                  <h2 className="title">Black Ontarians face significantly poorer mental health and addictions outcomes.</h2>
                </div>
                <p>Black Ontarians face significantly poorer mental health and addictions outcomes and barriers to the appropriate care due to anti-Black racism, and the failure of policy frameworks, and mainstream service providers to address the specific mental health and addictions needs of Black Ontarians.</p>
              </div>
            </div>
            <div className="row">
              <div className="col-lg-4 col-md-6">
                <div className="featured-item text-center">
                  <div className="featured-icon">
                    <img className="img-center" src="images/feature/04.png" alt=""/>
                  </div>
                  <div className="featured-title">
                    <h5>Digital Marketing</h5>
                  </div>
                  <div className="featured-desc">
                    <p>Design must be functional, and futionality must translated into, and futionality must translated into.</p>
                  </div>
                </div>
              </div>
              <div className="col-lg-4 col-md-6 sm-mt-5">
                <div className="featured-item text-center">
                  <div className="featured-icon">
                    <img className="img-center" src="images/feature/05.png" alt=""/>
                  </div>
                  <div className="featured-title">
                    <h5>Content marketing</h5>
                  </div>
                  <div className="featured-desc">
                    <p>Design must be functional, and futionality must translated into, and futionality must translated into.</p>
                  </div>
                </div>
              </div>
              <div className="col-lg-4 col-md-6 md-mt-3">
                <div className="featured-item text-center">
                  <div className="featured-icon">
                    <img className="img-center" src="images/feature/06.png" alt=""/>
                  </div>
                  <div className="featured-title">
                    <h5>Market analysis</h5>
                  </div>
                  <div className="featured-desc">
                    <p>Design must be functional, and futionality must translated into, and futionality must translated into.</p>
                  </div>
                </div>
              </div>
              <div className="col-lg-4 col-md-6 mt-3">
                <div className="featured-item text-center">
                  <div className="featured-icon">
                    <img className="img-center" src="images/feature/07.png" alt=""/>
                  </div>
                  <div className="featured-title">
                    <h5>Email Marketing</h5>
                  </div>
                  <div className="featured-desc">
                    <p>Design must be functional, and futionality must translated into, and futionality must translated into.</p>
                  </div>
                </div>
              </div>
              <div className="col-lg-4 col-md-6 mt-3">
                <div className="featured-item text-center">
                  <div className="featured-icon">
                    <img className="img-center" src="images/feature/08.png" alt=""/>
                  </div>
                  <div className="featured-title">
                    <h5>Link Building</h5>
                  </div>
                  <div className="featured-desc">
                    <p>Design must be functional, and futionality must translated into, and futionality must translated into.</p>
                  </div>
                </div>
              </div>
              <div className="col-lg-4 col-md-6 mt-3">
                <div className="featured-item text-center">
                  <div className="featured-icon">
                    <img className="img-center" src="images/feature/09.png" alt=""/>
                  </div>
                  <div className="featured-title">
                    <h5>Quick Support</h5>
                  </div>
                  <div className="featured-desc">
                    <p>Design must be functional, and futionality must translated into, and futionality must translated into.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>



        <section className="pos-r">
          <div className="container">
            <div className="row">
              <div className="col-lg-12 col-md-12 ml-auto md-mt-5">
                <div className="section-title mb-4">
                  <h6>The Solution</h6>
                  <h2 className="title">Substantial systems change is needed</h2>
                </div>
              </div>
            </div>

            <div className="row align-items-center">
              <div className="col-lg-6 col-md-12 md-mt-5">
                <p>Substantial systems change is needed to build a mental health and addictions sector that provides timely access to culturally safe services to Black Ontarians. Targeted service improvement for racialized populations leads to better outcomes and lower overall service expenditure (Mental Health Commission of Canada, 2016). Governments, service providers, and Black communities must work together to improve access to mental health and addictions services that meet the specific needs of Black Ontarians.</p>
              </div>

              <div className="col-lg-6 col-md-12">
                <div className="info-img pos-r">
                  <img className="img-fluid topBottom" src="images/about/02.png" alt=""/>
                </div>
              </div>
            </div>

            <div class="row">
              <div class="col-lg-4 col-md-12">
                <div class="featured-item text-center style-2">
                  <div class="featured-icon">
                    <img class="img-center" src="images/feature/01.png" alt="" />
                  </div>
                  <div class="featured-title">
                    <h5>Online Marketing</h5>
                  </div>
                  <div class="featured-desc">
                    <p>Design must be functional, and futionality must translated into, and futionality must translated into.</p>
                  </div>
                </div>
              </div>
              <div class="col-lg-4 col-md-12 md-mt-5">
                <div class="featured-item text-center style-2">
                  <div class="featured-icon">
                    <img class="img-center" src="images/feature/02.png" alt="" />
                  </div>
                  <div class="featured-title">
                    <h5>Data Analysis</h5>
                  </div>
                  <div class="featured-desc">
                    <p>Design must be functional, and futionality must translated into, and futionality must translated into.</p>
                  </div>
                </div>
              </div>
              <div class="col-lg-4 col-md-12 md-mt-5">
                <div class="featured-item text-center style-2">
                  <div class="featured-icon">
                    <img class="img-center" src="images/feature/03.png" alt="" />
                  </div>
                  <div class="featured-title">
                    <h5>SEO Optimization</h5>
                  </div>
                  <div class="featured-desc">
                    <p>Design must be functional, and futionality must translated into, and futionality must translated into.</p>
                  </div>
                </div>
              </div>

              <div class="col-lg-4 col-md-12 md-mt-5">
                <div class="featured-item text-center style-2">
                  <div class="featured-icon">
                    <img class="img-center" src="images/feature/03.png" alt="" />
                  </div>
                  <div class="featured-title">
                    <h5>SEO Optimization</h5>
                  </div>
                  <div class="featured-desc">
                    <p>Design must be functional, and futionality must translated into, and futionality must translated into.</p>
                  </div>
                </div>
              </div>

              <div class="col-lg-4 col-md-12 md-mt-5">
                <div class="featured-item text-center style-2">
                  <div class="featured-icon">
                    <img class="img-center" src="images/feature/03.png" alt="" />
                  </div>
                  <div class="featured-title">
                    <h5>SEO Optimization</h5>
                  </div>
                  <div class="featured-desc">
                    <p>Design must be functional, and futionality must translated into, and futionality must translated into.</p>
                  </div>
                </div>
              </div>

              <div class="col-lg-4 col-md-12 md-mt-5">
                <div class="featured-item text-center style-2">
                  <div class="featured-icon">
                    <img class="img-center" src="images/feature/03.png" alt="" />
                  </div>
                  <div class="featured-title">
                    <h5>SEO Optimization</h5>
                  </div>
                  <div class="featured-desc">
                    <p>Design must be functional, and futionality must translated into, and futionality must translated into.</p>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </section>




        <section className="grey-bg" data-bg-img="images/bg/02.png">
          <div className="container">
            <div className="row">
              <div className="col-lg-12 col-md-12 ml-auto mr-auto">
                <div className="section-title">
                  <h2 className="title">Latest News and Publications</h2>
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-lg-4 col-md-12">
                <div className="post">
                  <div className="post-image">
                    <img className="img-fluid h-100 w-100" src="images/blog/01.jpg" alt=""/>
                  </div>
                  <div className="post-desc">
                    <div className="post-date">23 <span>November 2018</span>
                    </div>
                    <div className="post-title">
                      <h5><a href="blog-details.html">The Powerfull look for best in 2018</a></h5>
                    </div>
                    <p>Phasellus eget purus id felis dignissim convallis Suspendisse et augue dui gravida</p>
                  </div>
                </div>
              </div>

              <div className="col-lg-4 col-md-12">
                <div className="post">
                  <div className="post-image">
                    <img className="img-fluid h-100 w-100" src="images/blog/01.jpg" alt=""/>
                  </div>
                  <div className="post-desc">
                    <div className="post-date">23 <span>November 2018</span>
                    </div>
                    <div className="post-title">
                      <h5><a href="blog-details.html">The Powerfull look for best in 2018</a></h5>
                    </div>
                    <p>Phasellus eget purus id felis dignissim convallis Suspendisse et augue dui gravida</p>
                  </div>
                </div>
              </div>

              <div className="col-lg-4 col-md-12">
                <div className="post">
                  <div className="post-image">
                    <img className="img-fluid h-100 w-100" src="images/blog/01.jpg" alt=""/>
                  </div>
                  <div className="post-desc">
                    <div className="post-date">23 <span>November 2018</span>
                    </div>
                    <div className="post-title">
                      <h5><a href="blog-details.html">The Powerfull look for best in 2018</a></h5>
                    </div>
                    <p>Phasellus eget purus id felis dignissim convallis Suspendisse et augue dui gravida</p>
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


