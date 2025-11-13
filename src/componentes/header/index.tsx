"use client"
import { useModalStore } from "@/src/app/store/modalStore";
import { ColorsEnum } from "@/src/styles/colors.enum";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { FiMenu, FiX } from "react-icons/fi";


export function Header() {
    const [menuOpen, setMenuOpen] = useState(false);
    const { open } = useModalStore();

    return (
        <header className="shadow-2xl flex justify-between items-center pl-0 pr-4" style={{ backgroundColor: ColorsEnum.BG_HEADER }}>

                <Link className="flex items-center" href={"/"}>
                    <Image
                        src={"/assets/logo.png"}
                        alt="logo"
                        width={60}
                        height={60}
                    />
                    <p style={{ color: ColorsEnum.PRIMARY_PURPLE }} className="text-xl font-bold">EVENTIX</p>
                </Link>


            <button className="sm:hidden text-3xl"
                onClick={() => setMenuOpen(!menuOpen)}
            >
                {menuOpen ? <FiX className="cursor-pointer" /> : <FiMenu className="cursor-pointer" />}
            </button>

            <nav
                className={`${menuOpen ? "flex z-1" : "hidden"} 
                sm:flex flex-col sm:flex-row gap-4 sm:gap-6 font-bold text-center absolute sm:static top-[70px] left-0 w-full sm:w-auto bg-white sm:bg-transparent py-4 sm:py-0 shadow-sm sm:shadow-none`}
            >
                <a href="#" className="block px-4 py-2 hover:text-[#7B2CBF]">
                    Criar evento
                </a>
                <a href="#" className="block px-4 py-2 hover:text-[#7B2CBF]">
                    Meus ingressos
                </a>
                <button
                    onClick={open}
                    className="block bg-[#F2F2F2] rounded-2xl px-6 py-2 mx-4 sm:mx-0 hover:bg-[#e6e6e6] transition"
                >
                    Login
                </button>
            </nav>

        </header>
    )
}