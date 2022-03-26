module.exports = {
    resolve: {
        fallback: {
            stream: false,
            crypto: false,
            assert: false,
            http: false,
            https: false,
            url: false,
            os: false,
        }
    },
};