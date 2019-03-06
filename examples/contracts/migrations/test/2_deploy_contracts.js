const SimpleStorage = artifacts.require("./SimpleStorage.sol")

module.exports = function (deployer) {
    const INITIAL_VALUE = 1
    deployer.deploy(SimpleStorage, INITIAL_VALUE)
}