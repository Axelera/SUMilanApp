/* eslint-disable @typescript-eslint/ban-ts-comment */
// AVACY is available globally.

export const openPreferenceCenter = () => {
    // @ts-ignore
    if (AVACY) {
        // @ts-ignore
        AVACY.showPreferenceCenter('absolute');
    }
};
