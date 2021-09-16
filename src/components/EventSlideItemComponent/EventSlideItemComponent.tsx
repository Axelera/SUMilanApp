import {
    IonItem,
    IonLabel,
    IonAvatar,
    IonButton,
    IonIcon,
} from '@ionic/react';
import { documentTextOutline, logoYoutube, newspaperOutline } from 'ionicons/icons';
import logo from '../../assets/images/logo-150x150.png';
import { EventSlideModel } from '../../models/event.model';
import { SlideType } from '../../models/types.model';

interface EventSlideItemProps {
    slideData: EventSlideModel;
}

const EventSlideItemComponent: React.FC<EventSlideItemProps> = ({ slideData }: EventSlideItemProps) => {
    let icon;

    switch (slideData.type) {
        case SlideType.SLIDES:
            icon = documentTextOutline;
            break;
        case SlideType.VIDEO:
            icon = logoYoutube;
            break;
        case SlideType.ARTICLE:
            icon = newspaperOutline;
            break;
        default:
            icon = documentTextOutline;
    };

    return (
        <IonItem href={slideData.url} target="_blank" detail={false}>
            {slideData.imageUrl ?
                <IonAvatar slot="start">
                    <img src={slideData.imageUrl === 'logo' ? logo : slideData.imageUrl} alt={slideData.title} />
                </IonAvatar>
                : null
            }
            <IonLabel>
                <h2>{slideData.title}</h2>
                {slideData.description && <p>{slideData.description}</p>}
            </IonLabel>
            <IonButton slot="end" fill="clear" color="medium">
                <IonIcon slot="icon-only" size="small" icon={icon} />
            </IonButton>
        </IonItem>
    );
};

export default EventSlideItemComponent;