import {
    IonItem,
    IonLabel,
    IonAvatar,
    IonButton,
    IonIcon,
} from '@ionic/react';
import { cloudDownloadOutline, logoYoutube, newspaperOutline } from 'ionicons/icons';
import logo from '../../assets/images/logo-150x150.png';
import { EventSlideModel } from '../../models/event.model';

interface EventSlideItemProps {
    slideData: EventSlideModel;
}

const EventSlideItemComponent: React.FC<EventSlideItemProps> = ({ slideData }: EventSlideItemProps) => {
    let icon;
    let downloadAttr;
    let target;

    switch (slideData.type) {
        case 'slides':
            icon = cloudDownloadOutline;
            downloadAttr = `${slideData.title}.pdf`;
            break;
        case 'video':
            icon = logoYoutube;
            target = '_blank';
            break;
        case 'article':
            icon = newspaperOutline;
            target = '_blank';
            break;
        default:
            icon = cloudDownloadOutline;
            downloadAttr = `${slideData.title}.pdf`;
    };

    return (
        <IonItem href={slideData.url} download={downloadAttr} target={target} detail={false}>
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