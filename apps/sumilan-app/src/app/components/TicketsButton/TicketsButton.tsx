import React, { useEffect, useMemo } from "react";
import { IonButton, IonIcon } from "@ionic/react";
import { ticketOutline, headsetOutline } from "ionicons/icons";
import { useTranslation } from "react-i18next";

import { loadEventbriteWidgets } from "../../utils/eventbrite";
import { Events, Tickets_Type } from "@sumilan-app/api";

import 'animate.css';

interface Props {
    ticketsUrl: Events['tickets_url'];
    ticketsType: Tickets_Type;
    ebEventId?: string; // eventbrite event id if ticket is eventbrite ticket
};

const TicketsButton: React.FC<Props> = ({ ticketsUrl, ticketsType, ebEventId }) => {
    const icon = useMemo(() => {
        switch (ticketsType) {
            case Tickets_Type.Eventbrite:
                return ticketOutline;
            case Tickets_Type.Clubhouse:
                return headsetOutline;
            default:
                return ticketOutline;
        }
    }, [ticketsType]);
    const buttonId = useMemo(() => {
        if (ebEventId) {
            return `eventbrite-widget-modal-trigger-button-${ebEventId}`;
        }
        return '';
    }, [ebEventId]);
    const { t } = useTranslation();

    const handleClick = (event: React.MouseEvent<HTMLIonButtonElement, MouseEvent>) => {
        event.preventDefault();
        if (ebEventId) {
            return event.currentTarget.click();
        }
        window.open(ticketsUrl as string, '_blank');
    };

    useEffect(() => {
        const createEventbriteWidget = async () => {
            if (ebEventId) {
                await loadEventbriteWidgets();
                window.EBWidgets.createWidget({
                    widgetType: 'checkout',
                    eventId: ebEventId,
                    modal: true,
                    modalTriggerElementId: buttonId,
                    onOrderComplete: () => {
                        console.log('Eventbrite: order complete');
                    }
                });
            }
        };
        createEventbriteWidget();
    }, [ebEventId, buttonId]);

    return (
        <div
            style={{
                position: 'fixed',
                bottom: '10px',
                left: '50%',
                zIndex: 999,
                transform: 'translateX(-50%)',
            }}
        >
            <IonButton
                size="large"
                shape="round"
                color="tertiary"
                onClick={handleClick}
                id={buttonId}
                className="animate__animated animate__pulse animate__infinite animate__slow"
            >
                <IonIcon slot="start" icon={icon} />
                {t('EVENT.INFO.ticketsButton')}
            </IonButton>
        </div>
    );
};

export default TicketsButton;