import { COMPANY_END_POINT, JOB_END_POINT } from '@/components/utils/constants'
import { setAllCompanies } from '@/redux/companySlice'
import { setAdminJobs } from '@/redux/jobSlice'
import axios from 'axios'
import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'

const useGetAdminJobs = () => {
    const dispatch = useDispatch()
    useEffect(()=>{
        const fetchAdminJobs = async () =>{
         try {
            const res = await axios.get(`${JOB_END_POINT}/getAdminJobs`, {withCredentials:true});
            if(res.data.success){
                dispatch(setAdminJobs(res.data.adminJobs))
            }
         } catch (error) {
            console.log("error in useGetAdminJobs Hook", error);
         }
        }
        fetchAdminJobs();
    }, [])
}

export default useGetAdminJobs;