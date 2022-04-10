import { Events, Slides, Speakers, SpeakerType } from "@sumilan-app/api";
import { RelatorsAndModeratorsListModel, SlidesListModel } from "../models/event.model";

export const getEventType = (event_type: string | undefined): string => {
    return event_type?.replace(/_/g, ' ').toUpperCase() || '';
};

export const getRelatorsAndModerators = (event: Partial<Events>): RelatorsAndModeratorsListModel => {
    const speakers = event.event_speakerCollection?.edges.map((item) => item.node);
    const relators: Speakers[] = [];
    const moderators: Speakers[] = [];
    if (speakers) {
        speakers.forEach((speaker) => {
            if (speaker?.speaker_type === SpeakerType.Relator) {
                relators.push(speaker.speakers as Speakers);
            } else if (speaker?.speaker_type === SpeakerType.Moderator) {
                moderators.push(speaker.speakers as Speakers);
            }
        });
    }
    return {
        relators,
        moderators,
    };
};

export const getSlidesList = (slidesCollection: Events['slidesCollection']): SlidesListModel => {
    const preSlides: Slides[] = [];
    const slides: Slides[] = [];
    if (slidesCollection?.edges) {
        slidesCollection?.edges.forEach((slideNode) => {
            if (slideNode?.node?.show_before_event_start) {
                preSlides.push(slideNode?.node as Slides);
            } else {
                slides.push(slideNode?.node as Slides);
            }
        });
    }
    return {
        preSlides,
        slides,
    };
}