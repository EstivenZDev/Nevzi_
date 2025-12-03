"use client";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import ButtonBlack from '../../components/ButtonBlack/ButtonBlack';
import Card from "@/components/CardProduct/Card";
import Link from "next/link";
import CreateProductForm from "@/components/CreateProductForm/FormProduct";
import { Modal } from "@/components/Modal/Modal";
import { useEffect, useState } from "react";
import { getProducts } from "@/services/product/product";
import { div } from "framer-motion/client";
import { Spinner, Button } from "@heroui/react";
import { FormCategorty } from '../../components/CreateCategoryForm/FormCategorty';

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


export default function DashboardPage() {
  const { status } = useSession();
  const [statusModal, setStatusModal] = useState(false)
  const [statusModalCategory, setStatusModalCategory] = useState(false)
  const [products, setProducts] = useState<ProductProps[]>([])
  const [loading, setLoading] = useState(false)
  const [page, setPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)
  const [perPage] = useState(2)
  const [search, setSearch] = useState("")
  const router = useRouter();


  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true)
      try {
        const { data: { data, pagination } } = await getProducts(page, perPage, search)
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

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Spinner classNames={{label: "text-foreground mt-4"}} label="Cargando" variant="dots" />
      </div>
    );
  }



  // if (status === "unauthenticated") {
  //   router.push("/login");
  //   return null;
  // }

  const closeModal = () => {
    setStatusModal(false)
    setStatusModalCategory(false)
  }

  const handleNextPage = () => {
    if (page < totalPages) setPage(page + 1)
  }

  const handlePrevPage = () => {
    if (page > 1) setPage(page - 1)
  }



  return (
    <>
      <section className=" p-10 flex flex-col gap-10">
        <div className="flex justify-end gap-5">
          <ButtonBlack content="Crear producto" onClick={() => { setStatusModal(true) }} />
          <ButtonBlack content="Crear categoria" onClick={() => { setStatusModalCategory(true) }} />
        </div>
        <div className="flex flex-wrap gap-8">
          {products?.length > 0 && products.map((product) => (
            <div key={product._id}>
              <Card image={product.image} price={product.price} title={product.name} status={product.status} gender={product.gender} amount={product.amount} />
            </div>
          ))}
        </div>

        {/* Paginación */}
        <div className='flex gap-4 items-center mt-10 justify-center'>
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
        <p className='text-sm text-gray-500 text-center'>Página {page} de {totalPages}</p>
      </section>
      <Modal isOpen={statusModal} onClose={closeModal} title="Ejemplo">
        <CreateProductForm />
      </Modal>
      <Modal isOpen={statusModalCategory} onClose={closeModal} title="Ejemplo">
        <FormCategorty/>
      </Modal>
    </>
  );
}