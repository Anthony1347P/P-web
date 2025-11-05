import { UserAuth } from "../../context/AuthContext.jsx";
import { useEffect, useState } from 'react';
import { supabase } from "../../supabase/supabase.js";

function Publicacion() {
    const [titulo, setTitulo] = useState('');
    const [categoriaId, setCategoriaId] = useState('');
    const [categorias, setCategorias] = useState([]);
    const [descripcion, setDescripcion] = useState('');
    const [precio, setPrecio] = useState('');
    const [imagenes, setImagenes] = useState([]);


    const {user} = UserAuth();

    useEffect(() => {
        const fetchCategorias = async () => {
            const { data, error } = await supabase
            .from('categorias')
            .select('id, nombre');

            console.log('Datos de categorías:', data); 
            console.log('Error de categorías:', error); 

            if(error){
                console.error('error al cargar las categorias:', error);
            }
            else{
                setCategorias(data || []);
                console.log('Categorías guardadas en estado:', data);
            }

        };

        fetchCategorias();

    }, [])

    const handleSubmit = async (e) => {
        e.preventDefault();

        if(!titulo || !categoriaId || !precio){
            alert("debe completar todos los campos antes de publicar");
            return;
        }

        if(imagenes.length !== 5){
            alert("debe ingresar 5 imagenes antes de publicar");
            console.log('Cantidad de imágenes:', imagenes.length);
            return;
        }

        try{
            const { data: publicacion, error: dbError } = await supabase
                .from('publicaciones')
                .insert({
                    titulo,
                    categoria_id: categoriaId,
                    descripcion,
                    precio: parseFloat(precio),
                    estado: true,
                    usuario_id: user.id
                })
                .select()
                .single();


            for (let i = 0; i < imagenes.length; i++) {
                const file = imagenes[i];
                const fileName = `${user.id}/${Date.now()}_${i}_${file.name}`;

                const { error: uploadError } = await supabase
                    .storage
                    .from('fotos-productos')
                    .upload(fileName, file);

                if (uploadError) throw uploadError;

                const { data } = supabase
                    .storage
                    .from('fotos-productos')
                    .getPublicUrl(fileName);

                const { error: fotoError } = await supabase
                    .from('fotos_publicacion')
                    .insert([
                        {
                            publicacion_id: publicacion.id,
                            url_foto: data.publicUrl,
                            orden: i + 1
                        }
                    ]);

                if (fotoError) throw fotoError;
            }

            alert("¡Publicación creada exitosamente!");
            
            setTitulo('');
            setCategoriaId('');
            setDescripcion('');
            setPrecio('');
            setImagenes([]);

        }catch (error){
            console.error("error al crear la publicacion:", error);
            alert("Hubo un error al crear la publicacion");
        }
    }

    return (

        <form onSubmit={handleSubmit}>
            <div>
                <input
                    type="file"
                    placeholder="Imagenes"
                    multiple
                    onChange={(e) => setImagenes(Array.from(e.target.files))}
                ></input>
            </div>
            <div>
                <input
                    type="text"
                    placeholder="Título"
                    value={titulo}
                    onChange={(e) => setTitulo(e.target.value)}
                ></input>

                <input
                    type="number"
                    placeholder="precio"
                    value={precio}
                    onChange={(e) => setPrecio(e.target.value)}
                ></input>

                <input
                    type="text"
                    placeholder="descripcion de la publicacion"
                    value={descripcion}
                    onChange={(e) => setDescripcion(e.target.value)}
                ></input>

                <select value={categoriaId} onChange={(e) => setCategoriaId(e.target.value)}>
                    <option value=""> Seleccione una categoria </option>
                    {categorias.map((cat) => (
                        <option key={cat.id} value={cat.id}>
                            {cat.nombre}
                        </option>
                    ))}
                </select>

                <button type="submit">Publicar</button>
            </div>
        </form>


    )
}
export default Publicacion;