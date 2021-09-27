import { useEffect, useState } from 'react';
import {
    IonContent,
    IonList,
    IonPage,
    IonListHeader,
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
import EventHeaderComponent from '../../../components/EventHeader/EventHeaderComponent';
import EventSlideItemComponent from '../../../components/EventSlideItemComponent/EventSlideItemComponent';
import { EventComponentProps, EventSlideModel, LocalTicketData } from '../../../models/event.model';
import { checkHasTicket, getLocalTicket, setLocalTicket as setLocTicket } from '../../../services/cloud-functions/eventbriteWrapper';
import InputComponent from '../../../components/Input/InputComponent';
import CenteredContainer from '../../../components/CenteredContainer/CenteredContainer';

import './Slides.css';

const validationSchema = object().shape({
    email: string().required('emailRequired').email('emailInvalid'),
});

const Slides: React.FC<EventComponentProps> = ({ event }: EventComponentProps) => {
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
            const hasTicket = await checkHasTicket(email, event.ebEventId as string);
            if (hasTicket) {
                await setLocTicket(email, event.ebEventId as string);
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
            if (event.slidesAuthRequired && event.ebEventId) {
                const localTicket = await getLocalTicket(event.ebEventId);
                setLocalTicket(localTicket);
            }
        };
        checkLocalTicket();
    }, [event]);

    if (error) {
        return (
            <IonPage>
                <EventHeaderComponent event={event} />
                <IonContent>
                    <p>{t('GENERAL.longError')}</p>
                </IonContent>
            </IonPage>
        );
    };

    if (event.slidesAuthRequired && !localTicket) {
        return (
            <IonPage>
                <EventHeaderComponent event={event} />
                <IonContent>
                    <div style={{ padding: 10, textAlign: 'center' }}>
                        <p>{t('SLIDES.TicketRequired.title')}</p>
                        <h3>{t('SLIDES.TicketRequired.noTicketQuestion')}</h3>
                        <IonButton
                            color="tertiary"
                            href={event.ticketsLink?.url}
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
            <EventHeaderComponent event={event} />
            <IonContent>
                {
                    event.preSlides && event.preSlides.length > 0 ?
                        (
                            <IonList>
                                <IonListHeader>{t('EVENT.SLIDES.studyMaterial')}</IonListHeader>
                                {event.preSlides.map((slideData: EventSlideModel, index: number) => <EventSlideItemComponent key={Math.random()} slideData={slideData} />)}
                            </IonList>
                        )
                        : null
                }
                {
                    event.slides && event.slides.length > 0 ?
                        (
                            <IonList>
                                <IonListHeader>{t('EVENT.SLIDES.slides')}</IonListHeader>
                                {event.slides.map((slideData: EventSlideModel, index: number) => <EventSlideItemComponent key={Math.random()} slideData={slideData} />)}
                            </IonList>
                        )
                        : null
                }
            </IonContent>
            <IonFooter>
                <BottomLivePlayer
                    eventId={event.identifier}
                    eventImageUrl={event.imageUrl}
                />
            </IonFooter>
        </IonPage>
    );
};

export default Slides;