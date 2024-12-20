import bcrypt from 'bcrypt';

export const hashPassword = async ( password : string , saltRounds? : number  ) : Promise<string> =>{
    return await bcrypt.hash(password , saltRounds || 10);
}

export const comparePassword = async (password : string , hash : string) =>{
    try {
        return await bcrypt.compare(password , hash);
        
    } catch (error) {
        return false;
    }

}