const ethers = require('ethers');
const axios = require('axios');

const API_KEY = "UJUKYJ5RGJEK71FTESABX5GB5UD8IQB8Z6"

const provider = new ethers.providers.EtherscanProvider('homestead');


document.getElementById("get-balance").addEventListener('click', () => {
  const address = document.getElementById("ethereum-address").value;

  if (address === "") {
    document.getElementById("wallet-balance").innerHTML = 0 + " Ether";
  } else {
    provider.getBalance(address).then((balance) => {
      let formattedBalance = ethers.utils.formatEther(balance);
      document.getElementById("wallet-balance").innerHTML =
      formattedBalance + " Ether";
    });
  }
});

document.getElementById("get-nft").addEventListener('click', () => {
  const address = document.getElementById("contract-address").value;
  const tokenID = document.getElementById("token-id").value;
  const owner = "";
  let abi = "";


  if (address === "" || tokenID === "") {

    document.getElementById("nft-price").innerHTML =
    "Please fill out both boxes.";

  } else {

    const url = `https://api.etherscan.io/api?module=contract&action=getabi&address=${address}&apikey=${API_KEY}`;
    axios.get(url).then((response) => {

      abi = response.data.result;
      const contract = new ethers.Contract(address, abi, provider);
      contract.ownerOf(tokenID).then((result) => {

        document.getElementById("nft-price").innerHTML = result;

      });
    })
  }
});

setInterval(() => {
  provider.getBlock("latest").then((blockObj) => {
    document.getElementById("block-number").innerHTML = blockObj.number;
  })

  provider.getGasPrice().then((numObj) => {
    let gasPrice = ethers.utils.formatUnits(numObj, "gwei");
    document.getElementById("gas-prices").innerHTML = gasPrice + " gwei";
  });
}, 5000);

/**
Needed for NFT:
 - Contract Address
 - Token ID
 - Most Recent Transaction

 - Possible route: Find all transactions from contract, find tokenID within
 transactions.

Can most likely show owner as well

.catch((error) => {
  console.log(error);
})
*/
