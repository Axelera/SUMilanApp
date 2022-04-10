import { IonCol, IonGrid, IonRow } from "@ionic/react";

import { EventDetailsModel } from "../../models/event.model";
import { SocialLinkType } from "../../models/types.model";
import SocialLinkComponent from "../SocialLinkComponent/SocialLinkComponent";

interface StreamingUrlProps {
    url: string;
    platform: SocialLinkType;
};

const StreamingUrl: React.FC<StreamingUrlProps> = ({ url, platform }) => {
    return (
        <IonCol className="streaming-url-col">
            <SocialLinkComponent
                url={url}
                platform={platform}
                color="secondary"
            />
        </IonCol>
    );
};

interface Props {
    event: EventDetailsModel;
};

const StreamingUrlList: React.FC<Props> = ({ event }) => {
    return (
        <IonGrid>
            <IonRow>
                <StreamingUrl
                    platform={SocialLinkType.YOUTUBE}
                    url={event.video_url as string}
                />
                {event.facebook_video_url && (
                    <StreamingUrl
                        platform={SocialLinkType.FACEBOOK}
                        url={event.facebook_video_url as string}
                    />
                )}
                {event.twitter_video_url && (
                    <StreamingUrl
                        platform={SocialLinkType.TWITTER}
                        url={event.twitter_video_url as string}
                    />
                )}
                {event.linkedin_video_url && (
                    <StreamingUrl
                        platform={SocialLinkType.LINKEDIN}
                        url={event.linkedin_video_url as string}
                    />
                )}
            </IonRow>
        </IonGrid>
    );
};

export default StreamingUrlList;