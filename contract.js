const fs = require("fs");
const path = require("path");
const { ethers } = require("ethers");

const RPC_URL = process.env.RPC_URL || "http://127.0.0.1:7545";
const PRIVATE_KEY = process.env.PRIVATE_KEY || "0xb4142809f477ea661de0f8cc834731dd4287c9a3d87f03a206d758824a20da84";
const CONTRACT_ADDRESS = process.env.CONTRACT_ADDRESS;
const CONFIG_PATH = path.join(__dirname, "contractConfig.json");

let contractAddress = CONTRACT_ADDRESS || "0x5B38Da6a701c568545dCfcB03FcB875f56beddC4";
let abi;

if (fs.existsSync(CONFIG_PATH)) {
  const config = JSON.parse(fs.readFileSync(CONFIG_PATH, "utf8"));
  contractAddress = contractAddress || config.address;
  abi = config.abi;
}

if (!contractAddress) {
  console.error("Error: CONTRACT_ADDRESS is required. Set it in environment variables or deploy the contract first.");
  process.exit(1);
}

if (!PRIVATE_KEY) {
  console.error("Error: PRIVATE_KEY is required. Set it in environment variables.");
  process.exit(1);
}

if (!abi) {
  abi = [
    "function registerProduct(string memory _name, string memory _origin, uint256 _quantity) public",
    "function getProduct(uint256 _id) public view returns(uint256,string memory,string memory,uint256,address)",
    "function transferOwnership(uint256 _id, address _newOwner) public"
  ];
}

const provider = new ethers.JsonRpcProvider(RPC_URL);
const wallet = new ethers.Wallet(PRIVATE_KEY, provider);
const contract = new ethers.Contract(contractAddress, abi, wallet);

module.exports = contract;