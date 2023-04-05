import { useEffect, useState } from 'react';
import {
    IonContent,
    IonPage,
    IonFooter,
    IonButton,
    IonIcon,
    IonSpinner,
} from '@ionic/react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { object, string } from 'yup';
import { lockOpen, ticketOutline } from 'ionicons/icons';
import { useTranslation } from 'react-i18next';

import BottomLivePlayer from '../../../components/BottomLivePlayer/BottomLivePlayer';
import { EventComponentProps, LocalTicketData } from '../../../models/event.model';
import { checkHasTicket, getLocalTicket, setLocalTicket as setLocTicket } from '../../../services/cloud-functions/eventbriteWrapper';
import InputComponent from '../../../components/Input/InputComponent';
import CenteredContainer from '../../../components/CenteredContainer/CenteredContainer';
import SlidesList from '../../../components/SlidesList/SlidesList';

import './Slides.css';

const validationSchema = object().shape({
    email: string().required('emailRequired').email('emailInvalid'),
});

const Slides: React.FC<EventComponentProps> = ({ event }) => {
    const [localTicket, setLocalTicket] = useState<LocalTicketData | null>(null);
    const { control, handleSubmit, formState: { errors } } = useForm({ resolver: yupResolver(validationSchema) });
    const [ticketCheckResult, setTicketCheckResult] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);
    const { t } = useTranslation();

    const submitTicketEmail = async (data: any) => {
        setTicketCheckResult(null);
        setIsLoading(true);
        try {
            const email = data.email.trim().toLowerCase();
            const hasTicket = await checkHasTicket(email, event.eventbrite_event_id as string);
            if (hasTicket) {
                await setLocTicket(email, event.eventbrite_event_id as string);
                setLocalTicket({ email });
            } else {
                setTicketCheckResult(t('SLIDES.TicketRequired.noTicket'));
            }
        } catch (e: any) {
            setError(e.message);
        }
        setIsLoading(false);
    };

    useEffect(() => {
        const checkLocalTicket = async () => {
            if (event.slides_auth_required && event.eventbrite_event_id) {
                const localTicket = await getLocalTicket(event.eventbrite_event_id);
                setLocalTicket(localTicket);
            }
        };
        checkLocalTicket();
    }, [event]);

    if (error) {
        return (
            <IonPage>
                <IonContent
                    style={{
                        '--padding-top': '20px',
                    }}
                >
                    <p>{t('GENERAL.longError')}</p>
                </IonContent>
            </IonPage>
        );
    };

    if (event.slides_auth_required && !localTicket) {
        return (
            <IonPage>
                <IonContent
                    style={{
                        '--padding-top': '20px',
                    }}
                >
                    <div style={{ padding: 10, textAlign: 'center' }}>
                        <p>{t('SLIDES.TicketRequired.title')}</p>
                        <h3>{t('SLIDES.TicketRequired.noTicketQuestion')}</h3>
                        <IonButton
                            color="tertiary"
                            href={event.tickets_url as string}
                            strong
                        >
                            <IonIcon slot="start" icon={ticketOutline} />
                            {t('SLIDES.TicketRequired.getTicketButton')}
                        </IonButton>
                        <h3>{t('SLIDES.TicketRequired.yesTicketQuestion')}</h3>
                        <p style={{ marginBottom: 0 }}>{t('SLIDES.TicketRequired.enterEmail')}</p>
                        <CenteredContainer>
                            <form onSubmit={handleSubmit(submitTicketEmail)}>
                                <InputComponent control={control} name="email" label={t('INPUTS.emailPlaceholder')} errors={errors} />
                                < br />
                                {isLoading ?
                                    <IonSpinner color="secondary" />
                                    :
                                    <IonButton type="submit" color="secondary" strong>
                                        <IonIcon slot="start" icon={lockOpen} />
                                        {t('SLIDES.TicketRequired.unlockButton')}
                                    </IonButton>
                                }
                            </form>
                            {ticketCheckResult && <p><b>{ticketCheckResult}</b></p>}
                        </CenteredContainer>
                    </div>
                </IonContent>
            </IonPage>
        );
    }

    return (
        <IonPage>
            <IonContent
                style={{
                    '--padding-top': '20px',
                }}
            >
                <SlidesList event={event} />
            </IonContent>
            <IonFooter>
                <BottomLivePlayer
                    eventId={event.identifier}
                    eventImageUrl={event.event_image_url as string}
                />
            </IonFooter>
        </IonPage>
    );
};

export default Slides;