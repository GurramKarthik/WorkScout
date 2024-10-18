import React from 'react'
import { Link } from 'react-router-dom'

const appplicatoins = [1,2,3,4]
const Application = () => {
  return (
    <div id='application'>
        <table  >
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
                appplicatoins.map((applicaiton, index) =>{
                  let style = {}
                    if(applicaiton.status === "pending"){
                        style ={
                          backgroundColor : "rgb(230, 220, 50)",
                          color:"black"
                        }
                    }else if (applicaiton.status === "accepted"){
                        style ={
                          backgroundColor : "rgb(53, 184, 53)",
                          color:"black"
                        }
                    }else{
                      style ={
                        backgroundColor : "#eb4746",
                        color:"black"
                      }
                    }

                    return (
                        
                        <tr key={index} style={style} >
                            <td>17-10-2024</td>
                            <td>SDE</td>
                            <td>Google</td>
                            <td> <Link  style={{color:style.color}}>application </Link> </td>
                            <td>Rejected</td>
                        </tr>
                        
                    )
                })
              }

            </tbody>

        </table>
    </div>
  )
}

export default Application