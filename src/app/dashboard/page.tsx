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
import { Spinner } from "@heroui/react";
import { FormCategorty } from '../../components/CreateCategoryForm/FormCategorty';

export default function DashboardPage() {
  const { status } = useSession();
  const [statusModal, setStatusModal] = useState(false)
  const [statusModalCategory, setStatusModalCategory] = useState(false)
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(false)
  const router = useRouter();


  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true)
      try {
        const data = await getProducts()
        setProducts(data.data.data)
      } catch (error) {
        console.error(error)
      } finally {
        setLoading(false)
      }

    }

    fetchProducts()
    console.log(products)
  }, [])

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Spinner classNames={{label: "text-foreground mt-4"}} label="Cargando" variant="dots" />
      </div>
    );
  }



  if (status === "unauthenticated") {
    router.push("/login");
    return null;
  }

  const closeModal = () => {
    setStatusModal(false)
    setStatusModalCategory(false)
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
              <Card image={product.image} price={product.price} title={product.name} status={product.status} gender={product.gender} amount={product.amount} category={product.category.name} />
            </div>
          ))}
        </div>
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