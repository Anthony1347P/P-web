import React from 'react';
import { useNavigate } from 'react-router-dom'; // ✅ Para navegar sin recargar
import '../Css/LoginStyle.css';
import { UserAuth } from '../context/AuthContext';
 

// SVG del logo de Google
const GoogleLogo = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="18"
    height="18"
    viewBox="0 0 24 24"
    style={{ marginRight: '8px', verticalAlign: 'middle' }}
  >
    <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
    <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
    <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
    <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
  </svg>
);

// Botón de Google
const GoogleBtn = ({ onClick }) => (
  <button
    type="button"
    onClick={onClick}
    aria-label="Iniciar sesión con Google"
    style={{
      width: '100%',
      padding: '12px',
      borderRadius: '8px',
      border: '1px solid #dadce0',
      backgroundColor: '#fff',
      color: '#3c4043',
      fontSize: '14px',
      fontWeight: '500',
      cursor: 'pointer',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      marginBottom: '16px',
      boxShadow: '0 1px 2px rgba(0,0,0,0.1)',
    }}
  >
    <GoogleLogo />
    Iniciar con Google
  </button>
);

export default function Login() {
  const { signInWithGoogle } = UserAuth();
  const navigate = useNavigate(); 

  const handleIniciarClick = () => {
   
    navigate('/informacion');
  };

  const handleRegistrarmeClick = () => {
    navigate('/registrarse');  
  };

  const handleOlvidasteClick = (e) => {
    e.preventDefault();
    navigate('/recuperarcontrasena');
  };

  return (
    <div>
      {/* Título y logo */}
      <div className="header">
         <img src="/Img/BuhoLogo.png" alt="Logo" className="logo-img" />
      </div>
      <h1 className="p1">BUHO</h1>
      <h1 className="p2">MARKET</h1>

      {/* Formulario */}
      <div className="formulario">
        <h1>Iniciar sesión</h1>

        {/* Botón de Google */}
        <GoogleBtn onClick={signInWithGoogle} />

        {/* Separador visual */}
        <div style={{ textAlign: 'center', margin: '12px 0', color: '#888', fontSize: '14px' }}>
          o
        </div>

        <form>
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
            <input type="password" name="password" required />
            <label>Contraseña</label>
          </div>

          <button
            type="button"
            className="btn-iniciar"
            onClick={handleIniciarClick}
          >
            Iniciar
          </button>

          <button
            type="button"
            className="btn-registrarme"
            onClick={handleRegistrarmeClick}
          >
            Registrarme
          </button>

          <div className="acciones">
            <a href="#" onClick={handleOlvidasteClick}>
              ¿Olvidaste tu contraseña?
            </a>
          </div>
        </form>
      </div>
    </div>
  );
}