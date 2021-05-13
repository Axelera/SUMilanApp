import {
    IonIcon,
    IonLabel,
    IonRouterOutlet,
    IonTabBar,
    IonTabButton,
    IonTabs,
} from '@ionic/react';
import { Route } from 'react-router-dom';
import { RouteComponentProps, useParams } from "react-router";
import { useDispatch, useSelector } from 'react-redux'
import Live from './Live/Live';
import { fileTrayFull, help, informationCircleOutline, logoYoutube } from 'ionicons/icons';
import Mentimeter from './Mentimeter/Mentimeter';
import Slides from './Slides/Slides';
import Info from './Info/Info';
import { EventModel, EventStateModel } from '../../models/event.model';
import { useEffect, useState } from 'react';
import { fetchEvents } from '../../store/actions/events/eventsActions';

const Event: React.FC<RouteComponentProps> = (props: RouteComponentProps) => {
    const { id } = useParams<{ id: string; }>();
    
    const dispatch = useDispatch();
    const { items, loading, error } = useSelector<{ events: EventStateModel }, EventStateModel>(state => state.events);
    const [event, setEvent] = useState(items.find(ev => ev.id === Number(id)));

    useEffect(() => {
        if (!items || items.length === 0) {
            dispatch(fetchEvents());
        } else {
            setEvent(items.find(ev => ev.id === Number(id)));
        }
    }, [items, dispatch, event, id]);

    if (error) {
        return <p style={{ margin: 15 }}>Error! {error.message}</p>;
    }

    if (loading) {
        return <p style={{ margin: 15 }}>Caricamento...</p>;
    }

    if (!event) {
        return <p style={{ margin: 15 }}>Questo evento non e' piu' disponibile.</p>
    }

    return (
        <IonTabs>
            <IonRouterOutlet>
                <Route path={`/event/${id}/info`} render={() => <Info event={event as EventModel}/>} exact />
                <Route path={`/event/${id}/live`} render={() => <Live event={event as EventModel}/>} exact />
                <Route path={`/event/${id}/mentimeter`} render={() => <Mentimeter event={event as EventModel}/>} exact />
                <Route path={`/event/${id}/slides`} render={() => <Slides event={event as EventModel}/>} exact />
            </IonRouterOutlet>
            <IonTabBar slot="bottom">
                <IonTabButton tab="Info" href={`/event/${id}/info`}>
                    <IonLabel>Info</IonLabel>
                    <IonIcon icon={informationCircleOutline}></IonIcon>
                </IonTabButton>
                <IonTabButton tab="live" href={`/event/${id}/live`}>
                    <IonLabel>Diretta</IonLabel>
                    <IonIcon icon={logoYoutube}></IonIcon>
                </IonTabButton>
                <IonTabButton tab="mentimeter" href={`/event/${id}/mentimeter`}>
                    <IonLabel>Mentimeter</IonLabel>
                    <IonIcon icon={help}></IonIcon>
                </IonTabButton>
                <IonTabButton tab="slides" href={`/event/${id}/slides`}>
                    <IonLabel>Slides</IonLabel>
                    <IonIcon icon={fileTrayFull}></IonIcon>
                </IonTabButton>
            </IonTabBar>
        </IonTabs>
    );
};

export default Event;