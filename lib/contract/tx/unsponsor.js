module.exports = (
    contractAddress,
    mppContract,
    options
) => mppContract.methods.unsponsor(contractAddress)