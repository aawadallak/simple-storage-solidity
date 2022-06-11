//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;

contract SimpleStorage {
    mapping(address => uint256) favoriteNumber;

    function store(uint256 _favoriteNumber) public virtual {
        favoriteNumber[msg.sender] = _favoriteNumber;
    }

    function retrieve() public view returns (uint256) {
        return favoriteNumber[msg.sender];
    }

    function clear() public virtual {
        favoriteNumber[msg.sender] = 0;
    }
}
