import React from 'react'
import NavBar from './shared/NavBar'
import HeroSection from './HeroSection'
import Category from './category'
import LatestJobs from './LatestJobs'
import Footer from './Footer'

const Home = () => {
  return (
    <div id='home`'>
        <NavBar/>
        <HeroSection/>
        <Category/>
        <LatestJobs/>
        <Footer/>
    </div>
  )
}

export default Home