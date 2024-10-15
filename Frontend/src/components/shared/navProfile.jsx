import React from 'react'
import "../Css/Navbar.scss"
import avatar from "../../assets/avatar.png"
import logout from '../../assets/logout.png'
import profile from '../../assets/profile.png'

const NavProfile = () => {
  return (
    <div id='navProfile'>
        <div className='navProfileOptions'>
            <img src={avatar} alt='Avatar'style={{
                width: "2.5vmax",
                height: "2.5vmax",
                borderRadius: "50%",
              }} />
              <div>
                <p> Karthik gurram</p>
                <p style={{color:"#0009"}}>Lorem ipsum dolor sit amet.</p>
              </div>
        </div>
        <div className='navProfileOptions'>
        <img src={profile} alt='logout'style={{
                width: "3vmax",
                height: "2.5vmax",
                borderRadius: "50%",
              }} />
                <p> View profile </p>
        </div>
        <div className='navProfileOptions'>

        <img src={logout} alt='logoutImg'style={{
                width: "3vmax",
                height: "2.5vmax",
                borderRadius: "50%",
              }} />
                <p> logout</p>
        </div>
        
    </div>
  )
}

export default NavProfile