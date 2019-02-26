module.exports = async (
    contractAddress,
    mppContract,
    options
) => mppContract.methods.unsponsor(contractAddress).send(options)