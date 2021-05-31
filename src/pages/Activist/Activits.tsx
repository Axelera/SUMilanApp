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
    useIonAlert,
} from "@ionic/react";
import './Activist.css';
import { mailOutline } from "ionicons/icons";
import LogoImage from "../../components/LogoImage/LogoImage";
import { useAuth } from "../../contexts/Auth";
import { useEffect, useState } from "react";
import { ActivistRequest } from "../../models/activist-request.model";
import { fetchRequest, registerRequest } from "../../services/activist-request/activistRequest";

const Activist: React.FC = () => {
    const { user } = useAuth();
    const [request, setRequest] = useState<ActivistRequest>();

    const [present] = useIonAlert();

    useEffect(() => {
        fetchRequest(user).then(req => setRequest(req));
    }, [user]);

    const enrollActivist = request && request.accepted ? (
        <>
            <p><i>Hai già richiesto di diventare activist</i></p>
        </>
    ) : (<>
        <p>Desideri avere maggiori informazioni?</p>
        <IonButton color="secondary" strong onClick={() => {
            registerRequest(user, true, request).then(req => {
                setRequest(req);
                present({
                    header: 'Grazie!',
                    message: `Ti contatteremo all'email: <b>${user.email}</b>`,
                    buttons: ['Ok']
                });
            });
        }}>
            <IonIcon slot="start" icon={mailOutline} />
            Inviatemi un'email
        </IonButton>
    </>);

    return (
        <IonPage>
            <IonHeader>
                <IonToolbar>
                    <IonButtons slot="start">
                        <IonMenuButton />
                    </IonButtons>
                    <IonTitle>Diventa activist</IonTitle>
                </IonToolbar>
            </IonHeader>
            <IonContent>
                <div style={{ padding: 10, textAlign: 'center' }}>
                    <LogoImage />
                    <p>Stiamo cercando <b>activist</b> che contribuiscano attivamente alla crescita del <IonText color="primary"><span><b>Chapter</b></span></IonText>.</p>
                    <div className="enroll-activist-container">
                        {enrollActivist}
                    </div>
                </div>
            </IonContent>
        </IonPage>
    );
};

export default Activist;