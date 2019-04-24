const {
    MPP,
    web3
} = require('../index')

const BigNumber = require('bignumber.js')

const appRoot = require('app-root-path')
const chaiAsPromised = require('chai-as-promised')
const chai = require('chai')
chai.use(chaiAsPromised)
const expect = chai.expect

const {
    CONTRACT_NAME_SIMPLE_STORAGE,
    DEPLOY_ADDRESS,
    PRIVATE_KEY,
    SOLO_CHAIN_TAG,
    migrateIfNecessary
} = require('./utils')

const USER_ADDRESS = '0xd3ae78222beadb038203be21ed5ce7c9b1bff602'

const CREDIT = web3.utils.toWei('100000', 'ether')
const RECOVERY_RATE =
    new BigNumber(CREDIT)
        .dividedBy(86400) // Seconds in day
        .dividedBy(10)    // VET blocktime
        .toFixed(0)

let mpp

let SimpleStorage
let simpleStorage

describe('MPP txns', () => {
    before(async () => {
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
            {[CONTRACT_NAME_SIMPLE_STORAGE]: SimpleStorage.chain_tags[SOLO_CHAIN_TAG].address},
            PRIVATE_KEY
        )
    })

    it(`should throw if ${DEPLOY_ADDRESS} un-volunteers as sponsor and is not a sponsor`, async () => {
        await expect(mpp.simpleStorage.unsponsor()).to.eventually.be.rejectedWith(Error)
    })

    it(`should throw if ${DEPLOY_ADDRESS} is selected as sponsor and has not volunteered to be a sponsor`, async () => {
        await expect(mpp.simpleStorage.selectSponsor(DEPLOY_ADDRESS)).to.eventually.be.rejectedWith(Error)
    })

    it(`should volunteer ${DEPLOY_ADDRESS} as sponsor`, async () => {
        await mpp.simpleStorage.sponsor()
        const isSponsor = await mpp.simpleStorage.isSponsor(DEPLOY_ADDRESS)
        expect(isSponsor).to.equal(true)
    })

    it(`should throw if ${DEPLOY_ADDRESS} volunteers as a sponsor and is already sponsor`, async () => {
        await expect(mpp.simpleStorage.sponsor()).to.eventually.be.rejectedWith(Error)
    })

    it(`should allow an address to be added as MPP user`, async () => {
        await mpp.simpleStorage.addUser(USER_ADDRESS)
        const isUser = await mpp.simpleStorage.isUser(USER_ADDRESS)
        expect(isUser).to.equal(true)
    })

    it(`should allow an address to be removed from being an MPP user`, async () => {
        await mpp.simpleStorage.removeUser(USER_ADDRESS)
        const isUser = await mpp.simpleStorage.isUser(USER_ADDRESS)
        expect(isUser).to.equal(false)
    })

    it(`should throw if an address is removed as a user if it isn't an MPP user`, async () => {
        await expect(mpp.simpleStorage.removeUser(USER_ADDRESS)).to.eventually.be.rejectedWith(Error)
    })

    it(`should allow credit plan to be updated`, async () => {
        await mpp.simpleStorage.setCreditPlan(CREDIT, RECOVERY_RATE)
        const {
            credit,
            recoveryRate
        } = await mpp.simpleStorage.getCreditPlan()
        expect(credit).to.equal(CREDIT)
        expect(recoveryRate).to.equal(RECOVERY_RATE)
    })

    it(`should throw if current master is set as new master`, async () => {
        await expect(mpp.simpleStorage.setMaster(DEPLOY_ADDRESS)).to.eventually.be.rejectedWith(Error)
    })

    it(`should allow new address to be set as master`, async () => {
        await mpp.simpleStorage.setMaster(USER_ADDRESS)
        const master = await mpp.simpleStorage.currentMaster()
        expect(master.toLowerCase()).to.equal(USER_ADDRESS.toLowerCase())
    })
})