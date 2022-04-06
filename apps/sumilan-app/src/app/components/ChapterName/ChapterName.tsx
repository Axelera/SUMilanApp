import { IonText } from "@ionic/react";

type Props = {
    onlyChapter?: boolean;
};

const ChapterName = ({onlyChapter}: Props) => {
    return (
        <>
            {!onlyChapter && <><b>SingularityU</b> <IonText color="secondary"><span><b>Milan</b></span></IonText> </>}<IonText color="primary"><span><b>Chapter</b></span></IonText>
        </>
    );
};

export default ChapterName;