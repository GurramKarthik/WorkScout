import React, { useEffect, useState } from 'react'
import NavBar from '../shared/NavBar'
import { useParams } from 'react-router-dom'
import { APPLICATION_END_POINT } from '../utils/constants';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { setAllApplications } from '@/redux/application';
import { toast } from 'react-toastify';
import { Badge, DropdownButton, DropdownItem } from 'react-bootstrap';
import useGetAllApplications from '@/Hooks/useGetApplications';


const status = ["accepted", "rejected"];

const JobApplications = () => {
    const params = useParams();
    const jobId = params.id;
    useGetAllApplications(jobId);  

    const dispatch = useDispatch();
    const {allApplications} = useSelector(store => store.application)
    const [UStatus, setStatus] = useState({status:""})
    

    
    

    //updating status
    const updateStatus = async (status,id) =>{  
        console.log("update status calling", id)
        console.log(`${APPLICATION_END_POINT}/status/${id}/update`)

        try {
            // axios.defaults.withCredentials = true
            const resp = await axios.put(`${APPLICATION_END_POINT}/status/${id}/update`, {status} , {
                headers:{
                    "Content-Type":"application/json"
                },
                withCredentials:true
            })
            if(resp.data.success){
                toast.success(resp.data.message,{
                    position:toast.TOP_RIGHT
                })
            }else{
                console.log(resp.data.message)
            }
        } catch (error) {
            toast.error(error,{
                position:toast.TOP_RIGHT
            })
            console.log(error)
       }finally{
            setStatus({status})
       }

    }

  

  return (
    <div>
        <NavBar/>
        <div id='applicationPage' style={{paddingTop:"18vmin", display:"flex", flexDirection:"column", justifyContent:"center", alignItems:"center"}}>
                    <div id='container' style={{    textAlign:"center", textTransform:"uppercase", color:"black"}}>
                        <h2  > <Badge bg="dark" > {allApplications.title} </Badge> </h2>
                        <div style={{marginTop:"3vmin"}}>
                            <p>
                                <Badge bg='info' > Requirments</Badge> &nbsp;
                                {
                                    allApplications.requirements.map( (req) =>{
                                        return <>  {req},   &nbsp; </>
                                    })
                                }
                            </p>
                        </div>
                                
                                
                        <div style={{ display:"flex", justifyContent:'space-between' }} >
                            <div className='part1'>
                                    <div>
                                       <p> <Badge bg='info' > salary </Badge>  </p>
                                      <p>  <Badge bg='info' > Experience Level </Badge> </p> 
                                       <p> <Badge bg='info' > Location </Badge> </p>

                                    </div>
                                    <div>
                                        <p> {allApplications.salary} </p>
                                        <p> {allApplications.experienceLevel} </p>
                                        <p> {allApplications.location} </p>
                                    </div>
                            </div>

                            <div className='part1'>
                                <div>
                                   <p> <Badge bg='info' > Job Type  </Badge>   &nbsp;</p>
                                   <p> <Badge bg='danger' > Position </Badge> </p>
                                </div>
                                <div>
                                    <p> {allApplications.jobType} </p>
                                    <p> {allApplications.position} </p>
                                </div>
                            </div>
                        </div>
                    </div>

                    
                    <div style={{width:"90%"}}>
                    <h5 style={{color:"black"}} > Applications </h5>

                        <table id='table' style={{ width: '100%', borderCollapse: 'separate', borderSpacing: '0vmin 2vmin', textAlign: 'center' , textTransform:'none' }}>
                            <thead>
                                <tr>
                                    <th>Full Name</th>
                                    <th>Email</th>
                                    <th>Contact</th>
                                    <th>Resume</th>
                                    <th>Date</th>
                                    <th>Status</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody >
                                {
                                    
                                    allApplications.application.map((appli)=>{
                                        UStatus.status = appli.status
                                    return <tr key={appli.applicant._id}  >
                                            <td>{appli.applicant.fullName}</td>
                                            <td style={{textTransform:'none'}}>{appli.applicant.email}</td>
                                            <td>  { appli.applicant.phoneNumber } </td>
                                            <td>Na</td>
                                            {/* <td>{applicant.profile[resume] ? ( <a href={applicant.profile.resume}>{applicant.profile.resumeOriginalName}</a>) : (<p>NA</p>)}</td> */}
                                            <td>{
                                                    // applicant.createdAt.split("T")[0]
                                                }
                                                not yet.
                                            </td>
                                            <td>
                                                {({
                                                    pending: <Badge bg="warning">pending</Badge>,
                                                    rejected: <Badge bg="danger">rejected</Badge>,
                                                    accepted: <Badge bg="success">accepted</Badge>,
                                                }[UStatus.status] || null)}
                                            </td>
                                            <td>
                                                <DropdownButton
                                                    id="dropdown-Secondary-button"
                                                    title={ <i className="ri-more-line"></i> }
                                                >                                                    
                                                {
                                                    status.map((st, index) =>{
                                                        return (<DropdownItem  key={index} onClick={() => { updateStatus(st, appli._id)}} >   
                                                            {st}
                                                        </DropdownItem>)
                                                    })
                                                }
                                                </DropdownButton>
                                            </td>
                                        </tr>
                                    })
                                }
                            </tbody>

                        </table>

                    </div>
            

        </div>
    </div>
  )
}

export default JobApplications