const fs = require('fs')
const appRoot = require('app-root-path')
const constants = require(`${appRoot}/lib/constants`)

function MigrationScript(web3, contractManager, deployer, args) {
    let defaultAccount

    let simpleStorage

    const getAccounts = () => {
        return web3.eth.accounts.wallet
    }

    const getDefaultOptions = () => {
        return {
            from: defaultAccount,
            gas: 3000000
        }
    }

    // Migration script
    this.migrate = async (chain) => {
        const SimpleStorage = contractManager.getContract('SimpleStorage')

        let accounts = await getAccounts()
        defaultAccount = accounts[0].address
        console.log('Available accounts', accounts.length, defaultAccount)

        try {
            if(chain === constants.CHAIN_SOLO || chain === constants.CHAIN_TESTNET) {
                const energy = await web3.eth.getEnergy(defaultAccount)
                console.log('Available energy', energy)
                const INITIAL_VALUE = 1
                // Deploy the SimpleStorage contract
                simpleStorage = await deployer.deploy(
                    SimpleStorage,
                    INITIAL_VALUE,
                    getDefaultOptions()
                )
                console.log('Deployed SimpleStorage')

                console.log(
                    'Deployed:',
                    '\nSimpleStorage: ' + simpleStorage.options.address
                )

            } else if (chain === constants.CHAIN_MAIN) {
            }


        } catch (e) {
            console.log('Error deploying contracts:', e.message, e.stack)
        }
    }
}

module.exports = (
    web3,
    dbet,
    deployer,
    args
) => new MigrationScript(web3, dbet, deployer, args)

