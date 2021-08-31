import {
    IonContent,
    IonList,
    IonPage,
    IonListHeader,
} from '@ionic/react';
import { DateTime } from 'luxon';
import { useContext } from 'react';

import BottomLivePlayer from '../../../components/BottomLivePlayer/BottomLivePlayer';
import EventHeaderComponent from '../../../components/EventHeader/EventHeaderComponent';
import EventSlideItemComponent from '../../../components/EventSlideItemComponent/EventSlideItemComponent';
import { VideoPlayerContext } from '../../../contexts/VideoPlayer';
import { EventComponentProps, EventSlideModel } from '../../../models/event.model';
import { VideoPlayerContextModel } from '../../../models/videoplayer.model';
import { EventTimeStatus, getEventTimeStatus } from '../../../utils/eventTimeUtils';

import './Slides.css';

const Slides: React.FC<EventComponentProps> = (props: EventComponentProps) => {
    const { isBottomPlayerVisible } = useContext(VideoPlayerContext) as VideoPlayerContextModel;
    
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
                {isBottomPlayerVisible && <div style={{ height: 120 }}></div>}
            </IonContent>
            {isBottomPlayerVisible && <BottomLivePlayer
                isLive={getEventTimeStatus(DateTime.fromISO(props.event.date), props.event.duration) === EventTimeStatus.TODAY_LIVE}
            />}
        </IonPage>
    );
};

export default Slides;