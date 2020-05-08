import React from "react";
import Slider from "react-slick"

import Button from "@material-ui/core/Button"

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const DEFAULT_SLIDES_TO_SHOW = 3;
const MAX_MOBILE_VIEWPORT_WIDTH = 992;
const isClient = typeof window !== 'undefined';

class EditableCarousel extends React.Component {
  state = {
    viewportWidth: 0,
  };

  componentDidMount() {
    if (isClient) {
      window.addEventListener('resize', this.updateWindowDimensions);
      setTimeout(() => {
        this.updateWindowDimensions();
      }, 250);
    }
  }

  componentWillUnmount() {
    if (isClient) window.removeEventListener('resize', this.updateWindowDimensions);
  }

  updateWindowDimensions = () => {
    this.setState({ viewportWidth: window.innerWidth });
  }

  onSaveItem = itemId => item => {
    console.log("itemId", itemId)
    console.log("item", item)
    const newCollection = {
      ...this.props.collection,
      [itemId]: item
    }

    this.props.onSave(newCollection)
  }

  onDeleteItem = itemId => () => {
    this.props.onDeleteItem(itemId)
  }

  onAddItem = () => {
    this.props.onAddItem(this.props.defaultContent)
  }


  render() {
    const { viewportWidth } = this.state;
    const isMobile = Boolean(viewportWidth <= MAX_MOBILE_VIEWPORT_WIDTH)
    const { collection, SlideComponent, isEditingPage, options } = this.props;
    console.log("collection", collection)
    console.log("this.props", this.props)

    const slidesToShow = isMobile ? 1 : options.slidesToShow || DEFAULT_SLIDES_TO_SHOW;

    const carouselOptions = {
      infinite: false,
      slidesToShow: slidesToShow,
      slidesToScroll: options.slidesToShow || 1,
      draggable: !isEditingPage,
      swipe: !isEditingPage,
    }

    const collectionKeys = Object.keys(collection);

    if (!isEditingPage && (collectionKeys.length < 1)) {
      return <p>Coming soon!</p>
    }

    return (
      <>
        <Slider { ...carouselOptions }>
          {collectionKeys.map(key => {
            const content = collection[key];
            return(
              <SlideComponent
                key={`slide-${key}`}
                content={content}
                onSave={this.onSaveItem(key)}
                onDelete={this.onDeleteItem(key)}
              />
            )
          })}
        </Slider>
        {
          isEditingPage &&
          <div className="row mt-4">
            <div className="col-12">
              <Button onClick={this.onAddItem}>Add item</Button>
            </div>
          </div>
        }
      </>
    );
  }
}


EditableCarousel.defaultProps = {
  collection: {},
  isEditingPage: false,
  options: {}
}

export default EditableCarousel;


