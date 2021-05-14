import {
    IonCard,
    IonCardContent,
    IonCardHeader,
    IonCardSubtitle,
    IonCardTitle,
    IonContent,
    IonPage,
} from '@ionic/react';
import EventHeaderComponent from '../../../components/EventHeader/EventHeaderComponent';
import { EventComponentProps } from '../../../models/event.model';

const Mentimeter: React.FC<EventComponentProps> = (props: EventComponentProps) => {
    return (
        <IonPage>
            <EventHeaderComponent event={props.event} />
            <IonContent>
                <div style={{position: 'relative', height: '100%', overflow: 'hidden'}}>
                    <iframe
                        title={`menti-${props.event.id}`}
                        sandbox='allow-scripts allow-same-origin'
                        allowFullScreen={true}
                        height='100%'
                        width='100%'
                        src={props.event.votingUrl}
                        style={{position: 'absolute', top: 0, left: 0, width: '100%', height: '100%',}}
                    ></iframe>
                </div>
            </IonContent>
        </IonPage>
    );
};

export default Mentimeter;