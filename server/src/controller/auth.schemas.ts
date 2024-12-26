import {z } from 'zod';
    export const emailSchema = z.string().email();
    export const passwordSchema = z.string();  
export const loginSchema = z.object({
    email : emailSchema,
    password : passwordSchema
}) 

export const registerSchema = loginSchema.extend({
    confirmPassword : passwordSchema,
    name : z.string().min(2).max(50),
    avatar : z.string().optional(),
    role : z.string()
}).refine((data)=> data.password === data.confirmPassword, {
    message : "Passwords do not match",
    path: ["confirmPassword"]
})