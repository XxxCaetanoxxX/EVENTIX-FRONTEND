"use client";
import { ColorsEnum } from "@/src/styles/colors.enum";
import { z } from "zod"
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Cleave from "cleave.js/react";

interface Props {
    user: UserProps
}

interface UserProps {
    id: number,
    name: string,
    email: string,
    phone: string,
    cpf: string,
    role: string,
    image: ImageProps
}

interface ImageProps {
    path: string
}

const schema = z.object({
    name: z.string().min(3, "Nome deve ter pelo menos 3 dígitos."),
    phone: z
        .string()
        .transform(value => value.replace(/\D/g, "")) // remove máscara
        .refine(value => /^\d{13}$/.test(value), "Digite um número válido."),
    password: z.string().optional().refine((value) => {
        if (!value) return true;
        return /^(?=(?:.*[a-zA-Z]){3,})(?=.*\d).+$/.test(value);
    }, "Senha deve ter pelo menos 3 letras e 1 numero.")
});


type FormData = z.infer<typeof schema>

export default function PerfilForm({ user }: Props) {

    const { register, control, handleSubmit, formState: { errors } } = useForm<FormData>({
        resolver: zodResolver(schema),
        defaultValues: {
            name: user.name,
            phone: formatPhone(user.phone), // <<< AGORA FUNCIONA
            password: ""
        }
    });



    function sendForm(data: FormData) {
        console.log("Enviou", data);
    }
    function formatPhone(value: string) {
        if (!value) return "";
        return `+55 (${value.slice(2, 4)}) ${value.slice(4, 9)}-${value.slice(9)}`;
    }


    return (
        <div className="flex h-[calc(100vh-62.81px)] justify-center items-center">
            <div className="flex flex-col w-11/12 md:w-3/4 rounded-md shadow-2xl p-4" style={{ backgroundColor: ColorsEnum.BG_HEADER }}>

                <strong className="text-2xl font-bold pl-4">Meus dados</strong>

                <hr className="m-2 border-1 border-gray-300 bg-gray-300 h-px" />

                <div className="flex justify-center items-center pt-8">
                    <div className="h-40 w-40 rounded-full bg-gray-300">
                        <img src={user.image.path} alt="user image" className="h-40 w-40 rounded-full" />
                    </div>
                </div>

                <form onSubmit={handleSubmit(sendForm)} className="grid grid-cols-1 md:grid-cols-3 gap-10 pt-8">
                    <div className="flex flex-col flex-1 relative">
                        <label className="absolute bg-white -top-3 left-3 font-bold">Nome</label>
                        <input className="border border-gray-300 rounded-md w-full h-10 pl-3"
                            {...register("name")}
                            defaultValue={user.name}
                        ></input>
                        {errors.name && (
                            <span className="text-xs font-semibold text-red-600 mt-1">
                                {errors.name.message}
                            </span>
                        )}
                    </div>

                    <div className="flex flex-col flex-1 relative">
                        <label className="absolute bg-white -top-3 left-3 font-bold">Telefone</label>
                        <Controller
                            control={control}
                            name="phone"
                            render={({ field }) => (
                                <Cleave
                                    {...field}
                                    options={{
                                        prefix: "+55",
                                        delimiters: [" ", "(", ") ", "-"],
                                        blocks: [3, 0, 2, 5, 4],
                                        numericOnly: true
                                    }}
                                    className="border rounded-md w-full h-10 pl-3"
                                />
                            )}
                        />

                        {/* <input
                        type="number"
                            {...register("phone")}
                            className="border border-gray-300 rounded-md w-full h-10 pl-3"
                            defaultValue={user.phone}
                        ></input> */}
                        {errors.phone && (
                            <span className="text-xs font-semibold text-red-600 mt-1">
                                {errors.phone.message}
                            </span>
                        )}
                    </div>

                    <div className="flex flex-col flex-1 relative">
                        <label className="absolute bg-white -top-3 left-3 font-bold" style={{ color: ColorsEnum.PRIMARY_PURPLE }}>Senha</label>
                        <input
                            className="border rounded-md w-full h-10 pl-3 focus:outline-1 focus:outline-purple-500" style={{ color: ColorsEnum.PRIMARY_PURPLE }}
                            defaultValue={""}
                            placeholder="Digite para trocar a senha atual"
                            {...register("password")}
                            type="password"
                        ></input>
                        {errors.password && (
                            <span className="text-xs font-semibold text-red-600 mt-1">
                                {errors.password.message}
                            </span>
                        )}
                    </div>

                    <div className="flex flex-col flex-1 relative">
                        <label className="absolute bg-white -top-3 left-3 font-bold text-gray-300">Email</label>
                        <input className="border border-gray-300 rounded-md w-full h-10 pl-3 cursor-not-allowed text-gray-300 outline-none"
                            value={user.email || ""}
                            readOnly
                        ></input>
                    </div>

                    <div className="flex flex-col flex-1 relative">
                        <label className="absolute bg-white -top-3 left-3 font-bold text-gray-300">Cpf</label>
                        <input className="border border-gray-300 rounded-md w-full h-10 pl-3 cursor-not-allowed text-gray-300 outline-none"
                            value={user.cpf || ""}
                            readOnly
                        ></input>
                    </div>
                    <button className="bg-[#7B2CBF] text-white py-2 rounded-md cursor-pointer" type="submit">Salvar</button>
                </form>

            </div>
        </div>
    );
}