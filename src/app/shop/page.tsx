"use client"
import React, { useEffect, useState } from 'react'
import Card from '@/components/CardProduct/Card'
import Image from 'next/image';
import { getProducts } from '@/services/product/product';
import { Spinner, Button } from '@heroui/react';

interface ProductProps {
  _id: string;
  name: string;
  image: string;
  price: number;
  status:boolean;
  gender: string;
  amount: number;
  category: string
}

const ShopPage = () => {

    const [products, setProducts] = useState<ProductProps[]>([])
    const [statusGet, setStatusGet] = useState<number>()
    const [loading, setLoading] = useState(false)
    const [page, setPage] = useState(1)
    const [totalPages, setTotalPages] = useState(1)
    const [perPage] = useState(2)
    const [search, setSearch] = useState("")

    useEffect(() => {
        const fetchProducts = async () => {
            setLoading(true)
            try {
                const { status, data: { data, pagination } } = await getProducts(page, perPage, search)
                setStatusGet(status)
                setProducts(data)
                setTotalPages(pagination?.totalPages || 1)
            } catch (error) {
                console.error(error)
            } finally {
                setLoading(false)
            }

        }

        fetchProducts()
    }, [page, perPage, search])

    const handleNextPage = () => {
        if (page < totalPages) setPage(page + 1)
    }

    const handlePrevPage = () => {
        if (page > 1) setPage(page - 1)
    }

    return (
        <>
            <section className=' p-10 flex flex-col gap-10 justify-center items-center'>
                <div>
                    <h1 className='text-4xl font-bold'>Productos destacados</h1>
                </div>
                <div className='flex gap-10 flex-wrap justify-center'>
                    {statusGet == 200 && products.map((product) => (
                        <div key={product._id}>
                            <Card image={product.image} price={product.price} title={product.name} status={product.status} />
                        </div>
                    ))}
                </div>
                
                {/* Paginación */}
                <div className='flex gap-4 items-center mt-10'>
                    <Button 
                        isDisabled={page === 1} 
                        onClick={handlePrevPage}
                        className='bg-black text-white disabled:bg-gray-400'
                    >
                        Anterior
                    </Button>
                    
                    <div className='flex gap-2'>
                        {Array.from({ length: totalPages }, (_, i) => i + 1).map((pageNum) => (
                            <Button
                                key={pageNum}
                                isIconOnly
                                onClick={() => setPage(pageNum)}
                                className={pageNum === page ? 'bg-black text-white' : 'bg-gray-200 text-black'}
                            >
                                {pageNum}
                            </Button>
                        ))}
                    </div>
                    
                    <Button 
                        isDisabled={page === totalPages} 
                        onClick={handleNextPage}
                        className='bg-black text-white disabled:bg-gray-400'
                    >
                        Siguiente
                    </Button>
                </div>
                <p className='text-sm text-gray-500'>Página {page} de {totalPages}</p>
            </section>
        </>
    )
}

export default ShopPage


