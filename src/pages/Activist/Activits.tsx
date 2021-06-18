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
    IonGrid,
    IonRow,
    IonCol,
    IonSpinner,
} from "@ionic/react";
import { mailOutline } from "ionicons/icons";
import { useEffect, useState } from "react";
import { object, string } from 'yup';
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import { DateTime } from 'luxon';

import './Activist.css';
import LogoImage from "../../components/LogoImage/LogoImage";
import { ActivistRequest } from "../../models/activist-request.model";
import { loadRequest, registerRequest } from "../../services/activist-request/activistRequest";
import InputComponent from "../../components/Input/InputComponent";

const validationSchema = object().shape({
    email: string().required('Inserisci un\'email').email('Inserisci un\'email valida'),
});

const Activist: React.FC = () => {
    const [request, setRequest] = useState<ActivistRequest | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const { control, handleSubmit, formState: { errors } } = useForm({ resolver: yupResolver(validationSchema) });
    const [present] = useIonAlert();

    const submitRequest = async (data: any) => {
        const { email } = data;
        setIsLoading(true);
        const res = await registerRequest(email, true);
        setIsLoading(false);

        if (!res || res.error) {
            present({
                header: 'Errore',
                message: `${res?.error.message}`,
                buttons: [
                    'Ok'
                ],
            });
            return;
        }
        present({
            header: 'Grazie!',
            message: `Ti contatteremo all'email: <b>${email}</b>`,
            buttons: ['Ok']
        });
        setRequest(res.data[0]);
    };

    useEffect(() => {
        loadRequest().then(req => setRequest(req));
    }, []);

    let enrollActivist;

    if (isLoading) {
        enrollActivist = <IonSpinner />;
    }

    enrollActivist = request && request.accepted ? (
        <>
            <p><i>Hai richiesto di diventare activist il {DateTime.fromISO(request.timestamp).toLocaleString()}</i></p>
        </>
    ) : (<>
        <p>Desideri avere maggiori informazioni?</p>
        <form onSubmit={handleSubmit(submitRequest)}>
            <InputComponent control={control} name="email" label="Inserisci la tua email" errors={errors} />
            < br />
            <IonButton type="submit" color="secondary" strong>
                <IonIcon slot="start" icon={mailOutline} />
                Inviatemi un'email
            </IonButton>
        </form >
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
                    <IonGrid>
                        <IonRow className="ion-align-items-end">
                            <IonCol></IonCol>
                            <IonCol
                                size="4"
                                sizeXs="10"
                                sizeSm="5"
                                sizeMd="5"
                                sizeLg="3"
                                sizeXl="3"
                            >
                                {enrollActivist}
                            </IonCol>
                            <IonCol></IonCol>
                        </IonRow>
                    </IonGrid>
                </div>
            </IonContent>
        </IonPage>
    );
};

export default Activist;