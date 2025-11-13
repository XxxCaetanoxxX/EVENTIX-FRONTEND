"use client"
import { api } from "@/src/lib/axios/api";
import { ColorsEnum } from "@/src/styles/colors.enum";
import { FindAllEventsResponse } from "@/src/types/event.interface";
import { EventEnum } from "@/src/types/event.enum";
import { useState } from "react";
import { FiSearch } from "react-icons/fi";

export function BarraPesquisa() {

    const [busca, setBusca] = useState("");
    const [estado, setEstado] = useState("");
    const [categoria, setCategoria] = useState<EventEnum | "">("");

    const categorias = Object.values(EventEnum);
    const estados = ["AC", "AL", "AP", "AM", "BA", "CE", "DF", "ES", "GO", "MA", "MT", "MS", "MG", "PA", "PB", "PR", "PE", "PI", "RJ", "RN", "RS", "RO", "RR", "SC", "SP", "SE", "TO"]

    async function buscar() {
        try {
            const res = await api.get<FindAllEventsResponse>("/events", {
                params: {
                    ...(busca && { name: busca }),
                    ...(categoria && { tp_evento: categoria }),
                    take: 10,
                    skip: 0,
                },
            });

            console.log(res.data);
        } catch (e) {
            console.error(e);
        } finally {
            setBusca("");
            setEstado("");
            setCategoria("");
        }
    }

    return (
        <div className="w-3xl mx-auto flex flex-col gap-3 bg-gray-50 p-4 rounded-b-3xl"
            style={{ backgroundColor: ColorsEnum.BG_HEADER }}
        >
            <div className="flex flex-wrap gap-3">
                <div className="flex items-center rounded px-3 w-full sm:w-1/3" style={{ backgroundColor: ColorsEnum.BACKGROUND_INPUT }}>
                    <input
                        type="text"
                        placeholder="Busca"
                        value={busca}
                        onChange={(e) => setBusca(e.target.value)}
                        className="w-full outline-none py-2 text-black placeholder-gray-600"

                    />
                    <button
                        onClick={buscar}
                    >
                        <FiSearch className="text-gray-700" size={20} />
                    </button>
                </div>


                <select
                    value={estado}
                    onChange={(e) => setEstado(e.target.value)}
                    className="rounded py-1 px-2 flex-1"
                    style={{ backgroundColor: ColorsEnum.BACKGROUND_INPUT }}
                >
                    <option value="">Selecione o estado</option>
                    {estados.map((e) => {
                        return <option key={e} value={e}>
                            {e}
                        </option>
                    })}
                </select>


                <select
                    value={categoria}
                    onChange={(e) => setCategoria(e.target.value as EventEnum)}
                    className="rounded py-1 px-2 flex-1"
                    style={{ backgroundColor: ColorsEnum.BACKGROUND_INPUT }}
                >
                    <option value="">Categoria</option>
                    {categorias.map((c) => {
                        return <option key={c} value={c}>
                            {c}
                        </option>
                    })}

                </select>
            </div>
            <p className="text-black text-md font-semibold">Eventos referentes a busca:{" "}
                <span className="font-bold">{busca || "..."}</span>
            </p>

        </div>
    )

}