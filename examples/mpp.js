const {
    MPP,
    web3
} = require('../index')

const BigNumber = require('bignumber.js')

const SimpleStorage = require('./contracts/build/contracts/SimpleStorage')
const CHAIN_TAG = '0xc7'

const DEPLOY_ADDRESS = require('./contracts/vet-config').chains.solo.from
const PRIVATE_KEY = require('./contracts/vet-config').chains.solo.privateKey

const USER_ADDRESS = '0xd3ae78222beadb038203be21ed5ce7c9b1bff602'

const CREDIT = web3.utils.toWei('100000', 'ether')
const RECOVERY_RATE =
    new BigNumber(CREDIT)
        .dividedBy(86400) // Seconds in day
        .dividedBy(10)    // VET blocktime
        .toFixed(0)

const init = async () => {
    try {

        // Initialize a new SimpleStorage contract instance
        const simpleStorage = new web3.eth.Contract(
            SimpleStorage.abi,
            SimpleStorage.chain_tags[CHAIN_TAG].address
        )

        // Initialize MPP
        const mpp = new MPP(
            SimpleStorage.chain_tags[CHAIN_TAG].address,
            PRIVATE_KEY
        )

        // View the current master
        console.log('Current master:', await mpp.currentMaster())
        // View the current sponsor
        console.log('Current sponsor:', await mpp.currentSponsor())
        // View the current credit plan
        console.log('Credit plan:', await mpp.getCreditPlan())

        const isUserUser = await mpp.isUser(USER_ADDRESS)
        const isDeployerSponsor = await mpp.isSponsor(DEPLOY_ADDRESS)
        // Check if user is a user
        console.log('is', USER_ADDRESS, 'a user?', isUserUser)
        // Check if deployer is a sponsor
        console.log('is', DEPLOY_ADDRESS, 'a sponsor?', isDeployerSponsor)

        // Make deployer volunteer as a sponsor if it isn't already a sponsor
        if (!isDeployerSponsor) {
            console.log('Volunteering', DEPLOY_ADDRESS, 'as a sponsor')
            const tx = await mpp.sponsor()
            console.log('Volunteered', DEPLOY_ADDRESS, 'as a sponsor. Tx:', tx.transactionHash)
        }

        // Add USER as a user if it isn't already a user
        if (!isUserUser) {
            console.log('Adding', USER_ADDRESS, 'as a user')
            const tx = await mpp.addUser(USER_ADDRESS)
            console.log('Added', USER_ADDRESS, 'as a user. Tx:', tx.transactionHash)
        }

        // Sets the MPP credit plan
        const setCreditPlanTx = await mpp.setCreditPlan(
            CREDIT,
            RECOVERY_RATE
        )
        console.log(
            'Updated credit plan. Credit:',
            CREDIT,
            'Recovery rate:',
            RECOVERY_RATE,
            'Tx: ',
            setCreditPlanTx.transactionHash
        )

        // View updated credit plan
        console.log('Updated credit plan:', await mpp.getCreditPlan())

        // View current sponsor
        const currentSponsor = await mpp.currentSponsor()
        console.log('Current sponsor:', currentSponsor)

        // Selects DEPLOY_ADDRESS as sponsor if it isn't already
        if(currentSponsor !== DEPLOY_ADDRESS) {
            const tx = await mpp.selectSponsor(DEPLOY_ADDRESS)
            console.log('Selected sponsor:', DEPLOY_ADDRESS, 'Tx:', tx.transactionHash)
        }
    } catch (e) {
        console.error(e.stack)
    }
}

init()