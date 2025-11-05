function Categorias() {
    return (
        <section className="categories">
        <div className="categories__info__container">
            <div className="categories__title">
                <h2>Explora nuestras categorías</h2>
            </div>

            <div className = "categories__list">
                <div className="category">
                    <h3>Electrónica</h3>
                    <p className="category_paragraph">En nuestra pagina puedes encontrar todos los articulos 
                    electrónicos que necesites, desde laptops, auriculares,
                    calculadoras, celulares y mucho más.
                    </p>
                    <button className="category__button">+ Info</button>
                </div>
                <div className="category">
                    <h3>Literatura</h3>
                    <p className="category_paragraph">En nuestra pagina puedes encontrar todo relacionado a la
                    literatura, hazte con libros de todo tipo desde relacionados
                    a una facultad como libros de derecho, economia, etc.
                    hasta libros de entrenimiento como novelas, comics, etc. 
                    </p>
                    <button className="category__button">+ Info</button>
                </div>
                <div className="category">
                    <h3>Accesorios</h3>
                    <p className="category_paragraph">En nuestra pagina podras encontrar muchos articulos
                    indespensables como mochilas, loncheras, fundas para laptops.
                    </p>
                    <button className="category__button">+ Info</button>
                </div>
            </div>
        </div>
    </section>

    )
}

export default Categorias;