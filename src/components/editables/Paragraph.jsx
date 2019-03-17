import React from 'react'

import Editable from './Editable'
import RichTextEditor from '../editingTools/RichTextEditor'


const Paragraph = (props) => {
  return (
    <Editable
      editor={RichTextEditor}
      handleSave={props.handleSave}
      handleDelete={props.handleDelete}
      content={{ text: props.text }}
      { ...props }
    >
      <div dangerouslySetInnerHTML={ {__html: props.text} }>
      </div>
    </Editable>
  );
};

export default Paragraph;