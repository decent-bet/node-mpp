const sendTransaction = require('./send-transaction');

module.exports = async (
    contractAddress,
    master,
    mppContract,
    options
) => mppContract.methods.setMaster(options.to, master).send(options)