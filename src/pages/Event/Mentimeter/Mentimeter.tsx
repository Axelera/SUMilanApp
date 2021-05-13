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
import { EventComponentProps } from '../event.model';

const Mentimeter: React.FC<EventComponentProps> = (props: EventComponentProps) => {
    // const { id } = useParams<{ id: string; }>();
    // console.log(id);
    return (
        <IonPage>
            <EventHeaderComponent event={props.event} />
            <IonContent>
                <IonCard>
                    <IonCardHeader>
                        <IonCardTitle>
                            Test
                        </IonCardTitle>
                        <IonCardSubtitle>
                            Subtest
                        </IonCardSubtitle>
                    </IonCardHeader>
                    <IonCardContent>
                        MENTIMETER!
                    </IonCardContent>
                </IonCard>
            </IonContent>
        </IonPage>
    );
};

export default Mentimeter;