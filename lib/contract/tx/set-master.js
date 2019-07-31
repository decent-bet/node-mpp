module.exports = (
    contractAddress,
    master,
    mppContract,
    options
) => mppContract.methods.setMaster(contractAddress, master)