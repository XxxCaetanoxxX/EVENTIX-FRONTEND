import { FaInstagram, FaTwitter, FaLinkedin } from "react-icons/fa";
import Image from "next/image";

export function Footer() {
    return (
        <footer className="bg-gray-100 border-t border-gray-200 py-6">
            <div className="max-w-6xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-6">

                <div className="flex flex-col items-center">
                    <div className="flex items-center gap-2">
                        <Image src="/assets/logo_2_sem_fundo.png" alt="logo" width={100} height={100} />
                    </div>
                    <div className="flex gap-3 mt-2">
                        <FaInstagram className="text-gray-700 hover:text-purple-600 cursor-pointer" size={20} />
                        <FaTwitter className="text-gray-700 hover:text-purple-600 cursor-pointer" size={20} />
                        <FaLinkedin className="text-gray-700 hover:text-purple-600 cursor-pointer" size={20} />
                    </div>
                </div>


                <div>
                    <h3 className="font-semibold mb-1">Termos</h3>
                    <ul className="space-y-1">
                        <li><a href="#">Compromisso</a></li>
                        <li><a href="#">Lei meia entrada</a></li>
                        <li><a href="#">Privacidade</a></li>
                    </ul>
                </div>
                <div>
                    <h3 className="font-semibold mb-1">Empresa</h3>
                    <ul className="space-y-1">
                        <li><a href="#">Sobre nós</a></li>
                        <li><a href="#">Fale conosco</a></li>
                        <li><a href="#">Dúvidas</a></li>
                    </ul>
                </div>


                <div className="flex flex-col items-center md:items-end">
                    <span className="text-sm font-semibold text-gray-800 mb-2">Também disponível:</span>
                    <div className="flex gap-4">
                        <Image src="/assets/apple.svg" alt="App Store" width={50} height={50} />
                        <Image src="/assets/google.svg" alt="Google Play" width={50} height={50} />
                    </div>
                </div>
            </div>
        </footer>
    );
}
