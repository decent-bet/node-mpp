const {
    MPP,
    web3
} = require('../index')

const appRoot = require('app-root-path')

const {
    DEPLOY_ADDRESS,
    PRIVATE_KEY,
    SOLO_CHAIN_TAG,
    migrateIfNecessary
} = require('./utils')

const USER_ADDRESS = '0xd3ae78222beadb038203be21ed5ce7c9b1bff602'

let SimpleStorage
let simpleStorage

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
    })

    it('should return the current master', async () => {

    })

    it('should return the current sponsor', async () => {

    })

    it('should return the credit plan', async () => {

    })

    it(`should return whether ${USER_ADDRESS} is a user`, async () => {

    })

    it(`should return whether ${DEPLOY_ADDRESS} has volunteered to be a sponsor`, async () => {

    })
})