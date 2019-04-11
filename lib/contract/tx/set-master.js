module.exports = async (
    contractAddress,
    master,
    mppContract,
    options
) => mppContract.methods.setMaster(contractAddress, master).send(options)