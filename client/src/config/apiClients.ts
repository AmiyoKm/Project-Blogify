import { navigate } from '@/lib/navigation';
import axios from 'axios';
import queryClient from './queryClient';

const options = {
    baseURL: 'http://localhost:4000/api/v1',
    withCredentials: true,
}

export const TokenRefreshClient = axios.create(options)
TokenRefreshClient.interceptors.response.use(
    (response)=> response.data
)

 const API = axios.create({
    ...options
})

API.interceptors.response.use(
    (response)=> response.data,

    async(error)=> {
        const { config , response} = error
        const { status , data} = response || {}
        if(status ===401 && data?.errorCode === "InvalidAccessToken"){
            try {
                await API.get("/api/v1/auth/refresh")
                return API(config)
            } catch (error) {
                queryClient.clear()
                navigate('/login', {
                    state : {
                        redirectUrl : window.location.pathname
                    }
                } )
            }
        }
        return Promise.reject({status , ...data})
    }
)

export default API