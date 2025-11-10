import { createContext } from "react";
import { useEffect } from "react";
import { useState } from "react";
import { useContext } from "react";
import { supabase } from "../supabase/supabase.js";
import { useNavigate } from "react-router-dom"

const AuthContext = createContext();

export const AuthContextProvider  = ({ children }) => {

    const navigate = useNavigate();

    const [user, setUser] = useState(null);
    async function signInWithGoogle() {
        try{
            const {data, error} = await supabase.auth.signInWithOAuth({
                provider: "google",
            });
            if(error) throw new Error(" A ocurrido un error durante la autenticacion");
            return data;
        }catch (error) {
            console.log(error);
        }
    }   

    async function signout() {
        const { error } = await supabase.auth.signOut();
        if (error) throw new Error("Ha ocurrido un error durante el cierre de sesión");
        console.log("Sesión cerrada correctamente");
    }

     useEffect(() => {
        const { data: authListener } = supabase.auth.onAuthStateChange(
        async (event, session) => {
            console.log("supabase sesion", session);
            console.log("supabase event: ", event);
            if (session == null) {
                setUser(null);
                navigate("/login", { replace: true });
            } else {
                setUser(session?.user);
                console.log("data del usuario", session?.user.user_metadata);
                navigate("/", { replace: true });
            }
        }
        )
        return () => {
            authListener.subscription;
        };
    }, []);

    return(
        <AuthContext.Provider value={{ signInWithGoogle, signout, user }}>
            {console.log("Signout function passed to context:", signout)}
            {children}
        </AuthContext.Provider>
    )
};

export const UserAuth = () => {
    return useContext (AuthContext);
}




