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
import { openOutline } from "ionicons/icons";
import { Trans, useTranslation } from "react-i18next";

import logo from '../../assets/images/logo-150x150.png';
import ChapterName from "../../components/ChapterName/ChapterName";

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
                    <IonButton href="https://www.singularityumilan.com/" target="_blank" color="primary" strong>
                        {t('CHAPTER.websiteButton')}
                        <IonIcon slot="end" icon={openOutline} />
                    </IonButton>
                </div>
            </IonContent>
        </IonPage>
    );
};

export default Chapter;
