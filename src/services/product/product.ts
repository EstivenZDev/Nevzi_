import axios from "axios"


export const newProduct = async (formData: FormData) => {
    const res = await axios.post("/api/products", formData, {
        headers: {
            "Content-Type": "multipart/form-data",  // 👈 importante
        },
    })
    return res.data
}

export const getProducts = async (page: number = 1, perPage: number = 10, search: string = "") => {
    const params = new URLSearchParams();
    if (page) params.append("page", page.toString());
    if (perPage) params.append("perPage", perPage.toString());
    if (search) params.append("search", search);
    
    const res = await axios.get(`/api/products?${params.toString()}`);
    return res;
}