"use client";
import Link from "next/link";
import React, { useState, useEffect, useContext } from "react";
import { Menu, X, CircleUser, ShoppingCart, LogOut, Languages } from "lucide-react";
import style from "./navbar.module.css";
import { useSession, signOut } from "next-auth/react";
import { Button } from "@heroui/react";
import { CardProductCar } from "../CardProductCar/CardProductCar";
import { ShoppingCartContext } from "@/context/ShoppingCarContext";
import ButtonBlack from "../ButtonBlack/ButtonBlack";
import { useShoppingCart } from "@/hooks/useShoppingCart";
import { useLanguage } from "@/context/LanguageContext";
import { languages } from "@/i18n";


export const Navbar = () => {

    const {t, language, setLanguage} = useLanguage()
    const { data: session } = useSession();
    const [open, setOpen] = useState(false);
    const toggleMenu = () => setOpen(!open);
    const [showCar, setShowCar] = useState(false)
    const [counterProducts, setCounterProducts] = useState(0)
    const [showSelect, setShowSelect] = useState(false);
    const context = useContext(ShoppingCartContext);
    const { productsList, setProductsList, total, setTotal } = useShoppingCart();

    


    // 🔥 Cierra el menú si se agranda la pantalla a más de 900px
    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth > 900) {
                setOpen(false);
            }
        };

        window.addEventListener("resize", handleResize);
    }, []);



    return (

        <nav className="relative w-full bg-white">
            <div className="px-40 flex justify-around items-center h-[70px]">
                {/* Logo */}
                <div className="flex justify-center items-center">
                    <Link href={"./"} className="text-4xl font-bold text-black">NEVZI</Link>
                </div>

                {/* Botón hamburguesa */}
                <button
                    onClick={toggleMenu}
                    className="[@media(min-width:900px)]:hidden focus:outline-none transition-all duration-300 ease-in-out"
                >
                    {open ? <X size={28} /> : <Menu size={28} />}
                </button>

                {/* Links escritorio */}
                <div
                    className={`${style["font-color-two"]} flex items-center gap-10 transition-all duration-300 ease-in-out max-[900px]:hidden`}
                >
                    <Link href="/">{t("navbar.home")}</Link>
                    <Link href="/shop">{t("navbar.shop")}</Link>
                    <Link href="/aboutour" className="pointer-events-none text-gray-400 cursor-not-allowed">{t("navbar.aboutus")}</Link>
                    <Link href="/contact" className="pointer-events-none text-gray-400 cursor-not-allowed">{t("navbar.contactus")}</Link>
                </div>

                {/* Iconos */}
                <div className="car-profile [@media(max-width:900px)]:hidden flex items-center gap-5">
                    <Link href="/login"><CircleUser className="text-black" /></Link>
                    <button className="cursor-pointer" onClick={() => { setShowCar(true) }}><ShoppingCart className="text-black" /></button>
                    <div className="relative">
                        <Languages
                            className="cursor-pointer"
                            onClick={() => setShowSelect(!showSelect)} />
                        {showSelect && (
                            <select
                                className="absolute top-8 right-0 border rounded-lg px-2 py-1 bg-white shadow-md border-none"
                                value={language}
                                onChange={(e)=>{setLanguage(e.target.value as 'en' | 'es')}}
                            >
                                {languages.map((lang)=>(
                                    <option className="font-semibold border-none bg-white hover:bg-transparent" value={lang.code} key={lang.code}>{lang.name}</option>
                                ))

                                }


                            </select>
                        )}
                    </div>





                    {session && (
                        <Button onClick={() => { signOut() }}><LogOut /></Button>
                    )}
                </div>
                {showCar && (
                    <div className="fixed inset-0 flex justify-end z-50">
                        {/* Fondo semitransparente */}
                        <div
                            className="absolute inset-0 bg-black/40 backdrop-blur-sm"
                            onClick={() => setShowCar(false)} // Cierra al hacer clic fuera
                        ></div>

                        {/* Panel lateral */}
                        <div
                            className="relative bg-white w-full sm:w-[400px] h-full shadow-2xl transform transition-transform duration-300 ease-in-out translate-x-0"
                        >
                            {/* Botón cerrar */}
                            <button
                                onClick={() => setShowCar(false)}
                                className="absolute top-4 right-4 text-gray-600 hover:text-black text-xl"
                            >
                                ✕
                            </button>

                            <div className="flex flex-col  h-full justify-between">
                                <div className="p-6 mt-8 flex justify-center flex-col ">
                                    <h2 className="text-2xl font-semibold mb-6 text-center">{t('navbar.cartTitle')}</h2>
                                    {/* className="space-y-4" */}
                                    {!session ? (
                                        <h1 className="text-white p-4 bg-black rounded-md">{t('navbar.mustRegister')}</h1>
                                    ) : (
                                        <div>
                                            <div className="flex justify-start"><h2 className="font-semibold">{t('navbar.products')}({counterProducts})</h2></div>
                                            <div className="flex flex-col gap-5">
                                                <CardProductCar />
                                            </div>
                                        </div>
                                    )

                                    }

                                </div>
                                <div className=" p-5 flex justify-center flex-col items-center gap-10">
                                    <div className="bg-white border-1 border-black text-black rounded-md w-auto flex justify-center p-3">
                                        <span className="font-bold">{total} $</span>
                                    </div>
                                    <div className="flex justify-center">
                                        <ButtonBlack content={t('navbar.pay')} />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                )}

            </div>

            {/* Menú hamburguesa */}
            {open && (
                <div className="absolute top-[70px] left-0 w-full bg-black border-t border-gray-700 transition-all duration-300 ease-in-out">
                    <div className="flex flex-col space-y-4 px-6 py-4 text-white">
                        <Link href="/" onClick={() => setOpen(false)}>
                            {t('navbar.home')}
                        </Link>
                        <Link href="/shop" onClick={() => setOpen(false)}>
                            {t('navbar.shop')}
                        </Link>
                        <Link href="/aboutour" onClick={() => setOpen(false)}>
                            {t('navbar.aboutus')}
                        </Link>
                        <Link href="/contact" onClick={() => setOpen(false)}>
                            {t('navbar.contactus')}
                        </Link>
                        <Link href="/login"><CircleUser className="text-white" /></Link>
                        <button className="cursor-pointer" onClick={() => { setShowCar(true) }}><ShoppingCart className="text-white" /></button>
                    </div>
                </div>
            )}
        </nav>
    );

};

export default Navbar;
