import React from 'react'
import DeepDiveListItem from './DeepDiveListItem'
import CarouselComponent from '../Carousel'

export const DeepDivesList = ({deepdives}) => {
  return (
    <>
      <CarouselComponent items={deepdives} />
    </>
    
  )
}
