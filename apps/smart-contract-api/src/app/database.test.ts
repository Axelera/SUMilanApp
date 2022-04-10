import { format } from 'date-fns';

import { getEventData } from './database';

describe('get event data passed', () => {
  it('should work', async () => {
    const eventData = await getEventData('incontro-44');
    expect(eventData).toEqual({
      id: '10',
      identifier: 'incontro-44',
      event_title:
        "Nanotecnologie: Istruzioni per l'uso della prossima rivoluzione",
      start_timestamp: '2022-03-01T17:00:00+00:00',
      event_time_status: 'passed',
    });
  });
});

describe('get event data scheduled', () => {
  it('should work', async () => {
    const eventData = await getEventData('incontro-45');
    expect(eventData).toEqual(undefined);
  });
});
