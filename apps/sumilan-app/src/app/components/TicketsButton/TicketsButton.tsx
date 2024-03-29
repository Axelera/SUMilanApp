import React, { useMemo, useContext } from "react";
import { IonButton, IonIcon } from "@ionic/react";
import { ticketOutline, headsetOutline } from "ionicons/icons";
import { useTranslation } from "react-i18next";

import { Event_Time_Status, Events, Tickets_Type } from "@sumilan-app/api";
import { EventTimeContext } from "../../contexts/EventTime";
import { EventTimeContextModel } from "../../models/event.model";

import 'animate.css';

interface Props {
    ticketsUrl: Events['tickets_url'];
    ticketsType: Tickets_Type;
};

const TicketsButton: React.FC<Props> = ({ ticketsUrl, ticketsType }) => {
    const { timeStatus: eventTimeStatus } = useContext(EventTimeContext) as EventTimeContextModel;
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
    const { t } = useTranslation();

    if (!ticketsUrl
        || eventTimeStatus === Event_Time_Status.Passed
        || eventTimeStatus === Event_Time_Status.TodayPassed
    ) {
        return null;
    }

    return (
        <div
            style={{
                position: 'fixed',
                bottom: '20px',
                left: '50%',
                zIndex: 999,
                transform: 'translateX(-50%)',
            }}
        >
            <IonButton
                size="large"
                shape="round"
                color="tertiary"
                className="animate__animated animate__pulse animate__infinite animate__slow"
                href={ticketsUrl}
                target="_blank"
            >
                <IonIcon slot="start" icon={icon} />
                {t('EVENT.INFO.ticketsButton')}
            </IonButton>
        </div>
    );
};

export default TicketsButton;