import {
    IonHeader,
    IonToolbar,
    IonButtons,
    IonBackButton,
    IonTitle,
    IonButton,
    IonIcon,
    isPlatform,
    IonSpinner,
    useIonAlert,
} from '@ionic/react';
import { checkmark, checkmarkCircleOutline, ellipse, shareOutline, shareSocial } from 'ionicons/icons';
import { DateTime } from 'luxon';
import { useState } from 'react';

import './EventHeaderComponent.css';
import { EventModel } from '../../models/event.model';
import { EventTimeStatus, getEventTimeStatus } from '../../utils/eventTimeUtils';

type Props = {
    event: EventModel;
};

const EventHeaderComponent: React.FC<Props> = (props: Props) => {
    const date = DateTime.fromISO(props.event.date);
    const [isLoading, setIsLoading] = useState(false);
    const [isShared, setIsShared] = useState(false);
    const [present] = useIonAlert();

    const shareButtonHandler = async () => {
        const url = `https://app.singularityumilan.com/event/${props.event.identifier}`;
        const shareData = {
            title: 'Evento SingularityU Milan Chapter',
            text: `Desidero invitarti all'evento: ${props.event.title}`,
            url,
        };
        if (navigator.share?.name) {
            setIsLoading(true);
            await navigator.share(shareData);
            setIsLoading(false);
            setIsShared(true);
            setTimeout(() => {
                setIsShared(false);
            }, 3000);
        } else {
            present({
                header: 'Condividi questo evento',
                message: `<div id="is-copied-message" class="copied-message" type="url" readonly value="${url}"></div>`,
                inputs: [
                    {
                        name: 'url',
                        id: 'share-url',
                        type: 'url',
                        value: url,
                        cssClass: 'selectable-url',
                        attributes: {
                            readonly: true,
                            autoFocus: true,
                            onFocus: (ev) => {
                                (ev.target as HTMLInputElement)?.select();
                            }
                        },
                    }
                ],
                buttons: [
                    {
                        text: 'Copia', handler: () => {
                            const shareInput = document.getElementById("share-url") as HTMLInputElement;

                            /* Select the text field */
                            shareInput.select();
                            shareInput.setSelectionRange(0, 99999); /* For mobile devices */

                            /* Copy the text inside the text field */
                            document.execCommand("copy");
                            const copiedDivMessage = document.getElementById('is-copied-message');
                            if (copiedDivMessage) {
                                copiedDivMessage.innerText = 'Copiato!';
                            }
                            return false;
                        }
                    }
                ],
            });
        }
    };

    const liveIndicator = () => {
        if (getEventTimeStatus(date, props.event.duration) === EventTimeStatus.TODAY_LIVE) {
            return (
                <IonButton color="danger">
                    <IonIcon slot="icon-only" icon={ellipse} size="small" className="blinking" />
                </IonButton>
            );
        }
    };

    const shareButton = isLoading ?
        <IonSpinner /> :
        <IonButton onClick={shareButtonHandler}>
            {isShared ?
                <IonIcon slot="icon-only" icon={isPlatform('ios') ? checkmarkCircleOutline : checkmark} /> :
                <IonIcon slot="icon-only" icon={isPlatform('ios') ? shareOutline : shareSocial} />
            };
        </IonButton>

    return (
        <IonHeader>
            <IonToolbar>
                <IonButtons slot="start">
                    <IonBackButton defaultHref="/home" />
                </IonButtons>
                <IonTitle>{props.event.title}</IonTitle>
                <IonButtons slot="end">
                    {liveIndicator()}
                    {shareButton}
                </IonButtons>
            </IonToolbar>
        </IonHeader>
    );
};

export default EventHeaderComponent;