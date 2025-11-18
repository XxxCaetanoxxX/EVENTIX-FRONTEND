"use server";
import { cookies } from "next/headers";
export async function cleanCookies(){
    (await cookies()).delete("accessToken");
    (await cookies()).delete("refreshToken");
}