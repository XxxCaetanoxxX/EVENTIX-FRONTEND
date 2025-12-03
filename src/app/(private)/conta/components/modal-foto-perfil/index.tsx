"use client";
import { useImageModalStore } from "@/src/app/store/imageModal";
import { api } from "@/src/lib/axios/api";
import { useState } from "react";

interface Props {
    imageUrl?: string;
}

export function ModalFoto({ imageUrl }: Props) {
    const { isOpen, close } = useImageModalStore();

    const [preview, setPreview] = useState(imageUrl);
    const [file, setFile] = useState<File | null>(null);

    function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
        const fileSelected = e.target.files?.[0];
        if (!fileSelected) return;

        setFile(fileSelected);
        setPreview(URL.createObjectURL(fileSelected)); // gera preview temporário
    }

    async function handleSave() {
        if (!file) return;

        const formData = new FormData();
        formData.append("userfile", file);


        try {
            const res = await api.patch("/users/upload/image", formData,{
                headers: {
                    "Content-Type": "multipart/form-data"
                }
            });

            console.log("imagem enviada", res.data);
            close();
        } catch (e) {
            console.error(e)
        }

        close();
    }

    if (!isOpen) return null;

    return (
        <div
            onClick={close}
            className="fixed inset-0 bg-black/80 flex items-center justify-center z-50"
        >
            <div
                onClick={(e) => e.stopPropagation()}
                className="bg-white p-6 rounded-lg shadow-lg w-96"
            >
                <h2 className="text-xl font-semibold mb-4">Alterar foto</h2>

                <div className="flex flex-col items-center pb-5">

                    <input
                        id="file-input"
                        type="file"
                        accept="image/*"
                        className="hidden"
                        onChange={handleFileChange}
                    />


                    <label
                        htmlFor="file-input"
                        className="px-4 py-2 bg-purple-600 text-white rounded cursor-pointer shadow-md hover:bg-purple-700 transition"
                    >
                        Escolher imagem
                    </label>

                    <img
                        src={preview}
                        alt="Foto de perfil"
                        className="w-32 h-32 rounded-full mt-4 object-cover border"
                    />
                </div>

                <div className="flex justify-end gap-3">
                    <button onClick={close} className="px-4 py-2 bg-gray-300 rounded cursor-pointer">
                        Cancelar
                    </button>
                    <button
                        onClick={handleSave}
                        className="px-4 py-2 bg-purple-600 text-white rounded cursor-pointer disabled:cursor-auto disabled:bg-purple-300"
                        disabled={!file}
                    >
                        Salvar
                    </button>
                </div>
            </div>
        </div>
    );
}
