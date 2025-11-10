import "./Css/HomeStyle.css";
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import './Css/HomeStyle.css'; 
import './Css/Publicaciones.css';
import './Css/Card.css';
import './Css/VerPaginas.css';


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
