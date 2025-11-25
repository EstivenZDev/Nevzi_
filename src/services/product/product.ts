import axios from "axios"


export const newProduct = async (formData: FormData) => {
    const res = await axios.post("/api/products", formData, {
        headers: {
            "Content-Type": "multipart/form-data",  // 👈 importante
        },
    })
    return res.data
}

export const getProducts = async ()=>{
    const res = await axios.get("/api/products")
    return res
}