import { nest } from "@/src/lib/axios/nest";
import { cleanCookies } from "@/src/lib/utils/utils";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function POST() {
    const cookieStore = await cookies();
    const refreshToken = cookieStore.get("refreshToken")?.value;
    
    if (!refreshToken) {
        return NextResponse.json({ message: "Sem refresh token" }, { status: 401 });
    }

    try {
        const response = await nest.post('/users/refresh', {}, {
            headers: {
                Authorization: `Bearer ${refreshToken}`,
                "Content-Type": "application/json",
            }
        });

        if (response.status !== 201) {
            throw new Error("Falha ao renovar");
        }

        const data = response.data;

        const { accessToken: newAccess, refreshToken: newRefresh } = data;

        //  atualiza accesstoken
        cookieStore.set("accessToken", newAccess, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            path: "/",
            sameSite: "lax",
            maxAge: 60 * 15, //15 min
        });

        // atualiza refreshtoken
        cookieStore.set("refreshToken", newRefresh, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            path: "/",
            sameSite: "lax",
            maxAge: 60 * 60 * 24 * 7, //7 dias
        });

        console.log("Tokens renovados");


        return NextResponse.json({ message: "Tokens renovados" });

    } catch (error) {
        await cleanCookies();
        return NextResponse.json({ message: "Sessão expirada" }, { status: 401 });
    }
}