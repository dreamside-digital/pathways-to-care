import React from "react";
import Carousel from "nuka-carousel"

import Button from "@material-ui/core/Button"


const EditableCarousel = ({ collection, SlideComponent, onSave, isEditingPage, maxSlides, defaultContent }) => {

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

  const options = {
    wrapAround: true,
    slidesToShow: 3,
    slidesToScroll: 1,
  }

  return (
    <>
      <Carousel { ...options }>
        {collection.map((content, i) => {
          return(
            <SlideComponent
              key={`slide-${i}`}
              content={content}
              onSave={() => console.log('save!')}
              onDelete={() => console.log('delete!')}
            />
          )
        })}
      </Carousel>
      {
        isEditingPage &&
        <Button onClick={onAddItem}>Add item</Button>
      }
    </>
  );
};

EditableCarousel.defaultProps = {
  collection: [],
  maxSlides: 1,
  isEditingPage: false,

}

export default EditableCarousel;


