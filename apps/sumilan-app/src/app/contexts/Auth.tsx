import { useContext, useState, useEffect, createContext } from 'react';
import { User, UserCredentials } from '@supabase/supabase-js';

import { supabase } from '../libs/supabase';

const AuthContext = createContext<any>(null);

export const AuthProvider: React.FC = ({ children }) => {
    const [user, setUser] = useState<User | null>()
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        // Check active sessions and sets the user
        const session = supabase.auth.session()

        setUser(session?.user ?? null)
        setLoading(false)

        // Listen for changes on auth state (logged in, signed out, etc.)
        const { data: listener } = supabase.auth.onAuthStateChange(
            async (event, session) => {
                setUser(session?.user ?? null)
                setLoading(false)
            }
        )

        return () => {
            listener?.unsubscribe()
        }
    }, [])

    // Will be passed down to Signup, Login and Dashboard components
    const value = {
        signUp: (data: UserCredentials) => supabase.auth.signUp(data),
        signIn: (data: UserCredentials) => supabase.auth.signIn(data),
        signOut: () => supabase.auth.signOut(),
        user,
        loading,
    }

    return (
        <AuthContext.Provider value={value} >
            {!loading && children}
        </AuthContext.Provider>
    )
};

export const useAuth = () => {
    return useContext(AuthContext);
}