import React from "react";
import Carousel from "nuka-carousel"

import Button from "@material-ui/core/Button"

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

  onSaveItem = (index) => item => {
    const newCollection = [...this.props.collection]
    newCollection[index] = item
    this.props.onSave(newCollection)
  }

  onDeleteItem = (index) => () => {
    const newCollection = [...this.props.collection]
    newCollection.splice(index, 1)
    this.props.onSave(newCollection)
  }

  onAddItem = () => {
    const newCollection = [...this.props.collection]
    newCollection.push(this.props.defaultContent)
    this.props.onSave(newCollection)
  }

  onEditItem = (index) => field => content => {
    const newCollection = [...this.props.collection]
    const updated = {
      ...newCollection[index],
      [field]: content
    };

    newCollection[index] = updated;

    this.props.onSave(newCollection)
  }

  render() {
    const { viewportWidth } = this.state;
    const isMobile = Boolean(viewportWidth <= MAX_MOBILE_VIEWPORT_WIDTH)
    const { collection, SlideComponent, isEditingPage, options } = this.props;

    const allowControls = options.slidesToShow ? (collection.length < options.slidesToShow) : (collection.length < DEFAULT_SLIDES_TO_SHOW)
    const slidesToShow = isMobile ? 1 : options.slidesToShow || DEFAULT_SLIDES_TO_SHOW;

    const carouselOptions = {
      wrapAround: options.wrapAround || true,
      slidesToShow: slidesToShow,
      slidesToScroll: options.slidesToShow || 1,
      cellSpacing: options.cellSpacing || 30,
      withoutControls: allowControls,
      dragging: isEditingPage ? false : !allowControls,
      swiping: !allowControls,
    }

    return (
      <>
        <Carousel { ...carouselOptions }>
          {collection.map((content, i) => {
            return(
              <SlideComponent
                key={`slide-${i}`}
                content={content}
                onSave={this.onSaveItem(i)}
                onDelete={this.onDeleteItem(i)}
              />
            )
          })}
        </Carousel>
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
  collection: [],
  isEditingPage: false,
  options: {}
}

export default EditableCarousel;


