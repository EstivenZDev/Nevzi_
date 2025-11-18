
import React from 'react'
import Card from '@/components/CardProduct/Card'
import Image from 'next/image';

const ShopPage = () => {

    const products = [
        {
            image: "https://images.unsplash.com/photo-1606813902779-3b6b2e3d9c93",
            title: "Auriculares inalámbricos",
            price: 59.99,
            status: true
        },
        {
            image: "https://images.unsplash.com/photo-1512499617640-c2f999098a1f",
            title: "Reloj inteligente deportivo",
            price: 129.99,
            status: true
        },
        {
            image: "https://images.unsplash.com/photo-1503602642458-232111445657",
            title: "Cámara fotográfica profesional",
            price: 899.00,
            status: false
        },
        {
            image: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8",
            title: "Portátil ultraligero",
            price: 1099.99,
            status: true
        },
        {
            image: "https://images.unsplash.com/photo-1581291518837-47c2c2b9c9f0",
            title: "Zapatillas deportivas",
            price: 89.99,
            status: false
        }
    ];



    return (
        <>
            <section className=' p-10 flex flex-col gap-10 justify-center items-center'>
                <div>
                    <h1 className='text-4xl font-bold'>Productos destacados</h1>
                </div>
                <div className='flex gap-10 flex-wrap'>
                    {products.map(product => (
                        <div key={product.title}>
                            <Card image={product.image} title={product.title} price={product.price} status={product.status} />
                        </div>
                    ))}
                </div>
            </section>
        </>
    )
}

export default ShopPage


