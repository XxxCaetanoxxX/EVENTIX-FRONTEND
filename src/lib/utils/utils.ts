"use server";
import { cookies } from "next/headers";
import * as jwt from 'jsonwebtoken';
import { NextRequest, NextResponse } from "next/server";


export async function cleanCookies() {
    const cookiesStore = await cookies();
    cookiesStore.delete("accessToken");
    cookiesStore.delete("refreshToken");
}

export async function isAccessTokenExpired(token: string) {
    const decoded = jwt.decode(token) as jwt.JwtPayload | null;

    if (!decoded || !decoded.exp) {
        // Se não conseguiu decodificar ou não tem exp, considere expirado
        return true;
    }

    const now = Math.floor(Date.now() / 1000);
    return decoded.exp < now;
}

export async function isAuthenticated(accessToken: string | undefined, refreshToken: string | undefined) {

    if (!accessToken || !refreshToken) return false;

    const isExpired = await isAccessTokenExpired(accessToken);


    if (isExpired && refreshToken) {
        try {
            const response = await fetch(`/api/auth/refresh`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${refreshToken}`,
                },
            });

            console.log("response", response);

            if (!response.ok) {
                console.log("deu ruim ao tentar atualizar os tokens");
                await cleanCookies();
                return false;
            }

            // const data = await response.json();

            // cookiesStore.set({
            //     name: 'accessToken',
            //     value: data.accessToken,
            //     httpOnly: true,
            //     path: '/',
            //     maxAge: 60 * 15, // 15 min
            //     sameSite: 'lax',
            //     secure: process.env.NODE_ENV === 'production',
            // });

            // cookiesStore.set({
            //     name: 'refreshToken',
            //     value: data.refreshToken,
            //     httpOnly: true,
            //     path: '/',
            //     maxAge: 60 * 60 * 24 * 7, // 7 dias
            //     sameSite: 'lax',
            //     secure: process.env.NODE_ENV === 'production',
            // });

            // console.log('tokens atualizados',data);

            // accessToken = data.accessToken;

        } catch (e) {
            console.error('erro', e);
            await cleanCookies();
            return false;
        }

    }

    return accessToken;
}

export async function doRefresh(refreshToken: string) {
    try {
        const response = await fetch(`http://localhost:3000/users/refresh`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${refreshToken}`,
            },
        });

        
        if (!response.ok) return null;
        
        const data = await response.json();
        console.log("response", data);

        return {
            access: data.accessToken,
            refresh: data.refreshToken,
        };
    } catch (e) {
        console.error("Erro no refresh:", e);
        return null;
    }
}

export async function redirectToHome(request: NextRequest) {
    console.log("redierectToHome, suspeito do bug aqui");
    const response = NextResponse.redirect(new URL("/", request.url));
    await cleanCookies();
    return response;
}
