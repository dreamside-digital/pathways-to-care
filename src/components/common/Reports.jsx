import React from "react";
import Button from "@material-ui/core/Button"
import Grid from "@material-ui/core/Grid"

import Report from "./Report"


class Reports extends React.Component {
  onSaveItem = itemId => itemContent => {
    const newContent = {
      ...this.props.content,
      [itemId]: itemContent
    }

    this.props.onSave(newContent)
  }

  onDeleteItem = itemId => () => {
    let newContent = { ...this.props.content }
    delete newContent[itemId];

    this.props.onSave(newContent)
  }

  onAddItem = () => {
    let newContent = { ...this.props.content }
    const newItemKey = `report-${Date.now()}`
    newContent[newItemKey] = {
      "report-item-image": { "imageSrc": "https://www.nomadiclabs.ca/img/logo-03.png", "caption": "" },
      "report-item-date": { "text": "Report date" },
      "report-item-title": { "text": "Report title" },
      "report-item-description": { "text": "<p>Summary</p>" },
      "report-item-link": { "anchor": "Read the report", "link": "/" },
    }

    this.props.onSave(newContent)
  }

  render() {
    const { isEditingPage, classes } = this.props;
    const itemsKeys = Object.keys(this.props.content);

    if (itemsKeys.length === 0 && !isEditingPage) {
      return null;
    }

    return (
      <div className={`collection mt-4 ${classes}`}>
        <Grid container spacing={2}>
        {itemsKeys.map((key,index) => {
          const content = this.props.content[key];
          return(
            <Grid item xs={12} md={6} lg={4} key={`reports-item-${key}`}>
              <Report
                index={index}
                content={content}
                onSave={this.onSaveItem(key)}
                onDelete={this.onDeleteItem(key)}
              />
            </Grid>
          )
        })}
        {
          isEditingPage &&
          <div className="row mt-4">
            <div className="col-12">
              <Button onClick={this.onAddItem}>Add item</Button>
            </div>
          </div>
        }
        </Grid>
      </div>
    );
  }
}

Reports.defaultProps = {
  content: {},
  classes: "",
  onSave: () => { console.log('Implement a function to save changes') }
}

export default Reports

