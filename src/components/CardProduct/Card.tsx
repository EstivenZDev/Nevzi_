"use client"

import React from 'react'
import { useSession } from 'next-auth/react';
import ButtonBlack from '../ButtonBlack/ButtonBlack';

interface ProductProps {
    image: string
    title: string;
    price: number;
    status: boolean
}


const Card = ({ image, title, price, status }: ProductProps) => {
    const { data: session } = useSession()




    return (
        <div className=' w-[200px] bg-gray-100 p-2'>
            <div className=' w-full h-[170px]'>
                <img src={image} alt="" className='w-full h-full rounded-md' />
            </div>
            <div>
                <div className='mt-2 h-[50px]'>
                    <h1 className='font-bold'>{title}</h1>
                </div>
                <div className=' flex mt-5  justify-between items-center p-2'>
                    <div><h1 className='font-semibold text-[20px]'>{price} $</h1></div>
                    {status ? (<div className='bg-black rounded-full p-2 text-center font-semibold border text-white'><p >Activo</p></div>) : (<div className='bg-white rounded-full p-2 text-center font-semibold text-black border border-black'><p >Inactivo</p></div>)}

                </div>
                {session && session.user && session.user.role === "admin" && (
                    <div className=' flex justify-between p-2 bg-black rounded-xl'>
                        <button className='bg-black rounded-full p-2 text-center font-semibold  text-white border-1 border-white'>Editar</button>
                        <button className='bg-black rounded-full p-2 text-center font-semibold  text-white border-1 border-white'>Borrar</button>
                    </div>
                )}
            </div>
        </div>
    )
}

export default Card