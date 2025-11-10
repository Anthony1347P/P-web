import { useEffect, useState } from 'react';
import { supabase } from '../supabase/supabase';
import { Fragment } from "react"
import { useParams } from 'react-router-dom';
import Card from '../Componets/Pagina_publicaciones/Publicacion_card';
import Header from "../Componets/Pagina_principal/Header";
import Footer from "../Componets/Pagina_principal/Footer";

export default function VerPublicaciones() {

    const { categoria } = useParams();
    const [publicacionesId, setPublicacionesId] = useState([]);
    
    /*logica para mostrar todas de golpe posdata solo usar si no se logra hacer lo de categorias hoy*/ 
    /*useEffect(() => {
        const publicId = async() => {
            const obID = await supabase
                .from('publicaciones')
                .select('id');
            
            setPublicacionesId(obID.data || []);
        }

        

        publicId();

    }, [])*/
    

    useEffect(() => {
        const publicByCategory = async() => {
            let obCatId; /**para entender la logica comparando con lo anterior/ obID = obCatId*/

            if(categoria) {
                obCatId = await supabase
                .from('categorias')
                .select('id')
                .eq('nombre', categoria)
                .single();

                if (obCatId.error || !obCatId.data) {
                    setPublicacionesId([]);
                    return;
                }

                const categoriaId = obCatId.data.id;

                const puclicId = await supabase
                .from('publicaciones')
                .select('id')
                .eq('categoria_id', categoriaId);

                setPublicacionesId(puclicId.data || []);
            }
            else{
                obCatId = await supabase
                .from('publicaciones')
                .select('id');
                setPublicacionesId(obCatId.data || []);
            }
        }

        publicByCategory();

    }, [categoria]);
    
    return (
        <div>
            <Header />
            <div className="cardsContainer">
                {publicacionesId.map((pub) => (
                <Card key={pub.id} publicacionId={pub.id}/>
                ))}
            </div>
            <Footer /> 
        </div>
    );
}
