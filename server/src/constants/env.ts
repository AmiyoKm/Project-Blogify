const getEnv = (key : string , defaultValue? : string) : string=>{
        const value = process.env[key] || defaultValue;
        if(value ===undefined){
            throw new Error(`Missing env variable ${key}`)
        }
        return value

} 

export const MONGO_URI = getEnv('MONGO_URI');
export const PORT = getEnv('PORT','4000');
export const JWT_SECRET = getEnv('JWT_SECRET');
export const APP_ORIGIN = getEnv('APP_ORIGIN');
export const NODE_ENV = getEnv('NODE_ENV');
export const JWT_REFRESH_SECRET = getEnv('JWT_REFRESH_SECRET');


