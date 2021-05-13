import { RouteComponentProps } from "react-router";

export interface EventComponentProps {
    event: EventModel;
}

export interface EventComponentWithRouteProps extends RouteComponentProps {
    event?: EventModel;
}

export interface EventModel {
    id: number;
    title: string;
    type: string;
    description: string;
    date: string;
    duration: number; // in minutes
    imageUrl: string;
    videoUrl?: string;
    streamingUrls?: EventStreamingUrlModel[];
    relators?: EventRelatorModel[];
    slides?: EventSlideModel[];
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
}

export interface EventSlideModel {
    title: string;
    url: string;
    imageUrl: string;
}

export interface EventStateModel {
    items: EventModel[];
    loading: boolean;
    error: any;
}
