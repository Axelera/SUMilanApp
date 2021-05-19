import {
    IonButton,
    IonCol,
    IonContent,
    IonGrid,
    IonInput,
    IonItem,
    IonLabel,
    IonPage,
    IonRow,
} from "@ionic/react";
import './Start.css';
import titleLogo from '../../assets/images/title-logo.png';
import { useState } from "react";
import { useDispatch } from "react-redux";
import { RouteComponentProps } from "react-router";
import { performLogin } from "../../store/actions/login/loginActions";

const Start: React.FC<RouteComponentProps> = (props: RouteComponentProps) => {

    const [code, setCode] = useState<string>('');

    const dispatch = useDispatch();

    const inputHandler = (ev: any) => {
        if (ev.detail.value) {
            setCode(ev.detail.value.trim());
        } else {
            setCode('');
        }
    };

    const startClickHandler = () => {
        dispatch(performLogin());
    };

    return (
        <IonPage>
            <IonContent>
                <div className="center-container">
                    <img src={titleLogo} alt="su-milan" />
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
                                <IonItem>
                                    <IonLabel position="stacked">
                                        Inserisci il codice di accesso
                                    </IonLabel>
                                    <IonInput value={code} placeholder="Digita il codice..." onIonChange={inputHandler}></IonInput>
                                </IonItem>
                                <IonButton disabled={code.length === 0} onClick={startClickHandler}>
                                    Inizia
                                </IonButton>
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