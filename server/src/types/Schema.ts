import mongoose from 'mongoose';

export interface UserDocument extends mongoose.Document {
    email : string;
    password : string;
    comparePassword : (password : string)=> Promise<boolean>
    name : string;
    role : string;
    avatar : string;
    createdAt : Date;
    updatedAt : Date;
    omitPassword : ()=> Pick<UserDocument, 'email' | 'name' | 'role' | 'avatar' |  'createdAt' | 'updatedAt'>
    
}

export interface SessionDocument extends mongoose.Document {
    _id: mongoose.Types.ObjectId;
    userId : mongoose.Types.ObjectId
    userAgent? : string
    createdAt : Date
    expiresAt : Date
}

