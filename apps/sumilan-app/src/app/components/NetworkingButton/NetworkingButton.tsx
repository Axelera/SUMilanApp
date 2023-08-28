import React, { useContext } from "react";
import { IonButton, IonIcon } from "@ionic/react";
import { people } from "ionicons/icons";
import { useTranslation } from "react-i18next";

import { Event_Time_Status, Events } from "@sumilan-app/api";
import { EventTimeContext } from "../../contexts/EventTime";
import { EventTimeContextModel } from "../../models/event.model";

import 'animate.css';

interface Props {
    roomUrl: Events['room_url'];
};

const NetworkingButton: React.FC<Props> = ({ roomUrl }) => {
    const { timeStatus: eventTimeStatus } = useContext(EventTimeContext) as EventTimeContextModel;
    const { t } = useTranslation();

    if (!roomUrl
        || eventTimeStatus === Event_Time_Status.Passed
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
                className="animate__animated animate__pulse animate__infinite animate__slow"
                href={roomUrl}
                target="_blank"
            >
                <IonIcon slot="start" icon={people} />
                {t('EVENT.LIVE.networkingButton')}
            </IonButton>
        </div>
    );
};

export default NetworkingButton;