const CreditPlan = require('./credit-plan')
const CurrentSponsor = require('./current-sponsor')
const Energy = require('./energy')
const IsSponsor = require('./is-sponsor')
const IsUser = require('./is-user')
const Master = require('./master')

module.exports = (
    contractAddress,
    mppContract
) => {
    return {
        creditPlan: () => CreditPlan(contractAddress, mppContract),
        currentSponsor: () => CurrentSponsor(contractAddress, mppContract),
        energy: blockNumber => Energy(contractAddress, blockNumber, mppContract),
        isSponsor: sponsor => IsSponsor(contractAddress, sponsor, mppContract),
        isUser: address => IsUser(contractAddress, address, mppContract),
        master: () => Master(contractAddress, mppContract)
    }
}