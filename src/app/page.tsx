import { Container } from "../componentes/container";
import { Header } from "../componentes/header";
import { InputBusca } from "../componentes/input_busca";

export default function Home() {
  return (
    <>
      <Header />
      <InputBusca />


      <Container>
        <h1 className="text-3xl font-bold underline">Hello world!</h1>
      </Container>
    </>
  );
}
