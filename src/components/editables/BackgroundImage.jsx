import React from "react";

import Editable from "./Editable";
import ImageEditor from "../editingTools/ImageEditor";

import defaultImage from "../../assets/images/purple_bg";

const BackgroundImage = ({ content, handleSave, children, overlay }) => {
  const imageUrl = content && content.imageSrc ? content.imageSrc : defaultImage;
  const styles = {
    background: {
      backgroundImage: `url('${imageUrl}')`,
      height: 'inherit',
    }
  };

  const onSave = updatedContent => {
    handleSave(updatedContent);
  };

  return (
    <Editable
      editor={ImageEditor}
      handleSave={onSave}
      content={content || {}}
      editCaption={false}
      showChildren
      fullWidth
    >
      <div
        className={`item owl-bg-img`}
        style={styles.background}
      >
        { overlay && <div className="opacity-medium bg-dark-gray"></div> }
        {children}
      </div>
    </Editable>
  );
};

export default BackgroundImage;
