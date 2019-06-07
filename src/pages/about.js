import React, { Fragment } from "react";
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
  EditableLink,
} from 'react-easy-editables';

import { uploadImage } from "../firebase/operations";

import Layout from "../layouts/default.js";
import FeaturedItemWithTitle from "../components/home/FeaturedItemWithTitle";
import FeaturedItem from "../components/home/FeaturedItem";
import Collection from "../components/common/Collection";

import headerPattern  from "../assets/images/pattern/secondary-banner.png";
import headerBg from "../assets/images/bg/squiggle.svg";

import firebase from "../firebase/init";


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

const MissionItem = props => {
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


class AboutPage extends React.Component {

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
    const content = this.props.pageData ? this.props.pageData.content : {};
    const values = content["values-items"] || {};
    const problemItems = content["problem-items"] ? content["problem-items"] : {};
    const solutionItems = content["solution-items"] ? content["solution-items"] : {};

    return (
      <Layout>
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
                      <Link to="#story">Our Story</Link>
                    </li>
                    <li className="breadcrumb-item">
                      <Link to="#mission">Our Mission</Link>
                    </li>
                    <li className="breadcrumb-item">
                      <Link to="#values">Our Values</Link>
                    </li>
                    <li className="breadcrumb-item">
                      <Link to="#approach">Our Approach</Link>
                    </li>
                    <li className="breadcrumb-item">
                      <Link to="#roadmap">Project Roadmap</Link>
                    </li>
                  </ol>
                </nav>
              </div>
            </div>
          </div>
          <div className="page-title-pattern"><img className="img-fluid" src={ headerBg } alt="" /></div>
        </section>


        <div className="page-content">

          <section className="pos-r o-hidden" id="story">
            <div className="container">
              <div className="section-title mb-4">
                <h2 className="title">
                  <EditableText content={content["story-title"]} onSave={this.onSave("story-title")} />
                </h2>
              </div>
              <div className="row">
                <div className="col-lg-6 col-md-12">
                  <EditableParagraph content={content["story-description"]} onSave={this.onSave("story-description")} />
                </div>

                <div className="col-lg-6 col-md-12">
                  <div className="info-img pos-r">
                    <EditableImageUpload
                      classes={"img-fluid"}
                      content={content["story-image"]}
                      onSave={this.onSave("story-image")}
                      uploadImage={uploadImage}
                    />
                  </div>
                </div>
              </div>
            </div>
          </section>

          <section className="grey-bg pos-r o-hidden" id="mission">
            <div className="container">
              <div className="section-title mb-4">
                <h2 className="title">
                  <EditableText content={content["mission-title"]} onSave={this.onSave("mission-title")} />
                </h2>
              </div>

              <div className="row">
                <div className="col-lg-6 col-md-12 md-mt-5">
                  <EditableParagraph content={content["mission-description"]} onSave={this.onSave("mission-description")} />
                  <Collection
                    items={content["mission-items"]}
                    Component={MissionItem}
                    onSave={this.onSave('mission-items')}
                    onAddItem={this.onAddItem('mission-items')}
                    onDeleteItem={this.onDeleteItem('mission-items')}
                    isEditingPage={this.props.isEditingPage}
                    defaultContent={DEFAULT_COMPONENT_CONTENT['mission-items']}
                  />
                </div>

                <div className="col-lg-6 col-md-12">
                  <div className="info-img pos-r">
                    <EditableImageUpload
                      classes={"img-fluid"}
                      content={content["mission-image"]}
                      onSave={this.onSave("mission-image")}
                      uploadImage={uploadImage}
                    />
                  </div>
                </div>
              </div>
            </div>
          </section>


          <section className="pos-r o-hidden" id="values">
            <div className="container">
              <div className="section-title mb-4">
                <h2 className="title">
                  <EditableText content={content["vision-title"]} onSave={this.onSave("vision-title")} />
                </h2>
                <EditableParagraph content={content["vision-description"]} onSave={this.onSave("vision-description")} />
              </div>

              <div className="row">
                <div className="col-lg-6 col-md-12">
                  <div className="info-img pos-r">
                    <EditableImageUpload
                      classes={"img-fluid"}
                      content={content["vision-image"]}
                      onSave={this.onSave("vision-image")}
                      uploadImage={uploadImage}
                    />
                  </div>
                </div>

                <div className="col-lg-6 col-md-12 md-mt-5">
                  {
                    Object.keys(values).map((key, index) => {
                      const content = values[key];
                      const number = index + 1;
                      const onSaveValue = this.editListItem("values-items", key);

                      return (
                        <div className="row" key={`values-${index}`}>
                          <div className="col-12">
                            <div className="work-process style-2 mb-1">
                              <div className="work-process-inner">
                                <span className="step-num">{ number }</span>
                                <h6>
                                  <EditableText
                                    classes="mb-0"
                                    content={content["description"]}
                                    onSave={onSaveValue("description")}
                                  />
                                </h6>
                              </div>
                            </div>
                            { this.props.isEditingPage &&
                              <div className="row justify-content-end">
                                <Button onClick={this.deleteListItem("values-items", index)}>Delete</Button>
                              </div>
                            }
                          </div>
                        </div>
                      )
                    })
                  }
                  {
                    this.props.isEditingPage &&
                    <div className="">
                      <Button onClick={this.addListItem("values-items")}>Add item</Button>
                    </div>
                  }
                </div>
              </div>
            </div>
          </section>

          <section className="pos-r grey-bg" id="approach">
            <div className="container">
              <div className="row">
                <div className="col-12">
                  <div className="section-title">
                    <h2 className="title">
                      <EditableText content={content["solution-title"]} onSave={this.onSave("solution-title")} />
                    </h2>
                  </div>
                </div>
              </div>

              <div className="row">
                <div className="col-12">
                  <EditableParagraph content={content["solution-summary"]} onSave={this.onSave("solution-summary")} />
                </div>
              </div>

              <div className="row">
                <div className="col-lg-4 col-md-12">
                  <h2 className="text-center p-4 my-3">
                    <EditableText content={content["solution-items-header"]} onSave={this.onSave("solution-items-header")} />
                  </h2>
                </div>

                {
                  Object.keys(solutionItems).map((key, index) => {
                    const content = solutionItems[key];

                    return (
                      <div className="col-lg-4 col-md-6" key={`solution-item-${key}`}>
                        <FeaturedItem
                          index={index}
                          classes="featured-item text-center style-1 pos-relative"
                          content={content}
                          onSave={this.editListItem("solution-items", key)}
                        />
                        { this.props.isEditingPage &&
                          <div className="row">
                            <Button onClick={this.deleteListItem("solution-items", key)}>Delete</Button>
                          </div>
                        }
                      </div>
                    )
                  })
                }
                {
                  this.props.isEditingPage &&
                  <div className="col-lg-4 col-md-6 row align-items-center">
                    <Button onClick={this.addListItem("solution-items")}>Add list item</Button>
                  </div>
                }

              </div>
            </div>
          </section>



          <section className="animatedBackground" data-bg-img="images/pattern/05.png" id="roadmap">
            <div className="container">
              <div className="row">
                <div className="col-sm-12">
                  <div className="section-title mb-4">
                    <h2 className="title">
                      <EditableText content={content["roadmap-title"]} onSave={this.onSave("roadmap-title")} />
                    </h2>
                  </div>
                  <div className="tab style-2 ">
                    <nav>
                      <div className="nav nav-tabs" id="nav-tab" role="tablist"> <a className="nav-item nav-link active" id="nav-tab1" data-toggle="tab" href="#tab1-1" role="tab" aria-selected="true">Year 1</a>
                        <a className="nav-item nav-link" id="nav-tab2" data-toggle="tab" href="#tab1-2" role="tab" aria-selected="false">Year 2</a>
                        <a className="nav-item nav-link" id="nav-tab3" data-toggle="tab" href="#tab1-3" role="tab" aria-selected="false">Year 3</a>
                        <a className="nav-item nav-link" id="nav-tab4" data-toggle="tab" href="#tab1-4" role="tab" aria-selected="false">Year 4 and beyond</a>
                      </div>
                    </nav>
                    <div className="tab-content" id="nav-tabContent">
                      <div role="tabpanel" className="tab-pane fade show active" id="tab1-1">
                        <div className="row align-items-center">
                          <div className="col-lg-6 col-md-12">
                            <EditableImageUpload
                              classes={"img-fluid"}
                              content={content["year-1-image"]}
                              onSave={this.onSave("year-1-image")}
                              uploadImage={uploadImage}
                            />
                          </div>
                          <div className="col-lg-6 col-md-12 md-mt-5">
                            <EditableParagraph content={content["year-1-description"]} onSave={this.onSave("year-1-description")} />
                          </div>
                        </div>
                      </div>
                      <div role="tabpanel" className="tab-pane fade" id="tab1-2">
                        <div className="row align-items-center">
                          <div className="col-lg-6 col-md-12">
                            <EditableImageUpload
                              classes={"img-fluid"}
                              content={content["year-2-image"]}
                              onSave={this.onSave("year-2-image")}
                              uploadImage={uploadImage}
                            />
                          </div>
                          <div className="col-lg-6 col-md-12 md-mt-5">
                            <EditableParagraph content={content["year-2-description"]} onSave={this.onSave("year-2-description")} />
                          </div>
                        </div>
                      </div>
                      <div role="tabpanel" className="tab-pane fade" id="tab1-3">
                        <div className="row align-items-center">
                          <div className="col-lg-6 col-md-12">
                            <EditableImageUpload
                              classes={"img-fluid"}
                              content={content["year-3-image"]}
                              onSave={this.onSave("year-3-image")}
                              uploadImage={uploadImage}
                            />
                          </div>
                          <div className="col-lg-6 col-md-12 md-mt-5">
                            <EditableParagraph content={content["year-3-description"]} onSave={this.onSave("year-3-description")} />
                          </div>
                        </div>
                      </div>
                      <div role="tabpanel" className="tab-pane fade" id="tab1-4">
                        <div className="row align-items-center">
                          <div className="col-lg-6 col-md-12">
                            <EditableImageUpload
                              classes={"img-fluid"}
                              content={content["year-4-image"]}
                              onSave={this.onSave("year-4-image")}
                              uploadImage={uploadImage}
                            />
                          </div>
                          <div className="col-lg-6 col-md-12 md-mt-5">
                            <EditableParagraph content={content["year-4-description"]} onSave={this.onSave("year-4-description")} />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>


          <section className="pos-r o-hidden" data-bg-img="images/pattern/01.png" id="cities">
            <div className="container">
              <div className="row">
                <div className="col-lg-4 col-md-6">
                  <div className="section-title mb-0">
                    <h2 className="title">
                      <EditableText content={content["cities-title"]} onSave={this.onSave("cities-title")} />
                    </h2>
                    <EditableParagraph classes="mb-0" content={content["cities-description"]} onSave={this.onSave("cities-description")} />
                  </div>
                </div>
                <div className="col-lg-8 col-md-6 sm-mt-5">
                  <div className="map-canvas md-iframe iframe-h" data-zoom="6" data-lat="43.653908" data-lng="-79.384293" data-type="roadmap"></div>
                </div>

              </div>
            </div>
          </section>


        </div>

      </Layout>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AboutPage);

export const query = graphql`
  query {
    pages(id: { eq: "about" }) {
      id
      content
      title
      slug
    }
  }
`;


