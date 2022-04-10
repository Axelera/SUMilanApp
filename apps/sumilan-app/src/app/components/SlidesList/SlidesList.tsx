import { useMemo } from "react";
import { IonList, IonListHeader } from "@ionic/react";
import { t } from "i18next";

import { EventDetailsModel, SlidesListModel } from "../../models/event.model";
import { getSlidesList } from "../../utils/events";
import EventSlideItemComponent from "../EventSlideItemComponent/EventSlideItemComponent";

interface Props {
    event: EventDetailsModel;
}

const SlidesList: React.FC<Props> = ({ event }) => {
    const { slidesCollection } = event;
    const slidesList: SlidesListModel = useMemo(() => {
        return getSlidesList(slidesCollection);
    }, [slidesCollection]);

    return (
        <div>
            {slidesList.preSlides.length > 0 && (
                <IonList>
                    <IonListHeader>{t('EVENT.SLIDES.studyMaterial')}</IonListHeader>
                    {slidesList.preSlides.map((slideData, index) =>
                        <EventSlideItemComponent key={index} slideData={slideData} />
                    )}
                </IonList>
            )}
            {slidesList.slides.length > 0 && (
                <IonList>
                    <IonListHeader>{t('EVENT.SLIDES.slides')}</IonListHeader>
                    {slidesList.slides.map((slideData, index) =>
                        <EventSlideItemComponent key={index} slideData={slideData} />
                    )}
                </IonList>
            )}
        </div>
    );
};

export default SlidesList;