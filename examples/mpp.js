const {
    MPP,
    web3
} = require('../index')

const SimpleStorage = require('./contracts/build/contracts/SimpleStorage')
const CHAIN_TAG = '0xc7'

const DEPLOY_ADDRESS = require('./contracts/vet-config').chains.solo.from
const PRIVATE_KEY = require('./contracts/vet-config').chains.solo.privateKey

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

        const isDeployerUser = await mpp.isUser(DEPLOY_ADDRESS)
        const isDeployerSponsor = await mpp.isSponsor(DEPLOY_ADDRESS)
        // Check if deployer is a user
        console.log('is', DEPLOY_ADDRESS, 'a user?', isDeployerUser)
        // Check if deployer is a sponsor
        console.log('is', DEPLOY_ADDRESS, 'a sponsor?', isDeployerSponsor)

        // Make deployer volunteer as a sponsor if it isn't already a sponsor
        if (!isDeployerSponsor) {
            console.log('Volunteering', DEPLOY_ADDRESS, 'as a sponsor')
            const tx = await mpp.sponsor()
            console.log('Volunteered', DEPLOY_ADDRESS, 'as a sponsor. Tx:', tx)
        }
    } catch (e) {
        console.error(e.stack)
    }
}

init()