const sendTransaction = require('./send-transaction');

module.exports = async (
    contractAddress,
    credit,
    recoveryRate,
    mppContract,
    options
) => sendTransaction(mppContract.methods.setCreditPlan(
    options.to,
    credit,
    recoveryRate
), options);