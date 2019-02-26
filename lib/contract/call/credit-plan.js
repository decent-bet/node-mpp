module.exports = async (
    contractAddress,
    mppContract
) => mppContract.methods.creditPlan(
    contractAddress,
).call()