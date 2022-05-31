import { IonPage, IonContent, IonButton, IonIcon } from "@ionic/react";
import { logoSlack } from "ionicons/icons";
import { Redirect } from "react-router-dom";

import { useAuth } from "../../contexts/Auth";
import { AuthContextModel } from "../../models/auth.model";
import { ADMIN_DASHBOARD_BASE_PATH } from "../../constants";

import "./AdminLogin.css";

const AdminLogin = () => {
    const { user, signIn } = useAuth() as AuthContextModel;

    if (user) {
        return <Redirect to={ADMIN_DASHBOARD_BASE_PATH} />;
    }

    return (
        <IonPage>
            <IonContent>
                <div className="admin-login-container">
                    <IonButton onClick={signIn}>
                        <IonIcon slot="start" icon={logoSlack} />
                        Login with Slack
                    </IonButton>
                </div>
            </IonContent>
        </IonPage>
    );
};

export default AdminLogin;