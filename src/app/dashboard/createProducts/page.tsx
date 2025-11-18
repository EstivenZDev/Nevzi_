"use client";

import { useState } from "react";
import axios from "axios";

const CreateEvent = () => {
  const [data, setData] = useState({
    title: "",
    description: "",
    category: ""
  });
  const [image, setImage] = useState<File | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("title", data.title);
    formData.append("description", data.description);
    formData.append("category", data.category);
    if (image) formData.append("image", image);

    const res = await axios.post("/api/products", formData, {
      headers: { "Content-Type": "multipart/form-data" }
    });

    console.log(res.data);
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="text" placeholder="Title" onChange={(e) => setData({...data, title: e.target.value})}/>
      <input type="text" placeholder="Description" onChange={(e) => setData({...data, description: e.target.value})}/>
      <input type="text" placeholder="Category" onChange={(e) => setData({...data, category: e.target.value})}/>
      <input type="file" onChange={(e) => setImage(e.target.files?.[0] || null)} />
      <button type="submit">Create</button>
    </form>
  );
};

export default CreateEvent;
