module.exports = async (
    contractAddress,
    blockNumber,
    mppContract
) => mppContract.methods.energy(
    contractAddress,
    blockNumber
).call()