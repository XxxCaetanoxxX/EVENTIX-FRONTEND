"use client";
import Image from "next/image";
import { useModalStore } from "../../app/store/modalStore";
import { ColorsEnum } from "@/src/styles/colors.enum";
import { FcGoogle } from "react-icons/fc";
import { useState } from "react";
import { FiEye, FiEyeOff } from "react-icons/fi";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useUserStore } from "@/src/app/store/userStore";

const schema = z.object({
    email: z.string().email("Digite um email válido.").min(1, "Email é obrigatório."),
    password: z.string().min(1, "Senha é obrigatória.").min(6, "Digite uma senha com pelo menos 6 caracteres."),
})

type FormData = z.infer<typeof schema>;

export function LoginModal() {
    const { isOpen, close } = useModalStore();
    const [visible, setVisible] = useState(false);


    const { register, handleSubmit, formState: { errors } } = useForm<FormData>({
        resolver: zodResolver(schema),
    })

    if (!isOpen) return null;

    async function handleSubmitForm(data: FormData) {
        const res = await fetch('http://localhost:3001/api/auth/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })

        if (res.status === 200) {
            const userRes = await fetch("/api/users/me");
            if (userRes.status === 200) {
                const userData = await userRes.json();
                useUserStore.getState().setUser(userData);
                console.log("User data:", useUserStore.getState().user);
            }
            close();
        }

    }

    return (
        <div className="fixed inset-0 z-20">
            <div
                className="absolute inset-0 bg-black/90 flex justify-center items-center"
                onClick={close}
            >
                <div
                    onClick={(e) => e.stopPropagation()}
                    className="bg-white flex flex-col items-center p-6 rounded-2xl shadow-lg w-80 relative"
                >
                    <Image
                        className="mx-auto"
                        src="/assets/logo_2_sem_fundo.png"
                        alt="logo"
                        width={100}
                        height={100}
                    />

                    <form className="pt-6 flex flex-col w-full" onSubmit={(handleSubmit(handleSubmitForm))}>
                        <section className="flex flex-col gap-6">
                            <div className="relative">
                                <label
                                    htmlFor="email"
                                    className="absolute -top-3 left-5 bg-white px-1 text-sm font-semibold text-gray-700"
                                >
                                    Email
                                </label>
                                <input
                                    id="email"
                                    type="email"
                                    placeholder="Digite seu email"
                                    className="placeholder:pl-2 placeholder:font-semibold w-full rounded-2xl border border-gray-400 p-2 text-sm focus:border-purple-600 focus:ring-0 outline-none"
                                    {...register("email")}
                                />
                                {errors.email && (
                                    <span className="text-xs font-semibold text-red-600 mt-1">
                                        {errors.email.message}
                                    </span>
                                )}
                            </div>

                            <div className="relative">
                                <label className="absolute -top-3 left-5 bg-white px-1 text-sm font-semibold text-gray-700">Senha</label>
                                <input
                                    id="password"
                                    type={visible ? "text" : "password"}
                                    placeholder="Digite sua senha"
                                    className="placeholder:pl-2 placeholder:font-semibold w-full border rounded-2xl border-gray-400 p-2 text-sm focus:border-purple-600 focus:ring-0 outline-none"
                                    {...register("password")}
                                />
                                <button
                                    type="button"
                                    className="absolute top-2 right-3 cursor-pointer"
                                    onClick={() => setVisible(!visible)}
                                    aria-label={visible ? "Esconder senha" : "Mostrar senha"}
                                >
                                    {visible ? (
                                        <FiEyeOff
                                            size={20}
                                        />
                                    ) : (
                                        <FiEye
                                            size={20}
                                        />
                                    )}
                                </button>
                                <button className="absolute top-9 font-bold right-3 text-xs hover:underline" style={{ color: ColorsEnum.PRIMARY_PURPLE }}>Esqueci minha senha</button>
                                {errors.password && (
                                    <span className="relative top-1.5 text-xs font-semibold text-red-600 mt-1">
                                        {errors.password.message}
                                    </span>
                                )}
                            </div>
                        </section>

                        <button
                            type="submit"
                            className="text-white py-2 rounded-3xl font-bold mt-8"
                            style={{ backgroundColor: ColorsEnum.PRIMARY_PURPLE }}
                        >
                            ENTRAR
                        </button>

                        <h2 className="text-center text-sm font-semibold my-2">OU</h2>

                        <button
                            type="button"
                            className="flex items-center justify-center gap-2 py-3 rounded-2xl font-bold text-black text-sm mb-2"
                            style={{ backgroundColor: ColorsEnum.BACKGROUND_INPUT }}
                        >
                            <FcGoogle size={18} />
                            <span>Continue com o Google</span>
                        </button>

                        <span className="text-center text-sm font-bold pt-6">
                            Não possui conta?{" "}
                            <a href="#" className="hover:underline"
                                style={{
                                    color: ColorsEnum.PRIMARY_PURPLE,
                                    textDecorationColor: ColorsEnum.PRIMARY_PURPLE
                                }}>
                                Cadastre-se
                            </a>
                        </span>
                    </form>
                </div>
            </div>
        </div>
    );
}
