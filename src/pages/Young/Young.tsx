import {
    IonButton,
    IonButtons,
    IonContent,
    IonHeader,
    IonIcon,
    IonMenuButton,
    IonPage,
    IonText,
    IonTitle,
    IonToolbar,
} from "@ionic/react";
import './Young.css';
import LogoImage from "../../components/LogoImage/LogoImage";
import { logoInstagram } from "ionicons/icons";

const Young: React.FC = () => {
    return (
        <IonPage>
            <IonHeader>
                <IonToolbar>
                    <IonButtons slot="start">
                        <IonMenuButton />
                    </IonButtons>
                    <IonTitle>SU Young</IonTitle>
                </IonToolbar>
            </IonHeader>
            <IonContent>
                <LogoImage young={true} className="young-image" />
                <div style={{ padding: 10, textAlign: 'center' }}>
                    <p>Gruppo di giovani attivisti del <b>SingularityU</b> <IonText color="secondary"><span><b>Milan</b></span></IonText> <IonText color="primary"><span><b>Chapter</b></span></IonText> che studiano le tecnologie esponenziali per affrontare le più grandi sfide del mondo e costruire un futuro migliore per tutti.</p>
                    <IonButton href="https://www.instagram.com/singularityumilanyoung/" target="_blank" color="tertiary" strong>
                        <IonIcon slot="start" icon={logoInstagram} />
                        Pagina Instagram
                    </IonButton>
                </div>
            </IonContent>
        </IonPage>
    );
};

export default Young;
