module.exports = async (
    contractAddress,
    mppContract
) => mppContract.methods.currentSponsor(contractAddress).call()