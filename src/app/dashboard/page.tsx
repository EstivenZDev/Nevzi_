"use client";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import ButtonBlack from '../../components/ButtonBlack/ButtonBlack';
import Card from "@/components/CardProduct/Card";
import Link from "next/link";

export default function DashboardPage() {
  // const { data: session, status } = useSession();
  // const router = useRouter();

  // if (status === "loading") {
  //   return <p>Cargando...</p>;
  // }

  // if (status === "unauthenticated") {
  //   router.push("/login");
  //   return null;
  // }

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
      <section className=" p-10 flex flex-col gap-10">
        <div className= "flex justify-end">
          <ButtonBlack content="Create product" />
        </div>
        <div className="flex flex-wrap gap-8">
          {products.map(product => (
            <div key={product.title}>
              <Card image={product.image} title={product.title} price={product.price} status={product.status} />
            </div>
          ))}
        </div>
      </section>

      <Link href={"/dashboard/createProducts"}>Crear productos</Link>
    </>
  );
}