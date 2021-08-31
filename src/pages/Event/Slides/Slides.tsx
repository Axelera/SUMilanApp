import {
    IonContent,
    IonList,
    IonPage,
    IonListHeader,
    IonFooter,
} from '@ionic/react';
import { DateTime } from 'luxon';

import BottomLivePlayer from '../../../components/BottomLivePlayer/BottomLivePlayer';
import EventHeaderComponent from '../../../components/EventHeader/EventHeaderComponent';
import EventSlideItemComponent from '../../../components/EventSlideItemComponent/EventSlideItemComponent';
import { EventComponentProps, EventSlideModel } from '../../../models/event.model';
import { EventTimeStatus, getEventTimeStatus } from '../../../utils/eventTimeUtils';

import './Slides.css';

const Slides: React.FC<EventComponentProps> = (props: EventComponentProps) => {

    return (
        <IonPage>
            <EventHeaderComponent event={props.event} />
            <IonContent>
                {
                    props.event.preSlides && props.event.preSlides.length > 0 ?
                        (
                            <IonList>
                                <IonListHeader>Materiale di studio</IonListHeader>
                                {props.event.preSlides.map((slideData: EventSlideModel, index: number) => <EventSlideItemComponent key={Math.random()} slideData={slideData} />)}
                            </IonList>
                        )
                        : null
                }
                {
                    props.event.slides && props.event.slides.length > 0 ?
                        (
                            <IonList>
                                <IonListHeader>Slides relatori</IonListHeader>
                                {props.event.slides.map((slideData: EventSlideModel, index: number) => <EventSlideItemComponent key={Math.random()} slideData={slideData} />)}
                            </IonList>
                        )
                        : null
                }
            </IonContent>
            <IonFooter>
                <BottomLivePlayer
                    eventId={props.event.identifier}
                    eventImageUrl={props.event.imageUrl}
                    isLive={getEventTimeStatus(DateTime.fromISO(props.event.date), props.event.duration) === EventTimeStatus.TODAY_LIVE}
                />
            </IonFooter>
        </IonPage>
    );
};

export default Slides;