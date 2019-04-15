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

let SimpleStorage
let simpleStorage

describe('MPP Init', () => {
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

    it('should throw if MPP is initialized with invalid key', async () => {
        const invalidKey = '0x'

        // Initialize MPP
        const initMpp = () => new MPP(
            SimpleStorage.chain_tags[SOLO_CHAIN_TAG].address,
            invalidKey
        )

        expect(initMpp).toThrowError(TypeError)
    })

    it('should throw if MPP is initialized with invalid thor url', async () => {
        // Initialize MPP
        const initMpp = async () => {
            const mpp = new MPP(
                SimpleStorage.chain_tags[SOLO_CHAIN_TAG].address,
                PRIVATE_KEY,
                'http://localhost:1234'
            )

            await mpp.currentSponsor()
        }

        expectAsync(initMpp()).toBeRejected()
    })

    it('should load MPP if provided with valid address, key and thor url', async () => {
        const initMpp = () => new MPP(
            SimpleStorage.chain_tags[SOLO_CHAIN_TAG].address,
            PRIVATE_KEY
        )

        const mpp = initMpp()
        const currentMaster = await mpp.currentMaster()
        expect(currentMaster.toLowerCase()).toEqual(DEPLOY_ADDRESS.toLowerCase())
    })
})