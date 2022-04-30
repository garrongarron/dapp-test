import './deploy-from-browser.js'

const addressContrac = '0xc5Be04a60159C3b6f87551202F823ee60b822Cc0';

const abi = [{ "inputs": [], "stateMutability": "nonpayable", "type": "constructor" }, { "anonymous": false, "inputs": [{ "indexed": true, "internalType": "address", "name": "_owner", "type": "address" }, { "indexed": true, "internalType": "address", "name": "_spender", "type": "address" }, { "indexed": false, "internalType": "uint256", "name": "_value", "type": "uint256" }], "name": "Approval", "type": "event" }, { "anonymous": false, "inputs": [{ "indexed": true, "internalType": "address", "name": "_from", "type": "address" }, { "indexed": true, "internalType": "address", "name": "_to", "type": "address" }, { "indexed": false, "internalType": "uint256", "name": "_value", "type": "uint256" }], "name": "Transfer", "type": "event" }, { "inputs": [{ "internalType": "address", "name": "", "type": "address" }, { "internalType": "address", "name": "", "type": "address" }], "name": "allowance", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "_spender", "type": "address" }, { "internalType": "uint256", "name": "_value", "type": "uint256" }], "name": "approve", "outputs": [{ "internalType": "bool", "name": "success", "type": "bool" }], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "", "type": "address" }], "name": "balanceOf", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "decimals", "outputs": [{ "internalType": "uint8", "name": "", "type": "uint8" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "name", "outputs": [{ "internalType": "string", "name": "", "type": "string" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "symbol", "outputs": [{ "internalType": "string", "name": "", "type": "string" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "totalSupply", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "_to", "type": "address" }, { "internalType": "uint256", "name": "_value", "type": "uint256" }], "name": "transfer", "outputs": [{ "internalType": "bool", "name": "success", "type": "bool" }], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "_from", "type": "address" }, { "internalType": "address", "name": "_to", "type": "address" }, { "internalType": "uint256", "name": "_value", "type": "uint256" }], "name": "transferFrom", "outputs": [{ "internalType": "bool", "name": "success", "type": "bool" }], "stateMutability": "nonpayable", "type": "function" }];

const addressDestiny = '0x8c8c37CBCF093C0Bcb87B4Fc799b312d18AEDB58'

let web3;
let account;
let MyCoin;

const init = () => {
    if(typeof window.ethereum == 'undefined') return console.error('provider not available ');
    const metamaskBtn = document.querySelector('.metamaskBtn')
    metamaskBtn.classList.remove('d-none');

    metamaskBtn.addEventListener('click', async () => {
        console.log('click');
        const accounts = await ethereum.request({ method: 'eth_requestAccounts' })
        account = accounts[0];
        metamaskBtn.classList.add('d-none');
        console.log(account);

        detectChangeAccount();
        contract();
    })
}
const interact = () => {
    const getBalanceBtn = document.querySelector('.get-balance')
    getBalanceBtn.addEventListener('click', () => {
        MyCoin.methods.balanceOf(account).call().then(res => {
            const amount = web3.utils.fromWei(res, 'ether');
            console.log(amount);
        })
    })
    const transferBtn = document.querySelector('.transfer')
    transferBtn.addEventListener('click', () => {
        const amount = '5';
        const amountTransfer = web3.utils.toWei(amount, 'ether');
        MyCoin.methods.transfer(addressDestiny, amountTransfer).send({ from: account }).then(res => {
            console.log('tx done!');
        })
    })
}
const contract = () => {
    web3 = new Web3(window.ethereum)
    MyCoin = new web3.eth.Contract(abi, addressContrac);
    interact()
}
const detectChangeAccount = () => {
    window.ethereum.on('accountsChanged', (accounts) => {
        console.log('accountsChanged', accounts);
        account = accounts[0];
    })
}
init()