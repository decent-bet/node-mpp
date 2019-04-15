const appRoot = require('app-root-path')

const DEPLOY_ADDRESS = require(`${appRoot}/examples/contracts/vet-config`).chains.solo.from
const PRIVATE_KEY = require(`${appRoot}/examples/contracts/vet-config`).chains.solo.privateKey
const SOLO_CHAIN_TAG = '0xa4'

const migrateIfNecessary = () => new Promise((resolve, reject) => {
    const exec = require('child_process').exec
    const process = `cd ${appRoot}/examples/contracts; rm -rf build; truffle compile; npm run migrate;`
    console.log('Migrating contracts..')
    exec(process, (error, stdout, stderr) => {
        if(!error)
            resolve()
        else
            reject(new Error(stderr))
    })
})

module.exports = {
    DEPLOY_ADDRESS,
    PRIVATE_KEY,
    SOLO_CHAIN_TAG,
    migrateIfNecessary
}