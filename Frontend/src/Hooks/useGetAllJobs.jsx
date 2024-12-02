import { JOB_END_POINT } from '@/components/utils/constants'
import { setAllJobs } from '@/redux/jobSlice'
import axios from 'axios'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

const useGetAllJobs = () => {
    const dispatch = useDispatch()
  const {searchQuery } = useSelector(store => store.job); 
    
    useEffect(()=>{
        const fetchAllJobs = async () =>{
         try {
            const res = await axios.get(`${JOB_END_POINT}/get?keyword=${searchQuery}`, {withCredentials:true});
            if(res.data.success){
                dispatch(setAllJobs(res.data.jobs))
            }
         } catch (error) {
            console.log("error in useGetAllJobs Hook", error);
         }
        }
        fetchAllJobs();
    }, [])
}

export default useGetAllJobs;