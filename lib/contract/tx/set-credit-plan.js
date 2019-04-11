const sendTransaction = require('./send-transaction');

module.exports = async (
    contractAddress,
    credit,
    recoveryRate,
    mppContract,
    options
) => sendTransaction(mppContract.methods.setCreditPlan(
    contractAddress,
    credit,
    recoveryRate
), options);