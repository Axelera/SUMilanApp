import {
    IonItem,
    IonLabel,
    IonButton,
    IonIcon,
} from '@ionic/react';
import { documentTextOutline, logoYoutube, newspaperOutline } from 'ionicons/icons';

import { Slides, SlideType } from '@sumilan-app/api';

interface EventSlideItemProps {
    slideData: Slides;
}

const EventSlideItemComponent: React.FC<EventSlideItemProps> = ({ slideData }) => {
    let icon;

    switch (slideData.slide_type) {
        case SlideType.Slides:
            icon = documentTextOutline;
            break;
        case SlideType.Video:
            icon = logoYoutube;
            break;
        case SlideType.Article:
            icon = newspaperOutline;
            break;
        default:
            icon = documentTextOutline;
    };

    return (
        <IonItem href={slideData.slide_url} target="_blank" detail={false}>
            <IonButton slot="start" fill="clear" color="medium">
                <IonIcon slot="icon-only" size="small" icon={icon} />
            </IonButton>
            <IonLabel style={{whiteSpace: 'break-spaces'}}>
                <h2>{slideData.slide_title}</h2>
                {slideData.slide_description && <p>{slideData.slide_description}</p>}
            </IonLabel>
        </IonItem>
    );
};

export default EventSlideItemComponent;