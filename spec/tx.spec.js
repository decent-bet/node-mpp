const {
    MPP,
    web3
} = require('../index')

const BigNumber = require('bignumber.js')

const appRoot = require('app-root-path')

const {
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

let SimpleStorage
let simpleStorage

describe('MPP txns', () => {
    it(`should throw if ${DEPLOY_ADDRESS} unvolunteers as sponsor and is not a sponsor`, async () => {

    })

    it(`should throw if ${DEPLOY_ADDRESS} is selected as sponsor and has not volunteered to be a sponsor`, async () => {

    })

    it(`should volunteer ${DEPLOY_ADDRESS} as sponsor`, async () => {

    })

    it(`should throw if ${DEPLOY_ADDRESS} volunteers as a sponsor and is already sponsor`, async () => {

    })

    it(`should allow an address to be added as MPP user`, async () => {

    })

    it(`should allow to remove an address from being an MPP user`, async () => {

    })

    it(`should throw if an address is removed as a user if it isn't an MPP user`, async () => {

    })

    it(`should allow credit plan to be updated`, async () => {

    })

    it(`should throw if current master is set as new master`, async () => {

    })

    it(`should allow new address to be set as master`, async () => {

    })
})