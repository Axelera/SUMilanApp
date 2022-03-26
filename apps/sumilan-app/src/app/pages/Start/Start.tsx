import {
    IonButton,
    IonCol,
    IonContent,
    IonGrid,
    IonPage,
    IonRow,
    IonSpinner,
    IonText,
    useIonAlert,
} from "@ionic/react";
import './Start.css';
import { useState } from "react";
import { RouteComponentProps } from "react-router";
import LogoImage from "../../components/LogoImage/LogoImage";
import { useAuth } from "../../contexts/Auth";
import { object, string } from 'yup';
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import InputComponent from "../../components/Input/InputComponent";

const Start: React.FC<RouteComponentProps> = (props: RouteComponentProps) => {

    const validationSchema = object().shape({
        email: string().required('Inserisci un\'email').email('Inserisci un\'email valida'),
    });
    const { control, handleSubmit, formState: { errors } } = useForm({ resolver: yupResolver(validationSchema) });
    const { signIn } = useAuth();
    const [present] = useIonAlert();
    const [magicLinkSent, setMagicLinkSent] = useState(false);
    const [displayEmail, setDisplayEmail] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const loginInUser = async (data: any) => {
        const { email } = data;
        setIsLoading(true);
        const { error } = await signIn({ email });
        setIsLoading(false);

        if (error) {
            present({
                header: 'Errore',
                message: `${error.message}`,
                buttons: [
                    'Ok'
                ],
            });
        } else {
            setDisplayEmail(email);
            setMagicLinkSent(true);
        }
    };

    const resendEmailHandler = () => {
        setMagicLinkSent(false);
        setDisplayEmail('');
    };

    const content = isLoading ?
        (
            <IonSpinner />
        ) :
        magicLinkSent ?
            (
                <>
                    <IonText>
                        <p>Effettua il login cliccando sul link che ti abbiamo inviato all'email:<br /><b>{displayEmail}</b></p>
                    </IonText>
                    <IonButton fill="clear" onClick={resendEmailHandler}>
                        Email non ricevuta?
                </IonButton>
                </>
            )
            :
            (
                <form onSubmit={handleSubmit(loginInUser)}>
                    <InputComponent control={control} name="email" label="Inserisci la tua email" errors={errors} />
                    < br />
                    <IonButton type="submit">
                        Inizia
                </IonButton>
                </form >
            );

    return (
        <IonPage>
            <IonContent>
                <div className="center-container">
                    <LogoImage />
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
                                {content}
                            </IonCol>
                            <IonCol></IonCol>
                        </IonRow>
                    </IonGrid>
                </div>
            </IonContent>
        </IonPage>
    );
};

export default Start;