import {
    IonButton,
    IonButtons,
    IonCol,
    IonContent,
    IonGrid,
    IonHeader,
    IonIcon,
    IonMenuButton,
    IonPage,
    IonRow,
    IonSearchbar,
    IonTitle,
    IonToolbar,
    IonSkeletonText,
    useIonAlert,
} from '@ionic/react';
import { RouteComponentProps } from 'react-router';
import { search } from 'ionicons/icons';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import { DateTime } from 'luxon';

import './Home.css';
import EventCardComponent from '../../components/EventCard/EventCardComponent';
import { EventModel, EventRelatorModel, EventStateModel } from '../../models/event.model';
import { EventTimeStatus, getEventTimeStatus } from '../../utils/eventTimeUtils';
import { fetchEvents } from '../../store/events/eventsSlice';
import { ActivistRequestState } from '../../models/activist-request.model';
import { loadActivistRequest, storeActivistRequest } from '../../store/activist/activistSlice';
import { useAppDispatch, useAppSelector } from '../../store/hooks';

interface GroupedEventsModel {
    passed: EventModel[];
    scheduled: EventModel[];
    today: EventModel[];
}

const EventsList = (data: { events: EventModel[], title: any, props: any }) => {
    return (
        <React.Fragment>
            {data.title}
            <IonRow>
                {data.events.map(event => {
                    return (
                        <IonCol
                            key={event.id}
                            sizeXs="12"
                            sizeSm="6"
                            sizeMd="6"
                            sizeLg="6"
                            sizeXl="4"
                            style={{ padding: 0 }}
                        >
                            <EventCardComponent {...data.props} event={event} />
                        </IonCol>
                    );
                })}
            </IonRow>
        </React.Fragment>
    );
};

const isQueryInRelators = (query: string, relators: EventRelatorModel[] | undefined): boolean => {
    if (relators) {
        for (const relator of relators) {
            if (relator.name.toLowerCase().includes(query)) {
                return true;
            }
        }
    }
    return false;
}

const Home: React.FC<RouteComponentProps> = (props: RouteComponentProps) => {
    const dispatch = useAppDispatch();
    const { items, status, error } = useAppSelector<EventStateModel>(state => state.events);
    const activistRequestState = useAppSelector<ActivistRequestState>(state => state.activistRequest);

    const [isSearchbarVisible, setIsSearchbarVisible] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const [filteredEvents, setFilteredEvents] = useState<GroupedEventsModel>({
        passed: [],
        scheduled: [],
        today: [],
    });
    const searchbarRef = useRef<HTMLIonSearchbarElement>(null);
    const [isAlertPresented, setIsAlertPresented] = useState(false);
    const [present] = useIonAlert();

    const { history } = props;

    const toggleSearchbarHandler = () => {
        setIsSearchbarVisible((state) => !state);
    }

    const searchInputHandler = (data: any) => {
        const input = data.detail.value?.trim()?.toLowerCase();
        setSearchQuery(input);
    };

    const presentAlert = useCallback(() => {
        const alertChoiceHandler = (accepted: boolean) => {
            dispatch(storeActivistRequest(accepted));
            if (accepted) {
                history.push('activist');
            }
        };
        present({
            header: 'Stiamo cercando activist!',
            message: 'Stiamo cercando <b>activist</b> per contribuire alla crescita del <b>Chapter</b>.<br>Desideri avere maggiori informazioni?',
            buttons: [
                { text: 'Non ora', role: 'cancel', handler: alertChoiceHandler.bind(this, false) },
                { text: 'Sì!', role: 'accept', handler: alertChoiceHandler.bind(this, true) },
            ],
            backdropDismiss: false,
        });
    }, [present, history, dispatch]);

    useEffect(() => {
        let fEvents = [...items];
        if (searchQuery) {
            fEvents = items.filter(ev => {
                return ev.title.toLowerCase().includes(searchQuery) ||
                    ev.type.toLowerCase().includes(searchQuery) ||
                    ev.description.toLowerCase().includes(searchQuery) ||
                    isQueryInRelators(searchQuery, ev.relators) ||
                    isQueryInRelators(searchQuery, ev.moderators);
            });
        }
        const groupedEvents: GroupedEventsModel = {
            passed: [],
            scheduled: [],
            today: [],
        }
        for (const ev of fEvents) {
            const evDateTime = DateTime.fromISO(ev.date);
            if (getEventTimeStatus(evDateTime, ev.duration) === EventTimeStatus.PASSED) {
                groupedEvents.passed.push(ev);
            } else if (getEventTimeStatus(evDateTime, ev.duration) === EventTimeStatus.SCHEDULED) {
                groupedEvents.scheduled.push(ev);
            } else {
                groupedEvents.today.push(ev);
            }
        }
        groupedEvents.passed = groupedEvents.passed.reverse();
        setFilteredEvents(groupedEvents);
    }, [searchQuery, items]);

    useEffect(() => {
        if (isSearchbarVisible) {
            searchbarRef?.current?.setFocus();
        }
    }, [isSearchbarVisible]);

    useEffect(() => {
        dispatch(fetchEvents());
        dispatch(loadActivistRequest());
    }, [dispatch]);

    useEffect(() => {
        if (!isAlertPresented && activistRequestState.status !== 'loading') {
            setIsAlertPresented(true);
            if (!activistRequestState.askedRequest) {
                presentAlert();
            } else {
                const dt = DateTime.fromISO(activistRequestState.askedRequest.askedAt);
                const accepted = activistRequestState.askedRequest.accepted;
                if (!accepted && dt.diffNow('days').days < -7) {
                    presentAlert();
                }
            }
        }
    }, [presentAlert, isAlertPresented, activistRequestState]);

    const toolbar = isSearchbarVisible ?
        (
            <IonToolbar>
                <IonSearchbar
                    showCancelButton="always"
                    onIonCancel={toggleSearchbarHandler}
                    onIonChange={searchInputHandler}
                    placeholder="Cerca tra gli eventi..."
                    ref={searchbarRef}
                />
            </IonToolbar>
        ) :
        (
            <IonToolbar>
                <IonButtons slot="start">
                    <IonMenuButton />
                </IonButtons>
                <IonTitle>Home</IonTitle>
                <IonButtons slot="end">
                    <IonButton onClick={toggleSearchbarHandler}>
                        <IonIcon slot="icon-only" icon={search} />
                    </IonButton>
                </IonButtons>
            </IonToolbar>
        );

    if (error) {
        return (
            <IonPage>
                <IonHeader>
                    {toolbar}
                </IonHeader>
                <IonContent fullscreen>
                    <p style={{ margin: 15 }}>Errore! {error.message}</p>
                </IonContent>
            </IonPage>
        );
    }

    if (status === 'loading') {
        return (
            <IonPage>
                <IonHeader>
                    {toolbar}
                </IonHeader>
                <IonContent fullscreen>
                    <IonGrid style={{ padding: 0 }}>
                        <IonSkeletonText animated style={{ width: 150, height: 20, marginTop: 16, marginLeft: 10 }} />
                        <IonRow>
                            {[0, 1, 2].map((i, index) => {
                                return (
                                    <IonCol
                                        key={index}
                                        sizeXs="12"
                                        sizeSm="6"
                                        sizeMd="6"
                                        sizeLg="6"
                                        sizeXl="4"
                                        style={{ padding: 0 }}
                                    >
                                        <EventCardComponent {...props} event={undefined} />
                                    </IonCol>
                                );
                            })}
                        </IonRow>
                    </IonGrid>
                </IonContent>
            </IonPage>
        );
    }

    return (
        <IonPage>
            <IonHeader>
                {toolbar}
            </IonHeader>
            <IonContent fullscreen>
                <IonGrid style={{ padding: 0 }}>
                    {filteredEvents.today.length > 0 ? <EventsList events={filteredEvents.today} title={<div className="events-separator">Eventi oggi</div>} props={{ ...props }} /> : null}
                    {filteredEvents.scheduled.length > 0 ? <EventsList events={filteredEvents.scheduled} title={<div className="events-separator">Eventi in programma</div>} props={{ ...props }} /> : null}
                    {filteredEvents.passed.length > 0 ? <EventsList events={filteredEvents.passed} title={<div className="events-separator">Eventi passati</div>} props={{ ...props }} /> : null}
                    {isSearchbarVisible &&
                        filteredEvents.passed.length === 0 &&
                        filteredEvents.scheduled.length === 0 &&
                        filteredEvents.today.length === 0 ?
                        <p style={{ margin: 15 }}>Nessun evento soddisfa la tua ricerca</p> : null
                    }
                </IonGrid>
            </IonContent>
        </IonPage>
    );
};

export default Home;