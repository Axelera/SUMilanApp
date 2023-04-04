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
import { SearchbarChangeEventDetail } from '@ionic/core';
import { RouteComponentProps } from 'react-router';
import { search } from 'ionicons/icons';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import { DateTime } from 'luxon';
import { useTranslation } from 'react-i18next';

import EventCardComponent from '../../components/EventCard/EventCardComponent';
import { ActivistRequestState } from '../../models/activist-request.model';
import { loadActivistRequest, storeActivistRequest } from '../../store/activist/activistSlice';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { Events, Event_Time_Status, useGetEventsQuery } from '@sumilan-app/api';

import './Home.css';

interface GroupedEventsModel {
    passed: Partial<Events>[];
    scheduled: Partial<Events>[];
    today: Partial<Events>[];
}

interface EventsListComponentWithRouteProps extends RouteComponentProps {
    events: Partial<Events>[];
    title: string;
}

const EventsList: React.FC<EventsListComponentWithRouteProps> = ({ events, title, ...props }) => {
    return (
        <React.Fragment>
            <div className="events-separator">{title}</div>
            <IonRow>
                {events.map(event => {
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
                            <EventCardComponent {...props} event={event} />
                        </IonCol>
                    );
                })}
            </IonRow>
        </React.Fragment>
    );
};

const Home: React.FC<RouteComponentProps> = (props: RouteComponentProps) => {
    const dispatch = useAppDispatch();
    const [events] = useGetEventsQuery();
    const { data, error, fetching } = events;

    console.log('events', data);

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
    const { t } = useTranslation();

    const { history } = props;

    const toggleSearchbarHandler = () => {
        setIsSearchbarVisible((state) => !state);
    }

    const searchInputHandler = (data: CustomEvent<SearchbarChangeEventDetail>) => {
        const input = data.detail.value?.trim()?.toLowerCase() || '';
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
            header: t('ALERTS.ActivistSearch.title'),
            message: t('ALERTS.ActivistSearch.message'),
            buttons: [
                { text: t('ALERTS.ActivistSearch.Buttons.cancel'), role: 'cancel', handler: alertChoiceHandler.bind(this, false) },
                { text: t('ALERTS.ActivistSearch.Buttons.ok'), role: 'accept', handler: alertChoiceHandler.bind(this, true) },
            ],
            backdropDismiss: false,
        });
    }, [present, history, dispatch, t]);

    useEffect(() => {
        const fEvents = data?.eventsCollection?.edges.map(item => item.node) || [];
        const groupedEvents: GroupedEventsModel = {
            passed: [],
            scheduled: [],
            today: [],
        };
        for (const ev of fEvents) {
            if (!searchQuery || (searchQuery &&
                ev?.event_title.toLowerCase().includes(searchQuery) ||
                ev?.event_type.toLowerCase().includes(searchQuery) ||
                ev?.event_description?.toLowerCase().includes(searchQuery)
            )) {
                if (ev?.event_time_status === Event_Time_Status.Passed) {
                    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                    //@ts-ignore
                    groupedEvents.passed.push(ev);
                } else if (ev?.event_time_status === Event_Time_Status.Scheduled) {
                    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                    //@ts-ignore
                    groupedEvents.scheduled.push(ev);
                } else {
                    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                    //@ts-ignore
                    groupedEvents.today.push(ev);
                }
            }
        }
        setFilteredEvents(groupedEvents);
    }, [searchQuery, data]);

    useEffect(() => {
        if (isSearchbarVisible) {
            searchbarRef?.current?.setFocus();
        }
    }, [isSearchbarVisible]);

    useEffect(() => {
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
                    placeholder={t('HOME.Search.placeholder')}
                    ref={searchbarRef}
                />
            </IonToolbar>
        ) :
        (
            <IonToolbar>
                <IonButtons slot="start">
                    <IonMenuButton />
                </IonButtons>
                <IonTitle>{t('HOME.title')}</IonTitle>
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
                    <p style={{ margin: 15 }}>{t('GENERAL.error')}! {error.message}</p>
                </IonContent>
            </IonPage>
        );
    }

    if (fetching) {
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
                    {filteredEvents.today.length > 0 &&
                        <EventsList
                            events={filteredEvents.today}
                            title={t('HOME.Events.today')}
                            {...props}
                        />
                    }
                    {filteredEvents.scheduled.length > 0 &&
                        <EventsList
                            events={filteredEvents.scheduled}
                            title={t('HOME.Events.scheduled')}
                            {...props}
                        />
                    }
                    {filteredEvents.passed.length > 0 &&
                        <EventsList
                            events={filteredEvents.passed}
                            title={t('HOME.Events.past')}
                            {...props}
                        />
                    }
                    {isSearchbarVisible &&
                        filteredEvents.passed.length === 0 &&
                        filteredEvents.scheduled.length === 0 &&
                        filteredEvents.today.length === 0 &&
                        <p style={{ margin: 15 }}>{t('HOME.Search.empty')}</p>
                    }
                </IonGrid>
            </IonContent>
        </IonPage>
    );
};

export default Home;