const AddUser = require('./add-user')
const RemoveUser = require('./remove-user')
const SelectMaster = require('./select-master')
const SelectSponsor = require('./select-sponsor')
const SetCreditPlan = require('./set-credit-plan')
const Sponsor = require('./sponsor')

module.exports = (
    contractAddress,
    mppContract,
    options
) => {
    return {
        addUser: user => AddUser(contractAddress, user, mppContract, options),
        removeUser: user => RemoveUser(contractAddress, user, mppContract, options),
        selectMaster: master => SelectMaster(contractAddress, master, mppContract, options),
        selectSponsor: sponsor => SelectSponsor(contractAddress, sponsor, mppContract, options),
        setCreditPlan: (credit, recoveryRate) => SetCreditPlan(
            contractAddress,
            credit,
            recoveryRate,
            mppContract,
            options
        ),
        sponsor: () => Sponsor(contractAddress, mppContract, options)
    }
}