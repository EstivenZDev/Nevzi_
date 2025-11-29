import mongoose, { Schema, model, Model } from "mongoose";
import { unique } from "next/dist/build/utils";

interface ProductProps {
    name: string;
    price: number;
    amount: number;
    category: mongoose.Types.ObjectId;
    image: string;
    gender: string;
    status: boolean;

}


const ProductSchema = new Schema<ProductProps>({
    name: { type: String },
    price: { type: Number },
    amount: { type: Number },
    category: {
        type: Schema.Types.ObjectId,
        ref: "categories", // DEBE coincidir con el nombre del modelo
        required: true,
    },
    image: { type: String }
    ,
    gender: {
        type: String,
        enum: ["masculino", "femenino"], // SOLO se permite uno de estos valores
        required: true,
    },
    status: { type: Boolean }

}, { versionKey: false, timestamps: true });

// Utiliza un patrón singleton para garantizar que solo se compile una instancia del modelo
// eslint-disable-next-line @typescript-eslint/no-explicit-any
let ProductModel: Model<any>;



try {

    ProductModel = model("products");
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
} catch (error) {

    ProductModel = model("products", ProductSchema);
}



export default ProductModel;