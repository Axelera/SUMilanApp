import {
    IonItem,
    IonLabel,
    IonInput,
    IonText,
} from "@ionic/react";
import { Controller, Control, DeepMap, FieldError } from "react-hook-form";

export interface InputProps {
    name: string;
    control?: Control;
    label?: string;
    errors?: DeepMap<Record<string, any>, FieldError>;
}

const InputComponent: React.FC<InputProps> = ({
    name,
    control,
    label,
    errors,
}) => {
    return (
        <>
            <IonItem>
                {label && (
                    <IonLabel position="floating">{label}</IonLabel>
                )}
                <Controller
                    render={({ field: { onChange, value } }) => <IonInput onIonChange={({ detail: { value } }) => onChange(value)} />}
                    name={name}
                    control={control}
                />
            </IonItem>
            {errors && errors[name] && (
                <IonText color="danger">
                    <small>
                        <span role="alert" id={`${name}Error`}>
                            {errors[name].message}
                        </span>
                    </small>
                </IonText>
            )}
        </>
    );
};

export default InputComponent;