module.exports = async (
    contractAddress,
    sponsor,
    mppContract,
    options
) => mppContract.methods.selectSponsor(contractAddress, sponsor).send(options)