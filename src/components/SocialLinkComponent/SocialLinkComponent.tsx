import { IonButton, IonIcon } from "@ionic/react";
import { logoFacebook, logoTwitter, logoTwitch, logoLinkedin, globeOutline, videocam } from "ionicons/icons";

interface SocialLinkProps {
    platform: string;
    url: string;
    ionicProps?: any;
    color: string;
}

const SocialLinkComponent: React.FC<SocialLinkProps> = (props: SocialLinkProps) => {
    const platform = props.platform;
    const url = props.url;
    let icon;
    switch (platform) {
        case 'facebook':
            icon = logoFacebook;
            break;
        case 'twitter':
            icon = logoTwitter;
            break;
        case 'twitch':
            icon = logoTwitch;
            break;
        case 'linkedin':
            icon = logoLinkedin;
            break;
        case 'website':
            icon = globeOutline;
            break;
        case 'video':
            icon = videocam;
            break;
        default:
            break;
    }
    return (
        <IonButton href={url} target="_blank" fill="clear" color={props.color} {...props.ionicProps}>
            <IonIcon slot="icon-only" icon={icon} />
        </IonButton>
    );
};

export default SocialLinkComponent;