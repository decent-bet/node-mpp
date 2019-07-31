module.exports = (
    contractAddress,
    sponsor,
    mppContract,
    options
) => mppContract.methods.selectSponsor(contractAddress, sponsor)