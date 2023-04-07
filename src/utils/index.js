import { ethers } from "ethers";

const contractAddress = "CONTRACT_ADDRESS"; // replace with the address of your contract
const abi = [
  {
    inputs: [
      {
        internalType: "string",
        name: "carNumber",
        type: "string",
      },
    ],
    name: "getCarDetails",
    outputs: [
      {
        internalType: "string",
        name: "make",
        type: "string",
      },
      {
        internalType: "string",
        name: "model",
        type: "string",
      },
      {
        internalType: "uint256",
        name: "year",
        type: "uint256",
      },
      {
        internalType: "address",
        name: "owner",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "string",
        name: "carNumber",
        type: "string",
      },
    ],
    name: "getCarOwner",
    outputs: [
      {
        internalType: "address",
        name: "owner",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "string",
        name: "carNumber",
        type: "string",
      },
      {
        internalType: "string",
        name: "make",
        type: "string",
      },
      {
        internalType: "string",
        name: "model",
        type: "string",
      },
      {
        internalType: "uint256",
        name: "year",
        type: "uint256",
      },
    ],
    name: "storeCarDetails",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "string",
        name: "carNumber",
        type: "string",
      },
      {
        internalType: "address",
        name: "newOwner",
        type: "address",
      },
    ],
    name: "transferCarOwnership",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
];

export const connectToContract = async () => {
  if (typeof window.ethereum !== "undefined") {
    await window.ethereum.enable();
  }

  const provider = new ethers.providers.Web3Provider(window.ethereum);
  const signer = provider.getSigner();
  const contract = new ethers.Contract(contractAddress, abi, signer);

  return contract;
};
