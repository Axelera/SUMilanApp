const events = [
    {
        id: 0,
        title: 'Evento 37',
        type: 'live',
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Lectus nulla at volutpat diam ut.',
        date: '2021-05-13T12:00:00+02:00',
        duration: 120, // in minutes
        imageUrl: 'http://placeimg.com/640/480/tech',
        videoUrl: 'https://www.youtube.com/watch?v=36YnV9STBqc',
        streamingUrls: [
            {
                platform: 'facebook',
                url: 'https://facebook.com',
            },
            {
                platform: 'twitter',
                url: 'https://twitter.com',
            }
        ],
        relators: [
            {
                name: 'David Orban',
                imageUrl: 'https://thispersondoesnotexist.com/image',
                socialLinks: [
                    {
                        platform: 'linkedin',
                        url: 'https://linkedin.com',
                    },
                    {
                        platform: 'website',
                        url: 'https://davidorban.com',
                    },
                ],
            }
        ],
        slides: [
            {
                title: 'Relatore 1',
                url: 'https://github.com/wojtekmaj/react-pdf/raw/master/sample/webpack/sample.pdf',
                imageUrl: 'https://thispersondoesnotexist.com/image',
            },
            {
                title: 'Relatore 2',
                url: 'https://github.com/wojtekmaj/react-pdf/raw/master/sample/webpack/sample.pdf',
                imageUrl: 'https://thispersondoesnotexist.com/image',
            },
            {
                title: 'Relatore 3',
                url: 'https://github.com/wojtekmaj/react-pdf/raw/master/sample/webpack/sample.pdf',
                imageUrl: 'https://thispersondoesnotexist.com/image',
            }
        ],
    },
    {
        id: 1,
        title: 'Clubhouse con Tizio Caio',
        type: 'clubhouse',
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do.',
        date: '2021-05-13T18:00:00+02:00',
        duration: 60, // in minutes
        imageUrl: 'http://placeimg.com/640/480/tech',
    },
    {
        id: 2,
        title: 'Evento 36',
        type: 'live',
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Lectus nulla at volutpat diam ut.',
        date: '2021-05-10T14:00:00+02:00',
        duration: 120, // in minutes
        imageUrl: 'http://placeimg.com/640/480/tech',
    },
    {
        id: 3,
        title: 'Evento 35',
        type: 'live',
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Lectus nulla at volutpat diam ut.',
        date: '2021-05-09T16:00:00+02:00',
        duration: 120, // in minutes
        imageUrl: 'http://placeimg.com/640/480/tech',
    },
    {
        id: 4,
        title: 'Evento 34',
        type: 'live',
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Lectus nulla at volutpat diam ut.',
        date: '2021-05-08T17:00:00+02:00',
        duration: 120, // in minutes
        imageUrl: 'http://placeimg.com/640/480/tech',
    }
];

export default events;