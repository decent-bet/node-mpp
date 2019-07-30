module.exports = (
    contractAddress,
    address,
    mppContract,
    options
) => mppContract.methods.addUser(contractAddress, address);
