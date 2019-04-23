# Node MPP

Simple node library to setup Vechain's [MPP](https://github.com/vechain/thor-wiki/blob/5dbc2d8a287c4158b556ee8ec681243d0ccc89a1/Prototype(EN).md) for any deployed contract on a compatible Vechain Thor Blockchain.

## Pre-requisites

* [npm](https://npmjs.com)
* [Vechain Thor](https://github.com/vechain/thor)

## Setting up

1. [Install npm](https://www.npmjs.com/get-npm)
   
1. Install [Vechain Thor](https://github.com/vechain/thor)

1. Clone this repository

1. Install the repository packages

    ```
    npm install
    ```

## Instructions

Initialize a new node MPP instance like below

```
const mpp = new MPP(
    contractAddress,
    privateKey,
    thorUrl
)
```

**Parameters**

* contractAddresses - Object containing name:address key-value pairs for contracts to perform MPP actions on
* privateKey - Private key for contract address
* Thor URL - Thor instance URL

Note: A node MPP instance is designed to handle one contract address on initialization. 
If you intend to handle multiple contract addresses, you would have to use multiple instances of node MPP.

You can now use the mpp instance to perform any of commands below. Node MPP performs checks before
sending state changing transactions to reduce transaction reverts and wasted energy.

MPP transactions or calls on a contract would be made with the following format:

```
    await mpp.contractName.mppMethod
```

## Transactions

### sponsor()

```
await mpp.quest.sponsor()
```

Volunteers to sponsor the contract using the default account linked to the MPP instance' private key.

### unsponsor()

```
await mpp.quest.unsponsor()
```

Removes the default account from being a sponsor of the contract if it had been a sponsor earlier.

### selectSponsor(sponsor)

```
await mpp.quest.selectSponsor(sponsor)
```

**Parameters**

* sponsor - Address of sponsor to be selected

Selects a sponsor address. The sponsor must have volunteered to be a sponsor by calling `sponsor()`. This can only be sent by the current contract master.

### setMaster(master)

```
await mpp.quest.setMaster(master)
```

**Parameters**

* master - Address of master to be selected

Selects a master address. This can only be sent by the current contract master.

### addUser(address)

```
await mpp.quest.addUser(userAddress)
```

**Parameters**

* address - Address of user to be added

Adds a new user to the MPP whitelist for the contract. Throws if the user has already been added. This can only be sent by the current contract master.  

### removeUser(address)

```
await mpp.quest.removeUser(userAddress)
```

**Parameters**

* address - Address of user to be removed

Removes a user from the MPP whitelist of the contract. Throws if the user has not been added. This can only be sent by the current contract master.

#### setCreditPlan(credit, recoveryRate)

```
await mpp.quest.setCreditPlan(credit, recoveryRate)
```

**Parameters**

* credit - the maximum amount of VTHO (in wei) that can be accumulated
* recoveryRate - amount of VTHO (in wei) accumulated per block to pay for transactions for each user

Sets a new credit plan for the contract address as defined by the passed credit and recovery rate. This can only be sent by the current contract master.

## Calls

### isSponsor(address)

```
const isSponsor = await mpp.quest.isSponsor(address)
```

**Parameters**

* address - Address to check sponsor status

Returns whether an address has volunteered to sponsor the contract.

### isUser(address)

```
const isUser = await mpp.quest.isUser(address)
```

**Parameters**

* address - Address to check user status

Returns whether an address has been added to the contract whitelist.

### currentSponsor()

```
const currentSponsor = await mpp.quest.currentSponsor()
```

Returns the current selected sponsor for the contract.

### currentMaster()

```
const currentMaster = await mpp.quest.currentMaster()
```

Returns the current master for the contract.

### getCreditPlan()

```
const creditPlan = await mpp.quest.getCreditPlan()
```

Returns the active credit plan for the contract.
