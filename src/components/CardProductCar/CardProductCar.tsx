import React, { useState } from 'react'
import { Trash,CirclePlus } from 'lucide-react';

export const CardProductCar = () => {

  const [amount, setAmount] = useState(0)


  return (
    <>
      <div className='flex gap-5 p-2 rounded-md bg-gray-100'>
        <div className=' h-[75px] w-16'>
          imagen
        </div>
        <div className=' w-full'>
            <div className=''>
              <div><p className='text-black font-bold'>Titulo producto</p></div>
              <div><p className='text-gray-400 font-semibold'>Marca</p></div>
            </div >
            <div className='flex justify-between'>
              <div><p className='font-light'>20.000 $</p></div>
              <div className='flex items-center gap-3'>
                <div><button className='cursor-pointer'><Trash/></button></div>
                <div className='flex  items-center gap-1'>
                  <div className='p-1 bg-white border-1 border-black rounded-md flex justify-center items-center w-[35px]'>{amount}</div>
                  <h3 className='font-bold'>und.</h3>
                </div>
                <div className='flex items-center'>
                  <button className='cursor-pointer'><CirclePlus /></button>
                </div>
              </div>
            </div>
        </div>
      </div>
    </>
  )
}
