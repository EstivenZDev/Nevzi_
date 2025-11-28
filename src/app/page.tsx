"use client"

import Image from "next/image";
import ButtonBlack from "@/components/ButtonBlack/ButtonBlack";
import { averageCalculator } from "@/lib/utils";


export default function Home() {
    return (
        <>
            <section className="  flex flex-col items-center mt-10  justify-center">
                <div className=" text-black flex flex-wrap  gap-40 justify-center ">
                    <div className=" w-[400px] flex flex-col gap-5 justify-center items-center">
                        <div className="">
                            <h1 className="text-6xl font-extrabold ejemplotest">ENCUENTRA ROPA QUE SE ADAPTE A TU ESTILO</h1>
                        </div>
                        <div className=" text-[12px]">
                            <p>Explora nuestra variada gama de prendas meticulosamente confeccionadas, diseñadas para realzar tu individualidad y satisfacer tu sentido del estilo.</p>
                        </div>
                        <div>
                            <ButtonBlack content="Comprar ahora!"/>
                        </div>
                        <div className="flex gap-5">
                            <div className="p-2 flex flex-col gap-2">
                                <h2 className="font-medium text-3xl ">200+</h2>
                                <p>Marcas internacionales</p>
                            </div>
                            <div className="border-l border-r border-gray-400 p-2 flex flex-col gap-2">
                                <h2 className="font-medium text-3xl">2,000+</h2>
                                <p>Productos de alta calidad</p>
                            </div>
                            <div className="p-2 flex flex-col gap-2">
                                <h2 className="font-medium text-3xl">30,000+</h2>
                                <p>Clientes</p>
                            </div>
                        </div>
                    </div>
                    <div className="w-[500px]  flex justify-center">
                        <Image alt="Image" width={500} height={400} src={"https://res.cloudinary.com/dhnadfxhu/image/upload/v1764334745/316518255_11374581_1_oiifjz.png"}/>
                    </div>
                </div>
                <div className="h-[15vh] bg-black w-full text-white ">
                    <div>
                        
                    </div>
                </div>
            </section>
        </>
    );
}
