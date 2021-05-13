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
import chapterLogo from '../../assets/images/title-logo.png';

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
                <img src={chapterLogo} alt="chapter-logo" className="chapter-image" />
                <p>Work in progress</p>
            </IonContent>
        </IonPage>
    );
};

export default Chapter;
