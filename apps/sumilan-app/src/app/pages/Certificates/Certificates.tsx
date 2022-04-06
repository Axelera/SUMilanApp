import {
    IonButton,
    IonButtons,
    IonChip,
    IonCol,
    IonContent,
    IonGrid,
    IonHeader,
    IonIcon,
    IonItem,
    IonLabel,
    IonMenuButton,
    IonPage,
    IonProgressBar,
    IonRow,
    IonSpinner,
    IonText,
    IonTitle,
    IonToolbar,
    useIonModal,
} from '@ionic/react';
import { RouteComponentProps } from "react-router";
import { useEffect, useState } from 'react';
import { Trans, useTranslation } from 'react-i18next';
import { alert, calendar, checkmark, closeCircleOutline, documentText, openOutline, person, refresh, school, wallet } from 'ionicons/icons';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { object, string } from 'yup';
import { DateTime } from "luxon";
import Confetti from 'react-confetti';

import { EventModel, EventStateModel } from '../../models/event.model';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { fetchEvents } from '../../store/events/eventsSlice';
import EventChoice from './EventChoice/EventChoice';
import certificateBase from '../../../assets/images/certificateBase.png';
import InputComponent from '../../components/Input/InputComponent';
import { EventTimeStatus, getEventTimeStatus } from '../../utils/eventTimeUtils';
import { checkHasTicket } from '../../services/cloud-functions/eventbriteWrapper';
import { mintCertificate } from '../../services/mint-certificate/mintApi';
import * as SUMilanCertificateService from '../../services/smart-contracts/SUMilanCertificate';
import { ContractDataModel, NFTCertificateExtendedModel } from '../../models/certificates.model';
import NFTCertificate from '../../components/NFTCertificate/NFTCertificate';
import * as web3Utils from "../../utils/web3";
import * as CONSTANTS from "../../constants";
import OwnedCertificatesModal from '../../components/OwnedCertificatesModal/OwnedCertificatesModal';

import './Certificates.css';

const STEPS = [
    {
        id: 1,
        progress: 0,
    },
    {
        id: 2,
        progress: .25,
    },
    {
        id: 3,
        progress: .50,
    },
    {
        id: 4,
        progress: .75,
    },
    {
        id: 5,
        progress: 1,
    },
];

const validationSchema = object().shape({
    name: string().required('nameRequired').min(2, 'nameTooShort'),
    email: string(),
});

const isProduction = process.env['NODE_ENV'] && process.env['NODE_ENV'] === 'production';

if (isProduction) {
    validationSchema.fields.email = validationSchema.fields.email.required('emailRequired').email('emailInvalid');
}

const contractSubscriptionOptions = {
    filter: {
        value: [],
    },
    fromBlock: 0
};

const Certificates: React.FC<RouteComponentProps> = ({ location }) => {
    const eventId = new URLSearchParams(location.search).get('eventId');
    const [step, setStep] = useState(STEPS[0]);

    const [contractData, setContractData] = useState<ContractDataModel>();

    const [error, setError] = useState<{ message: string; canDismiss?: boolean }>();
    const [isLoading, setIsLoading] = useState(false);

    const [account, setAccount] = useState<string>();

    const dispatch = useAppDispatch();
    const { items: events, status, error: eventsError } = useAppSelector<EventStateModel>(state => state.events);
    const [availableEvents, setAvailableEvents] = useState<EventModel[]>([]);
    const [selectedEvent, setSelectedEvent] = useState<EventModel>();

    const { control, handleSubmit, formState: { errors: formErrors } } = useForm({ resolver: yupResolver(validationSchema) });
    const [certificateName, setCertificateName] = useState<string>('');

    const [result, setResult] = useState<NFTCertificateExtendedModel>();
    const [mintingTxHash, setMintingTxHash] = useState<string>();
    const [ownedCertificates, setOwnedCertificates] = useState<NFTCertificateExtendedModel[]>([]);
    const [loadingCertificates, setLoadingCertificates] = useState(false);

    const handleModalDismiss = () => {
        dismissCertificatesModal();
    };

    const [presentCertificatesModal, dismissCertificatesModal] = useIonModal(OwnedCertificatesModal, {
        certificates: ownedCertificates,
        onDismiss: handleModalDismiss,
    });

    const { t } = useTranslation();

    const loadContractData = async () => {
        if (!contractData) {
            const data = await SUMilanCertificateService.getContractData();
            setContractData(data);
        }
    };

    const loadAccount = async () => {
        // @ts-ignore
        if (window.ethereum) {
            // @ts-ignore
            const accounts = await window.ethereum.request({
                method: 'eth_requestAccounts',
            });
            if (accounts.length > 0) {
                const acc = accounts[0];
                setAccount(acc);
                setLoadingCertificates(true);
                const certificatesOfAddress = await SUMilanCertificateService.getNFTCertificatesOfAddress(acc);
                setOwnedCertificates(certificatesOfAddress);
                setLoadingCertificates(false);
            } else {
                setAccount(undefined);
            }
        } else {
            throw new Error('This browser is not compatible');
        }
    }

    const loadBlockChain = async () => {
        // @ts-ignore
        if (window.ethereum) {
            // @ts-ignore
            window.ethereum.on('chainChanged', async (chainId: string) => {
                if (chainId !== '0x3') {
                    setError({
                        message: t('CERTIFICATES.ERRORS.wrongNetwork'),
                    });
                } else {
                    await loadContractData();
                    setError(undefined);
                }
            });
            // @ts-ignore
            window.ethereum.on('accountsChanged', async (accounts) => {
                await loadAccount();
            });
            // @ts-ignore
            if (window.ethereum.networkVersion !== '3') {
                setError({
                    message: t('CERTIFICATES.ERRORS.wrongNetwork'),
                });
                return;
            }
            await loadContractData();
        }
    }

    const connectWalletHandler = async () => {
        setIsLoading(true);
        setError(undefined);
        try {
            await loadAccount();
        } catch (e: any) {
            setError({
                message: e.message,
                canDismiss: true,
            });
        }
        setIsLoading(false);
    };

    const unselectEventHandler = () => {
        setSelectedEvent(undefined);
    };

    const eventClickHandler = (event: EventModel) => {
        setSelectedEvent(event);
    };

    const submitDataHandler = async (data: any) => {
        const { name, email } = data;
        setIsLoading(true);
        try {
            if (selectedEvent) {
                if (isProduction) {
                    const hasTicket = await checkHasTicket(email.trim().toLowerCase(), selectedEvent.ebEventId as string);
                    if (hasTicket) {
                        setCertificateName(name.trim());
                    } else {
                        throw new Error(t('CERTIFICATES.ERRORS.noTicket'));
                    }
                } else {
                    setCertificateName(name.trim());
                }
            }
        } catch (e: any) {
            setError(
                {
                    message: e.message,
                    canDismiss: true,
                }
            );
        }
        setIsLoading(false);
    };

    const deleteNameHandler = () => {
        setCertificateName('');
    };

    const reloadPage = () => {
        window.location.reload();
    };

    const mintCertificateHandler = async () => {
        setIsLoading(true);
        try {
            if (account && certificateName && selectedEvent) {
                const res = await mintCertificate(account, certificateName, selectedEvent.identifier);
                if (res.transactionHash) {
                    setMintingTxHash(res.transactionHash);
                    const subscription = SUMilanCertificateService.SUMilanCertificate.events.Transfer(contractSubscriptionOptions)
                        .on('data', async (event: any) => {
                            const transactionHash = event.transactionHash;
                            if (transactionHash === res.transactionHash) {
                                console.log('Transfer event data', event);
                                const tokenId = event.returnValues.tokenId;
                                const NFTCertificate = await SUMilanCertificateService.getNFTCertificateExtended(tokenId);
                                NFTCertificate.txHash = transactionHash;
                                setResult(NFTCertificate);
                                setOwnedCertificates(prevCerts => {
                                    const newCerts = [...prevCerts];
                                    newCerts.push(NFTCertificate);
                                    return newCerts;
                                });
                                setContractData(prevData => {
                                    if (prevData) {
                                        const newData = { ...prevData };
                                        newData.totalSupply = newData.totalSupply + 1;
                                        return newData;
                                    }
                                    return prevData;
                                });
                                subscription.unsubscribe();
                                setIsLoading(false);
                                setMintingTxHash(undefined);
                            }
                        })
                        .on('error', (err: any) => {
                            console.log('Transfer event error', err);
                            setError({
                                message: err.message,
                                canDismiss: false,
                            });
                        })
                        .on('connected', (subscriptionId: string) => console.log('subscriptionId', subscriptionId));
                }
            }
        } catch (e: any) {
            setError(
                {
                    message: e.message,
                    canDismiss: false,
                }
            );
            setIsLoading(false);
        }
    };

    const viewCertificatesHandler = () => {
        presentCertificatesModal();
    };

    useEffect(() => {
        if (!events || events.length === 0) {
            dispatch(fetchEvents());
        } else {
            setAvailableEvents(events.filter(e => {
                return e.canMintCertificate && getEventTimeStatus(DateTime.fromISO(e.date), e.duration) === EventTimeStatus.PASSED;
            }));
            if (eventId && !selectedEvent) {
                setSelectedEvent(events.find(e => e.canMintCertificate && e.identifier === eventId));
            }
        }
    }, [events, dispatch, eventId, selectedEvent]);

    useEffect(() => {
        loadBlockChain();
    }, []);

    useEffect(() => {
        if (!account && !selectedEvent && !certificateName && !result) {
            setStep(STEPS[0]);
        } else if (account && !selectedEvent && !certificateName && !result) {
            setStep(STEPS[1]);
        } else if (account && selectedEvent && !certificateName && !result) {
            setStep(STEPS[2]);
        } else if (account && selectedEvent && certificateName && !result) {
            setStep(STEPS[3]);
        } else if (account && selectedEvent && certificateName && result) {
            setStep(STEPS[4]);
        }
    }, [account, selectedEvent, certificateName, result]);

    if (eventsError) {
        return <p style={{ margin: 15 }}>{t('GENERAL.error')}! {eventsError.message}</p>;
    }

    if (status === 'loading') {
        return <p style={{ margin: 15 }}>{t('GENERAL.loading')}</p>;
    }

    // @ts-ignore
    if (!window.ethereum) {
        return (
            <IonPage>
                <IonHeader>
                    <IonToolbar>
                        <IonButtons slot="start">
                            <IonMenuButton />
                        </IonButtons>
                        <IonTitle>{t('CERTIFICATES.title')}</IonTitle>
                    </IonToolbar>
                </IonHeader>
                <IonContent>
                    <div className="centered-container">
                        <Trans i18nKey="CERTIFICATES.description">
                            Generate an <strong>NFT participation certificate</strong> for an event using the <strong>Ethereum blockchain</strong>.
                        </Trans>
                        <IonText color="danger">
                            <p>
                                <Trans i18nKey="CERTIFICATES.browserNotCompatible">
                                    This browser is not compatible with dApps
                                    <br />
                                    or
                                    <br />
                                    You've not installed/enabled a <strong>crypto wallet</strong>.
                                    <br />
                                    We suggest using <a href="https://metamask.io/" target="_blank" rel="noreferrer">Metamask <IonIcon icon={openOutline} /></a>.
                                </Trans>
                            </p>
                        </IonText>
                    </div>
                </IonContent >
            </IonPage >
        );
    }

    return (
        <IonPage>
            <IonHeader>
                <IonToolbar>
                    <IonButtons slot="start">
                        <IonMenuButton />
                    </IonButtons>
                    <IonTitle>{t('CERTIFICATES.title')}</IonTitle>
                </IonToolbar>
            </IonHeader>
            <IonContent>
                <div style={{ padding: 10 }}>
                    <div>
                        <Trans i18nKey="CERTIFICATES.description">
                            Generate an <strong>NFT participation certificate</strong> for an event using <strong>Ethereum</strong>.
                        </Trans>
                        <IonText color="medium">
                            <p>
                                <Trans i18nKey="CERTIFICATES.disclaimer">
                                    All generated NFTs comply with the <a href="https://eips.ethereum.org/EIPS/eip-721" target="_blank" rel="noreferrer">EIP-721 <IonIcon icon={openOutline} /></a> standard.
                                </Trans>
                            </p>
                        </IonText>
                        <IonItem color="warning">
                            <IonLabel style={{ whiteSpace: 'normal' }}>
                                <h2><b>{t('CERTIFICATES.NOTE.title')}</b></h2>
                                <p>
                                    <Trans i18nKey="CERTIFICATES.NOTE.subTitle">
                                        You won't lost any REAL fund because NFTs will be minted on the <strong>Ropsten testnet</strong>. More info <a href="https://ethereum.org/en/developers/docs/networks/#testnets" target="_blank" rel="noreferrer">here</a>
                                    </Trans>
                                </p>
                            </IonLabel>
                        </IonItem>
                        {!!contractData &&
                            <IonItem style={{ '--padding-start': 0 }}>
                                <IonIcon icon={documentText} color="medium" />
                                <IonLabel style={{ marginLeft: 10, whiteSpace: 'normal' }}>
                                    <h2>
                                        Smart Contract: <b>{contractData.name} ({contractData.symbol})</b>
                                    </h2>
                                    <h3>
                                        Total supply: <i>{contractData.totalSupply} {contractData.symbol}</i>
                                    </h3>
                                    <p>
                                        <a
                                            href={web3Utils.getExplorerUrl(CONSTANTS.CONTRACT_ADDRESS, 'address')}
                                            target="_blank"
                                            rel="noreferrer"
                                        >
                                            {CONSTANTS.CONTRACT_ADDRESS} <IonIcon icon={openOutline} />
                                        </a>
                                    </p>
                                </IonLabel>
                            </IonItem>
                        }
                    </div>
                    <hr className="line-separator" />
                    <div style={{ marginBottom: 30 }}>
                        <div className="progress-dots-container">
                            {STEPS.map((s, index) => {
                                const isActive = step.id >= s.id;
                                return (
                                    <div
                                        className={'progress-dot' + (isActive ? ' progress-dot-active' : '')}
                                        key={index}
                                    >
                                        <div>
                                            {step.id > s.id || step.id === 5 ?
                                                <span>
                                                    <IonIcon slot="start" icon={checkmark} />
                                                </span>
                                                :
                                                <span>{s.id}</span>
                                            }
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                        <IonProgressBar value={step.progress} />
                    </div>
                    {(!error || error.canDismiss !== undefined) &&
                        <>
                            {!!account &&
                                <IonItem style={{ '--padding-start': 0 }}>
                                    <IonIcon icon={wallet} color="secondary" />
                                    <IonLabel style={{ marginLeft: 10, whiteSpace: 'normal' }}>
                                        <IonText color="secondary">
                                            <h2>
                                                {t('CERTIFICATES.connectedWallet')}
                                                <IonChip color="tertiary">Ropsten Test Network</IonChip>
                                            </h2>
                                        </IonText>
                                        <p>
                                            {account}
                                        </p>
                                    </IonLabel>
                                    {loadingCertificates &&
                                        <IonButton
                                            color="secondary"
                                            fill="solid"
                                            slot="end"
                                            disabled
                                        >
                                            {t('CERTIFICATES.loadingCertificates')} <IonSpinner style={{ height: 18 }} />
                                        </IonButton>
                                    }
                                    {!loadingCertificates && ownedCertificates.length > 0 &&
                                        <IonButton
                                            color="secondary"
                                            fill="solid"
                                            slot="end"
                                            onClick={viewCertificatesHandler}
                                        >
                                            <Trans
                                                i18nKey="CERTIFICATES.ownedButton"
                                                count={ownedCertificates.length}
                                            >
                                                {{ count: ownedCertificates.length }} certificates
                                            </Trans>
                                        </IonButton>
                                    }
                                </IonItem>
                            }
                            {!!selectedEvent &&
                                <IonItem style={{ '--padding-start': 0 }}>
                                    <IonIcon icon={calendar} color="tertiary" />
                                    <IonLabel style={{ marginLeft: 10, whiteSpace: 'normal' }}>
                                        <IonText color="tertiary">
                                            <h2>{t('CERTIFICATES.selectedEvent')}</h2>
                                        </IonText>
                                        <p>{selectedEvent.title}</p>
                                    </IonLabel>
                                    {!result &&
                                        <IonButton
                                            color="medium"
                                            fill="clear"
                                            slot="end"
                                            onClick={unselectEventHandler}
                                        >
                                            <IonIcon icon={closeCircleOutline} slot="icon-only" />
                                        </IonButton>
                                    }
                                </IonItem>
                            }
                            {!!certificateName &&
                                <IonItem style={{ '--padding-start': 0 }}>
                                    <IonIcon icon={person} color="primary" />
                                    <IonLabel style={{ marginLeft: 10, whiteSpace: 'normal' }}>
                                        <IonText color="primary">
                                            <h2>{t('CERTIFICATES.certificateName')}</h2>
                                        </IonText>
                                        <p>{certificateName}</p>
                                    </IonLabel>
                                    {!result &&
                                        <IonButton
                                            color="medium"
                                            fill="clear"
                                            slot="end"
                                            onClick={deleteNameHandler}
                                        >
                                            <IonIcon icon={closeCircleOutline} slot="icon-only" />
                                        </IonButton>
                                    }
                                </IonItem>
                            }
                        </>
                    }
                    {!!error ?
                        <IonItem color="danger">
                            <IonLabel style={{ whiteSpace: 'normal' }}>
                                <h2><b>{t('GENERAL.error')}</b></h2>
                                <p>
                                    <Trans
                                        i18nKey={error.message}
                                    >
                                        {error.message}
                                    </Trans>
                                </p>
                            </IonLabel>
                            {error.canDismiss ?
                                <IonButton
                                    color="light"
                                    fill="clear"
                                    slot="end"
                                    onClick={() => setError(undefined)}
                                >
                                    <IonIcon icon={closeCircleOutline} slot="icon-only" />
                                </IonButton>
                                :
                                <>
                                    {error.canDismiss !== undefined &&
                                        <IonButton
                                            color="light"
                                            fill="clear"
                                            slot="end"
                                            onClick={reloadPage}
                                        >
                                            <IonIcon icon={refresh} slot="icon-only" />
                                        </IonButton>
                                    }
                                </>
                            }
                        </IonItem>
                        :
                        <div>
                            {step.id === 1 &&
                                <div id="tab1">
                                    <h3>{t('CERTIFICATES.TAB1.title')}</h3>
                                    <h4>{t('CERTIFICATES.TAB1.installTitle')}</h4>
                                    <p>
                                        <Trans i18nKey="CERTIFICATES.TAB1.subTitle">
                                            To start, first connect a crypto wallet to this page.
                                            <br />
                                            We suggest using <a href="https://metamask.io/" target="_blank" rel="noreferrer">Metamask <IonIcon icon={openOutline} /></a>.
                                        </Trans>
                                    </p>
                                    <h4>{t('CERTIFICATES.TAB1.connectTitle')}</h4>
                                    <p>
                                        <Trans i18nKey="CERTIFICATES.TAB1.walletInstalled">
                                            Once you have installed a <strong>crypto wallet</strong> on this browser, click on the button below to connect it to this page.
                                        </Trans>
                                    </p>
                                    <IonButton
                                        disabled={isLoading}
                                        onClick={connectWalletHandler}
                                    >
                                        {isLoading ? <IonSpinner /> : t('CERTIFICATES.TAB1.connectWalletButton')}
                                    </IonButton>
                                </div>
                            }
                            {step.id === 2 &&
                                <div id="tab2">
                                    <h3>{t('CERTIFICATES.TAB2.title')}</h3>
                                    <IonGrid>
                                        <IonRow>
                                            {availableEvents?.map(event => {
                                                return (
                                                    <IonCol
                                                        key={event.id}
                                                        sizeXs="12"
                                                        sizeSm="6"
                                                        sizeMd="6"
                                                        sizeLg="6"
                                                        sizeXl="4"
                                                        style={{ padding: 0 }}
                                                    >
                                                        <EventChoice
                                                            event={event}
                                                            onClick={eventClickHandler}
                                                        />
                                                    </IonCol>
                                                );
                                            })}
                                        </IonRow>
                                    </IonGrid>
                                </div>
                            }
                            {step.id === 3 &&
                                <div id="tab3">
                                    <h3>{t('CERTIFICATES.TAB3.title')}</h3>
                                    <form onSubmit={handleSubmit(submitDataHandler)}>
                                        <InputComponent
                                            control={control}
                                            name="name"
                                            label={t('CERTIFICATES.TAB3.nameInputLabel')}
                                            errors={formErrors}
                                        />
                                        <InputComponent
                                            control={control}
                                            name="email"
                                            label={t('CERTIFICATES.TAB3.emailInputLabel')}
                                            errors={formErrors}
                                        />
                                        < br />
                                        <IonButton
                                            disabled={isLoading}
                                            type="submit"
                                            strong
                                        >
                                            {isLoading ? <IonSpinner /> : t('CERTIFICATES.TAB3.submitButton')}
                                        </IonButton>
                                    </form >
                                </div>
                            }
                            {step.id === 4 &&
                                <div id="tab4">
                                    <h3>{t('CERTIFICATES.TAB4.title')}</h3>
                                    <div className="certificate-preview-container">
                                        <div className="certificate-preview-img-container">
                                            <img src={certificateBase} alt="certificate" />
                                            <div className="certificate-preview-name">
                                                <p><b>{certificateName}</b></p>
                                            </div>
                                            <div className="certificate-preview-event">
                                                <IonText color="primary">
                                                    <p><b>{selectedEvent?.title}</b></p>
                                                </IonText>
                                            </div>
                                            <div className="certificate-preview-date">
                                                <IonText color="tertiary">
                                                    <p>Milano, {DateTime.fromISO(selectedEvent?.date as string).toLocaleString()}</p>
                                                </IonText>
                                            </div>
                                        </div>
                                        <IonButton
                                            strong
                                            disabled={isLoading}
                                            onClick={mintCertificateHandler}
                                        >
                                            {isLoading ?
                                                <>
                                                    {t('CERTIFICATES.TAB4.mintingLoading')}
                                                    <IonSpinner />
                                                </>
                                                :
                                                <>
                                                    <IonIcon slot="start" icon={school} />
                                                    {t('CERTIFICATES.TAB4.mintCertificateButton')}
                                                </>
                                            }
                                        </IonButton>
                                        {!!mintingTxHash &&
                                            <IonItem>
                                                <IonLabel>
                                                    <h3>Transaction hash (pending...)</h3>
                                                    <p>
                                                        <a href={web3Utils.getExplorerUrl(mintingTxHash, 'tx')} target="_blank" rel="noreferrer">
                                                            {mintingTxHash} <IonIcon icon={openOutline} />
                                                        </a>
                                                    </p>
                                                </IonLabel>
                                            </IonItem>
                                        }
                                        <IonItem className="alert-item" lines="none" color="warning">
                                            <IonIcon icon={alert} />
                                            <IonLabel style={{ marginLeft: 10, whiteSpace: 'normal' }}>
                                                <IonText>
                                                    <h2>{t('CERTIFICATES.TAB4.alert')}</h2>
                                                </IonText>
                                            </IonLabel>
                                        </IonItem>
                                    </div>
                                </div>
                            }
                            {step.id === 5 &&
                                <div id="tab5">
                                    <Confetti
                                        recycle={false}
                                        numberOfPieces={400}
                                    />
                                    <h3>{t('CERTIFICATES.TAB5.title')}</h3>
                                    <NFTCertificate
                                        certificate={result as any}
                                    />
                                    <IonButton
                                        onClick={reloadPage}
                                    >
                                        {t('CERTIFICATES.TAB5.reloadButton')}
                                    </IonButton>
                                </div>
                            }
                        </div>
                    }
                </div>
            </IonContent>
        </IonPage>
    );
};

export default Certificates;