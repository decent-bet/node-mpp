module.exports = async (
    contractAddress,
    address,
    mppContract
) => mppContract.methods.isSponsor(contractAddress, address).call()