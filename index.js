const mpp = require('./mpp')
const Web3 = require('web3')
const {thorify} = require('thorify')

const web3 = new Web3()

thorify(
    web3,
    'http://localhost:8669'
)

/**
 * Node MPP instance
 * @param contractAddress Address of contract
 * @param privateKey Contract master private key
 * @constructor
 */
function MPP (
    contractAddress,
    privateKey
) {

    // Init MPP contract
    let mppContract = new web3.eth.Contract(
        mpp.abi,
        mpp.address
    )

    // Add private keys
    web3.eth.accounts.wallet.add(privateKey)

    // Default transaction options
    const defaultTxOptions = {
        from: web3.eth.accounts.wallet[0].address,
        gas: 1000000
    }

    // Transactions
    const {
        addUser,
        removeUser,
        setCreditPlan,
        selectSponsor,
        selectMaster,
        sponsor,
        unsponsor
    } = require('./lib/contract/tx')(
        contractAddress,
        mppContract,
        defaultTxOptions
    )

    // Calls
    const {
        creditPlan,
        isUser,
        isSponsor,
        currentSponsor,
        master
    } = require('./lib/contract/call')(
        contractAddress,
        mppContract
    )

    /**
     * Sponsors the contract as the default account
     * @type {sponsor}
     */
    this.sponsor = async () => {
        const isSponsor = await this.isSponsor(web3.eth.accounts.wallet[0].address)
        if(isSponsor)
            throw new Error('Address is already a sponsor for the contract')
        return sponsor()
    }

    /**
     * Unsponsors if the default account is a sponsor for the contract.
     * @type {sponsor}
     */
    this.unsponsor = async () => {
        const isSponsor = await this.isSponsor(web3.eth.accounts.wallet[0].address)
        if(!isSponsor)
            throw new Error('Address is not a sponsor for the contract')
        return unsponsor()
    }

    /**
     * Returns whether an address is a sponsor for the contract
     */
    this.isSponsor = address => isSponsor(address)

    /**
     * Selects a sponsor for the contract. Callable by a contract master
     * @param sponsor
     * @returns {*}
     */
    this.selectSponsor = async sponsor => {
        let currentSponsor = await this.currentSponsor()
        if(currentSponsor === sponsor)
            throw new Error(`Sponsor ${sponsor} is already the current sponsor for the contract`)
        return selectSponsor(sponsor)
    }

    /**
     * Selects a new master for the contract. Callable by the current contract master.
     * @param master
     * @returns {*}
     */
    this.selectMaster = async master => {
        let currentMaster = await this.currentMaster()
        if(currentMaster === master)
            throw new Error(`Master ${master} is already the current master for the contract`)
        return selectMaster(master)
    }

    /**
     * Returns the current sponsor for the contract.
     * @type {currentSponsor}
     */
    this.currentSponsor = currentSponsor

    /**
     * Returns the current master for the contract.
     * @type {master}
     */
    this.currentMaster = master

    /**
     * Whitelists a provided address in the contract.
     * @param address
     */
    this.addUser = async address => {
        const _isUser = await isUser(address)
        if(!_isUser) {
            const tx = await addUser(address)
            console.log(`Added address to whitelist: ${address}`)
            return tx
        } else
            console.log(`Address ${address} has already been added to the contract whitelist`)
    }

    /**
     * Returns whether an address is included in the contract whitelist
     * @param address
     * @returns {*}
     */
    this.isUser = address => isUser(address)

    /**
     * Removes an address from the contracts' whitelist.
     * @param address
     * @returns {*}
     */
    this.removeUser = async address => {
        const isUser = await isUser(address)
        if(!isUser)
            throw new Error(`${address} is not a registered address on the contract whitelist`)
        return removeUser(address)
    }

    /**
     * Returns the current credit plan for the contract
     */
    this.getCreditPlan = creditPlan

    /**
     * Sets a new credit plan for the contract.
     * Callable by the master of the contract.
     * @param credit the maximum amount of VTHO (in wei) that can be accumulated
     * @param recoveryRate amount of VTHO (in wei) accumulated per block to pay for transactions for each user
     * @returns {*}
     */
    this.setCreditPlan = (
        credit,
        recoveryRate
    ) => setCreditPlan(
        credit,
        recoveryRate
    )

}

module.exports = {
    MPP,
    web3
}