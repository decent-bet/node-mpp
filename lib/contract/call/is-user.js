module.exports = async (
    contractAddress,
    address,
    mppContract
) => mppContract.methods.isUser(contractAddress, address).call()