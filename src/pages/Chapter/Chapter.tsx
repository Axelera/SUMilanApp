import {
    IonButtons,
    IonContent,
    IonHeader,
    IonMenuButton,
    IonPage,
    IonTitle,
    IonToolbar,
    IonButton,
    IonIcon,
} from "@ionic/react";
import { logoFacebook, logoInstagram, logoLinkedin, logoTwitter, logoYoutube, openOutline } from "ionicons/icons";
import { Trans, useTranslation } from "react-i18next";

import logo from '../../assets/images/logo-150x150.png';
import ChapterName from "../../components/ChapterName/ChapterName";
import { SUM_SOCIAL_LINKS } from "../../data";

import './Chapter.css';

const Chapter: React.FC = () => {
    const { t } = useTranslation();
    return (
        <IonPage>
            <IonHeader>
                <IonToolbar>
                    <IonButtons slot="start">
                        <IonMenuButton />
                    </IonButtons>
                    <IonTitle>{t('CHAPTER.title')}</IonTitle>
                </IonToolbar>
            </IonHeader>
            <IonContent>
                <div style={{ padding: 10, textAlign: 'center' }}>
                    <img src={logo} alt="su-logo" />
                    <p>
                        <Trans i18nKey="CHAPTER.description">
                            <ChapterName /> is a community of activists studying exponential technologies to address the world's greatest challenges and build a better future for all.
                        </Trans>
                    </p>
                    <IonButton href={SUM_SOCIAL_LINKS.website} target="_blank" rel="noreferrer" color="primary" strong>
                        {t('CHAPTER.websiteButton')}
                        <IonIcon slot="end" icon={openOutline} />
                    </IonButton>
                </div>
                <div
                    className="social-links-container"
                >
                    <a href={SUM_SOCIAL_LINKS.facebook} target="_blank" rel="noreferrer">
                        <IonIcon slot="icon-only" icon={logoFacebook} size="large" />
                    </a>
                    <a href={SUM_SOCIAL_LINKS.twitter} target="_blank" rel="noreferrer">
                        <IonIcon slot="icon-only" icon={logoTwitter} size="large" />
                    </a>
                    <a href={SUM_SOCIAL_LINKS.youtube} target="_blank" rel="noreferrer">
                        <IonIcon slot="icon-only" icon={logoYoutube} size="large" />
                    </a>
                    <a href={SUM_SOCIAL_LINKS.linkedin} target="_blank" rel="noreferrer">
                        <IonIcon slot="icon-only" icon={logoLinkedin} size="large" />
                    </a>
                    <a href={SUM_SOCIAL_LINKS.instagram} target="_blank" rel="noreferrer">
                        <IonIcon slot="icon-only" icon={logoInstagram} size="large" />
                    </a>
                </div>
            </IonContent>
        </IonPage>
    );
};

export default Chapter;
