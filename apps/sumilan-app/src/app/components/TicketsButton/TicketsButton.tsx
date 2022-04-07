import React, { useEffect, useMemo } from "react";
import { IonButton, IonIcon } from "@ionic/react";
import { ticketOutline, headsetOutline } from "ionicons/icons";
import { useTranslation } from "react-i18next";

import { TicketsLinkModel } from "../../models/event.model";
import { TicketsLinkType } from "../../models/types.model";
import { loadEventbriteWidgets } from "../../utils/eventbrite";

import 'animate.css';

interface Props {
    ticketsLink: TicketsLinkModel;
    ebEventId?: string; // eventbrite event id if ticket is eventbrite ticket
};

const TicketsButton: React.FC<Props> = ({ ticketsLink, ebEventId }) => {
    const icon = useMemo(() => {
        switch (ticketsLink.type) {
            case TicketsLinkType.EVENTBRITE:
                return ticketOutline;
            case TicketsLinkType.CLUBHOUSE:
                return headsetOutline;
            default:
                return ticketOutline;
        }
    }, [ticketsLink.type]);
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
        window.open(ticketsLink.url, '_blank');
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