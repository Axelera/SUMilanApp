import {
    IonButton,
    IonContent,
    IonHeader,
    IonIcon,
    IonLabel,
    IonPage,
    IonRouterOutlet,
    IonTabBar,
    IonTabButton,
    IonTabs,
    IonTitle,
    IonToolbar,
} from '@ionic/react';
import { Route, Redirect } from 'react-router-dom';
import { RouteComponentProps } from "react-router";
import { fileTrayFull, help, informationCircleOutline, logoYoutube } from 'ionicons/icons';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

import Live from './Live/Live';
import Mentimeter from './Mentimeter/Mentimeter';
import Slides from './Slides/Slides';
import Info from './Info/Info';
import { EventModel, EventStateModel } from '../../models/event.model';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { fetchEvents } from '../../store/events/eventsSlice';
import { VideoPlayerProvider } from '../../contexts/VideoPlayer';
import { EventTimeProvider } from '../../contexts/EventTime';

import './Event.css';

const getCurrentUrl = (url: string) => {
    if (url.endsWith('/')) {
        return url.slice(0, -1);
    }
    return url;
};

interface EventPageProps extends RouteComponentProps<{
    id: string;
}> { };

const Event: React.FC<EventPageProps> = ({ history, match }) => {
    const id = match.params.id;
    const currentUrl = getCurrentUrl(match.url);

    const dispatch = useAppDispatch();
    const { items, status, error } = useAppSelector<EventStateModel>(state => state.events);
    const [event, setEvent] = useState(items.find(ev => ev.identifier === id));
    const { t } = useTranslation();

    useEffect(() => {
        if (!items || items.length === 0) {
            dispatch(fetchEvents());
        } else {
            setEvent(items.find(ev => ev.identifier === id));
        }
    }, [items, dispatch, event, id]);

    if (error) {
        return <p style={{ margin: 15 }}>{t('GENERAL.error')}! {error.message}</p>;
    }

    if (status === 'loading') {
        return <p style={{ margin: 15 }}>{t('GENERAL.loading')}</p>;
    }

    console.log(event);

    if (!event) {
        return (
            <IonPage>
                <IonHeader>
                    <IonToolbar>
                        <IonTitle>{t('EVENT.NOEVENT.title')}</IonTitle>
                    </IonToolbar>
                </IonHeader>
                <IonContent>
                    <div className="center-container">
                        <p>{t('EVENT.NOEVENT.message')}</p>
                        <IonButton onClick={() => history.replace('/home')}>{t('GENERAL.backHome')}</IonButton>
                    </div>
                </IonContent>
            </IonPage>
        );
    }

    const routes = ['info'];

    if (event?.videoUrl) {
        routes.push('live');
    }

    if (event?.votingUrl) {
        routes.push('mentimeter');
    }

    if (event?.slides && event?.slides.length > 0) {
        routes.push('slides');
    }

    const additionalTabButtons = [];

    if (event?.videoUrl) {
        additionalTabButtons.push(
            <IonTabButton key="live-tab-button" tab="live" href={`${currentUrl}/live`}>
                <IonLabel>{t('EVENT.LIVE.title')}</IonLabel>
                <IonIcon icon={logoYoutube}></IonIcon>
            </IonTabButton>
        );
    }

    if (event?.votingUrl) {
        additionalTabButtons.push(
            <IonTabButton key="mentimeter-tab-button" tab="mentimeter" href={`${currentUrl}/mentimeter`}>
                <IonLabel>{t('EVENT.MENTIMETER.title')}</IonLabel>
                <IonIcon icon={help}></IonIcon>
            </IonTabButton>
        );
    }

    if ((event?.slides && event?.slides.length > 0) || (event?.preSlides && event?.preSlides.length > 0)) {
        additionalTabButtons.push(
            <IonTabButton key="slides-tab-button" tab="slides" href={`${currentUrl}/slides`}>
                <IonLabel>{t('EVENT.SLIDES.title')}</IonLabel>
                <IonIcon icon={fileTrayFull}></IonIcon>
            </IonTabButton>
        );
    }

    console.log(match);

    return (
        <VideoPlayerProvider>
            <EventTimeProvider date={event.date} duration={event.duration}>
                <IonTabs>
                    <IonRouterOutlet>
                        <Route
                            path={currentUrl}
                            render={() => <Redirect to={`${currentUrl}/info`} exact />}
                            exact
                        />
                        <Route
                            path={`${currentUrl}/info`}
                            render={() => <Info
                                event={event as EventModel}
                            />}
                            exact
                        />
                        <Route
                            path={`${currentUrl}/live`}
                            render={() => <Live
                                event={event as EventModel}
                            />}
                            exact
                        />
                        <Route
                            path={`${currentUrl}/mentimeter`}
                            render={() => <Mentimeter
                                event={event as EventModel}
                            />}
                            exact
                        />
                        <Route
                            path={`${currentUrl}/slides`}
                            render={() => <Slides
                                event={event as EventModel}
                            />}
                            exact
                        />
                    </IonRouterOutlet>
                    <IonTabBar slot="bottom">
                        <IonTabButton tab="info" href={`${currentUrl}/info`}>
                            <IonLabel>{t('EVENT.INFO.title')}</IonLabel>
                            <IonIcon icon={informationCircleOutline}></IonIcon>
                        </IonTabButton>
                        {additionalTabButtons.map((btn: any, index: number) => btn)}
                    </IonTabBar>
                </IonTabs>
            </EventTimeProvider>
        </VideoPlayerProvider>
    );
};

export default Event;