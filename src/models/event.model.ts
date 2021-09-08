import { RouteComponentProps } from "react-router";

export interface EventComponentProps {
    event: EventModel;
}

export interface EventComponentWithRouteProps extends RouteComponentProps {
    event?: EventModel;
}

export interface EventModel {
    id: number;
    identifier: string;
    title: string;
    type: string;
    description: string;
    date: string;
    duration: number; // in minutes
    imageUrl: string;
    videoUrl?: string;
    votingUrl?: string;
    ticketsLink?: TicketsLinkModel;
    roomUrl?: string;
    streamingUrls?: EventStreamingUrlModel[];
    relators?: EventRelatorModel[];
    moderators?: EventRelatorModel[];
    slides?: EventSlideModel[];
    preSlides?: EventSlideModel[];
}

export interface EventStreamingUrlModel {
    platform: string;
    url: string;
}

export interface EventRelatorModel {
    name: string;
    imageUrl: string;
    socialLinks: {
        platform: string;
        url: string;
    }[];
    description?: string;
}

export interface EventSlideModel {
    title: string;
    url: string;
    imageUrl?: string;
    type?: string;
}

export interface EventStateModel {
    items: EventModel[];
    status: 'loading' | 'idle' | 'error';
    error: any;
}

export interface TicketsLinkModel {
    type: string;
    url: string;
}