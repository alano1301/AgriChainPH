// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

contract AgriChainPH {
    struct Product {
        uint256 id;
        string name;
        string origin;
        uint256 quantity;
        address owner;
        bool exists;
    }

    mapping(uint256 => Product) private products;
    uint256 private nextId = 1;

    event ProductRegistered(
        uint256 indexed id,
        string name,
        string origin,
        uint256 quantity,
        address owner
    );

    event OwnershipTransferred(
        uint256 indexed id,
        address indexed from,
        address indexed to
    );

    function registerProduct(
        string memory name,
        string memory origin,
        uint256 quantity
    ) public returns (uint256) {
        require(bytes(name).length > 0, "Name required");
        require(bytes(origin).length > 0, "Origin required");
        require(quantity > 0, "Quantity must be positive");

        uint256 productId = nextId;
        nextId++;

        products[productId] = Product({
            id: productId,
            name: name,
            origin: origin,
            quantity: quantity,
            owner: msg.sender,
            exists: true
        });

        emit ProductRegistered(productId, name, origin, quantity, msg.sender);
        return productId;
    }

    function getProduct(uint256 id)
        public
        view
        returns (
            uint256,
            string memory,
            string memory,
            uint256,
            address
        )
    {
        require(products[id].exists, "Product not found");

        Product storage product = products[id];
        return (
            product.id,
            product.name,
            product.origin,
            product.quantity,
            product.owner
        );
    }

    function transferOwnership(uint256 id, address newOwner) public {
        require(products[id].exists, "Product not found");
        require(newOwner != address(0), "Invalid new owner");

        Product storage product = products[id];
        require(msg.sender == product.owner, "Caller is not current owner");

        address previousOwner = product.owner;
        product.owner = newOwner;

        emit OwnershipTransferred(id, previousOwner, newOwner);
    }
}
