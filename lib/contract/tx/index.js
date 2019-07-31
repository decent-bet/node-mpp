const AddUser = require('./add-user')
const RemoveUser = require('./remove-user')
const SetMaster = require('./set-master')
const SelectSponsor = require('./select-sponsor')
const SetCreditPlan = require('./set-credit-plan')
const Sponsor = require('./sponsor')
const Unsponsor = require('./unsponsor')
const { Transaction } = require('thor-devkit');

module.exports = (
    contractAddress,
    mppContract,
    web3,
    options
) => {
    const EstimateGasAndSign = async (method) => {
        // get best block
        const best = await web3.eth.getBlockNumber();    
        const block = await web3.eth.getBlock(best);
        let gasPriceCoef = 128; // Math.ceil(255 * (block.gasUsed/block.gasLimit)); 


        // Get call object, execute estimate gas and calc intrinsic gas
        const txOptions = Object.assign({}, options);
        const callObject = method.call(txOptions);
        const gasEstimate = await method.estimateGas(txOptions);

        console.log(`gas estimate ${gasEstimate}`);

        // create clause manually
        const data = method.encodeABI();
        const clause = {
            to: contractAddress,
            value: 0,
            data,
        };

        const intrinsicGas = Transaction.intrinsicGas([clause]);
        console.log(`intrinsic gas  ${intrinsicGas}`);

        const calcGas = parseInt(1.2 * (gasEstimate + intrinsicGas), 10);
        console.log(`parseInt(1.2 * (gasEstimate ${gasEstimate} + intrinsicGas ${intrinsicGas}), 10) = ${calcGas}`);
        // sign
        txOptions.gas = calcGas;
        txOptions.gasPriceCoef = gasPriceCoef;

        console.log(`updated gas estimation ${calcGas}`);
        return method.send(txOptions);
    }
    return {
        addUser: user => EstimateGasAndSign(AddUser(contractAddress, user, mppContract, options)),
        removeUser: user => EstimateGasAndSign(RemoveUser(contractAddress, user, mppContract, options)),
        setMaster: master => EstimateGasAndSign(SetMaster(contractAddress, master, mppContract, options)),
        selectSponsor: sponsor => EstimateGasAndSign(SelectSponsor(contractAddress, sponsor, mppContract, options)),
        setCreditPlan: (credit, recoveryRate) => EstimateGasAndSign(SetCreditPlan(
            contractAddress,
            credit,
            recoveryRate,
            mppContract,
            options
        )),
        sponsor: () => EstimateGasAndSign(Sponsor(contractAddress, mppContract, options)),
        unsponsor: () => EstimateGasAndSign(Unsponsor(contractAddress, mppContract, options))
    }
}