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
    useIonAlert,
    IonSpinner,
} from "@ionic/react";
import { mailOutline } from "ionicons/icons";
import { useEffect, useState } from "react";
import { object, string } from 'yup';
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import { DateTime } from 'luxon';
import { Trans, useTranslation } from "react-i18next";

import LogoImage from "../../components/LogoImage/LogoImage";
import { ActivistRequest } from "../../models/activist-request.model";
import { loadRequest, registerRequest } from "../../services/activist-request/activistRequest";
import InputComponent from "../../components/Input/InputComponent";
import CenteredContainer from "../../components/CenteredContainer/CenteredContainer";
import ChapterName from "../../components/ChapterName/ChapterName";

import './Activist.css';

const validationSchema = object().shape({
    email: string().required('emailRequired').email('emailInvalid'),
});

const Activist: React.FC = () => {
    const [request, setRequest] = useState<ActivistRequest | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const { control, handleSubmit, formState: { errors } } = useForm({ resolver: yupResolver(validationSchema) });
    const [present] = useIonAlert();
    const { t } = useTranslation();

    const submitRequest = async (data: any) => {
        const { email } = data;
        setIsLoading(true);
        const res = await registerRequest(email, true);
        setIsLoading(false);

        if (!res || res.error) {
            present({
                header: t('ALERTS.Error.title'),
                message: `${res?.error.message}`,
                buttons: [
                    t('ALERTS.ok'),
                ],
            });
            return;
        }
        present({
            header: t('ALERTS.EnrolledActivist.title'),
            message: t('ALERTS.EnrolledActivist.message', { email }),
            buttons: [t('ALERTS.ok')]
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
        <p>
            <i>
                {t('ACTIVIST.accepted', { date: DateTime.fromISO(request.created_at).toLocaleString() })}
            </i>
        </p>
    ) : (<>
        <p>{t('ACTIVIST.moreInfo')}</p>
        <form onSubmit={handleSubmit(submitRequest)}>
            <InputComponent control={control} name="email" label={t('ACTIVIST.placeholder')} errors={errors} />
            < br />
            <IonButton type="submit" color="secondary" strong>
                <IonIcon slot="start" icon={mailOutline} />
                {t('ACTIVIST.sendEmailButton')}
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
                    <IonTitle>{t('ACTIVIST.title')}</IonTitle>
                </IonToolbar>
            </IonHeader>
            <IonContent>
                <div style={{ padding: 10, textAlign: 'center' }}>
                    <LogoImage />
                    <p>
                        <Trans i18nKey="ACTIVIST.description">
                            We are looking for <b>activists</b> who will actively contribute to the growth of the <ChapterName onlyChapter />.
                        </Trans>
                    </p>
                    <CenteredContainer>
                        {enrollActivist}
                    </CenteredContainer>
                </div>
            </IonContent>
        </IonPage>
    );
};

export default Activist;