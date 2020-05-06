import React from "react";
import Slider from "react-slick";
import Button from "@material-ui/core/Button"

import { EditableLightboxImageUpload } from "react-easy-editables";
import { uploadImage } from "../../firebase/operations";

const PrevArrow = props => {
  const { className, style, onClick } = props;
  return (
    <button
      className={className}
      onClick={onClick}
      style={style}
    >
      <i className="fas fa-angle-left"></i>
    </button>
  );
}

const NextArrow = props => {
  const { className, style, onClick } = props;
  return (
    <button
      className={className}
      onClick={onClick}
      style={style}
    >
      <i className="fas fa-angle-right"></i>
    </button>
  );
}



class ImageCarousel extends React.Component {
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

    if (Object.keys(newContent).length === 0) {
      this.props.onDelete()
    } else {
      this.props.onSave(newContent)
    }
  }

  onAddItem = () => {
    let newContent = { ...this.props.content }
    const newItemKey = `carousel-img-${Date.now()}`
    newContent[newItemKey] = { imageSrc: "https://www.nomadiclabs.ca/img/logo-03.png", caption: "", title: "" }

    this.props.onSave(newContent)
  }

  render() {
    var settings = {
      infinite: true,
      speed: 500,
      slidesToShow: Object.keys(this.props.content).length < 2 ? 1 : 2,
      slidesToScroll: 1,
      prevArrow: <PrevArrow />,
      nextArrow: <NextArrow />,
      responsive: [
        {
          breakpoint: 1024,
          settings: {
            slidesToShow: 1,
            slidesToScroll: 1,
          }
        },
      ]
    };

    const contentKeys = Object.keys(this.props.content);

    return (
      <div className="slider-active">
        <Slider {...settings}>
            {
              contentKeys.map((key,index) => {
                const content = this.props.content[key];

                return(
                  <div className="pt-10 pb-10 pl-10 pr-10" key={key}>
                    <EditableLightboxImageUpload
                      onSave={this.onSaveItem(key)}
                      onDelete={this.onDeleteItem(key)}
                      classes={"slider-height-sm"}
                      uploadImage={uploadImage}
                      showCaption={false}
                      editCaption={true}
                      content={content}
                    />
                  </div>
                )
              })
            }

          {
            this.props.isEditingPage &&
            <div className="pt-10 pb-10 pl-10 pr-10">
              <Button onClick={this.onAddItem}>Add item</Button>
            </div>
          }
        </Slider>
      </div>
    );
  }
}

export default ImageCarousel

