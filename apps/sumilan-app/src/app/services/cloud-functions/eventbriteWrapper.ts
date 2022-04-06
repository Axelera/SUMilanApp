import { LocalTicketData } from '../../models/event.model';
import * as localStorage from '../storage/storage';

const localStorageKey = (eventId: string) => `eventbrite-event-${eventId}`;

export const checkHasTicket = async (email: string, eventId: string) => {
    const res = await fetch(`https://2effcb24.eu-gb.apigw.appdomain.cloud/sumilaneventbriteapi/hasticket?email=${email}&eventId=${eventId}`, {
        method: 'GET',
        headers: {
            'X-IBM-Client-Id': process.env['NX_IBM_EVENTBRITE_WRAPPER_KEY'] as string,
        },
    });
    if (!res.ok) {
        throw new Error(`Failed to get ticket status for ${email}`);
    }
    const data = await res.json();
    return data.hasTicket;
};

export const setLocalTicket = async (email: string, eventId: string) => {
    await localStorage.setObject(localStorageKey(eventId), { email });
};

export const getLocalTicket = async (eventId: string): Promise<LocalTicketData | null> => {
    const ticketData = await localStorage.getObject<LocalTicketData>(localStorageKey(eventId));
    return ticketData;
};