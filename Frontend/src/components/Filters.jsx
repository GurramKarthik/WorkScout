import React from 'react'


const filters = [
    {
        filterType:"Location",
        array:["Bengaluru", "Hyderabad", "Chenni", "Mumbai", "Vijac", "Gurugram", "Vijayawada" ,"Pune"]
    },
    {
        filterType:"Profile",
        array:["Frontend Developer", "Backend Developer", "Full Satck Developer", "SDE-1", "SDE-2", "Data Science"]
    },
    {
        filterType:"Salary",
        array:["0 - 40k", "8LPA - 12LPA", " 20LPA"]
    }
]

const Filters = () => {
  return (
    <div id='filters'>
            <h1>Filters</h1>
            <br/>
            <hr/>
            <br/>
            {
                filters.map((filter, index)=>{
                    return (
                        <div key={index} id='filterCard'>
                            <h3>{filter.filterType}</h3>
                            {
                                    filter.array.map((ele, index)=>{
                                            return (
                                                <div key={index} style={{display:"flex", gap:"2vmin"}}>
                                                    <input type='radio' name={filter.filterType} value={ele} />
                                                    <p>{ele}</p>
                                                </div>    
                                            )
                                    })
                            }
                            <br/>
                        </div>   
                    )
                })
            }
    </div>
  )
}

export default Filters