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
    IonText,
    IonTitle,
    IonToolbar,
    IonSkeletonText,
} from '@ionic/react';
import './Home.css';
import EventCardComponent from '../../components/EventCard/EventCardComponent';
import { RouteComponentProps } from 'react-router';
import { search } from 'ionicons/icons';
import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchEvents } from '../../store/actions/events/eventsActions';
import { EventModel, EventRelatorModel, EventStateModel } from '../../models/event.model';
import { EventTimeStatus, getEventTimeStatus } from '../../utils/eventTimeUtils';
import { DateTime } from 'luxon';

interface GroupedEventsModel {
    passed: EventModel[];
    scheduled: EventModel[];
    today: EventModel[];
}

const EventsList = (data: { events: EventModel[], title: any, props: any }) => {
    return (
        <React.Fragment>
            <IonText color="medium">
                <h4 style={{ marginLeft: 10 }}>{data.title}</h4>
            </IonText>
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

    const [isSearchbarVisible, setIsSearchbarVisible] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const [filteredEvents, setFilteredEvents] = useState<GroupedEventsModel>({
        passed: [],
        scheduled: [],
        today: [],
    });
    const searchbarRef = useRef<HTMLIonSearchbarElement>(null);

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
        groupedEvents.passed = groupedEvents.passed.sort((a, b) => {
            return DateTime.fromISO(b.date) > DateTime.fromISO(a.date) ? 0 : -1;
        })
        groupedEvents.scheduled = groupedEvents.scheduled.sort((a, b) => {
            return DateTime.fromISO(b.date) > DateTime.fromISO(a.date) ? 0 : -1;
        })
        groupedEvents.today = groupedEvents.today.sort((a, b) => {
            return DateTime.fromISO(b.date) > DateTime.fromISO(a.date) ? 0 : -1;
        })
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
                    {filteredEvents.today.length > 0 ? <EventsList events={filteredEvents.today} title={<b>Eventi oggi</b>} props={{ ...props }} /> : null}
                    {filteredEvents.scheduled.length > 0 ? <EventsList events={filteredEvents.scheduled} title={<b>Eventi in programma</b>} props={{ ...props }} /> : null}
                    {filteredEvents.passed.length > 0 ? <EventsList events={filteredEvents.passed} title={<b>Eventi passati</b>} props={{ ...props }} /> : null}
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