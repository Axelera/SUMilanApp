import { useMemo } from "react";
import { IonButton, IonIcon } from "@ionic/react";
import { logoFacebook, logoTwitter, logoTwitch, logoLinkedin, globeOutline, videocam, logoYoutube } from "ionicons/icons";

import { SocialLinkType } from "../../models/types.model";

interface SocialLinkProps {
    platform: SocialLinkType;
    url: string;
    ionicProps?: any;
    color: string;
}

const SocialLinkComponent: React.FC<SocialLinkProps> = ({ platform, url, color, ionicProps }) => {
    const socialIcon = useMemo(() => {
        let icon;
        switch (platform) {
            case SocialLinkType.FACEBOOK:
                icon = logoFacebook;
                break;
            case SocialLinkType.TWITTER:
                icon = logoTwitter;
                break;
            case SocialLinkType.TWITCH:
                icon = logoTwitch;
                break;
            case SocialLinkType.LINKEDIN:
                icon = logoLinkedin;
                break;
            case SocialLinkType.WEBSITE:
                icon = globeOutline;
                break;
            case SocialLinkType.YOUTUBE:
                icon = logoYoutube;
                break;
            case SocialLinkType.VIDEO:
                icon = videocam;
                break;
            default:
                break;
        }
        return icon;
    }, [platform]);

    return (
        <IonButton href={url} target="_blank" fill="clear" color={color} {...ionicProps}>
            <IonIcon slot="icon-only" icon={socialIcon} />
        </IonButton>
    );
};

export default SocialLinkComponent;