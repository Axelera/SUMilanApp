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
import './Home.css';
import EventCardComponent from '../../components/EventCard/EventCardComponent';
import { RouteComponentProps } from 'react-router';
import { search } from 'ionicons/icons';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchEvents } from '../../store/actions/events/eventsActions';
import { EventModel, EventRelatorModel, EventStateModel } from '../../models/event.model';
import { EventTimeStatus, getEventTimeStatus } from '../../utils/eventTimeUtils';
import { DateTime } from 'luxon';
import { ActivistRequest } from '../../models/activist-request.model';
import { fetchRequest, registerRequest } from '../../services/activist-request/activistRequest';
import { useAuth } from '../../contexts/Auth';
import { User } from '@supabase/gotrue-js';

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

const Home: React.FC<RouteComponentProps> = (props: RouteComponentProps) => {
    const dispatch = useDispatch();
    const { items, loading, error } = useSelector<{ events: EventStateModel }, EventStateModel>(state => state.events);
    const { user } = useAuth();

    const [isSearchbarVisible, setIsSearchbarVisible] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const [filteredEvents, setFilteredEvents] = useState<GroupedEventsModel>({
        passed: [],
        scheduled: [],
        today: [],
    });
    const searchbarRef = useRef<HTMLIonSearchbarElement>(null);
    const [isAlertPresented, setIsAlertPresented] = useState(false);
    const [hasAccepted, setHasAccepted] = useState(false);
    const [present] = useIonAlert();

    const toggleSearchbarHandler = () => {
        setIsSearchbarVisible((state) => !state);
    }

    const searchInputHandler = (data: any) => {
        const input = data.detail.value?.trim()?.toLowerCase();
        setSearchQuery(input);
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

    const presentAlert = useCallback((user: User, request?: ActivistRequest) => {
        present({
            header: 'Stiamo cercando activist!',
            message: 'Stiamo cercando <b>activist</b> per contribuire alla crescita del <b>Chapter</b>.<br>Desideri avere maggiori informazioni?',
            buttons: [
                { text: 'Non ora', role: 'cancel', handler: () => registerRequest(user, false, request) },
                {
                    text: 'Sì!', role: 'accept', handler: () => {
                        registerRequest(user, true, request);
                    }
                },
            ],
            backdropDismiss: false,
            onDidDismiss: (d) => {
                if (d.detail.role === 'accept') {
                    setHasAccepted(true);
                }
            },
        });
    }, [present]);

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
    }, [dispatch]);

    useEffect(() => {
        if (!isAlertPresented) {
            setIsAlertPresented(true);
            fetchRequest(user).then(req => {
                if (!req) {
                    presentAlert(user, req);
                } else {
                    const dt = DateTime.fromISO(req.timestamp);
                    const accepted = req.accepted;
                    if (!accepted && dt.diffNow('days').days < -7) {
                        presentAlert(user, req);
                    }
                }
            });
        }
    }, [user, presentAlert, isAlertPresented]);

    useEffect(() => {
        if (hasAccepted) {
            setHasAccepted(false);
            present({
                header: 'Grazie!',
                message: `Ti contatteremo all'email: <b>${user.email}</b>`,
                buttons: ['Ok']
            });
        }
    }, [user, hasAccepted, present]);

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

    if (loading) {
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