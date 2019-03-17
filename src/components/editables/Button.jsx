import React from "react";
import { Link } from "gatsby";
import Button from "@material-ui/core/Button";

import Editable from "./Editable";
import LinkEditor from "../editingTools/LinkEditor";

const styles = {
  button: {
    marginTop: '0.2rem',
    marginBottom: '0.6rem',
  }
}


const BtnComponent = (props) => {
  const externalLink = props.link.startsWith('https://') || props.link.startsWith('http://');

  if (externalLink) {
    return (
      <Button variant="raised" color="secondary" href={ props.link } target='_blank' style={styles.button}>
        {  props.anchor }
      </Button>
    )
  }

  return (
    <Button variant="raised" color="secondary" component={Link} to={ props.link } style={styles.button}>
      { props.anchor }
    </Button>
  )
}

const CustomButton = props => {
  const handleSave = content => () => {
    props.updateContent(props.sectionIndex, props.index, content)
  }

  return (
    <div className="action-link">
      <Editable
        editor={LinkEditor}
        handleSave={handleSave}
        content={{ link: props.link, anchor: props.anchor }}
        {...props}
      >
        <BtnComponent link={props.link} anchor={props.anchor} />
      </Editable>
    </div>
  );
};

export default CustomButton;

