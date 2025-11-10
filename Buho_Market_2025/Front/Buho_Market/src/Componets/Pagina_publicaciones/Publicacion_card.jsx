import { UserAuth } from "../../context/AuthContext.jsx";
import { useEffect, useState, useRef} from 'react';
import { supabase } from "../../supabase/supabase.js";
import { Fragment } from "react"

function Card({publicacionId}) {

    const [titulo, setTitulo] = useState("");
    const [precio, setPrecio] = useState("");
    const [descripcion, setDescripcion] = useState("");
    const [imagenes, setImagenes] = useState([]);
    const [indiceActual, setIndiceActual] = useState(0);

    useEffect(()=>{
        const obtenerData = async() => {
            const resultado = await supabase
            .from('publicaciones')
            .select('titulo, precio, descripcion')
            .eq("id", publicacionId)
            .single();

            setTitulo(resultado.data.titulo);
            setPrecio(resultado.data.precio);
            setDescripcion(resultado.data.descripcion);
        }

        const obtenerImg = async() => {
            const resultadoImg = await supabase
            .from('fotos_publicacion')
            .select('url_foto')
            .eq("publicacion_id", publicacionId)
            
            const urls = resultadoImg.data.map(elementoArray => elementoArray.url_foto)
            setImagenes(urls);
            setIndiceActual(0);

        }
        
        obtenerData();
        obtenerImg();

    }, [publicacionId])

    const siguiente = () => {
        setIndiceActual((indicePrev) => {
            if(indicePrev === imagenes.length - 1){
                return 0;
            }
            else{
                return indicePrev + 1;
            }
        })
    }

    const atras = () => {
        setIndiceActual((indicePast) => {
            if(indicePast === 0){
                return imagenes.length - 1;
            }
            else{
                return indicePast - 1;
            }
        })
    }

    const imagenActual = imagenes[indiceActual];

    let contenidoImagen;
    if (imagenActual) {
        contenidoImagen = (
            <img
            src={imagenActual}
            alt={`Imagen ${indiceActual + 1}`}
            className="imagen-carrusel"
            />
        );
    } else {
        contenidoImagen = (
            <div className="imagen-placeholder">
            Cargando imagen...
            </div>
        );
    }

    return(
        <div className="main__container">

            <div className="slider-container">

                {imagenes.length > 1 && (
                    <>
                    <div className="leftArrow__container" onClick={atras}>
                        <img className="leftArrow" src="/Img/arrowL.png" alt="Anterior" />
                    </div>
                    <div className="rightArrow__container" onClick={siguiente}>
                        <img className="rightArrow" src="/Img/arrowR.png" alt="Siguiente" />
                    </div>
                    </>
                )}

                <div className="container-images">
                    {contenidoImagen}
                </div>
            </div>

            <div className="Card">
                <div className="titleContainer">
                    <h1 className="titulo">{titulo}</h1>
                </div>

                <div className="precioContainer">
                    <h1 className="precio">{precio}</h1>
                </div>

                <div className="descripcionContainer">
                    <h1 className="descripcion">{descripcion}</h1>
                </div>
            </div>

        </div>

    )
}

export default Card;