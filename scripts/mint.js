import {
  MINT_CONTRACT,
  MINT_ABI,
  TOKEN_CONTRACT,
  TOKEN_ABI,
  NETWORK
} from '../config.js'; } from '../config.js';

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
  const nftContract = new ethers.Contract(MINT_CONTRACT, MINT_ABI, signer);
const tokenContract = new ethers.Contract(TOKEN_CONTRACT, TOKEN_ABI, provider);
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
