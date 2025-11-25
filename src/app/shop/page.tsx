"use client"
import React, { useEffect, useState } from 'react'
import Card from '@/components/CardProduct/Card'
import Image from 'next/image';
import { getProducts } from '@/services/product/product';
import { Spinner } from '@heroui/react';

const ShopPage = () => {

    const [products, setProducts] = useState([])
    const [statusGet, setStatusGet] = useState<number>()
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        const fetchProducts = async () => {
            setLoading(true)
            try {
                const { status, data: { data } } = await getProducts()
                setStatusGet(status)
                setProducts(data)
            } catch (error) {
                console.error(error)
            } finally {
                setLoading(false)
            }

        }

        fetchProducts()
    }, [])

    if (loading) {
        return (
            <div className="flex justify-center items-center h-screen">
                <Spinner classNames={{ label: "text-foreground mt-4" }} label="Cargando" variant="dots" />
            </div>
        );
    }


    return (
        <>
            <section className=' p-10 flex flex-col gap-10 justify-center items-center'>
                <div>
                    <h1 className='text-4xl font-bold'>Productos destacados</h1>
                </div>
                <div className='flex gap-10 flex-wrap'>
                    {statusGet == 200 && products.map((product) => (
                        <div key={product._id}>
                            <Card image={product.image} price={product.price} title={product.name} status={product.status} />
                        </div>
                    ))}
                </div>
            </section>
        </>
    )
}

export default ShopPage


