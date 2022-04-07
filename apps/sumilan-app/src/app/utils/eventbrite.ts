const EVENTBRITE_WIDGETS_API = 'https://www.eventbrite.com/static/widgets/eb_widgets.js';

declare global {
    interface Window {
        EBWidgets: {
            createWidget: (data: {
                widgetType: string;
                eventId: string;
                modalTriggerElementId: string;
                onOrderComplete: () => void;
                modal?: boolean;
                iFrameContainerId?: string;
                iFrameContainerHeight?: number;
                iFrameAutoAdapt?: number;
            }) => void;
        };
    }
}

export const isEventbriteWidgetsAvailable = () => {
    const matchingScripts = document.querySelectorAll(`script[src='${EVENTBRITE_WIDGETS_API}']`);
    return (matchingScripts.length > 0 && !!window['EBWidgets']);
};

export const loadEventbriteWidgets = (): Promise<void> => {
    return new Promise((resolve, _reject) => {
        if (isEventbriteWidgetsAvailable()) {
            return resolve();
        }
        console.log('loading eventbrite widgets');
        const script = document.createElement("script");
        script.src = EVENTBRITE_WIDGETS_API;
        script.onload = () => {
            console.log('script loaded');
            resolve();
        };
        //For head
        document.head.appendChild(script);
    });
};