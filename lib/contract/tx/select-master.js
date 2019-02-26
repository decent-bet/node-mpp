module.exports = async (
    contractAddress,
    master,
    mppContract,
    options
) => mppContract.methods.selectMaster(contractAddress, master).send(options)