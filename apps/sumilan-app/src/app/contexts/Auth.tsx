import { useContext, useState, useEffect, createContext } from 'react';
import { User } from '@supabase/supabase-js';

import { supabase } from '../libs/supabase';
import { AuthContextModel } from '../models/auth.model';
import { ADMIN_DASHBOARD_BASE_PATH } from '../constants';

const AuthContext = createContext<AuthContextModel | null>(null);

export const AuthProvider: React.FC = ({ children }) => {
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Check active sessions and sets the user
        const session = supabase.auth.session();

        setUser(session?.user ?? null);
        setLoading(false);

        // Listen for changes on auth state (logged in, signed out, etc.)
        const { data: listener } = supabase.auth.onAuthStateChange(
            async (_event, session) => {
                setUser(session?.user ?? null);
                setLoading(false);
            }
        );

        return () => {
            listener?.unsubscribe();
        };
    }, []);

    // Will be passed down to components
    const value = {
        signIn: () => supabase.auth.signIn({
            provider: 'slack',
        }, {
            redirectTo: `${window.location.origin}${ADMIN_DASHBOARD_BASE_PATH}`
        }),
        signOut: () => supabase.auth.signOut(),
        user,
        loading,
    };

    return (
        <AuthContext.Provider value={value} >
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    return useContext(AuthContext);
};