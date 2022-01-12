import React from 'react'
import 'react-responsive-carousel/lib/styles/carousel.min.css'
import { Carousel } from 'react-responsive-carousel'
import image1 from '../assets/carousel/caro1.png'
import image2 from '../assets/carousel/caro2.png'
import image3 from '../assets/carousel/caro3.png'
import image4 from '../assets/carousel/caro4.png'
import image5 from '../assets/carousel/caro5.png'

import './Carousel.css'

const CarouselContainer = () => {
  return (
    <>
      <Carousel infiniteLoop autoPlay showStatus={false} showThumbs={false}>
        <div className='image'>
          <img src={image1} alt='' />
        </div>
        <div className='image'>
          <img src={image1} alt='' />
        </div>
        <div className='image'>
          <img src={image2} alt='' />
        </div>
        <div className='image'>
          <img src={image3} alt='' />
        </div>
        <div className='image'>
          <img src={image4} alt='' />
        </div>
        <div className='image'>
          <img src={image5} alt='' />
        </div>
      </Carousel>
    </>
  )
}

export default CarouselContainer
