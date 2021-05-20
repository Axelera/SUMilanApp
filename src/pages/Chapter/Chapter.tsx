import {
    IonButtons,
    IonContent,
    IonHeader,
    IonMenuButton,
    IonPage,
    IonTitle,
    IonToolbar,
} from "@ionic/react";
import './Chapter.css';
import LogoImage from "../../components/LogoImage/LogoImage";

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
                <LogoImage className="chapter-image" />
                <p>Work in progress</p>
            </IonContent>
        </IonPage>
    );
};

export default Chapter;
