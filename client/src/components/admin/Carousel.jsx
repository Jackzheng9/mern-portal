import React from 'react'
import Carousel from 'react-multi-carousel';
import '../../assets/lib/caroselstyles.css';
import DeepDiveListItem from './home/DeepDiveListItem';



const CarouselComponent = ({items}) => {
  // console.log("Items", items)
  const responsive = {
    superLargeDesktop: {
      // the naming can be any, depends on you.
      breakpoint: { max: 4000, min: 3000 },
      items: 2
    },
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 2
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 1
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1
    }
  };

  const ButtonGroup = ({  next, previous, goToSlide, ...rest }) => {
    const { carouselState: { currentSlide,totalItems,slidesToShow  } } = rest;
    // const { carouselState } = rest; // Extract the entire carouselState
    // console.log('carouselState', carouselState)
    const toalSlides = Math.ceil(totalItems/slidesToShow) + 1
    return (
      <div className="carousel-button-group">
        {/* <div>Current slide is {currentSlide} - total {toalSlides} - {slidesToShow}</div> */}
        <button className={currentSlide == 0 ? "inactive" : "active"} onClick={() => previous()}>Previous slide</button>
        <button className={currentSlide == toalSlides ? "inactive" : "active"} onClick={() => next()}>Next slide</button>
      </div>
    );
  };

  const CustomDot = ({ onClick, ...rest }) => {
    const {
      onMove,
      index,
      active,
      carouselState: { currentSlide, deviceType,  }
    } = rest;
    return (
      <button
        className={active ? "active" : "inactive"}
        onClick={() => onClick()}
      >
        dot
      </button>
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
    arrows={false}
    renderButtonGroupOutside={true}
    customButtonGroup={<ButtonGroup />}
    // customDot={<CustomDot />}
    // renderDotsOutside={true}
  >
    {items.map(item => <DeepDiveListItem key={item._id} item={item} />)}
  </Carousel>
  )
}

export default CarouselComponent