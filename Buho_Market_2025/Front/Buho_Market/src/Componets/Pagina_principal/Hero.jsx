import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

function Hero() {
    const navigate = useNavigate();

    const verPublicaciones_route = () => {
        navigate('/ver-publicaciones');
    }

    return (
    <section id="hero">
        <div className='heroWrapper'>
            <h1>Encuentra todo lo que necesitas en <br/> <span>"Buho Market"</span></h1>
            <div className='button_container'>
                <button onClick={verPublicaciones_route}>VER PUBLICACIONES</button>
            </div>
        </div>
    </section>

    )
}

export default Hero;




























































