import { User } from "@supabase/gotrue-js";
import { ActivistRequest } from "../../models/activist-request.model";
import { supabase } from "../../supabase";

export const fetchRequest = async (user: User): Promise<ActivistRequest | undefined> => {
    const email = user?.email;
    if (email) {
        const { data } = await supabase.from<ActivistRequest>('activist-requests').select('*').eq('email', email);
        if (data && data.length > 0) {
            return data[0];
        }
    }
    return;
};

export const registerRequest = async (user: User, accepted: boolean, request?: ActivistRequest): Promise<ActivistRequest | undefined> => {
    const email = user?.email;
    if (email) {
        if (request) {
            const { data, error } = await supabase
                .from<ActivistRequest>('activist-requests')
                .update({ accepted, timestamp: new Date().toUTCString() })
                .match({ email });
            if (data && data.length > 0) {
                return data[0];
            }
        } else {
            const { data, error } = await supabase
                .from<ActivistRequest>('activist-requests')
                .insert([
                    { email, accepted }
                ]);
            if (data && data.length > 0) {
                return data[0];
            }
        }
    }
};
