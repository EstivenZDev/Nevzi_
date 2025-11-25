import { Schema, model, Model } from "mongoose";
import slugify from "slugify";

interface CategoryProps {
    name: string;
    slug: string
}

const CategorySchema = new Schema<CategoryProps>({
    name: { type: String, unique: true },
    slug: { type: String, unique: true }
},{versionKey:false});


//Crear el slug antes de que se guarde, esta funcion se ejecuta cuando la categoria es nueva o se modifica
CategorySchema.pre("save", function (next) {
  if (this.isModified("name")) {
    this.slug = slugify(this.name, { lower: true, strict: true });
  }
  next();
});

// Utiliza un patrón singleton para garantizar que solo se compile una instancia del modelo
// eslint-disable-next-line @typescript-eslint/no-explicit-any
let CategoryModel: Model<any>;



try {
    
    CategoryModel = model("categories");
// eslint-disable-next-line @typescript-eslint/no-unused-vars
} catch (error) {
    
    CategoryModel = model("categories", CategorySchema);
}



export default CategoryModel;