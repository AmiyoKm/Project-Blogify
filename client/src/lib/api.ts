import API from "@/config/apiClients"
import { loginSchema } from "@/routes/login"
import { z } from "zod"



export const register = async ( data : any  )=> 
    API.post("/auth/register" , data)


export const login = async ( data : z.infer<typeof loginSchema>)=>
    API.post("/auth/login" , data) 