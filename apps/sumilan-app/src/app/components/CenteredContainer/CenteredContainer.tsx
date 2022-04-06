import { IonCol, IonGrid, IonRow } from "@ionic/react";

const CenteredContainer: React.FC = ({ children }) => {
    return (
        <IonGrid>
            <IonRow className="ion-align-items-end">
                <IonCol></IonCol>
                <IonCol
                    size="4"
                    sizeXs="10"
                    sizeSm="5"
                    sizeMd="5"
                    sizeLg="3"
                    sizeXl="3"
                >
                    {children}
                </IonCol>
                <IonCol></IonCol>
            </IonRow>
        </IonGrid>
    );
};

export default CenteredContainer;