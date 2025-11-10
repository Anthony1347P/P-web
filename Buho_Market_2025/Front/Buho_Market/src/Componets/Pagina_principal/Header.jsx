import { UserAuth } from "../../context/AuthContext.jsx";
import { Link } from 'react-router-dom';
import { useNavigate } from "react-router-dom";
import { supabase } from "../../supabase/supabase.js";
import { useState, useEffect } from 'react';

function Header() {
    const { signout } = UserAuth();

    const CerrarSesion = async () => {
        try {
            if(typeof signout === 'function'){
                await signout();
                console.log("sesion cerrada");
            }
            else{
                console.log("no se encontro la funcion para cerrar sesion")
            }
        }catch (error) {
            console.log(error);
        }
    }

    const [user, setUser] = useState("usuario");
    /*const [userImage, setUserImage] = useState("/Img/user.png");*/

    const usuario = async () => {
        const resultado = await supabase
        .auth
        .getUser()

        if(resultado.data !== null && resultado.data.user !==null) {
            const user = resultado.data.user;
            /*let userIMG = "/Img/user.png";*/
            let nombreUsuario = 'nombre usuario'

            if(user.user_metadata && user.user_metadata.full_name){
                nombreUsuario = user.user_metadata.full_name;
            }
            else if(user.email) {
                const partes = user.email.split("@");
                nombreUsuario = partes[0];
            }

            /*if(user.user_metadata && user.user_metadata.avatar_url){
                userIMG = user.user_metadata.avatar_url
            }*/

            setUser(nombreUsuario);
            /*setUserImage(userIMG)*/
        }
        else {
            setUser('user Name')
        }
    }

    useEffect(() => {
        usuario();
    }, []);

    const [isOpen, setIsOpen] = useState(false);

    const DropDown = () => {
        setIsOpen(!isOpen)
    }

    let menuOpenDisplay = "none";
    let menuCloseDisplay = "block";

    if(isOpen){
        menuOpenDisplay = "none"
        menuCloseDisplay = "block"
    }
    else if(!isOpen){
        menuOpenDisplay = "block"
        menuCloseDisplay = "none"
    }

    let dropdownDisplay = "";

    if(isOpen){
        dropdownDisplay = 'drop__down active';
    }
    else{
        dropdownDisplay = 'drop__down';
    }

    const [inputOpen, setinputOpen] = useState(false);

    const openInput = () => {
        setinputOpen(!inputOpen)
    }

    let inputState = 'input__search';

    if(inputOpen){
        inputState = 'input__search active'
    }
    else{
        inputState = 'input__search'
    }

    const navigate = useNavigate();

    const ir = () => {
        navigate('/')
    }

    return (
        <header className="web__header">
        <div className="header__presentation">
            <img className="web__logo" onClick={ir} src="/Img/new_logo.jpeg" alt="web__logo"/>
            <h1 className="web__name">Buho <span>Market</span></h1>
        </div>
        <div className="buscador__menu">
            <div className="input__conteiner">
                <input className= {inputState} type="text" placeholder="Buscar...."/>
                <div className="search__icon__container">
                    <img className="search__icon" src="/Img/lupa.png" 
                        onClick={ openInput }
                        alt="search_icon"
                    />
                </div>
            </div>
            <div className="menu">
                <img className="menu__open" src="/Img/lines.png" 
                    style= {{ display: menuOpenDisplay }}
                    onClick={ DropDown }
                />
                <img className="menu__close" src="/Img/green lines2.png"
                    style= {{ display: menuCloseDisplay }}
                    onClick={ DropDown }
                />
            </div>
        </div>


        <nav className={ dropdownDisplay }>
            <div className="drop__down__wrapper">
                <div className="user__info">
                    <img className="user__foto" src="/Img/user.png"/>
                    <h2 className="user__name">{user}</h2>
                </div>
                <ul className="nav__list__item">
                    <li className="nav_item">
                        <div className="imgContainer">
                            <img className="nav__img" src="/Img/home.webp"/>
                        </div>

                        <Link className="nav_link" to="/">Inicio</Link>
                    </li>
                    <li className="nav_item">
                        <div className="imgContainer">
                            <img className="nav__img" src="/Img/usuario.png"/>
                        </div>

                        <Link className="nav_link" to="/perfil">Perfil</Link>
                    </li>
                    <li className="nav_item">
                        <div className="imgContainer">
                            <img className="nav__img" src="/Img/menu.png"/>
                        </div>

                        <a className="nav_link" href="#">Categorías</a>
                    </li>
                    <li className="nav_item">
                        <div className="imgContainer">
                            <img className="nav__img" src="/Img/subir.png"/>
                        </div>

                        <Link className="nav_link" to="/publicaciones">Publicar</Link>
                    </li>
                    <li className="nav_item">
                        <div className="imgContainer">
                            <img className="nav__img" src="/Img/cerrar.png"/>
                        </div>

                        <a className="nav_link" href="#" onClick={ CerrarSesion }> Cerrar sesion </a>
                    </li>
                </ul>
            </div>
        </nav>
    </header>


    );
}

export default Header;