import { api } from "@/src/lib/axios/api";
import { cookies } from "next/headers";

export default async function Conta() {

  //essa chamada executa do lado servidor, entao posso injetar os cookies, pois a injeção automatica da rota nao irá funcinar
  const cookiesStore = cookies();
  const accessToken = (await cookiesStore).get("accessToken")?.value;

  const res = await api("users/me", { headers: { Authorization: `Bearer ${accessToken}` } });

  return (
    <div>
      <h1>Conta</h1>
    </div>
  );
}
