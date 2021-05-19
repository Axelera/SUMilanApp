import { getItem, setItem } from "../storage/storage";

export const login = async () => {
    await setItem('lastAccess', new Date().toISOString());
    return true;
}

export const isLoggedIn = async (): Promise<boolean> => {
    const date = await getItem('lastAccess');
    if (date) {
        return true;
    }
    return false;
};