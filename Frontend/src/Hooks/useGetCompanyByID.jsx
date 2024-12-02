import { COMPANY_END_POINT } from '@/components/utils/constants'
import { setLoading } from '@/redux/authSlice'
import {  setSingleCompany } from '@/redux/companySlice'
import axios from 'axios'
import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'

const useGetCompanyByID = async (companyId) => {

    const dispatch = useDispatch()
    useEffect(()=>{

        const fetchCompanyById = async () =>{
         try {

            const res = await axios.get(`${COMPANY_END_POINT}/get/${companyId}`, {withCredentials:true});
            
            if(res.data.success){
                dispatch(setSingleCompany(res.data.company))
                dispatch(setLoading(false))

            }else{
                toast.error(res.data.message, {
                    position:toast.TOP_RIGHT
                })
            }

         } catch (error) {
            console.log("error in useGetCompanyById Hook", error.response.data.message);
         }
        }
        fetchCompanyById();
    }, [companyId, dispatch] )
}

export default useGetCompanyByID;