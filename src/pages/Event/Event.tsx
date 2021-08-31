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
import { Link, Route } from 'react-router-dom';
import { Redirect, RouteComponentProps, useParams } from "react-router";
import { fileTrayFull, help, informationCircleOutline, logoYoutube } from 'ionicons/icons';
import { useEffect, useState } from 'react';

import Live from './Live/Live';
import Mentimeter from './Mentimeter/Mentimeter';
import Slides from './Slides/Slides';
import Info from './Info/Info';
import { EventModel, EventStateModel } from '../../models/event.model';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { fetchEvents } from '../../store/events/eventsSlice';
import { VideoPlayerProvider } from '../../contexts/VideoPlayer';

import './Event.css';

const Event: React.FC<RouteComponentProps> = (props: RouteComponentProps) => {
    const { id } = useParams<{ id: string; }>();

    const dispatch = useAppDispatch();
    const { items, status, error } = useAppSelector<EventStateModel>(state => state.events);
    const [event, setEvent] = useState(items.find(ev => ev.identifier === id));

    useEffect(() => {
        if (!items || items.length === 0) {
            dispatch(fetchEvents());
        } else {
            setEvent(items.find(ev => ev.identifier === id));
        }
    }, [items, dispatch, event, id]);

    if (error) {
        return <p style={{ margin: 15 }}>Error! {error.message}</p>;
    }

    if (status === 'loading') {
        return <p style={{ margin: 15 }}>Caricamento...</p>;
    }

    if (!event) {
        return (
            <IonPage>
                <IonHeader>
                    <IonToolbar>
                        <IonTitle>Evento non disponibile</IonTitle>
                    </IonToolbar>
                </IonHeader>
                <IonContent>
                    <div className="center-container">
                        <p>Questo evento non esiste o non è più disponibile.</p>
                        <IonButton onClick={() => props.history.replace('/home')}>Torna alla Home</IonButton>
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
            <IonTabButton key="live-tab-button" tab="live" href={`/event/${id}/live`}>
                <IonLabel>Diretta</IonLabel>
                <IonIcon icon={logoYoutube}></IonIcon>
            </IonTabButton>
        );
    }

    if (event?.votingUrl) {
        additionalTabButtons.push(
            <IonTabButton key="mentimeter-tab-button" tab="mentimeter" href={`/event/${id}/mentimeter`}>
                <IonLabel>Mentimeter</IonLabel>
                <IonIcon icon={help}></IonIcon>
            </IonTabButton>
        );
    }

    if ((event?.slides && event?.slides.length > 0) || (event?.preSlides && event?.preSlides.length > 0)) {
        additionalTabButtons.push(
            <IonTabButton key="slides-tab-button" tab="slides" href={`/event/${id}/slides`}>
                <IonLabel>Materiale</IonLabel>
                <IonIcon icon={fileTrayFull}></IonIcon>
            </IonTabButton>
        );
    }

    return (
        <VideoPlayerProvider>
            <IonPage>
                <IonTabs>
                    {routes.map((route: string, index: number) => <Link key={index} to={`/event/${id}/${route}`} />)}
                    <IonRouterOutlet>
                        <Route path={`/event/${id}/`} exact>
                            <Redirect to={`/event/${id}/info`} />
                        </Route>
                        <Route
                            path={`/event/${id}/info`}
                            render={() => <Info
                                event={event as EventModel}
                            />}
                            exact
                        />
                        <Route
                            path={`/event/${id}/live`}
                            render={() => <Live
                                event={event as EventModel}
                            />}
                            exact
                        />
                        <Route
                            path={`/event/${id}/mentimeter`}
                            render={() => <Mentimeter
                                event={event as EventModel}
                            />}
                            exact
                        />
                        <Route
                            path={`/event/${id}/slides`}
                            render={() => <Slides
                                event={event as EventModel}
                            />}
                            exact />
                    </IonRouterOutlet>
                    <IonTabBar slot="bottom">
                        <IonTabButton tab="Info" href={`/event/${id}/info`}>
                            <IonLabel>Info</IonLabel>
                            <IonIcon icon={informationCircleOutline}></IonIcon>
                        </IonTabButton>
                        {additionalTabButtons.map((btn: any, index: number) => btn)}
                    </IonTabBar>
                </IonTabs>
            </IonPage>
        </VideoPlayerProvider>
    );
};

export default Event;