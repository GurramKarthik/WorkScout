import React from 'react'
import NavBar from './shared/NavBar'
import HeroSection from './HeroSection'
import Category from './category'
import LatestJobs from './LatestJobs'
import Footer from './Footer'
import useGetAllJobs from '@/Hooks/useGetAllJobs'

const Home = () => {
  useGetAllJobs(); // CUSTOM HOOK TO GET ALL JOBS
  return (
    <div id='home'>
        <NavBar/>
        <HeroSection/>
        <Category/>
        <LatestJobs/>
        <Footer/>
    </div>
  )
}

export default Home