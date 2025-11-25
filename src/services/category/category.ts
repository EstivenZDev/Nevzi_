import axios from "axios"

export const getCategories = async () => {
    const {data} = await axios.get("/api/category")
    return data.data
}

export const createCategory = async (name:string) => {
    const {data} = await axios.post("/api/category",{name})
    return data.data
}