"use client";

import { useEffect, useState } from "react";
import { ethers } from "ethers";
import "../../styles/globals.css";

export default function Vehicle() {
  const [carNumber, setCarNumber] = useState("");
  const [make, setMake] = useState("");
  const [model, setModel] = useState("");
  const [year, setYear] = useState(0);
  const [owner, setOwner] = useState("");
  const [newOwner, setNewOwner] = useState("");
  const [ethContract, setEthContract] = useState(null);

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

  useEffect(() => {
    if (typeof window !== "undefined") {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      const contractAddress = "0xB2c0946cF5d60Ab9061D8105a05fc00A80df1793"; // replace with the actual contract address
      const contract = new ethers.Contract(contractAddress, abi, signer);
      setEthContract(contract);
    }
  }, []);

  const handleRegister = async () => {
    try {
      await ethContract.storeCarDetails(carNumber, make, model, year);
      alert("Car registered successfully!");
    } catch (error) {
      console.error(error);
      alert("Failed to register car");
    }
  };

  const handleTransfer = async () => {
    try {
      await handleGetOwner();
      if (owner !== currentUser) {
        alert("You are not the current owner of this car");
        return;
      }
      await ethContract.transferCarOwnership(carNumber, newOwner);
      alert("Ownership transferred successfully!");
    } catch (error) {
      console.error(error);
      alert("Failed to transfer ownership");
    }
  };

  const handleGetOwner = async () => {
    try {
      const result = await ethContract.getCarOwner(carNumber);
      setOwner(result);
    } catch (error) {
      console.error(error);
      alert("Failed to get owner");
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-4xl font-bold mb-4">Car Registry System</h1>
      <form className="mb-4" onSubmit={(e) => e.preventDefault()}>
        <div className="flex flex-col mb-2">
          <label className="font-bold mb-2" htmlFor="carNumber">
            Car Number:
          </label>
          <input
            className="rounded border border-gray-400 py-2 px-3 mb-1"
            type="text"
            id="carNumber"
            value={carNumber}
            onChange={(e) => setCarNumber(e.target.value)}
          />
        </div>
        <div className="flex flex-col mb-2">
          <label className="font-bold mb-2" htmlFor="make">
            Make:
          </label>
          <input
            className="rounded border border-gray-400 py-2 px-3 mb-1"
            type="text"
            id="make"
            value={make}
            onChange={(e) => setMake(e.target.value)}
          />
        </div>
        <div className="flex flex-col mb-2">
          <label className="font-bold mb-2" htmlFor="model">
            Model:
          </label>
          <input
            className="rounded border border-gray-400 py-2 px-3 mb-1"
            type="text"
            id="model"
            value={model}
            onChange={(e) => setModel(e.target.value)}
          />
        </div>
        <div className="flex flex-col mb-2">
          <label className="font-bold mb-2" htmlFor="year">
            Year:
          </label>
          <input
            className="rounded border border-gray-400 py-2 px-3 mb-1"
            type="number"
            id="year"
            value={year}
            onChange={(e) => setYear(parseInt(e.target.value))}
          />
        </div>
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          type="submit"
          onClick={handleRegister}
        >
          Register Car
        </button>
      </form>
      <form className="mb-4" onSubmit={(e) => e.preventDefault()}>
        <div className="flex flex-col mb-2">
          <label className="font-bold mb-2" htmlFor="carNumber">
            Car Number:
          </label>
          <input
            className="rounded border border-gray-400 py-2 px-3 mb-1"
            type="text"
            id="carNumber"
            value={carNumber}
            onChange={(e) => setCarNumber(e.target.value)}
          />
        </div>
        <div className="flex flex-col mb-2">
          <label className="font-bold mb-2" htmlFor="newOwner">
            New Owner:
          </label>
          <input
            className="rounded border border-gray-400 py-2 px-3 mb-1"
            type="text"
            id="newOwner"
            value={newOwner}
            onChange={(e) => setNewOwner(e.target.value)}
          />
        </div>
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          type="submit"
          onClick={handleTransfer}
        >
          Transfer Ownership
        </button>
      </form>
    </div>
  );
}
