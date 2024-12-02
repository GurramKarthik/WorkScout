import { setSearchQuery } from '@/redux/jobSlice';
import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

const filters = [
    {
        filterType: "Location",
        array: ["Bengaluru", "Hyderabad", "Chennai", "Mumbai", "Vijayawada", "Gurugram", "Pune"]
    },
    {
        filterType: "Profile",
        array: ["Frontend Developer", "Backend Developer", "Full Stack Developer", "Java Backend Developer", "Data Science"]
    },
    {
        filterType: "Salary",
        array: ["0-40k", "8LPA- 12LPA", "12LPA-20LPA"]
    }
];

const Filters = () => {
    const dispatch = useDispatch();

    const [locationFilter, setLocationFilter] = useState('');
    const [profileFilter, setProfileFilter] = useState('');
    const [salaryFilter, setSalaryFilter] = useState('');

    const handleSearch = (filterType, value) => {
        if (filterType === "Location") setLocationFilter(value);
        else if (filterType === "Profile") setProfileFilter(value);
        else if (filterType === "Salary") setSalaryFilter(value);

        dispatch(setSearchQuery({ location: locationFilter, profile: profileFilter, salary: salaryFilter }));
    };

    return (
        <div id='filters'>
            <h1>Filters</h1>
            <br />
            <hr />
            <br />
            {filters.map((filterCategory, index) => (
                <div key={index} id='filterCard'>
                    <h3>{filterCategory.filterType}</h3>
                    {filterCategory.array.map((ele, idx) => (
                        <div key={idx} style={{ display: "flex", gap: "2vmin" }}>
                            <input
                                type='radio'
                                id={ele}
                                name={filterCategory.filterType}
                                value={ele}
                                onChange={() => handleSearch(filterCategory.filterType, ele)}
                            />
                            <label htmlFor={ele}>{ele}</label>
                        </div>
                    ))}
                    <br />
                </div>
            ))}
        </div>
    );
};

export default Filters;
