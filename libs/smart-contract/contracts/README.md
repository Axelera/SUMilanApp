# SUMilanCertificateUpgradeable
This Smart Contract is written in [Solidity](https://soliditylang.org/) and uses [OpenZeppelin](https://openzeppelin.com/contracts/)'s libraries to generate [EIP-721](https://eips.ethereum.org/EIPS/eip-721) compliant NFTs.

## How it works
The Contract has a main function named `mintCertificate` that can be invoked only by the contract's owner. The contract's owner is defined at deployment, when the `initialize` function is called.

The Contract is **upgradeable** thanks to the OpenZeppelin's [Upgrades](https://docs.openzeppelin.com/openzeppelin/upgrades) libraries.

## API
**SUMilanCertificateUpgradeable** contract extends these contracts:
- [ERC721Upgradeable](https://github.com/OpenZeppelin/openzeppelin-contracts-upgradeable/blob/master/contracts/token/ERC721/ERC721Upgradeable.sol)
- [ERC721URIStorageUpgradeable](https://github.com/OpenZeppelin/openzeppelin-contracts-upgradeable/blob/master/contracts/token/ERC721/extensions/ERC721URIStorageUpgradeable.sol)
- [ERC721EnumerableUpgradeable](https://github.com/OpenZeppelin/openzeppelin-contracts-upgradeable/blob/master/contracts/token/ERC721/extensions/ERC721EnumerableUpgradeable.sol)
- [OwnableUpgradeable](https://github.com/OpenZeppelin/openzeppelin-contracts-upgradeable/blob/master/contracts/access/OwnableUpgradeable.sol)
- [Initializable](https://github.com/OpenZeppelin/openzeppelin-contracts-upgradeable/blob/master/contracts/proxy/utils/Initializable.sol)
- [UUPSUpgradeable](https://github.com/OpenZeppelin/openzeppelin-contracts-upgradeable/blob/master/contracts/proxy/utils/UUPSUpgradeable.sol)

All the methods of these contracts are available inside **SUMilanCertificateUpgradeable** instance.

### mintCertificate (public onlyOwner)
```solidity
mintCertificate(address to, string memory tokenUri, string memory eventId)
```
Checks inside the `_certificateOwners` mapping if the `to` address already has a certificate with that eventId. If **not**, it mints the new certificate.

It's invokable *only* by the certificate owner.

#### Parameters:
|Name|Type|Required|Description|
|-|-|-|-|
|`to`|address|yes|Address receiving the minted certificate|
|`tokenUri`|string|yes|IPFS hash of the NFT JSON metadata (see [ERC721 Metadata JSON Schema](https://eips.ethereum.org/EIPS/eip-721#specification))|
|`eventId`|string|yes|Event ID for which the certificate is required|

#### Returns
- `tokenId` (*uint256*): the token ID of the minted NFT (see [Enumerable extension](https://github.com/OpenZeppelin/openzeppelin-contracts-upgradeable/blob/master/contracts/token/ERC721/extensions/ERC721EnumerableUpgradeable.sol)).

### _certificateOwners (private)
```solidity
struct EventsOwned {
    mapping (string => bool) eventIds;
}

mapping (address => EventsOwned) private _certificateOwners;
```
Associates to every address the eventIds of which it has a certificate.