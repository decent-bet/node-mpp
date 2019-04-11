module.exports = async (
    contractAddress,
    mppContract,
    options
) => mppContract.methods.sponsor(contractAddress).send(options)