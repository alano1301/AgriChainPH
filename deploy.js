const fs = require("fs");
const path = require("path");
const solc = require("solc");
const { ethers } = require("ethers");

const RPC_URL = process.env.RPC_URL || "http://127.0.0.1:7545";
const PRIVATE_KEY = process.env.PRIVATE_KEY || "0xb4142809f477ea661de0f8cc834731dd4287c9a3d87f03a206d758824a20da84";

const contractPath = path.join(__dirname, "AgriChainPH.sol");
const source = fs.readFileSync(contractPath, "utf8");

const input = {
  language: "Solidity",
  sources: {
    "AgriChainPH.sol": {
      content: source,
    },
  },
  settings: {
    outputSelection: {
      "*": {
        "*": ["abi", "evm.bytecode.object"],
      },
    },
  },
};

const output = JSON.parse(solc.compile(JSON.stringify(input)));

if (output.errors) {
  for (const error of output.errors) {
    if (error.severity === "error") {
      console.error(error.formattedMessage);
    } else {
      console.warn(error.formattedMessage);
    }
  }

  if (output.errors.some((error) => error.severity === "error")) {
    process.exit(1);
  }
}

const contractData = output.contracts["AgriChainPH.sol"].AgriChainPH;
const abi = contractData.abi;
const bytecode = contractData.evm.bytecode.object;

async function deploy() {
  const provider = new ethers.JsonRpcProvider(RPC_URL);
  const wallet = new ethers.Wallet(PRIVATE_KEY, provider);
  const factory = new ethers.ContractFactory(abi, bytecode, wallet);

  console.log("Deploying AgriChainPH contract to", RPC_URL);
  const contract = await factory.deploy();
  await contract.waitForDeployment();

  console.log("Contract deployed at:", contract.target);

  const configPath = path.join(__dirname, "contractConfig.json");
  fs.writeFileSync(
    configPath,
    JSON.stringify({
      address: contract.target,
      abi,
    }, null, 2)
  );

  console.log(`Saved contract config to ${configPath}`);
  console.log("You can now run: npm start");
}

deploy().catch((error) => {
  console.error(error);
  process.exit(1);
});
