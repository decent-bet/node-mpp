const {
    MPP,
    web3
} = require('../index')

const BigNumber = require('bignumber.js')

const SimpleStorage = require('../examples/contracts/build/contracts/SimpleStorage')
const CHAIN_TAG = '0xc7'

const DEPLOY_ADDRESS = require('../examples/contracts/vet-config').chains.solo.from
const PRIVATE_KEY = require('../examples/contracts/vet-config').chains.solo.privateKey

describe('MPP Init', () => {
    it('should throw if MPP is initialized with invalid key', async () => {

    })

    it('should throw if MPP is initialized with invalid thor url', async () => {

    })

    it('should load MPP if provided with valid address, key and thor url', async () => {

    })
})