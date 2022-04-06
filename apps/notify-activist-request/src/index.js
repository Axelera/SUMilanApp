const fetch = require('node-fetch');

const sendSlackMessage = async (email, timestamp) => {
    if (email && timestamp) {
        const url = process.env.SLACK_WEBHOOK_URL;

        const body = {
            text: `New activist request:\nEmail: <mailto:${email}|${email}>\nTimestamp: *${timestamp}*\n\nPlease add a :white_check_mark: reaction to this message when you contact the new activist.`,
        };

        const params = {
            method: 'POST',
            mode: 'cors',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(body),
        };

        return await fetch(url, params);
    }
    return { ok: false };
};

exports.handler = async (event) => {
    const { type, record, old_record } = event;
    console.log(record);
    if (type === 'INSERT') {
        if (record) {
            const { email, timestamp, accepted } = record;
            if (accepted) {
                const res = await sendSlackMessage(email, timestamp);
                console.log('Sent message to Slack:', res.ok);
            }
        }
    } else if (type === 'UPDATE') {
        if (old_record && record) {
            const { email, timestamp, accepted } = record;
            const { accepted: old_accepted } = old_record;
            if (old_accepted === false && accepted === true) {
                const res = await sendSlackMessage(email, timestamp);
                console.log('Sent message to Slack:', res.ok);
            }
        }
    }
    const response = {
        statusCode: 200,
    };
    return response;
};