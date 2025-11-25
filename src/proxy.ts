// proxy.ts
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { cleanCookies, doRefresh, isAccessTokenExpired, redirectToHome } from "./lib/utils/utils";


export async function proxy(request: NextRequest) {

    const accessToken = request.cookies.get("accessToken")?.value;
    const refreshToken = request.cookies.get("refreshToken")?.value;

console.log("proxy", accessToken, refreshToken);

    if (!accessToken || !refreshToken) {
        console.log("sem token");
        await cleanCookies();
        return NextResponse.redirect(new URL("/", request.url));
    }

    const expired = await isAccessTokenExpired(accessToken);

    if (expired) {
        const result = await doRefresh(refreshToken);

        if (!result) {
            return redirectToHome(request);
        }

        const response = NextResponse.next();
        response.cookies.set("accessToken", result.access);
        response.cookies.set("refreshToken", result.refresh);
        console.log("cookies atualziados com sucesso");

        return response; //retorna os novos cookies para o browser
    }

    return NextResponse.next();
}

export const config = {
    matcher: [
        // "/api/:path*", // executa só para chamadas ao backend 
        "/teste",
        "/conta",
    ],

};
