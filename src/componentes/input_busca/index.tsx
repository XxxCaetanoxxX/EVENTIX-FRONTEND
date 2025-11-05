"use client";

import { ColorsEnum } from "@/src/styles/colors.enum";
import { FiSearch } from "react-icons/fi";

export function InputBusca() {
    return (

        <div className="w-full flex items-center justify-center">
            <form className="w-4/5 sm:w-2/5 my-5 p-2 flex rounded-lg focus-within:ring-2 focus-within:ring-[#7B2CBF]" style={{ backgroundColor: ColorsEnum.BACKGROUND_INPUT }}>
                <input
                    className="outline-none w-full bg-transparent placeholder:text-black"
                    type="text"
                    placeholder="Pesquisar..."
                >
                </input>
                <button type="submit">
                    <FiSearch color="#000000" />
                </button>
            </form>
        </div>
    );
}
