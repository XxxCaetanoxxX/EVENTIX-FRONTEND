import { cookies } from "next/headers";
import { NextResponse } from "next/server";

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL!;

export async function POST() {
    const cookieStore = await cookies();
    const refreshToken = cookieStore.get("refreshToken")?.value;

    if (!refreshToken) {
        return NextResponse.json({ message: "Sem refresh token" }, { status: 401 });
    }

    try {
        const response = await fetch(`${BASE_URL}/users/refresh`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${refreshToken}`
            },
        });

        if (!response.ok) {
            throw new Error("Falha ao renovar");
        }

        const data = await response.json();

        const { accessToken: newAccess, refreshToken: newRefresh } = data;

        //  atualiza accesstoken
        cookieStore.set("accessToken", newAccess, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            path: "/",
        });

        // atualiza refreshtoken
        cookieStore.set("refreshToken", newRefresh, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            path: "/",
        });


        return NextResponse.json({ message: "Tokens renovados" });

    } catch (error) {
        cookieStore.delete("accessToken");
        cookieStore.delete("refreshToken");
        return NextResponse.json({ message: "Sessão expirada" }, { status: 401 });
    }
}