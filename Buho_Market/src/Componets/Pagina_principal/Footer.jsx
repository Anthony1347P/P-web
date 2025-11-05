function Footer() {
    return (
        <footer className="footer__web">
        <div className="back__container">

            <a className="back" href="#">INICIO DE PÁGINA</a>
        </div>
        <div className="footer__wrapper">
            <div className="about__us">
                <h2 className="footer__title">Sobre Buho Market</h2>
                <ul className="footer__list">
                    <li>
                        <a href="#">sobre nosotros</a>
                    </li>
                    <li>
                        <a href="#">como funciona</a>
                    </li>
                    <li>
                        <a href="#">Reglas de la comunidad</a>
                    </li>
                </ul>
            </div>
            <div className="help__section">
                <h2 className="footer__title">Ayuda</h2>
                <ul className="footer__list">
                    <li>
                        <a href="#">centro de ayuda</a>
                    </li>
                    <li>
                        <a href="#">Seguridad / Evita estafas</a>
                    </li>
                    <li>
                        <a href="#">Devoluciones y disputas</a>
                    </li>
                    <li>
                        <a href="#">Reportar usuario o publicación</a>
                    </li>
                </ul>
            </div>
            <div className="contact__section">
                <h2 className="footer__title">Contactanos</h2>
                <div className="contact__wrapper">
                    <div className="img_social_network">
                        <img src="/Img/facebook.png" alt="facebook"/>
                    </div>
                    <div className="img_social_network">
                        <img src="/Img/instagram.png" alt="instagram"/>
                    </div>
                    <div className="img_social_network">
                        <img src="/Img/youtube.png" alt="linkedin"/>
                    </div >
                    <div className="img_social_network">
                        <img src="/Img/signo-de-twitter.png"/>
                    </div>
                    <div className="img_social_network">
                        <img src="/Img/whatsapp.png"/>
                    </div>
                </div>
            </div>
        </div>
    </footer>

    )
}

export default Footer;