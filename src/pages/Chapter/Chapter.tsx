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
    IonText,
} from "@ionic/react";
import './Chapter.css';
import { openOutline } from "ionicons/icons";
import logo from '../../assets/images/logo-150x150.png';

const Chapter: React.FC = () => {
    return (
        <IonPage>
            <IonHeader>
                <IonToolbar>
                    <IonButtons slot="start">
                        <IonMenuButton />
                    </IonButtons>
                    <IonTitle>Chapter</IonTitle>
                </IonToolbar>
            </IonHeader>
            <IonContent>
                <div style={{ padding: 10, textAlign: 'center' }}>
                    <img src={logo} alt="su-logo" />
                    <p><b>SingularityU</b> <IonText color="secondary"><span><b>Milan</b></span></IonText> <IonText color="primary"><span><b>Chapter</b></span></IonText> è una comunità di attivisti che studiano le tecnologie esponenziali per affrontare le più grandi sfide del mondo e costruire un futuro migliore per tutti.</p>
                    <IonButton href="https://www.singularityumilan.com/" target="_blank" color="primary" strong>
                        Sito web
                        <IonIcon slot="end" icon={openOutline} />
                    </IonButton>
                </div>
            </IonContent>
        </IonPage>
    );
};

export default Chapter;
