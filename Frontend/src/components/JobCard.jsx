import React from 'react'

const JobCard = ( {job}) => {
  return (
    <div className='eachJob' >
        <div style={{display:"flex", justifyContent:"space-between" }}> <h2>{job?.company?.name} </h2> <h3>&#8599;</h3></div>
        <div><p>{job?.company?.location}</p></div>
        <div><h2>{job?.title}</h2></div>
        <div><p>{job?.description}</p></div>
        <div id='details'>
            <div className='d1' style={{color:"rgb(214, 80, 80)"}}>{job?.position} positions</div>
            <div className='d1' style={{color:"#7441c5"}} >{job.jobType}</div>
            <div className='d1' style={{color:"#4e8397"}} >{job.salary}</div>
        </div>
    </div>
  )
}

export default JobCard