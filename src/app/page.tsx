import { Container } from "../componentes/container";
import { Footer } from "../componentes/footer";
import { Header } from "../componentes/header";
import { InputBusca } from "../componentes/input-busca";
import { EventSlider } from "../componentes/slider";

export default function Home() {
  return (
    <>
      <Header />
      <InputBusca />


      {/* espaço separado para o carrousel */}

      <Container>

        <EventSlider title="Para Hoje" />
        <EventSlider title="Próximos Eventos" />
        <EventSlider title="Rock" />
        <EventSlider title="Sertanejo" />
        <EventSlider title="Hip-Hop" />
        <EventSlider title="Festivais" />

      </Container>

      <Footer />
    </>
  );
}
