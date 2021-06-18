import { PostgrestResponse } from "@supabase/postgrest-js/dist/main/lib/types";

import { ActivistRequest } from "../../models/activist-request.model";
import { supabase } from "../../supabase";
import * as storage from '../storage/storage';

export const loadRequest = async (): Promise<ActivistRequest | null> => {
    return await storage.getObject<ActivistRequest>('enrolled-activist');
};

export const registerRequest = async (email: string, accepted: boolean): Promise<PostgrestResponse<ActivistRequest> | undefined> => {
    if (email) {
        const { data } = await supabase.from<ActivistRequest>('activist-requests').select('*').eq('email', email);
        let res: PostgrestResponse<ActivistRequest>;
        if (data && data.length > 0) {
            res = await supabase
                .from<ActivistRequest>('activist-requests')
                .update({ accepted, timestamp: new Date().toUTCString() })
                .match({ email });
        } else {
            res = await supabase
                .from<ActivistRequest>('activist-requests')
                .insert([
                    { email, accepted }
                ]);
        }
        if (res.data) {
            await storage.setObject('enrolled-activist', res.data[0]);
        }
        return res;
    }
};
