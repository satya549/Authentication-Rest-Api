import mongoose  from "mongoose";

const UserSchema = new mongoose.Schema({
    username:{
        type: String,
        reqquired: true
    },
    Email:{type:String, 
        required:true,
        select:false
    },
    authentication:{
        password:{
            type:String,
            required:true,
            select:false
        },
        salt:{
            type:String,
            select:false
        },
        sessionToken:{
            type: String,
            select: false
        },
    }
});

export const UserModel = mongoose.model('User',UserSchema);

export const getUsers =() => UserModel.find();
export const getUsersbyEmail = (email: string) => UserModel.findOne({email});
export const getUsersbySessionToken =(sessionToken: string)=> UserModel.findOne({
    'authentication.sessionToken': sessionToken,
});
export const getUserById = (id: string) => UserModel.findById(id);
export const createUser =(values: Record<string, any>) => new UserModel(values).save().then((user)=>user.toObject());
export const deleteuserById = (id:string)=> UserModel.findOneAndDelete({_id:id});
export const updateuserById = (id:string, values:Record<string, any>)=> UserModel.findByIdAndUpdate(id,values);