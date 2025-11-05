import Header from "../Componets/Pagina_principal/Header";
import Footer from "../Componets/Pagina_principal/Footer";
import Hero from "../Componets/Pagina_principal/Hero";
import Categories from "../Componets/Pagina_principal/Categorias";

export default function Home() {
  return (
    <div>
      <Header />
      <Hero />
      <Categories />
      <Footer /> 
    </div>
  );
}