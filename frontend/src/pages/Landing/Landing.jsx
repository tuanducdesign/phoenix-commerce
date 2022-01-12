import React from 'react'
// import Advert from '../../components/Advert'
import CarouselContainer from '../../components/CarouselContainer'
import Footer from '../../components/Footer/Footer'
import Header from '../../components/Navbar/Header'
import PartnerCarousel from '../../components/PartnerCarousel'
import HomeProducts from '../../components/HomeProducts'
import Desc from '../../components/Desc'
// import SearchBox from '../../components/SearchBox'

const Landing = () => {
  return (
    <>
      <Desc />
      <Header />
      <CarouselContainer />
      <HomeProducts />
      {/* <Advert /> */}
      <PartnerCarousel />
      <Footer />
    </>
  )
}

export default Landing
