import React, { useEffect, useState } from 'react'
import NavBar from '../shared/NavBar'
import { useDispatch, useSelector } from 'react-redux'
import { setLoading, setUser } from '@/redux/authSlice'
import "./Compnay.scss"
import { setSingleCompany } from '@/redux/companySlice'
import {  useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import axios from 'axios'
import { COMPANY_END_POINT } from '../utils/constants'

import useGetAdminJobs from '@/Hooks/useGetAdminJobs'
import store from '@/redux/store'
import { DropdownButton, DropdownItem } from 'react-bootstrap'
import { setAdminJobs } from '@/redux/jobSlice'
import { setAllApplications } from '@/redux/application'


const AdminJob = () => {


    
    useGetAdminJobs();


    const { adminJobs } = useSelector((store) => store.job);
    

    const dispatch = useDispatch()
    const navigate = useNavigate()
    dispatch(setLoading(false));
    




  return (
    <div>
        <NavBar/>
        <div id='companyPage'>
              
              <div style={{width:"80%"}}>
                   <div style={{width:"100%", display:"flex", justifyContent:"flex-end", margin:"4vmin"}}>
                        <button id='postJob' onClick={() => navigate("/admin/job/new")} >Post Job</button>       
                   </div>

                   <h2> Jobs you have posted till date.</h2>
                    {
                      adminJobs.length >0 ? (
                        <table id='table' style={{ width: '100%', borderCollapse: 'separate', borderSpacing: '0vmin 2vmin', textAlign: 'center' }}>
                          <thead>
                              <tr>
                                <th>Company</th>
                                <th>Role</th>
                                <th>Date</th>
                                <th>Actions</th>
                              </tr>
                          </thead>
                          <tbody>
                              {
                                adminJobs.map((job)=>{
                                   return <tr key={job._id}>
                                      <td><a href={job.company.website} target='blank' style={{textDecoration:"none", color:"black"}}> {job.company.name}</a></td>
                                      <td>  { job.title } </td>
                                      <td>{job.createdAt.split("T")[0]}</td>
                                      <td>
                                          <DropdownButton
                                              id="dropdown-Secondary-button"
                                              title={ <i class="ri-more-line"></i> }
                                          >
                                              <DropdownItem onClick={ () =>{ dispatch(setAdminJobs(job)); navigate(`/admin/job/${job._id}`) } }> <i class="ri-edit-2-line"></i>  Edit </DropdownItem>
                                              <DropdownItem onClick={ () =>{ navigate(`/admin/job/${job._id}/applicants`)} }> <i class="ri-eye-line"></i> Application </DropdownItem>
                                          </DropdownButton>
                                      </td>
                                    </tr>
                                })
                              }
                          </tbody>

                    </table>
                      )  : (
                        <span>
                            You haven't posted a job yet.
                        </span>
                      )
                    }
              </div>
        </div>
    </div>
  )
}

export default AdminJob