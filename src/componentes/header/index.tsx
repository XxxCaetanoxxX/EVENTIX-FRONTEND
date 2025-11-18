"use client"
import { useModalStore } from "@/src/app/store/modalStore";
import { ColorsEnum } from "@/src/styles/colors.enum";
import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";
import { FiMenu, FiX, FiLogOut } from "react-icons/fi";
import { useUserStore } from "@/src/app/store/userStore";
import { cleanCookies } from "@/src/lib/utils/cleanCookies";
import { useRouter } from "next/navigation";

export function Header() {
    const [menuOpen, setMenuOpen] = useState(false);
    const { user, clearUser } = useUserStore();
    const { open } = useModalStore();
    const [isMounted, setIsMounted] = useState(false); //tratar erro de hidratação
    const router = useRouter();

    // Garante que o componente só acesse o user após carregar no navegador, tratando erro de hidratação
    useEffect(() => {
        setIsMounted(true);
    }, []);

    async function handleLogout() {
        await cleanCookies();
        clearUser();


        router.refresh(); //esencial para recarregar a pagina e ver que o cookie sumiu
        router.push("/");
    }

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
                className={`${menuOpen ? "flex z-50" : "hidden"} 
                sm:flex flex-col sm:flex-row gap-4 sm:gap-6 font-bold text-center items-center absolute sm:static top-[70px] left-0 w-full sm:w-auto bg-white sm:bg-transparent py-4 sm:py-0 shadow-sm sm:shadow-none`}
            >
                <a href="#" className="block px-4 py-2 hover:text-[#7B2CBF]">
                    Criar evento
                </a>
                <a href="#" className="block px-4 py-2 hover:text-[#7B2CBF]">
                    Meus ingressos
                </a>

                {!isMounted ? (
                    /* Skeleton ou espaço vazio enquanto carrega para evitar piscada */
                    <div className="w-20 h-10"></div>
                ) : user ? (
                    // --- COMPONENTE DE USUÁRIO LOGADO ---
                    <div className="flex items-center gap-3 px-4 sm:px-0">
                        <div className="flex flex-col text-right text-sm leading-tight hidden sm:block">
                            <span className="font-bold text-gray-700">{user.name}</span>
                            <span className="text-xs text-gray-500 text-right truncate w-24 block ml-auto">{user.email}</span>
                        </div>

                        {/* Avatar do usuário ou a letra inicial */}
                        <div className="w-10 h-10 rounded-full overflow-hidden border-2 border-[#7B2CBF]">
                            {user.image ? (
                                <img src={user.image} alt={user.name} className="w-full h-full object-cover" />
                            ) : (
                                <div className="w-full h-full bg-gray-300 flex items-center justify-center text-[#7B2CBF]">
                                    {user.name.charAt(0).toUpperCase()}
                                </div>
                            )}
                        </div>

                        <button
                            onClick={handleLogout}
                            className="ml-2 text-red-500 hover:text-red-700 transition text-xl"
                            title="Sair"
                        >
                            <FiLogOut />
                        </button>
                    </div>
                ) : (
                    <button
                        onClick={open}
                        className="block bg-[#F2F2F2] rounded-2xl px-6 py-2 mx-4 sm:mx-0 hover:bg-[#e6e6e6] transition"
                    >
                        Login
                    </button>
                )}
            </nav>
        </header>
    )
}