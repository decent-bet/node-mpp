module.exports = (
    contractAddress,
    address,
    mppContract,
    options
) => mppContract.methods.removeUser(contractAddress, address)