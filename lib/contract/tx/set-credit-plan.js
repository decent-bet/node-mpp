module.exports = async (
    contractAddress,
    credit,
    recoveryRate,
    mppContract,
    options
) => mppContract.methods.setCreditPlan(
    contractAddress,
    credit,
    recoveryRate
).send(options)