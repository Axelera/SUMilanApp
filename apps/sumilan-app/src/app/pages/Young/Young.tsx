import {
    IonButton,
    IonButtons,
    IonContent,
    IonHeader,
    IonIcon,
    IonMenuButton,
    IonPage,
    IonTitle,
    IonToolbar,
} from "@ionic/react";
import { logoInstagram } from "ionicons/icons";
import { Trans, useTranslation } from "react-i18next";

import LogoImage from "../../components/LogoImage/LogoImage";
import ChapterName from "../../components/ChapterName/ChapterName";

import './Young.css';

const Young: React.FC = () => {
    const {t} = useTranslation();
    
    return (
        <IonPage>
            <IonHeader>
                <IonToolbar>
                    <IonButtons slot="start">
                        <IonMenuButton />
                    </IonButtons>
                    <IonTitle>{t('YOUNG.title')}</IonTitle>
                </IonToolbar>
            </IonHeader>
            <IonContent>
                <LogoImage young={true} className="young-image" />
                <div style={{ padding: 10, textAlign: 'center' }}>
                    <p>
                        <Trans i18nKey="YOUNG.description">
                            <ChapterName />'s group of young activists that study exponential technologies to address the world's greatest challenges and build a better future for all.
                        </Trans>
                    </p>
                    <IonButton href="https://www.instagram.com/singularityumilanyoung/" target="_blank" color="tertiary" strong>
                        <IonIcon slot="start" icon={logoInstagram} />
                        {t('YOUNG.instagramButton')}
                    </IonButton>
                </div>
            </IonContent>
        </IonPage>
    );
};

export default Young;
