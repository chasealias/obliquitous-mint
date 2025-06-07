import { MINT_CONTRACT, NETWORK } from '../config.js';

let provider;
let signer;
let contract;

document.getElementById('connectWallet').addEventListener('click', async () => {
  if (window.ethereum) {
    await window.ethereum.request({ method: 'eth_requestAccounts' });
    provider = new ethers.providers.Web3Provider(window.ethereum);
    signer = provider.getSigner();
    await switchNetwork();
    document.getElementById('status').innerText = 'Wallet connected!';
  }
});

async function switchNetwork() {
  try {
    await window.ethereum.request({
      method: 'wallet_switchEthereumChain',
      params: [{ chainId: NETWORK.chainId }],
    });
  } catch (e) {
    console.error('Switch network error', e);
  }
}

document.getElementById('mintButton').addEventListener('click', async () => {
  const abi = [
    "function mint() public payable"
  ];

  contract = new ethers.Contract(MINT_CONTRACT, abi, signer);
  try {
    const tx = await contract.mint({ value: 0 });
    await tx.wait();
    document.getElementById('status').innerText = 'NFT minted!';
  } catch (err) {
    console.error(err);
    document.getElementById('status').innerText = 'Mint failed.';
  }
});
