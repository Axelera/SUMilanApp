import { PostgrestResponse } from "@supabase/postgrest-js/dist/main/lib/types";

import { ActivistRequest } from "../../models/activist-request.model";
import { supabase } from "../../libs/supabase";
import * as storage from '../storage/storage';

export const loadRequest = async (): Promise<ActivistRequest | null> => {
    return await storage.getObject<ActivistRequest>('enrolled-activist');
};

export const registerRequest = async (email: string, accepted: boolean): Promise<PostgrestResponse<ActivistRequest> | undefined> => {
    if (email) {
        const fromTable = supabase.from<ActivistRequest>('activist_requests');
        const { data } = await fromTable.select('*').eq('email', email);
        let res: PostgrestResponse<ActivistRequest>;
        if (data && data.length > 0) {
            res = await fromTable.update({
                accepted,
                created_at: new Date().toUTCString(),
            }).match({ email });
        } else {
            res = await fromTable.insert([{ email, accepted }]);
        }
        if (res.data) {
            await storage.setObject('enrolled-activist', res.data[0]);
        }
        return res;
    }
    return;
};
