/* eslint-disable @typescript-eslint/ban-ts-comment */
import {
    IonButton,
    IonContent,
    IonHeader,
    IonIcon,
    IonLabel,
    IonPage,
    IonRouterOutlet,
    IonTabBar,
    IonTabButton,
    IonTabs,
    IonTitle,
    IonToolbar,
} from '@ionic/react';
import { Route, Redirect } from 'react-router-dom';
import { RouteComponentProps } from "react-router";
import { fileTrayFull, help, informationCircleOutline, logoYoutube } from 'ionicons/icons';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

import Live from './Live/Live';
import Mentimeter from './Mentimeter/Mentimeter';
import Slides from './Slides/Slides';
import Info from './Info/Info';
import { VideoPlayerProvider } from '../../contexts/VideoPlayer';
import { EventTimeProvider } from '../../contexts/EventTime';
import { Events, useGetEventDetailsQuery } from '@sumilan-app/api';

import './Event.css';
import { EventDetailsModel } from '../../models/event.model';
import { getRelatorsAndModerators } from '../../utils/events';

const getCurrentUrl = (url: string) => {
    if (url.endsWith('/')) {
        return url.slice(0, -1);
    }
    return url;
};

const Event: React.FC<RouteComponentProps<{ id: string; }>> = ({ history, match }) => {
    const id = match.params.id;
    const currentUrl = getCurrentUrl(match.url);

    const [eventQueryResult] = useGetEventDetailsQuery({ variables: { identifier: id } });
    const { data, error, fetching } = eventQueryResult;
    const [event, setEvent] = useState<EventDetailsModel>();
    const { t } = useTranslation();

    useEffect(() => {
        if (data?.eventsCollection?.edges && data?.eventsCollection?.edges.length > 0) {
            if (data?.eventsCollection?.edges[0].node) {
                // @ts-ignore
                setEvent({
                    ...data?.eventsCollection?.edges[0].node,
                    // @ts-ignore
                    ...getRelatorsAndModerators(data?.eventsCollection?.edges[0].node)
                });
            }
        }
    }, [data]);

    if (error) {
        return <p style={{ margin: 15 }}>{t('GENERAL.error')}! {error.message}</p>;
    }

    if (fetching) {
        return <p style={{ margin: 15 }}>{t('GENERAL.loading')}</p>;
    }

    if (!event) {
        return (
            <IonPage>
                <IonHeader>
                    <IonToolbar>
                        <IonTitle>{t('EVENT.NOEVENT.title')}</IonTitle>
                    </IonToolbar>
                </IonHeader>
                <IonContent>
                    <div className="center-container">
                        <p>{t('EVENT.NOEVENT.message')}</p>
                        <IonButton onClick={() => history.replace('/home')}>{t('GENERAL.backHome')}</IonButton>
                    </div>
                </IonContent>
            </IonPage>
        );
    }

    const additionalRoutes: string[] = [];
    const additionalTabButtons = [];

    if (event.video_url) {
        additionalRoutes.push('live');
        additionalTabButtons.push(
            <IonTabButton key="live-tab-button" tab="live" href={`${currentUrl}/live`}>
                <IonLabel>{t('EVENT.LIVE.title')}</IonLabel>
                <IonIcon icon={logoYoutube}></IonIcon>
            </IonTabButton>
        );
    }

    if (event.voting_url) {
        additionalRoutes.push('mentimeter');
        additionalTabButtons.push(
            <IonTabButton key="mentimeter-tab-button" tab="mentimeter" href={`${currentUrl}/mentimeter`}>
                <IonLabel>{t('EVENT.MENTIMETER.title')}</IonLabel>
                <IonIcon icon={help}></IonIcon>
            </IonTabButton>
        );
    }

    if (event.slidesCollection?.totalCount && event.slidesCollection?.totalCount > 0) {
        additionalRoutes.push('slides');
        additionalTabButtons.push(
            <IonTabButton key="slides-tab-button" tab="slides" href={`${currentUrl}/slides`}>
                <IonLabel>{t('EVENT.SLIDES.title')}</IonLabel>
                <IonIcon icon={fileTrayFull}></IonIcon>
            </IonTabButton>
        );
    }

    return (
        <VideoPlayerProvider>
            <EventTimeProvider date={event.start_timestamp} duration={event.duration || 0}>
                <IonTabs>
                    <IonRouterOutlet>
                        <Route
                            path={currentUrl}
                            render={() => <Redirect to={`${currentUrl}/info`} exact />}
                            exact
                        />
                        <Route
                            path={`${currentUrl}/info`}
                            render={() => <Info
                                event={event}
                            />}
                            exact
                        />
                        <Route
                            path={`${currentUrl}/live`}
                            render={() => additionalRoutes.includes('live')
                                ? <Live
                                    event={event}
                                />
                                : <Redirect to={`${currentUrl}/info`} exact />
                            }
                            exact
                        />
                        <Route
                            path={`${currentUrl}/mentimeter`}
                            render={() => additionalRoutes.includes('mentimeter')
                                ? <Mentimeter
                                    event={event}
                                />
                                : <Redirect to={`${currentUrl}/info`} exact />
                            }
                            exact
                        />
                        <Route
                            path={`${currentUrl}/slides`}
                            render={() => additionalRoutes.includes('slides')
                                ? <Slides
                                    event={event}
                                />
                                : <Redirect to={`${currentUrl}/info`} exact />
                            }
                            exact
                        />
                    </IonRouterOutlet>
                    <IonTabBar slot="bottom">
                        <IonTabButton tab="info" href={`${currentUrl}/info`}>
                            <IonLabel>{t('EVENT.INFO.title')}</IonLabel>
                            <IonIcon icon={informationCircleOutline}></IonIcon>
                        </IonTabButton>
                        {additionalTabButtons.map((btn) => btn)}
                    </IonTabBar>
                </IonTabs>
            </EventTimeProvider>
        </VideoPlayerProvider>
    );
};

export default Event;