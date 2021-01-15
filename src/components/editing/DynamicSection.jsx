import React from "react";
import { connect } from "react-redux";
import Container from "@material-ui/core/Container";

import {
  updatePage,
  savePageContent,
  addSection,
  duplicateSection,
  deleteSection,
  addContentItem,
  updateContentItem,
  deleteContentItem,
} from "../../redux/actions";

import Header from "../common/Header";
import SubHeading from "../common/SubHeading";
import Paragraph from "../common/Paragraph";
import Image from "../common/Image";
import ImageCarousel from "../common/ImageCarousel";
import EmbeddedIframe from "../common/EmbeddedIframe";
import ResponsiveIframe from "../common/ResponsiveIframe";
import Button from "../common/Button";
import Link from "../common/Link";
import FileUpload from "../common/FileUpload";
import ExpandableText from "../common/ExpandableText";
import Reports from "../common/Reports";
import EmbeddedVismeReport from "./EditableEmbeddedVismeReport";
import SectionEditingActions from "./SectionEditingActions";

const componentMap = {
  header: Header,
  subHeading: SubHeading,
  paragraph: Paragraph,
  image: Image,
  imageCarousel: ImageCarousel,
  embeddedIframe: EmbeddedIframe,
  responsiveIframe: ResponsiveIframe,
  button: Button,
  link: Link,
  expandableText: ExpandableText,
  reports: Reports,
  fileUpload: FileUpload,
  vismeReport: EmbeddedVismeReport,
}

const mapDispatchToProps = dispatch => {
  return {
    onUpdatePageData: (page, id, data) => {
      dispatch(updatePage(page, id, data));
    },
    addSection: (sectionIndex, sectionType) => {
      dispatch(addSection(sectionIndex, sectionType));
    },
    deleteSection: (sectionIndex) => {
      dispatch(deleteSection(sectionIndex));
    },
    duplicateSection: (sectionIndex) => {
      dispatch(duplicateSection(sectionIndex));
    },
    addContentItem: (sectionIndex, contentType) => {
      dispatch(addContentItem(sectionIndex, contentType))
    },
    updateContentItem: (sectionIndex, contentIndex, content) => {
      dispatch(updateContentItem(sectionIndex, contentIndex, content))
    },
    deleteContentItem: (sectionIndex, contentIndex) => {
      dispatch(deleteContentItem(sectionIndex, contentIndex))
    },
    savePageContent: (innerFunction) => {
      dispatch(savePageContent(innerFunction));
    },
    editSectionTag: (sectionIndex, tag) => {
      dispatch(editSectionTag(sectionIndex, tag))
    }
  };
};

const mapStateToProps = state => {
  return {
    pageData: state.page.data,
    isEditingPage: state.adminTools.isEditingPage,
  };
};


const DynamicSection = ({ content, type, sectionIndex, pageData, isEditingPage, onUpdatePageData, savePageContent, addSection, deleteSection, duplicateSection, addContentItem, updateContentItem, deleteContentItem, sectionTag, selectedTag, editSectionTag }) => {

  const onAddSection = (sectionType) => {
    savePageContent(() => addSection(sectionIndex, sectionType))
  }

  const onDeleteSection = () => {
    savePageContent(() => deleteSection(sectionIndex))
  }

  const onDuplicateSection = () => {
    savePageContent(() => duplicateSection(sectionIndex))
  }

  const onAddContentItem = (contentType) => {
    savePageContent(() => addContentItem(sectionIndex, contentType))
  }

  const onUpdateContentItem = (sectionIndex, contentIndex) => content => {
    savePageContent(() => updateContentItem(sectionIndex, contentIndex, content))
  }

  const onDeleteContentItem = (sectionIndex, contentIndex) => () => {
    savePageContent(() => deleteContentItem(sectionIndex, contentIndex))
  }

  const onEditSectionTag = (tag) => {
    savePageContent(() => editSectionTag(sectionIndex, tag))
  }

  if (selectedTag) {
    if (sectionTag && sectionTag.id !== selectedTag.id) {
      return <div></div>
    }
  }

  const sectionClassMap = {
    default: "",
    highlight: "dark-bg",
    light: "grey-bg",
  }

  const sectionClasses = sectionClassMap[type]

  return(
    <section className={`dynamic-section pos-relative ${type} ${sectionClasses}`}>
      <div className="container">
      {
        content.map((component, index ) => {
          const Component = componentMap[component.type];
          return (
            <Component
              content={component.content}
              onSave={onUpdateContentItem(sectionIndex, index)}
              onDelete={onDeleteContentItem(sectionIndex, index)}
              key={index}
              isEditingPage={isEditingPage}
            />
          )
        })
      }
      </div>
      {
        isEditingPage &&
        <SectionEditingActions
          onDuplicateSection={onDuplicateSection}
          onDeleteSection={onDeleteSection}
          onAddSection={onAddSection}
          onAddContentItem={onAddContentItem}
          onEditSectionTag={onEditSectionTag}
          sectionTag={sectionTag}
        />
      }
    </section>
  )
};


export default connect(mapStateToProps, mapDispatchToProps)(DynamicSection);
