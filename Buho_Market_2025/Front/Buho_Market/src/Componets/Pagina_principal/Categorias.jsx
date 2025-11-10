import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Categorias() {

    const navigate = useNavigate();

    const [verInfo1, setInfo1] = useState(false);
    const [verInfo2, setInfo2] = useState(false);
    const [verInfo3, setInfo3] = useState(false);

    const abrir1 = () => {
        setInfo1(!verInfo1);
    }

    const abrir2 = () => {
        setInfo2(!verInfo2);
    }

    const abrir3 = () => {
        setInfo3(!verInfo3);
    }

    let abrirInfo1 = 'category'
    if(verInfo1){
        abrirInfo1 = 'category active'
    }
    else{
        abrirInfo1 = 'category'
    }

    let abrirInfo2 = 'category'
    if(verInfo2){
        abrirInfo2 = 'category active'
    }
    else{
        abrirInfo2 = 'category'
    }

    let abrirInfo3 = 'category'
    if(verInfo3){
        abrirInfo3 = 'category active'
    }
    else{
        abrirInfo3 = 'category'
    }

    let mostrarParrafo1 = 'category_paragraph';
    if(verInfo1){
        mostrarParrafo1 = 'category_paragraph active'
    }
    else{
        mostrarParrafo1 = 'category_paragraph'
    }

    let mostrarParrafo2 = 'category_paragraph';
    if(verInfo2){
        mostrarParrafo2 = 'category_paragraph active'
    }
    else{
        mostrarParrafo2 = 'category_paragraph'
    }

    let mostrarParrafo3 = 'category_paragraph';
    if(verInfo3){
        mostrarParrafo3 = 'category_paragraph active'
    }
    else{
        mostrarParrafo3 = 'category_paragraph'
    }

    const irTecnologia = () => {
        navigate("/ver-publicaciones/Tecnología");
    }

    const irLiteratura = () => {
        navigate("/ver-publicaciones/Literatura");
    }

    const irAccesorios = () => {
        navigate("/ver-publicaciones/Accesorios");
    }

    return (
        <section className="categories">
        <div className="categories__info__container">
            <div className="categories__title">
                <h2>Explora nuestras categorías</h2>
            </div>

            <div className = "categories__list">
                <div className={abrirInfo1}>
                    <h3>Electrónica</h3>
                    <p className={mostrarParrafo1}>En nuestra pagina puedes encontrar todos los articulos 
                    electrónicos que necesites, desde laptops, auriculares,
                    calculadoras y mucho más.
                    </p>
                    <div className='button__wrappet'>
                        <button className="category__button" onClick={abrir1}>+</button>
                        <button onClick={irTecnologia}> ver </button>
                    </div>
                </div>
                <div className={abrirInfo2}>
                    <h3>Literatura</h3>
                    <p className={mostrarParrafo2}>En nuestra pagina puedes encontrar todo relacionado a la
                    literatura, podras encontrar libros de todas las facultades
                    y todo tipo de temas.
                    </p>
                    <div className='button__wrappet'>
                        <button className="category__button" onClick={abrir2}>+</button>
                        <button onClick={irLiteratura}> ver </button>                        
                    </div>
                </div>
                <div className={abrirInfo3}>
                    <h3>Accesorios</h3>
                    <p className={mostrarParrafo3}>En nuestra pagina podras encontrar muchos articulos
                    indespensables como mochilas, loncheras, fundas para laptops.
                    </p>
                    <div className='button__wrappet'>
                        <button className="category__button" onClick={abrir3}>+</button>
                        <button onClick={irAccesorios}> ver </button>
                    </div>
                </div>
            </div>
        </div>
    </section>

    )
}

export default Categorias;