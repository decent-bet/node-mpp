module.exports = async (
    contractAddress,
    sponsor,
    mppContract,
    options
) => mppContract.methods.selectSponsor(options.to, sponsor).send(options)