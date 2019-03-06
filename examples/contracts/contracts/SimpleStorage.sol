pragma solidity 0.5.0;

contract SimpleStorage {

    uint256 public storedData;

    event Change(string message, uint256 newVal);

    constructor(uint256 initVal)
    public {
        emit Change("initialized", initVal);
        storedData = initVal;
    }

    function set(uint x)
    public {
        emit Change("set", x);
        storedData = x;
    }

    function get()
    public
    view
    returns (uint256 retVal) {
        return storedData;
    }

}