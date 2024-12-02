import { APPLICATION_END_POINT } from '@/components/utils/constants'
import { setAllApplications } from '@/redux/application'
import { setLoading } from '@/redux/authSlice'
import axios from 'axios'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { toast } from 'react-toastify'

const useGetAllApplications = (jobId) => {

    const {allApplications} = useSelector(store => store.application)

    const dispatch = useDispatch()
    useEffect(() =>{ 
        dispatch(setLoading(true))

        const findApplications = async () =>{
            
            try {
                const resp = await axios.get(`${APPLICATION_END_POINT}/${jobId}/applicants`, {withCredentials:true})
                
                if(resp.data.success){
                    dispatch(setAllApplications(resp.data.job))
                    console.log(resp.data.job)
                }else{
                    console.log(resp)
                }
            } catch (error) {
                toast.error(error.response.data.message,{
                    position:toast.TOP_RIGHT
                })
            }
        }
        findApplications();
        dispatch(setLoading(false));

    },[jobId, allApplications])

}

export default useGetAllApplications;