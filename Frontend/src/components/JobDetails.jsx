import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import NavBar from './shared/NavBar';
import "./Css/details.scss"
import avatar  from "../assets/avatar.png"
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { APPLICATION_END_POINT, JOB_END_POINT } from './utils/constants';
import { setSingleJob } from '@/redux/jobSlice';
import { toast } from 'react-toastify';

const JobDetails = () => {
    const {singleJob} = useSelector(store => store.job); // getting single job from redux.jobSlice
    const {user} = useSelector(store => store.auth);
    const dispatch = useDispatch();
    const {jobId} = useParams();
    const id = jobId// beacuse in Backend its name is Id for apply in application. But FOr jobs its jobId so need to be name need to be changed
    let initalApplied = false;
    if(user){
        initalApplied  =  singleJob?.application?.some( applicantion => applicantion.applicant._id === user._id)  || false
    }
    const [isApplied, setIsApplied] = useState(initalApplied)
    
    const applyJobHandler= async () =>{
        try {

            const userId = {
                id: user._id
            }
            const res = await axios.post(`${APPLICATION_END_POINT}/apply/${jobId}`, userId, {
                headers:{
                    "Content-Type":"application/json"
                },
                withCredentials: true,
            });
            if( res.data.success){
                toast.success(res.data.message, {
                    position:toast.TOP_CENTER
                })
                setIsApplied(true) //updating the loal state.
                const updatedSingleJob = {...singleJob, application:[...application, user?._id]};
                dispatch(setSingleJob(updatedSingleJob)) // updating the UI in real time;
                // For frontend side to kepp trak of applications of a job and to update the UI accordingly.
                // Since singleJob is being updated, useEffect will run and feteched the updated job again and rerenders the page.
                // so that UI will get updated.
            }
        } catch (error) {
                toast.error(error.response.data.message, {
                    position:toast.TOP_CENTER
                })
        }
    }

    useEffect(()=>{
            const fetchSingleJob = async ()=>{
                try {
                    const res = await axios.get(`${JOB_END_POINT}/get/${jobId}`, {withCredentials:true})
                    if(res.data.success){
                        dispatch(setSingleJob(res.data.job)); // setting the single job value present in redux.jobSlice
                        setIsApplied(res.data.job.application.some( applicantion => applicantion.applicant._id === user._id))
                        // ensuing the sate is in sync with the fetched data.
                    }   
                } catch (error) {
                    console.log(error);
                }
            }
            fetchSingleJob();
    }, [jobId, dispatch, user?._id]) 
    // useEffect will run only when any one's values on above 3 will change


  return (
    <div>
        <NavBar/>
        <div id='detailsPage'>
            <div id='jobDetails'>
                <div id='headerPart'>
                    <div id='detailsProfile'>
                        <h1> {singleJob?.title}</h1>
                        <p> <i className="ri-building-2-fill"></i> &nbsp; &nbsp; {singleJob?.company?.name}</p>
                        <p>  <i className="ri-calendar-fill"></i> &nbsp; &nbsp; Published on : {singleJob?.createdAt.split("T")[0]}</p>
                        <p> <i class="ri-currency-line"></i> &nbsp; &nbsp; Salary : {singleJob?.salary} </p>
                    </div>
                    <div id='image'>
                        <img src={avatar} alt='company Image' />
                    </div>
                </div>
                <div id='detailsPart'>
                    <h2>Details </h2>
                    <div style={{marginTop:"2vmin"}}>
                        {singleJob?.description}
                    </div>
                    <div>
                        <h3>Requirements</h3>
                        <div style={{marginTop:"2vmin"}}  >
                            <ul>
                                {
                                    singleJob?.requirements.map((skill)=>{
                                        return (
                                            <li>{skill}</li>
                                        )
                                    })
                                }
                            </ul>
                        </div>
                    </div>
                </div>
            </div>





            <div id='jobApply'>
                 <div className='card' id='card1'>  
                        <div id='eligible'>
                            <div>
                                <p style={{textTransform:"capitalize"}}>{user?.fullName}</p>
                                <p>{user?.email}</p>
                            </div>
                            <div id='eleg'>
                                <i className="ri-check-line"></i> Eligible
                            </div>
                            
                        </div>

                        {

                        user ? (
                             <>
                                {
                                     isApplied ? (
                                        <button style={{ backgroundColor:"#7e858b", cursor:"not-allowed" }}><i class="ri-send-plane-line"></i> Already Applied</button>
                                    ) : (
                                        <button onClick={applyJobHandler}><i class="ri-send-plane-line"></i>Apply</button>
                                    )
                                }
                             </>
                           ) : (
                            <Link to="/login" style={{ color:"#fff" , textDecoration:"none"}}>  <button> Login To Apply </button> </Link>
                           ) 

                        }
                       {/* <button
                        onClick={isApplied ? null : applyJobHandler}
                        disabled={isApplied}>
                        { isApplied ? "Already Aplied" : "Apply Now"}
                       </button> */}
                        
                        
                        <div id='applied'>
                            <hr/>
                            <h4>Applied</h4>
                            <p> {singleJob?.application?.length}</p>
                            <div className="littleDetails">
                            <h4>Job Type</h4>
                            <p>{singleJob?.jobType}</p>
                        </div>
                        </div>
                      
                 </div>
                 <div className='card'>
                        <div className="littleDetails">
                            <h4>Eligibilty</h4>
                            <p>{singleJob?.experienceLevel}</p>
                        </div>
                        <div className="littleDetails">
                            <h4>Position</h4>
                            <p>{singleJob?.position}</p>
                        </div>
                    
                        <div className="littleDetails">
                            <h4> Location </h4>
                            <p> {singleJob?.company?.location} </p>
                        </div>
                 </div>
            </div>
        </div>
    </div>
  )
}

export default JobDetails