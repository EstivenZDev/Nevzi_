import React from 'react'

interface ButtonBlackProps{
    content: string;
    onClick?: ()=>void
}


export const ButtonBlack = ({content,onClick}:ButtonBlackProps) => {



  return (
    <>
        <button className='bg-black rounded-4xl text-white p-3 w-40 font-light cursor-pointer' onClick={onClick}>{content}</button>
    </>
  )
}

export default ButtonBlack
