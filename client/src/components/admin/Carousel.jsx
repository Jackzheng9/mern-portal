import React from 'react'
import Carousel from 'react-multi-carousel';
import '../../assets/lib/caroselstyles.css';




const CarouselComponent = () => {

  const responsive = {
    superLargeDesktop: {
      // the naming can be any, depends on you.
      breakpoint: { max: 4000, min: 3000 },
      items: 5
    },
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 3
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 2
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1
    }
  };

  const ButtonGroup = ({ next, previous, goToSlide, ...rest }) => {
    const { carouselState: { currentSlide } } = rest;
    return (
      <div className="carousel-button-group">
        <div>Current slide is {currentSlide}</div>
        <button onClick={() => previous()}>Previous slide</button>
        <button onClick={() => next()}>Next slide</button>
      </div>
    );
  };






  return (
    <Carousel
    // swipeable={true}
    // draggable={true}
    // showDots={true}
    responsive={responsive}
    // ssr={true} // means to render carousel on server-side.
    // infinite={false}
    // autoPlay={this.props.deviceType !== "mobile" ? true : false}
    // autoPlaySpeed={1000}
    // keyBoardControl={true}
    // customTransition="all .5"
    // transitionDuration={500}
    // containerClass="carousel-container"
    // removeArrowOnDeviceType={["tablet", "mobile"]}
    // deviceType={this.props.deviceType}
    // dotListClass="custom-dot-list-style"
    // itemClass="carousel-item-padding-40-px"
    // arrows={false}
    renderButtonGroupOutside={true}
    customButtonGroup={<ButtonGroup />}
  >
    <div>Item 1</div>
    <div>Item 2</div>
    <div>Item 3</div>
    <div>Item 4</div>
    <div>Item 5</div>
    <div>Item 6</div>
    <div>Item 7</div>
  </Carousel>
  )
}

export default CarouselComponent