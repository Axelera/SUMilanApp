import { IonButton, IonCard, IonCardContent, IonCardHeader, IonCardTitle, IonIcon, IonItem, IonLabel, IonList, IonListHeader } from "@ionic/react";
import { openOutline } from "ionicons/icons";

import { NFTCertificateExtendedModel } from "../../models/certificates.model";
import { getIpfsCID, getIpfsGatewayUrl } from "../../services/ipfs/ipfs";
import * as web3Utils from "../../utils/web3";
import * as CONSTANTS from "../../constants";

import "./NFTCertificate.css";

type Props = {
    certificate: NFTCertificateExtendedModel;
};

const NFTCertificate: React.FC<Props> = ({ certificate }) => {
    const ipfsImageCID = getIpfsCID(certificate.image);

    return (
        <IonCard className="certificate-card">
            <img src={getIpfsGatewayUrl(ipfsImageCID)} alt="certificate" />
            <IonCardContent>
                <IonList>
                    <IonListHeader>
                        <IonLabel>
                            <h2><b>EIP-721 data</b></h2>
                        </IonLabel>
                        <IonButton
                            href={getIpfsGatewayUrl(getIpfsCID(certificate.tokenURI))}
                            target="_blank"
                            rel="noreferrer"
                            size="small"
                        >
                            View on IPFS
                            <IonIcon slot="end" icon={openOutline} />
                        </IonButton>
                    </IonListHeader>
                    <IonItem>
                        <IonLabel>
                            <h3>Name:</h3>
                            <p>
                                {certificate.name}
                            </p>
                        </IonLabel>
                    </IonItem>
                    <IonItem>
                        <IonLabel>
                            <h3>Description:</h3>
                            <p>
                                {certificate.description}
                            </p>
                        </IonLabel>
                    </IonItem>
                    <IonItem>
                        <IonLabel>
                            <h3>Image:</h3>
                            <p>
                                <a href={getIpfsGatewayUrl(getIpfsCID(certificate.image))} target="_blank" rel="noreferrer">
                                    {certificate.image} <IonIcon icon={openOutline} />
                                </a>
                            </p>
                        </IonLabel>
                    </IonItem>
                </IonList>
                <IonList>
                    <IonListHeader>
                        <IonLabel>
                            <h2><b>Blockchain data</b></h2>
                        </IonLabel>
                        <IonButton
                            href={
                                web3Utils.getExplorerUrl(
                                    `${CONSTANTS.CONTRACT_ADDRESS}?a=${certificate.tokenId}`,
                                    'token'
                                )
                            }
                            target="_blank"
                            rel="noreferrer"
                            size="small"
                        >
                            View on Etherscan
                            <IonIcon slot="end" icon={openOutline} />
                        </IonButton>
                    </IonListHeader>

                    <IonItem>
                        <IonLabel>
                            <h3>Owner</h3>
                            <p>
                                <a href={web3Utils.getExplorerUrl(certificate.ownerAddress, 'address')} target="_blank" rel="noreferrer">
                                    {certificate.ownerAddress} <IonIcon icon={openOutline} />
                                </a>
                            </p>
                        </IonLabel>
                    </IonItem>
                    {!!certificate.txHash &&
                        <IonItem>
                            <IonLabel>
                                <h3>Transaction hash</h3>
                                <p>
                                    <a href={web3Utils.getExplorerUrl(certificate.txHash, 'tx')} target="_blank" rel="noreferrer">
                                        {certificate.txHash} <IonIcon icon={openOutline} />
                                    </a>
                                </p>
                            </IonLabel>
                        </IonItem>
                    }
                    <IonItem>
                        <IonLabel>
                            <h3>Token ID</h3>
                            <p>
                                {certificate.tokenId}
                            </p>
                        </IonLabel>
                    </IonItem>
                </IonList>
            </IonCardContent>
        </IonCard>
    );
};

export default NFTCertificate;