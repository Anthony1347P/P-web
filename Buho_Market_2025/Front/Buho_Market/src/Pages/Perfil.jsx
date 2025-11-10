import { useState, useEffect } from 'react';
import { UserAuth } from '../context/AuthContext.jsx';
import { supabase } from '../supabase/supabase.js';
import Header from '../Componets/Pagina_principal/Header.jsx';
import Footer from '../Componets/Pagina_principal/Footer.jsx';
import '../Css/PerfilStyle.css';

export default function Perfil() {
    const { user } = UserAuth();
    const [nombre, setNombre] = useState('');
    const [email, setEmail] = useState('');
    const [fotoPerfilUrl, setFotoPerfilUrl] = useState('/Img/user.png');
    const [nuevaFoto, setNuevaFoto] = useState(null);
    const [vistaPrevia, setVistaPrevia] = useState(null);
    const [cargando, setCargando] = useState(false);
    const [publicaciones, setPublicaciones] = useState([]);
    const [cargandoPublicaciones, setCargandoPublicaciones] = useState(true);

    useEffect(() => {
        if (user) {
            cargarPerfil();
            cargarPublicaciones();
        }
    }, [user]);

    const cargarPerfil = async () => {
        try {
            setEmail(user.email);

            // Obtener nombre del usuario
            let nombreInicial = '';
            if (user.user_metadata && user.user_metadata.full_name) {
                nombreInicial = user.user_metadata.full_name;
            } else if (user.email) {
                const partes = user.email.split('@');
                nombreInicial = partes[0];
            }
            setNombre(nombreInicial);

            // Intentar obtener foto de perfil de la tabla perfiles
            const { data: perfil, error } = await supabase
                .from('perfiles')
                .select('foto_perfil_url')
                .eq('id', user.id)
                .single();

            if (error && error.code !== 'PGRST116') {
                console.error('Error al cargar perfil:', error);
            }

            if (perfil && perfil.foto_perfil_url) {
                setFotoPerfilUrl(perfil.foto_perfil_url);
            } else if (user.user_metadata && user.user_metadata.avatar_url) {
                // Si tiene avatar de Google, usarlo
                setFotoPerfilUrl(user.user_metadata.avatar_url);
            }
        } catch (error) {
            console.error('Error al cargar perfil:', error);
        }
    };

    const cargarPublicaciones = async () => {
        try {
            setCargandoPublicaciones(true);
            const { data: publicacionesData, error } = await supabase
                .from('publicaciones')
                .select('id, titulo, precio, descripcion, created_at')
                .eq('usuario_id', user.id)
                .order('created_at', { ascending: false });

            if (error) {
                console.error('Error al cargar publicaciones:', error);
            } else {
                // Cargar la primera imagen de cada publicación
                const publicacionesConImagen = await Promise.all(
                    (publicacionesData || []).map(async (pub) => {
                        const { data: fotos } = await supabase
                            .from('fotos_publicacion')
                            .select('url_foto')
                            .eq('publicacion_id', pub.id)
                            .order('orden', { ascending: true })
                            .limit(1)
                            .single();

                        return {
                            ...pub,
                            imagen: fotos?.url_foto || '/Img/user.png'
                        };
                    })
                );

                setPublicaciones(publicacionesConImagen);
            }
        } catch (error) {
            console.error('Error al cargar publicaciones:', error);
        } finally {
            setCargandoPublicaciones(false);
        }
    };

    const handleFotoChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            // Validar tamaño (máximo 5MB)
            if (file.size > 5 * 1024 * 1024) {
                alert('La imagen es muy grande. Máximo 5MB.');
                return;
            }

            // Validar tipo
            if (!file.type.startsWith('image/')) {
                alert('Solo se permiten archivos de imagen.');
                return;
            }

            setNuevaFoto(file);
            const reader = new FileReader();
            reader.onloadend = () => {
                setVistaPrevia(reader.result);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleGuardarFoto = async () => {
        if (!nuevaFoto) {
            alert('Selecciona una imagen primero');
            return;
        }

        setCargando(true);

        try {
            // Subir foto al storage
            const fileName = `${user.id}/perfil_${Date.now()}_${nuevaFoto.name}`;

            const { error: uploadError } = await supabase
                .storage
                .from('fotos-perfil')
                .upload(fileName, nuevaFoto);

            if (uploadError) {
                console.error('Error al subir foto:', uploadError);
                throw new Error('No se pudo subir la imagen. Verifica las políticas de Storage.');
            }

            const { data } = supabase
                .storage
                .from('fotos-perfil')
                .getPublicUrl(fileName);

            const urlNuevaFoto = data.publicUrl;

            // Verificar si existe el perfil
            const { data: perfilExiste } = await supabase
                .from('perfiles')
                .select('id')
                .eq('id', user.id)
                .single();

            if (perfilExiste) {
                // Actualizar
                const { error: updateError } = await supabase
                    .from('perfiles')
                    .update({
                        foto_perfil_url: urlNuevaFoto,
                        updated_at: new Date().toISOString()
                    })
                    .eq('id', user.id);

                if (updateError) throw updateError;
            } else {
                // Crear
                const { error: insertError } = await supabase
                    .from('perfiles')
                    .insert({
                        id: user.id,
                        nombre: nombre,
                        foto_perfil_url: urlNuevaFoto
                    });

                if (insertError) throw insertError;
            }

            alert('¡Foto de perfil actualizada exitosamente!');
            setFotoPerfilUrl(urlNuevaFoto);
            setNuevaFoto(null);
            setVistaPrevia(null);
        } catch (error) {
            console.error('Error al actualizar foto:', error);
            alert('Hubo un error al actualizar la foto de perfil. ' + error.message);
        } finally {
            setCargando(false);
        }
    };

    const handleCancelar = () => {
        setNuevaFoto(null);
        setVistaPrevia(null);
    };

    if (!user) {
        return (
            <div>
                <Header />
                <div className="perfil__container">
                    <p style={{color: '#fff'}}>Cargando...</p>
                </div>
                <Footer />
            </div>
        );
    }

    return (
        <div>
            <Header />
            <div className="perfil__container">
                <div className="perfil__card">
                    <h1 className="perfil__titulo">Mi Perfil</h1>

                    <div className="perfil__foto__container">
                        <img
                            src={vistaPrevia || fotoPerfilUrl}
                            alt="Foto de perfil"
                            className="perfil__foto"
                        />

                        <div className="perfil__foto__upload">
                            <label htmlFor="foto-input" className="foto__label">
                                {vistaPrevia ? 'Cambiar imagen' : 'Seleccionar imagen'}
                            </label>
                            <input
                                id="foto-input"
                                type="file"
                                accept="image/*"
                                onChange={handleFotoChange}
                                className="foto__input"
                            />
                        </div>

                        {nuevaFoto && (
                            <div className="perfil__botones">
                                <button
                                    type="button"
                                    onClick={handleGuardarFoto}
                                    disabled={cargando}
                                    className="btn btn--guardar"
                                >
                                    {cargando ? 'Guardando...' : 'Guardar Foto'}
                                </button>
                                <button
                                    type="button"
                                    onClick={handleCancelar}
                                    className="btn btn--cancelar"
                                >
                                    Cancelar
                                </button>
                            </div>
                        )}
                    </div>

                    <div className="perfil__info__principal">
                        <div className="form__grupo">
                            <label className="form__label">Nombre</label>
                            <p className="info__valor">{nombre}</p>
                        </div>

                        <div className="form__grupo">
                            <label className="form__label">Email</label>
                            <p className="info__valor">{email}</p>
                        </div>
                    </div>

                    <div className="perfil__info">
                        <p className="info__texto">Cuenta creada: {new Date(user.created_at).toLocaleDateString()}</p>
                        <p className="info__texto info__texto--id">ID: {user.id}</p>
                    </div>
                </div>

                {/* Sección de Mis Publicaciones */}
                <div className="perfil__publicaciones">
                    <h2 className="publicaciones__titulo">Mis Publicaciones</h2>

                    {cargandoPublicaciones ? (
                        <p className="publicaciones__mensaje">Cargando publicaciones...</p>
                    ) : publicaciones.length > 0 ? (
                        <div className="publicaciones__lista">
                            {publicaciones.map((pub) => (
                                <div key={pub.id} className="publicacion__item">
                                    <img
                                        src={pub.imagen}
                                        alt={pub.titulo}
                                        className="publicacion__imagen"
                                    />
                                    <div className="publicacion__contenido">
                                        <h3 className="publicacion__titulo">{pub.titulo}</h3>
                                        <p className="publicacion__precio">${pub.precio}</p>
                                        <p className="publicacion__descripcion">{pub.descripcion}</p>
                                        <p className="publicacion__fecha">
                                            {new Date(pub.created_at).toLocaleDateString()}
                                        </p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <p className="publicaciones__mensaje">No tienes publicaciones aún</p>
                    )}
                </div>
            </div>
            <Footer />
        </div>
    );
}
