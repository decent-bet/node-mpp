module.exports = async (
    contractAddress,
    mppContract,
    options
) => mppContract.methods.sponsor(options.to).send(options)