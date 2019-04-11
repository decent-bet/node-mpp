const sendTransaction = require('./send-transaction');
module.exports = async (
    contractAddress,
    address,
    mppContract,
    options
) => sendTransaction(mppContract.methods.removeUser(contractAddress, address), options);