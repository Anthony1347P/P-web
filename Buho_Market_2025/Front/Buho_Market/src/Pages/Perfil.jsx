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
    const [editando, setEditando] = useState(false);

    useEffect(() => {
        if (user) {
            cargarPerfil();
        }
    }, [user]);

    const cargarPerfil = async () => {
        try {
            // Obtener email del usuario
            setEmail(user.email);

            // Intentar obtener perfil de la tabla perfiles
            const { data: perfil, error } = await supabase
                .from('perfiles')
                .select('nombre, foto_perfil_url')
                .eq('id', user.id)
                .single();

            if (error && error.code !== 'PGRST116') {
                console.error('Error al cargar perfil:', error);
                return;
            }

            if (perfil) {
                // Si existe el perfil, usar los datos
                setNombre(perfil.nombre || '');
                if (perfil.foto_perfil_url) {
                    setFotoPerfilUrl(perfil.foto_perfil_url);
                }
            } else {
                // Si no existe, usar datos del metadata de Google o email
                let nombreInicial = '';
                if (user.user_metadata && user.user_metadata.full_name) {
                    nombreInicial = user.user_metadata.full_name;
                } else if (user.email) {
                    const partes = user.email.split('@');
                    nombreInicial = partes[0];
                }
                setNombre(nombreInicial);

                // Si tiene avatar de Google, usarlo
                if (user.user_metadata && user.user_metadata.avatar_url) {
                    setFotoPerfilUrl(user.user_metadata.avatar_url);
                }

                // Crear perfil inicial en la base de datos
                await crearPerfilInicial(nombreInicial);
            }
        } catch (error) {
            console.error('Error al cargar perfil:', error);
        }
    };

    const crearPerfilInicial = async (nombreInicial) => {
        try {
            const { error } = await supabase
                .from('perfiles')
                .insert({
                    id: user.id,
                    nombre: nombreInicial,
                    foto_perfil_url: user.user_metadata?.avatar_url || null
                });

            if (error) {
                console.error('Error al crear perfil inicial:', error);
            }
        } catch (error) {
            console.error('Error al crear perfil inicial:', error);
        }
    };

    const handleFotoChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setNuevaFoto(file);
            const reader = new FileReader();
            reader.onloadend = () => {
                setVistaPrevia(reader.result);
            };
            reader.readAsDataURL(file);
        }
    };

    const subirFotoPerfil = async () => {
        if (!nuevaFoto) return null;

        try {
            const fileName = `${user.id}/perfil_${Date.now()}_${nuevaFoto.name}`;

            const { error: uploadError } = await supabase
                .storage
                .from('fotos-perfil')
                .upload(fileName, nuevaFoto);

            if (uploadError) throw uploadError;

            const { data } = supabase
                .storage
                .from('fotos-perfil')
                .getPublicUrl(fileName);

            return data.publicUrl;
        } catch (error) {
            console.error('Error al subir foto:', error);
            return null;
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setCargando(true);

        try {
            let urlFotoActualizada = fotoPerfilUrl;

            // Si hay una nueva foto, subirla
            if (nuevaFoto) {
                const urlNuevaFoto = await subirFotoPerfil();
                if (urlNuevaFoto) {
                    urlFotoActualizada = urlNuevaFoto;
                }
            }

            // Actualizar perfil en la base de datos
            const { error } = await supabase
                .from('perfiles')
                .update({
                    nombre: nombre,
                    foto_perfil_url: urlFotoActualizada,
                    updated_at: new Date().toISOString()
                })
                .eq('id', user.id);

            if (error) throw error;

            alert('¡Perfil actualizado exitosamente!');
            setFotoPerfilUrl(urlFotoActualizada);
            setNuevaFoto(null);
            setVistaPrevia(null);
            setEditando(false);
        } catch (error) {
            console.error('Error al actualizar perfil:', error);
            alert('Hubo un error al actualizar el perfil');
        } finally {
            setCargando(false);
        }
    };

    if (!user) {
        return (
            <div>
                <Header />
                <div className="perfil__container">
                    <p>Cargando...</p>
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
                        {editando && (
                            <div className="perfil__foto__upload">
                                <label htmlFor="foto-input" className="foto__label">
                                    Cambiar foto
                                </label>
                                <input
                                    id="foto-input"
                                    type="file"
                                    accept="image/*"
                                    onChange={handleFotoChange}
                                    className="foto__input"
                                />
                            </div>
                        )}
                    </div>

                    <form onSubmit={handleSubmit} className="perfil__form">
                        <div className="form__grupo">
                            <label className="form__label">Email</label>
                            <input
                                type="email"
                                value={email}
                                disabled
                                className="form__input form__input--disabled"
                            />
                        </div>

                        <div className="form__grupo">
                            <label className="form__label">Nombre</label>
                            <input
                                type="text"
                                value={nombre}
                                onChange={(e) => setNombre(e.target.value)}
                                disabled={!editando}
                                className={`form__input ${!editando ? 'form__input--disabled' : ''}`}
                                placeholder="Ingresa tu nombre"
                            />
                        </div>

                        <div className="perfil__botones">
                            {!editando ? (
                                <button
                                    type="button"
                                    onClick={() => setEditando(true)}
                                    className="btn btn--editar"
                                >
                                    Editar Perfil
                                </button>
                            ) : (
                                <>
                                    <button
                                        type="submit"
                                        disabled={cargando}
                                        className="btn btn--guardar"
                                    >
                                        {cargando ? 'Guardando...' : 'Guardar Cambios'}
                                    </button>
                                    <button
                                        type="button"
                                        onClick={() => {
                                            setEditando(false);
                                            setVistaPrevia(null);
                                            setNuevaFoto(null);
                                            cargarPerfil();
                                        }}
                                        className="btn btn--cancelar"
                                    >
                                        Cancelar
                                    </button>
                                </>
                            )}
                        </div>
                    </form>

                    <div className="perfil__info">
                        <p className="info__texto">ID de Usuario: {user.id}</p>
                        <p className="info__texto">
                            Cuenta creada: {new Date(user.created_at).toLocaleDateString()}
                        </p>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    );
}
