import React from "react";
import PropTypes from "prop-types";
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

import {
  PlainTextEditor,
  RichTextEditor,
  Editable
} from 'react-easy-editables';


const ExpandableText = props => {
  const handleSave = field => newContent => {
    const contentToSave = {
      ...props.content,
      [field]: newContent.text
    }
    props.onSave(contentToSave);
  };

  const onDelete = field => () => {
    const contentToSave = {
      ...props.content,
      [field]: ""
    }

    if (!contentToSave.header && !contentToSave.description) {
      props.onDelete()
    } else {
      props.onSave(contentToSave);
    }
  };

  const { content } = props;

  return (
    <ExpansionPanel className="expandable" variant="outlined" square={true}>
      <ExpansionPanelSummary
        expandIcon={<ExpandMoreIcon />}
        aria-controls="expandable-content"
        id="expandable-header"
      >
        <h4>
          <Editable
            Editor={PlainTextEditor}
            content={{ text: content.header }}
            handleSave={ handleSave("header") }
            onDelete={ onDelete("header")}
            EditorProps={{
              onClick: event => event.stopPropagation(),
              onFocus: event => event.stopPropagation(),
            }}
          >
            {content.header}
          </Editable>
        </h4>
      </ExpansionPanelSummary>
      <ExpansionPanelDetails id="expandable-content">
        <Editable
          Editor={RichTextEditor}
          content={{ text: content.description }}
          handleSave={ handleSave("description") }
          onDelete={ onDelete("description")}
          EditorProps={{
            onClick: event => event.stopPropagation(),
            onFocus: event => event.stopPropagation(),
          }}
        >
          <div className="description" dangerouslySetInnerHTML={ {__html: content.description} } />
        </Editable>
      </ExpansionPanelDetails>
    </ExpansionPanel>
  );
};

ExpandableText.propTypes = {
  content: PropTypes.shape({ header: PropTypes.string, description: PropTypes.string }).isRequired,
  onSave: PropTypes.func.isRequired
}

ExpandableText.defaultProps = {
  content: { header: '', description: '' },
  onSave: newContent => console.log('Implement a function to save changes!', newContent),
}

export default ExpandableText;
