import React from 'react'
import NavBar from '../shared/NavBar'
import { useDispatch, useSelector } from 'react-redux'
import store from '@/redux/store'
import { setUser } from '@/redux/authSlice'
import HeroSection from '../HeroSection'

const Company = () => {
  return (
    <div>
        <NavBar/>
        <HeroSection/>

        <div>
            
        </div>
    </div>
  )
}

export default Company