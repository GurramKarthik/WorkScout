import store from '@/redux/store'
import axios from 'axios'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { APPLICATION_END_POINT } from './utils/constants'
import { setAllUserApplications } from '@/redux/application'
import { Badge } from 'react-bootstrap'
import NavBar from './shared/NavBar'


const Application = () => {

  const {allUserApplications} = useSelector(store => store.application)
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(()=>{
        const findAppliedApplications = async () =>{
          try {
            const res = await axios.get(`${APPLICATION_END_POINT}/get`, {withCredentials:true});
            
            if(res.data.success){
                dispatch(setAllUserApplications(res.data.applications))
                console.log(res.data.applications);
            }
          } catch (error) {
            console.log(error)
          }
        }

        findAppliedApplications();
  },[allUserApplications])

  return (

    <div>
      <NavBar/>
    <div id='application'>

        <table  style={{ width: '100%', borderCollapse: 'separate', borderSpacing: '0vmin 2vmin', textAlign: 'center' }}>
            <thead>
                <tr>
                    <th>Date</th>
                    <th>Job Porfile</th>
                    <th>Compnay</th>
                    <th>See Application</th>
                    <th>Status</th>
                </tr>
            </thead>
            <tbody>
              {
                allUserApplications.map((applicaiton) =>{
                    return (
                        
                        <tr key={applicaiton._id}  >
                            {/* <td>{applicaiton.createdAt.split("T")[0]}</td> */}
                            <td></td>
                            <td> {applicaiton.job.title} </td>
                            <td>{applicaiton.job.company.name} </td>
                            <td onClick={()=>{navigate(`/get/${applicaiton.job._id}`)}} >application</td>
                            <td>
                              {({
                                pending: <Badge bg="warning">pending</Badge>,
                                rejected: <Badge bg="danger">rejected</Badge>,
                                accepted: <Badge bg="success">accepted</Badge>,
                              }[applicaiton.status] || null)}
                            </td>
                        </tr>
                    )
                })
              }

            </tbody>

        </table>
    </div>
    </div>
  )
}

export default Application