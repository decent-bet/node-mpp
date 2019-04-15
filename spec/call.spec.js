const {
    MPP,
    web3
} = require('../index')

const appRoot = require('app-root-path')

const {
    DEPLOY_ADDRESS,
    EMPTY_ADDRESS,
    PRIVATE_KEY,
    SOLO_CHAIN_TAG,
    migrateIfNecessary
} = require('./utils')

const USER_ADDRESS = '0xd3ae78222beadb038203be21ed5ce7c9b1bff602'

let SimpleStorage
let simpleStorage

let mpp

describe('MPP calls', () => {
    jasmine.DEFAULT_TIMEOUT_INTERVAL = 30000

    beforeAll(async () => {
        await migrateIfNecessary()

        // Newly migrated contracts
        SimpleStorage = require(`${appRoot}/examples/contracts/build/contracts/SimpleStorage`)
        console.log('Migrated SimpleStorage', SimpleStorage.chain_tags[SOLO_CHAIN_TAG].address)

        // Initialize a new SimpleStorage contract instance
        simpleStorage = new web3.eth.Contract(
            SimpleStorage.abi,
            SimpleStorage.chain_tags[SOLO_CHAIN_TAG].address
        )

        mpp = new MPP(
            SimpleStorage.chain_tags[SOLO_CHAIN_TAG].address,
            PRIVATE_KEY
        )
    })

    it('should return the current master', async () => {
        const currentMaster = await mpp.currentMaster()
        expect(currentMaster.toLowerCase()).toEqual(DEPLOY_ADDRESS.toLowerCase())
    })

    it('should return the current sponsor', async () => {
        const currentSponsor = await mpp.currentSponsor()
        expect(currentSponsor).toEqual(EMPTY_ADDRESS)
    })

    it('should return the current credit plan', async () => {
        const {
            credit,
            recoveryRate
        } = await mpp.getCreditPlan()

        expect(credit).toEqual('0')
        expect(recoveryRate).toEqual('0')
    })

    it(`should return whether ${USER_ADDRESS} is a user`, async () => {
        const isUser = await mpp.isUser(USER_ADDRESS)
        expect(isUser).toEqual(false)
    })

    it(`should return whether ${DEPLOY_ADDRESS} has volunteered to be a sponsor`, async () => {
        const isSponsor = await mpp.isSponsor(DEPLOY_ADDRESS)
        expect(isSponsor).toEqual(false)
    })
})