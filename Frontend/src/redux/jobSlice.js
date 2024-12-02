import { createSlice } from "@reduxjs/toolkit";

const jobSlice = createSlice({
    name:"job",
    initialState:{
        allJobs:[],
        singleJob:null,
        adminJobs:[],
        adminSingleJob:null,
        searchQuery:null,
    },
    reducers:{
        setAllJobs: (state, action)=>{
            state.allJobs = action.payload
        },
        setSingleJob: (state, action)=>{
            state.singleJob = action.payload
        },
        setAdminJobs: (state, action)=>{
            state.adminJobs = action.payload
        },
        setAdminSingleJob :(state, action) =>{
            state.adminSingleJob = action.payload
        },
        setSearchQuery :(state, action) =>{
            state.searchQuery = action.payload
        },
        
    }
});

export const {setAllJobs, setSingleJob, setAdminJobs,setSearchQuery} = jobSlice.actions;
export default jobSlice.reducer;