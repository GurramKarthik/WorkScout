import React, { useState } from 'react'
import NavBar from '../shared/NavBar'
import { useDispatch, useSelector } from 'react-redux'
import store from '@/redux/store'
import { setLoading, setUser } from '@/redux/authSlice'
import HeroSection from '../HeroSection'
import "./Compnay.scss"
import { setSingleCompany } from '@/redux/companySlice'
import {  useNavigate } from 'react-router-dom'
import useGetAllCompanies from '@/Hooks/useGetAllCompanies'
import { toast } from 'react-toastify'
import axios from 'axios'
import { COMPANY_END_POINT } from '../utils/constants'
import avatar from "../../assets/avatar.png"


const Company = () => {
    useGetAllCompanies();

    const {allCompanies} = useSelector(store => store.company)
    const {loading}  = useSelector(store => store.auth)

    const [name , setName] = useState("");
    const dispath = useDispatch()
    const navigate = useNavigate()


    const createNewCompany = async () =>{

      try{

        dispath(setLoading(true));
        const response = await axios.post(`${COMPANY_END_POINT}/register`, {name}, {
          headers:{
            "Content-Type" : "application/json"
          },
          withCredentials:true
        }).catch( (err)=>{
          toast.error(err.response.data.message || "Error in creating a company" , {
            position:toast.TOP_RIGHT
          })
        })

        if(response){
          dispath(setSingleCompany(response.data.newCompany));
          navigate(`/admin/company/${response.data.newCompany._id}`)
        }


        
      }catch(e){
        toast.error(e.response.data.message || "Error in creating a company", {
          position:toast.TOP_RIGHT
        })
      }finally{
        dispath(setLoading(false));
      }


    }



  

  return (
    <div>
        <NavBar/>
        <div id='companyPage'>
              <div style={{width:'60%'}}>
              <div>
                  <h2>Create New Company</h2>
                  <p>Share your company name with us. Don’t worry, you can always update it later!</p>
              </div>
              <div className='compnayInput' > 
                  <h3>Company name</h3>
                  <input type="text" name='name' value={name} onChange={(e)=>{setName(e.target.value)}}/>
              </div>
              <div>
                    <button id='cancleBtn'  onClick={()=>{ navigate("/admin")}}>Cancle</button>                  
                      <button  id='continueBtn' onClick={createNewCompany}>Continue <i className="ri-arrow-right-line"></i> </button>
              </div>
              </div>
              <div style={{width:"80%"}}>
                    <h2> Your Companies</h2>
                    {
                      allCompanies.length >0 ? (
                        <table id='table' style={{ width: '100%', borderCollapse: 'separate', borderSpacing: '0vmin 2vmin', textAlign: 'center' }} >
                          <thead>
                              <tr>
                                <th>Logo</th>
                                <th>Name</th>
                                <th>Date</th>
                                <th>Actions</th>
                              </tr>
                          </thead>
                          <tbody>
                              {
                                allCompanies.map((company)=>{
                                   return <tr key={company._id}>
                                      <td>  { company.logo ? (
                                        <>
                                          <img src={company.logo} style={ {width:"5vmin", height:"5vmin",}}/>

                                        </>
                                      ) : null } </td>
                                      <td><a href={company.website ? company.website : "#"} target='blank' style={{textDecoration:"none", color:"black"}}> {company.name}</a></td>
                                      <td>{company.createdAt.split("T")[0]}</td>
                                      <td><button id='edit' onClick={ () => {  navigate(`/admin/company/${company._id}`)}}><i className="ri-pencil-fill"></i></button></td>
                                    </tr>
                                })
                              }
                          </tbody>

                    </table>
                      )  : (
                        <span>
                            You haven't registered any company
                        </span>
                      )
                    }
              </div>
        </div>
    </div>
  )
}

export default Company