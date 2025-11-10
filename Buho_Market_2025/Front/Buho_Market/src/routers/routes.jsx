// src/routers/routes.jsx
import { Routes, Route } from 'react-router-dom';
import Login from '../Pages/Login';
import Registrarse from '../Pages/Registrarse';
import Home from "../Pages/Home.jsx";
import RecuperearContrasena from '../Pages/RecuperarContrasena';
import Publicaciones from '../Pages/Publicaciones.jsx';
import VerPublicaciones from '../Pages/VerPublicaciones.jsx';
import Perfil from '../Pages/Perfil.jsx';

export default function MyRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/registrarse" element={<Registrarse />} />
      <Route path="/recuperarcontrasena" element={<RecuperearContrasena />} />
      <Route path="/publicaciones" element={<Publicaciones/>}/>
      <Route path="/ver-publicaciones" element={<VerPublicaciones/>}/>
      <Route path="/ver-publicaciones/:categoria" element={<VerPublicaciones/>}/>
      <Route path="/perfil" element={<Perfil/>}/>
    </Routes>
  );
}