import { IonButton, IonIcon } from "@ionic/react";
import { logoFacebook, logoTwitter, logoTwitch, logoLinkedin, globeOutline } from "ionicons/icons";

interface SocialLinkProps {
    platform: string;
    url: string;
    ionicProps?: any;
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
        default:
            break;
    }
    return (
        <IonButton href={url} target="_blank" fill="clear" color="secondary" {...props.ionicProps}>
            <IonIcon slot="icon-only" icon={icon} />
        </IonButton>
    );
};

export default SocialLinkComponent;