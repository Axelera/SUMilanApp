import {
    IonIcon,
    IonLabel,
    IonRouterOutlet,
    IonTabBar,
    IonTabButton,
    IonTabs,
} from '@ionic/react';
import { Route } from 'react-router-dom';
import { useParams } from "react-router";
import Live from './Live/Live';
import { fileTrayFull, help, informationCircleOutline, logoYoutube } from 'ionicons/icons';
import Mentimeter from './Mentimeter/Mentimeter';
import Slides from './Slides/Slides';
import events from '../../constants/events';
import Info from './Info/Info';

const Event: React.FC = () => {
    const { id } = useParams<{ id: string; }>();
    const event = events.find(ev => ev.id === Number(id));
    return (
        <IonTabs>
            <IonRouterOutlet>
                <Route path={`/event/${id}/info`} render={() => <Info event={event}/>} exact />
                <Route path={`/event/${id}/live`} render={() => <Live event={event}/>} exact />
                <Route path={`/event/${id}/mentimeter`} render={() => <Mentimeter event={event}/>} exact />
                <Route path={`/event/${id}/slides`} render={() => <Slides event={event}/>} exact />
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