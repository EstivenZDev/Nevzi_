import axios from "axios";
import { UserProps }  from "./user.types";


export const getUsers = async () => {
    const res = await axios.get("/api/user")
    return res.data
}

export const createUsers = async ({name, email, password, role}:UserProps) => {
    try {
        const res = await axios.post("/api/user", {
            name: name,
            email: email,
            password: password,
            role: role
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

