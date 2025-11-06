import { Schema, model, Model } from "mongoose";
import { unique } from "next/dist/build/utils";


const usersSchema = new Schema({
    name: {

        type: String,
    },
    email: {
        type: String,
        unique: true
    },
    password: {
        type: String,
        required: false
    },
    role:{
        type:String,
        default: "user"
    },
    provider: {
        type: String, 
        default: "credentials" 
    },
},{versionKey:false});

// Utiliza un patrón singleton para garantizar que solo se compile una instancia del modelo
// eslint-disable-next-line @typescript-eslint/no-explicit-any
let UsersModel: Model<any>;



try {
    
    UsersModel = model("users");
// eslint-disable-next-line @typescript-eslint/no-unused-vars
} catch (error) {
    
    UsersModel = model("users", usersSchema);
}



export default UsersModel;