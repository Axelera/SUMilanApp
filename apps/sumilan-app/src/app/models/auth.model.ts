import { User, GoTrueClient } from "@supabase/supabase-js";

export interface AuthContextModel {
    signIn: () => ReturnType<GoTrueClient['signIn']>;
    signOut: () => ReturnType<GoTrueClient['signOut']>;
    user: User | null;
    loading: boolean;
};