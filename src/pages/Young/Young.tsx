import {
    IonButtons,
    IonContent,
    IonHeader,
    IonMenuButton,
    IonPage,
    IonTitle,
    IonToolbar,
} from "@ionic/react";
import './Young.css';
import youngLogo from '../../assets/images/title-logo-young.png';


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
                <img src={youngLogo} alt="young-logo" className="young-image" />
                <p>Work in progress</p>
            </IonContent>
        </IonPage>
    );
};

export default Young;
