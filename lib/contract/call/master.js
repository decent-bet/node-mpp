module.exports = async (
    contractAddress,
    mppContract
) => mppContract.methods.master(contractAddress).call()