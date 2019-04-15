const {
    MPP,
    web3
} = require('../index')

const BigNumber = require('bignumber.js')

const SimpleStorage = require('../examples/contracts/build/contracts/SimpleStorage')
const CHAIN_TAG = '0xc7'

const DEPLOY_ADDRESS = require('../examples/contracts/vet-config').chains.solo.from
const PRIVATE_KEY = require('../examples/contracts/vet-config').chains.solo.privateKey

const USER_ADDRESS = '0xd3ae78222beadb038203be21ed5ce7c9b1bff602'

describe('MPP calls', () => {
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