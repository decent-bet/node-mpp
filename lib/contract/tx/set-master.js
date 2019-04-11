const sendTransaction = require('./send-transaction');

module.exports = async (
    contractAddress,
    master,
    mppContract,
    options
) => sendTransaction(mppContract.methods.setMaster(contractAddress, master), options)