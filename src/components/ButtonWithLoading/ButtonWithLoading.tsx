import { IonButton, IonSpinner } from "@ionic/react";

type Props = (typeof IonButton) & {
    isLoading?: boolean;
};

const ButtonWithLoading: React.FC<Props> = ({ isLoading, children, ...props }) => {
    return (
        <IonButton
            disabled={isLoading}
            {...props}
        >
            {isLoading ? <IonSpinner /> : children}
        </IonButton>
    );
};

export default ButtonWithLoading;