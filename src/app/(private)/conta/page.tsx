import { Header } from "@/src/componentes/header";
import { api } from "@/src/lib/axios/api";
import { cookies } from "next/headers";
import PerfilForm from "./components/PerfilForm";

export default async function Conta() {

  //essa chamada executa do lado servidor, entao posso injetar os cookies, pois a injeção automatica da rota nao irá funcinar
  const cookiesStore = cookies();
  const accessToken = (await cookiesStore).get("accessToken")?.value;

  const res = await api("users/me", { headers: { Authorization: `Bearer ${accessToken}` } });
  const user = res.data;

  return (
    <div>
      <Header />
      <PerfilForm user={user}/>
    </div>
  );
}
