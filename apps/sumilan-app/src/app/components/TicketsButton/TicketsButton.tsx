import React, { useEffect, useMemo } from "react";
import { IonFab, IonFabButton, IonIcon } from "@ionic/react";
import { ticketOutline, headsetOutline } from "ionicons/icons";

import { TicketsLinkModel } from "../../models/event.model";
import { TicketsLinkType } from "../../models/types.model";
import { loadEventbriteWidgets } from "../../utils/eventbrite";

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

    const handleClick = (event: React.MouseEvent<HTMLIonFabButtonElement, MouseEvent>) => {
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
                    modalTriggerElementId: 'eventbrite-widget-modal-trigger-button',
                    onOrderComplete: () => {
                        window.location.href = '';
                    }
                });
            }
        };
        createEventbriteWidget();
    }, [ebEventId]);

    return (
        <IonFab vertical="bottom" horizontal="center" slot="fixed">
            <IonFabButton color="tertiary" onClick={handleClick} id="eventbrite-widget-modal-trigger-button">
                <IonIcon icon={icon} />
            </IonFabButton>
        </IonFab>
    );
};

export default TicketsButton;