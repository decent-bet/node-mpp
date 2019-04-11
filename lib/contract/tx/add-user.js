module.exports = async (
    contractAddress,
    address,
    mppContract,
    options
) => mppContract.methods.addUser(contractAddress, address).send(options)