import { createSlice } from "@reduxjs/toolkit";

const applicationSclice = createSlice({
    name:"application",
    initialState:{
        allApplications:[],
        allUserApplications:[]
    },
    reducers:{
        setAllApplications: (state, action)=>{
            state.allApplications = action.payload
        },
        setAllUserApplications: (state, action)=>{
            state.allUserApplications = action.payload
        },
      
    }
});

export const {setAllApplications, setAllUserApplications} = applicationSclice.actions;
export default applicationSclice.reducer;