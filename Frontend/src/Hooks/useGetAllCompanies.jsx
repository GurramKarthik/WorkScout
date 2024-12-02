import { COMPANY_END_POINT } from '@/components/utils/constants'
import { setAllCompanies } from '@/redux/companySlice'
import axios from 'axios'
import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'

const useGetAllCompanies = () => {
    const dispatch = useDispatch()
    useEffect(()=>{
        const fetchAllCompanies = async () =>{
         try {
            const res = await axios.get(`${COMPANY_END_POINT}/get`, {withCredentials:true});
            if(res.data.success){
                dispatch(setAllCompanies(res.data.companies))
            }
         } catch (error) {
            console.log("error in useGetAllCompanies Hook", error);
         }
        }
        fetchAllCompanies();
    }, [])
}

export default useGetAllCompanies;