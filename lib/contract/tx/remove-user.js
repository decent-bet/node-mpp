module.exports = async (
    contractAddress,
    address,
    mppContract,
    options
) => mppContract.methods.removeUser(contractAddress, address).send(options)