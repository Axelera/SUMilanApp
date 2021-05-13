import {
    IonContent,
    IonList,
    IonPage,
    IonItem,
    IonLabel,
    IonAvatar,
    IonButton,
    IonIcon,
} from '@ionic/react';
import { cloudDownloadOutline } from 'ionicons/icons';
import EventHeaderComponent from '../../../components/EventHeader/EventHeaderComponent';
import { EventComponentProps, EventSlideModel } from '../../../models/event.model';
import './Slides.css';

const Slides: React.FC<EventComponentProps> = (props: EventComponentProps) => {
    return (
        <IonPage>
            <EventHeaderComponent event={props.event} />
            <IonContent>
                <IonList>
                    {props.event.slides?.map((slideData: EventSlideModel, index: number) => {
                        return (
                            <IonItem key={index} href={slideData.url} download={`${slideData.title}.pdf`} detail={false}>
                                <IonAvatar slot="start">
                                    <img src={slideData.imageUrl} alt={slideData.title}/>
                                </IonAvatar>
                                <IonLabel>
                                    <p>{slideData.title}</p>
                                </IonLabel>
                                <IonButton slot="end" fill="clear" color="medium">
                                    <IonIcon slot="icon-only" size="small" icon={cloudDownloadOutline} />
                                </IonButton>
                            </IonItem>
                        );
                    })}
                </IonList>
            </IonContent>
        </IonPage>
    );
};

export default Slides;