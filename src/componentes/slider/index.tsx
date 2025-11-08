"use client"

import Image from "next/image"
import { useRef } from "react"
import { FiArrowLeft, FiArrowRight } from "react-icons/fi";

interface Props {
    title: string
}

export function EventSlider({ title }: Props) {
    const eventos = [
        { id: 1, nome: "Evento 1", local: "São Paulo", data: "10/11/2025", url: "/assets/event.jpeg" },
        { id: 2, nome: "Evento 2", local: "Rio de Janeiro", data: "12/11/2025", url: "/assets/event2.jpeg" },
        { id: 3, nome: "Evento 3", local: "Curitiba", data: "20/11/2025", url: "/assets/event3.jpg" },
        { id: 4, nome: "Evento 1", local: "São Paulo", data: "10/11/2025", url: "/assets/event.jpeg" },
        { id: 5, nome: "Evento 2", local: "Rio de Janeiro", data: "12/11/2025", url: "/assets/event2.jpeg" },
        { id: 6, nome: "Evento 3", local: "Curitiba", data: "20/11/2025", url: "/assets/event3.jpg" },
        { id: 7, nome: "Evento 1", local: "São Paulo", data: "10/11/2025", url: "/assets/event.jpeg" },
        { id: 8, nome: "Evento 2", local: "Rio de Janeiro", data: "12/11/2025", url: "/assets/event2.jpeg" },
        { id: 9, nome: "Evento 3", local: "Curitiba", data: "20/11/2025", url: "/assets/event3.jpg" },
        { id: 10, nome: "Evento 1", local: "São Paulo", data: "10/11/2025", url: "/assets/event.jpeg" },
        { id: 11, nome: "Evento 2", local: "Rio de Janeiro", data: "12/11/2025", url: "/assets/event2.jpeg" },
        { id: 12, nome: "Evento 3", local: "Curitiba", data: "20/11/2025", url: "/assets/event3.jpg" },
    ]

    const scrollref = useRef<HTMLDivElement>(null);

    function handleScrollLeft() {
        if (scrollref.current) {
            scrollref.current.scrollLeft -= 300;
        }
    }

    function handleScrollRight() {
        if (scrollref.current) {
            scrollref.current.scrollLeft += 300;
        }
    }

    return (
        <div className="pt-5">
            <h2 className="font-bold text-2xl pb-2">{title}</h2>
            <div className="w-full relative">
                <div ref={scrollref} className="w-full h-80 overflow-x-scroll scroll-smooth hide-scrollbar ">
                    <div className="flex gap-1">
                        {eventos.map(evento => (
                            <div key={evento.id} className=" min-w-60 flex flex-col items-center justify-between">
                                <Image src={evento.url} alt="banner" width={180} height={180} />
                                <section className="w-full text-start pl-10">
                                    <h2 className="font-bold text-md">{evento.nome}</h2>
                                    <p className="text-sm">{evento.local}</p>
                                    <p className="text-sm">{evento.data}</p>
                                </section>
                            </div>
                        ))}
                    </div>
                </div>

                <button
                    onClick={handleScrollLeft}
                    className="absolute left-2 top-4/10 -translate-y-1/2 bg-white rounded-full p-2 shadow-md z-10 hover:bg-gray-100"
                >
                    <FiArrowLeft size={24} />
                </button>

                <button
                    onClick={handleScrollRight}
                    className="absolute right-2 top-4/10 -translate-y-1/2 bg-white rounded-full p-2 shadow-md z-10 hover:bg-gray-100"
                >
                    <FiArrowRight size={24} />
                </button>
            </div>
        </div>

    )
}
