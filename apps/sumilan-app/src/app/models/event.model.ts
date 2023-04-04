import { Events, Event_Time_Status, Slides, Speakers } from "@sumilan-app/api";

export interface RelatorsAndModeratorsListModel {
    relators: Speakers[];
    moderators: Speakers[];
};

export interface EventDetailsModel extends Events, RelatorsAndModeratorsListModel {};

export interface EventComponentProps {
    event: EventDetailsModel;
}

export interface SlidesListModel {
    preSlides: Slides[];
    slides: Slides[];
}

export interface LocalTicketData {
    email: string;
};

export interface EventTimeContextModel {
    timeStatus: Event_Time_Status;
};