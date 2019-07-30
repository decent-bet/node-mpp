module.exports = (
    contractAddress,
    credit,
    recoveryRate,
    mppContract,
    options
) => mppContract.methods.setCreditPlan(
    contractAddress,
    credit,
    recoveryRate
)