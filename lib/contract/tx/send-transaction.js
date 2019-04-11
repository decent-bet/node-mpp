module.exports = async (fn, options) => {
    const encodedFunctionCall = fn.encodeABI();

    if (!gasPriceCoef) {
        gasPriceCoef = 0;
    }
    if (!gas) {
        gas = 1000000;
    }

    let txBody = {
        from,
        to,
        gas,
        gasPriceCoef
    } = options;
    txBody.data = encodedFunctionCall;

    return await this.thorify.eth.accounts.sendTransaction(txBody);
}