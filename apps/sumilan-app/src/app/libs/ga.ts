/* eslint-disable @typescript-eslint/ban-ts-comment */
declare global {
    interface Window {
        dataLayer: any[];
        gtag: (...args: any) => void;
    }
}

let hasLoadedGA = false;

export const loadGA = (GA_MEASUREMENT_ID: string) => {
    if (typeof window === "undefined" || typeof document === "undefined" || !process.env['NODE_ENV'] || process.env['NODE_ENV'] === 'development') {
        return;
    }

    if (!hasLoadedGA) {
        // Global Site Tag (gtag.js) - Google Analytics
        const script = document.createElement("script");
        script.async = true;
        // prevent block by AVACY
        // https://docs.avacysolution.com/docs/avacy-tech-docs/prevent-block/
        script.setAttribute('data-managed','as-oil');
        script.setAttribute('data-type','text/javascript');
        script.setAttribute('data-purposes','8,10');
        script.setAttribute('data-iab-vendor', '755');
        script.setAttribute('data-src', `https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`);
        script.type = "as-oil";

        document.body.appendChild(script);

        window.dataLayer = window.dataLayer || [];
        // eslint-disable-next-line no-inner-declarations
        window.gtag = function gtag() {
            // @ts-ignore
            // eslint-disable-next-line prefer-rest-params
            window.dataLayer.push(arguments);
        };

        hasLoadedGA = true;
        
        // @ts-ignore
        gtag('js', new Date());
        // @ts-ignore
        gtag('config', GA_MEASUREMENT_ID, { 'anonymize_ip': true });
    }
};
