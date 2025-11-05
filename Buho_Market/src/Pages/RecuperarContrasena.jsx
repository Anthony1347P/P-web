import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../Css/RecuperarContraseña.css';

export default function OlvidasteContrasena() {
  const navigate = useNavigate();

  const handleIrAInicio = () => {
    navigate('/');  
  };

  const handleSubmit = (e) => {
    e.preventDefault();
   
    const form = e.target;
    const formData = new FormData(form);
    const correo = formData.get('correo');

    fetch('http://localhost:3000/enviarCorreoRecuperacion', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ correo }),
    })
      .then(res => {
        if (res.ok) {
          alert('Correo de recuperación enviado');
        } else {
          alert('Error al enviar el correo');
        }
      })
      .catch(err => {
        console.error('Error:', err);
        alert('No se pudo conectar con el servidor');
      });
  };

  return (
    <div className="contenedor2">
      <div className="logo-container2">
        <img src="/Img/Interrogacion.png" alt="Logo" className="logo-img2" />
      </div>

      <div className="contenedor">
        <div className="logo-container">
          <img src="/Img/Buho_pensando.png" alt="Logo" className="logo-img" />
        </div>
      </div>

      <h1 className="p1">BUHO</h1>
      <h1 className="p2">MARKET</h1>

      <div className="formulario">
        <h1>Recuperar contraseña</h1>
        <form onSubmit={handleSubmit}>
          <div className="correo">
            <input
              type="email"
              name="correo"
              required
              pattern="[a-zA-Z0-9._%+-]+@uca\.edu\.sv$"
              title="Debe ser un correo institucional @uca.edu.sv"
            />
            <label>Correo institucional</label>
          </div>

          <button type="submit" className="btn-iniciar">
            Mandar correo
          </button>

          <button
            type="button"
            className="btn-registrarme"
            onClick={handleIrAInicio}
          >
            Ir a Inicio
          </button>
        </form>
      </div>
    </div>
  );
}