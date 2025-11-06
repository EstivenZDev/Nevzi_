import axios from "axios";
import { UserProps }  from "./user.types";


export const getUsers = async () => {
    const res = await axios.get("/api/user")
    return res.data
}

export const getUserByEmail = async (email) => {
    const {data:{user}} = await axios.get(`/api/user?email=${encodeURIComponent(email)}`)
    return user
}

export const createUser = async ({name, email, password}:UserProps) => {
    try {
        const res = await axios.post("/api/user", {
            name: name,
            email: email,
            password: password
        }, {
            headers: {
                "Content-Type": "application/json"
            }
        })

        return res
    } catch (error){
        return error
    }


}

