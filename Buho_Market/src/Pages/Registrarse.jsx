import React from 'react';
import { useNavigate } from 'react-router-dom'; //   Para navegar correctamente
import '../Css/RegistrarseStyle.css';

const Registrarse = () => {
  const navigate = useNavigate();  

  const handleLoginRedirect = () => {
    navigate('/'); //   Navegación SPA (no recarga)
  };

  return (
    <div>
      {/* Encabezado con logo */}
      <div className="header">
        {/* ✅ Ruta corregida para imagen en public/Img/ */}
        <img src="/Img/BuhoLogo.png" alt="Logo" className="logo-img" />
      </div>
      <h1 className="p1">BUHO</h1>
      <h1 className="p2">MARKET</h1>

      {/* Formulario de registro */}
      <div className="formulario">
        <h1>Registrarse</h1>
        <form>
          <div className="nombre">
            <input type="text" name="nombre" required />
            <label>Nombre completo</label>
          </div>

          <div className="correo">
            <input
              type="email"
              name="correo"
              required
              pattern="[a-zA-Z0-9._%+-]+@uca\.edu\.sv$"
              title="Solo se permiten correos con dominio uca.edu.sv"
            />
            <label>Correo electrónico</label>
          </div>

          <div className="contrasena">
            <input type="password" name="password" required minLength="6" />
            <label>Contraseña</label>
          </div>

          <div className="confirmar-contrasena">
            <input type="password" name="confirmar_password" required minLength="6" />
            <label>Confirmar contraseña</label>
          </div>

          <button type="submit" className="btn-iniciar">
            Registrarse
          </button>

          <button
            type="button"
            className="btn-registrarme"
            onClick={handleLoginRedirect}
          >
            ¿Ya tienes cuenta? Inicia sesión
          </button>
        </form>
      </div>
    </div>
  );
};

export default Registrarse;