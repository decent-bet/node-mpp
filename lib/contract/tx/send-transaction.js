module.exports = async (fn, options) => {
    const encodedFunctionCall = fn.encodeABI();

    if (!options.gasPriceCoef) {
        options.gasPriceCoef = 0;
    }
    if (!options.gas) {
        options.gas = 2000000;
    }

    let txBody = {
    };
    txBody.from = options.from;
    txBody.to = options.to;
    txBody.gas = options.gas;
    txBody.gasPriceCoef = options.gasPriceCoef;
    txBody.data = encodedFunctionCall;

    console.log(txBody)
    // console.log(options.web3)

    const web3 = options.web3;
    let signed = await web3.eth.accounts.signTransaction(
        txBody,
        options.privateKey
    )
    let tx = await web3.eth.sendSignedTransaction(
        signed.rawTransaction
    )
    console.log(tx);
    return tx;
}