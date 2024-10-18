import React from 'react'

const JobCard = () => {
  return (
    <div className='eachJob' >
        <div style={{display:"flex", justifyContent:"space-between" }}> <h2>Company Name </h2> <h3>&#8599;</h3></div>
        <div><p>India</p></div>
        <div><h2>Job Title</h2></div>
        <div><p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Sunt, explicabo!</p></div>
        <div id='details'>
            <div className='d1' style={{color:"rgb(214, 80, 80)"}}>12 Positions</div>
            <div className='d1' style={{color:"#7441c5"}} >Full Time</div>
            <div className='d1' style={{color:"#4e8397"}} >12LPA</div>
        </div>
    </div>
  )
}

export default JobCard