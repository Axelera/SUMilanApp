import {
    IonItem,
    IonLabel,
    IonInput,
    IonText,
} from "@ionic/react";
import { Controller, Control, DeepMap, FieldError } from "react-hook-form";
import { useTranslation } from "react-i18next";

export interface InputProps {
    name: string;
    control?: Control;
    label?: string;
    placeholder?: string;
    errors?: DeepMap<Record<string, any>, FieldError>;
}

const InputComponent: React.FC<InputProps> = ({
    name,
    control,
    label,
    placeholder,
    errors,
}) => {
    const { t } = useTranslation();

    return (
        <>
            <IonItem>
                {label && (
                    <IonLabel position="floating">{label}</IonLabel>
                )}
                <Controller
                    render={({ field: { onChange, value } }) =>
                        <IonInput
                            onIonChange={({ detail: { value } }) => onChange(value)}
                            placeholder={placeholder}
                        />
                    }
                    name={name}
                    control={control}
                />
            </IonItem>
            {errors && errors[name] && (
                <IonText color="danger">
                    <small>
                        <span role="alert" id={`${name}Error`}>
                            {t('INPUTS.Errors.' + errors[name].message)}
                        </span>
                    </small>
                </IonText>
            )}
        </>
    );
};

export default InputComponent;