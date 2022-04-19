export const getAppVersion = () => {
    if (process.env['NX_BUILD_NUMBER'] && process.env['NX_COMMIT_SHA']) {
        return `${process.env['NX_BUILD_NUMBER']}-${process.env['NX_COMMIT_SHA'].slice(0, 7)}`;
    }
    return 'dev';
};