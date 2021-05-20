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
import LogoImage from "../../components/LogoImage/LogoImage";

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
                <LogoImage young={true} className="young-image"/>
                <p>Work in progress</p>
            </IonContent>
        </IonPage>
    );
};

export default Young;
