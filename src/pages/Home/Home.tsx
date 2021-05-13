import {
    IonButton,
    IonButtons,
    IonContent,
    IonHeader,
    IonIcon,
    IonMenuButton,
    IonPage,
    IonSearchbar,
    IonTitle,
    IonToolbar
} from '@ionic/react';
import events from '../../constants/events';
import './Home.css';
import EventCardComponent from '../../components/EventCard/EventCardComponent';
import { RouteComponentProps } from 'react-router';
import { search } from 'ionicons/icons';
import { useEffect, useRef, useState } from 'react';

const Home: React.FC<RouteComponentProps> = (props: RouteComponentProps) => {
    const [isSearchbarVisible, setIsSearchbarVisible] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const [filteredEvents, setFilteredEvents] = useState(events);
    const searchbarRef = useRef<HTMLIonSearchbarElement>(null);

    const toggleSearchbarHandler = () => {
        setIsSearchbarVisible((state) => !state);
    }

    const inputHandler = (data: any) => {
        const input = data.detail.value?.trim()?.toLowerCase();
        setSearchQuery(input);
    };

    const isQueryInRelators = (query: string, relators: any): boolean => {
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
            const fEvents = events.filter(ev => {
                return ev.title.toLowerCase().includes(searchQuery) ||
                    ev.type.toLowerCase().includes(searchQuery) ||
                    ev.description.toLowerCase().includes(searchQuery) ||
                    isQueryInRelators(searchQuery, ev.relators);
            });
            setFilteredEvents([...fEvents]);
        } else {
            setFilteredEvents(events);
        }
    }, [searchQuery]);

    useEffect(() => {
        if (isSearchbarVisible) {
            searchbarRef?.current?.setFocus();
        }
    }, [isSearchbarVisible]);

    const toolbar = isSearchbarVisible ?
        (
            <IonToolbar>
                <IonSearchbar
                    showCancelButton="always"
                    onIonCancel={toggleSearchbarHandler}
                    onIonChange={inputHandler}
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

    return (
        <IonPage>
            <IonHeader>
                {toolbar}
            </IonHeader>
            <IonContent fullscreen>
                {filteredEvents?.length > 0 ? filteredEvents.map((event, index) => {
                    return (
                        <EventCardComponent {...props} event={event} />
                    );
                }) : (
                    <p style={{ margin: 15 }}>Nessun evento soddisfa la tua ricerca</p>
                )}
            </IonContent>
        </IonPage>
    );
};

export default Home;