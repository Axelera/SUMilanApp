const fetch = require('node-fetch');

const eventbriteToken = "<EVENTBRITE-PRIVATE-TOKEN>";

async function getEventOrders(eventId, continuation = "") {
    if (!eventId) {
        throw new Error("Failed");
    }
    let queryParams = "status=active";
    if (continuation) {
        queryParams = `continuation=${continuation}`;
    }
    const res = await fetch(`https://www.eventbriteapi.com/v3/events/${eventId}/orders/?${queryParams}`, {
        method: 'GET',
        headers: {
            Authorization: `Bearer ${eventbriteToken}`,
        }
    });
    if (!res.ok) {
        throw new Error("Failed");
    }
    return await res.json();
}

function isEmailInOrders(orders, email) {
    return orders.findIndex(item => item.email.toLowerCase() === email) > -1;
}

async function hasEventTicket(data, eventId, email) {
    let hasTicket = false;
    const orders = data.orders;
    if (!isEmailInOrders(orders, email)) {
        if (data.pagination.has_more_items) {
            const paginatedData = await getEventOrders(eventId, data.pagination.continuation);
            return hasEventTicket(paginatedData, eventId, email);
            
        }
    } else {
        hasTicket = true;
    };
    return hasTicket;
}

/**
  *
  * main() will be run when you invoke this action
  *
  * @param Cloud Functions actions accept a single parameter, which must be a JSON object.
  *
  * @return The output of this action, which must be a JSON object.
  *
  */
async function main(params){
    const eventId = params.eventId;
    const email = params.email;
    if (!email || !eventId) {
        throw new Error("Both email and eventId are required")
    }
    const data = await getEventOrders(eventId);
    const hasTicket = await hasEventTicket(data, eventId, email);
    return {
        email,
	    eventId,
	    hasTicket,
	};
}
