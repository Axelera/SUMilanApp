import { IonButton, IonButtons, IonContent, IonHeader, IonIcon, IonPage, IonTitle, IonToolbar } from "@ionic/react";
import { close } from "ionicons/icons";
import { useTranslation } from "react-i18next";

import { NFTCertificateExtendedModel } from "../../models/certificates.model";
import NFTCertificate from "../NFTCertificate/NFTCertificate";

import "./OwnedCertificatesModal.css";

type Props = {
    certificates: NFTCertificateExtendedModel[];
    onDismiss: () => void;
};

const OwnedCertificatesModal: React.FC<Props> = ({ certificates, onDismiss }) => {
    const { t } = useTranslation();

    return (
        <IonPage>
            <IonHeader>
                <IonToolbar>
                    <IonTitle>{t('CERTIFICATES.MODAL.title')}</IonTitle>
                    <IonButtons
                        slot="end"
                    >
                        <IonButton
                            onClick={onDismiss}
                        >
                            <IonIcon icon={close} />
                        </IonButton>
                    </IonButtons>
                </IonToolbar>
            </IonHeader>
            <IonContent>
                <div className="certificates-container">
                    {certificates.map((certificate, index) => {
                        return (
                            <NFTCertificate
                                key={index}
                                certificate={certificate}
                            />
                        );
                    })}
                </div>
            </IonContent>
        </IonPage>
    );
};

export default OwnedCertificatesModal;