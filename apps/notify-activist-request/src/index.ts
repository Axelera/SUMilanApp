import fetch from 'node-fetch';

const sendSlackMessage = async (email: string, created_at: string) => {
  if (email && created_at) {
    const url = process.env['SLACK_WEBHOOK_URL'];

    const body = {
      text: `New activist request:\nEmail: <mailto:${email}|${email}>\nTimestamp: *${created_at}*\n\nPlease add a :white_check_mark: reaction to this message when you contact the new activist.`,
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

export const handler = async (event) => {
  // record and old_record are supabase events' table rows
  const { type, record, old_record } = event;
  console.log(record);
  if (type === 'INSERT') {
    if (record) {
      const { email, created_at, accepted } = record;
      if (accepted) {
        const res = await sendSlackMessage(email, created_at);
        console.log('Sent message to Slack:', res.ok);
      }
    }
  } else if (type === 'UPDATE') {
    if (old_record && record) {
      const { email, created_at, accepted } = record;
      const { accepted: old_accepted } = old_record;
      if (old_accepted === false && accepted === true) {
        const res = await sendSlackMessage(email, created_at);
        console.log('Sent message to Slack:', res.ok);
      }
    }
  }
  const response = {
    statusCode: 200,
  };
  return response;
};
