import React from 'react'
import "../Css/Navbar.scss"
import avatar from "../../assets/avatar.png"
import logout from '../../assets/logout.png'
import profile from '../../assets/profile.png'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'

const NavProfile = () => {

  const {user} = useSelector(store => store.auth)

  return (
    <div id='navProfile'>
        <div className='navProfileOptions'>
            <img src={avatar} alt='Avatar'style={{
                width: "2.5vmax",
                height: "2.5vmax",
                borderRadius: "50%",
              }} />
              <div>
                <p> {user?.fullName}</p>
                <p style={{color:"#0009"}}>{user?.profile?.bio}</p>
              </div>
        </div>
        <div className='navProfileOptions'>
        <img src={profile} alt='logout'style={{
                width: "3vmax",
                height: "2.5vmax",
                borderRadius: "50%",
              }} />
                <Link to="/profile" style={{textDecoration:"none",color:"black"}}><p> View profile </p></Link>
        </div>
        <div className='navProfileOptions'>

        <img src={logout} alt='logoutImg'style={{
                width: "3vmax",
                height: "2.5vmax",
                borderRadius: "50%",
              }} />
                <p> <Link to="/" style={{textDecoration:"none",color:"black"}}>logout</Link> </p>
        </div>
        
    </div>
  )
}

export default NavProfile