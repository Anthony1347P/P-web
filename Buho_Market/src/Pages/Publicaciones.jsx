import Header from "../Componets/Pagina_principal/Header";
import Footer from "../Componets/Pagina_principal/Footer";
import Publicacion from "../Componets/Pagina_publicaciones/Publicacion";

export default function Home() {
  return (
    <div>
      <Header />
      <Publicacion />
      <Footer /> 
    </div>
  );
}