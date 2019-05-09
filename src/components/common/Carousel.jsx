import React from "react";
import Carousel from "nuka-carousel"

import Button from "@material-ui/core/Button"


const EditableCarousel = ({ collection, SlideComponent, onSave, isEditingPage, maxSlides, defaultContent, options }) => {

  const onSaveItem = (index) => item => {
    const newCollection = [...collection]
    newCollection[index] = item
    onSave(newCollection)
  }

  const onDeleteItem = (index) => () => {
    const newCollection = [...collection]
    newCollection.splice(index, 1)
    onSave(newCollection)
  }

  const onAddItem = () => {
    const newCollection = [...collection]
    newCollection.push(defaultContent)
    onSave(newCollection)
  }

  const onEditItem = (index) => field => content => {
    const newCollection = [...collection]
    const updated = {
      ...newCollection[index],
      [field]: content
    };

    newCollection[index] = updated;

    onSave(newCollection)
  }

  const defaultOptions = {
    wrapAround: true,
    slidesToShow: 3,
    slidesToScroll: 1,
    cellSpacing: 30,
  }

  const carouselOptions = { ...defaultOptions, ...options }

  return (
    <>
      <Carousel { ...carouselOptions }>
        {collection.map((content, i) => {
          return(
            <SlideComponent
              key={`slide-${i}`}
              content={content}
              onSave={onSaveItem(i)}
              onDelete={onDeleteItem(i)}
            />
          )
        })}
      </Carousel>
      {
        isEditingPage &&
        <div className="row mt-4">
          <div className="col-12">
            <Button onClick={onAddItem}>Add item</Button>
          </div>
        </div>
      }
    </>
  );
};

EditableCarousel.defaultProps = {
  collection: [],
  isEditingPage: false,
  options: {}
}

export default EditableCarousel;


