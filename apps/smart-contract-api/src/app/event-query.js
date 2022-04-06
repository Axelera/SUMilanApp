const { createClient } = require('@supabase/supabase-js');
const { add, isBefore, format } = require('date-fns');

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

const getEventData = async (eventId) => {
  const result = await supabase
    .from('events')
    .select('title, date, duration, canMintCertificate')
    .eq('identifier', eventId);
  if (result.status !== 200 || result.data.length === 0) {
    throw new Error('Error while retrieving event title');
  }
  const eventData = result.data[0];
  const eventDate = new Date(eventData.date);
  if (!eventData.canMintCertificate) {
    return {
      error: "We don't provide a certificate for this event",
      status: 400,
    };
  }
  const endDate = add(eventDate, { minutes: eventData.duration });
  if (isBefore(new Date(), endDate)) {
    return {
      error: 'Event is not ended yet',
      status: 400,
    };
  }
  return {
    title: eventData.title,
    date: format(eventDate, 'dd/MM/yyyy'),
  };
};

module.exports.getEventData = getEventData;
