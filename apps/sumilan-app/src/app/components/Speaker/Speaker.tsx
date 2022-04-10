import { IonItem, IonAvatar, IonLabel } from "@ionic/react";

import { Speakers } from "@sumilan-app/api";
import { SocialLinkType } from "../../models/types.model";
import SocialLinkComponent from "../SocialLinkComponent/SocialLinkComponent";
import avatar from '../../../assets/images/avatar.png';

interface SpeakerProps {
    speaker: Speakers;
};

const Speaker: React.FC<SpeakerProps> = ({ speaker }) => {
    return (
        <IonItem>
            <IonAvatar slot="start">
                <img src={speaker.speaker_image_url ? speaker.speaker_image_url : avatar} alt={speaker.speaker_name} />
            </IonAvatar>
            <IonLabel>
                <h2>{speaker.speaker_name}</h2>
                {speaker.speaker_description && <p>{speaker.speaker_description}</p>}
            </IonLabel>
            {speaker.facebook_url &&
                <SocialLinkComponent
                    url={speaker.facebook_url}
                    platform={SocialLinkType.FACEBOOK}
                    color="secondary"
                    ionicProps={{ slot: 'end' }}
                />
            }
            {speaker.twitter_url &&
                <SocialLinkComponent
                    url={speaker.twitter_url}
                    platform={SocialLinkType.TWITTER}
                    color="secondary"
                    ionicProps={{ slot: 'end' }}
                />
            }
            {speaker.linkedin_url &&
                <SocialLinkComponent
                    url={speaker.linkedin_url}
                    platform={SocialLinkType.LINKEDIN}
                    color="secondary"
                    ionicProps={{ slot: 'end' }}
                />
            }
            {speaker.website_url &&
                <SocialLinkComponent
                    url={speaker.website_url}
                    platform={SocialLinkType.WEBSITE}
                    color="secondary"
                    ionicProps={{ slot: 'end' }}
                />
            }
        </IonItem>
    )
};

export default Speaker;