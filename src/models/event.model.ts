import { RouteComponentProps } from "react-router";

import { EventType, SlideType, SocialLinkType, TicketsLinkType } from "./types.model";

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
    type: EventType;
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
    show: boolean;
    ebEventId?: string;
    slidesAuthRequired: boolean;
}

export interface EventStreamingUrlModel {
    platform: SocialLinkType;
    url: string;
}

export interface EventRelatorModel {
    name: string;
    imageUrl: string;
    socialLinks: {
        platform: SocialLinkType;
        url: string;
    }[];
    description?: string;
}

export interface EventSlideModel {
    title: string;
    url: string;
    imageUrl?: string;
    type?: SlideType;
    description?: string;
}

export interface EventStateModel {
    items: EventModel[];
    status: 'loading' | 'idle' | 'error';
    error: any;
}

export interface TicketsLinkModel {
    type: TicketsLinkType;
    url: string;
}

export interface LocalTicketData {
    email: string;
};