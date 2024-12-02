import { createSlice } from "@reduxjs/toolkit";

const companySclice = createSlice({
    name:"company",
    initialState:{
        allCompanies:[],
        singleCompany:null,
    },
    reducers:{
        setAllCompanies: (state, action)=>{
            state.allCompanies = action.payload
        },
        setSingleCompany: (state, action)=>{
            state.singleCompany = action.payload
        }
    }
});

export const {setAllCompanies, setSingleCompany} = companySclice.actions;
export default companySclice.reducer;