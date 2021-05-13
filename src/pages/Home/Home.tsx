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
    IonToolbar
} from '@ionic/react';
import './Home.css';
import EventCardComponent from '../../components/EventCard/EventCardComponent';
import { RouteComponentProps } from 'react-router';
import { search } from 'ionicons/icons';
import { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchEvents } from '../../store/actions/events/eventsActions';
import { EventRelatorModel, EventStateModel } from '../../models/event.model';

const Home: React.FC<RouteComponentProps> = (props: RouteComponentProps) => {
    const dispatch = useDispatch();
    const { items, loading, error } = useSelector<{ events: EventStateModel }, EventStateModel>(state => state.events);
    
    const [isSearchbarVisible, setIsSearchbarVisible] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const [filteredEvents, setFilteredEvents] = useState(items);
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
        if (searchQuery) {
            const fEvents = items.filter(ev => {
                return ev.title.toLowerCase().includes(searchQuery) ||
                    ev.type.toLowerCase().includes(searchQuery) ||
                    ev.description.toLowerCase().includes(searchQuery) ||
                    isQueryInRelators(searchQuery, ev.relators);
            });
            setFilteredEvents([...fEvents]);
        } else {
            setFilteredEvents(items);
        }
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
                    <IonRow>
                        {filteredEvents?.length > 0 ? filteredEvents.map((event, index) => {
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
                                    <EventCardComponent {...props} event={event} />
                                </IonCol>
                            );
                        }) : (
                            <p style={{ margin: 15 }}>Nessun evento soddisfa la tua ricerca</p>
                        )}
                    </IonRow>
                </IonGrid>
            </IonContent>
        </IonPage>
    );
};

export default Home;