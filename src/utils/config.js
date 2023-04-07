const ethers = require("ethers");

let provider = "";
let signer = "";
const eth = { provider: "", signer: "" };
if (typeof window !== "undefined") {
  provider = new ethers.providers.Web3Provider(window.ethereum);
  signer = provider.getSigner();
}

export { provider, signer };
