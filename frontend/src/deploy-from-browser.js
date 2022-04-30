import compile from './compile.js'

let abi = compile.abi
let bytecode = compile.bytecode
let account;
let web3;

const metamaskBtn = document.querySelector('.metamaskBtn')

metamaskBtn.addEventListener('click', async () => {
    if (typeof window.ethereum == 'undefined') return console.error('provider not available ');
    const accounts = await ethereum.request({ method: 'eth_requestAccounts' })
    account = accounts[0];
    web3 = new Web3(window.ethereum)
    console.log(account, web3);
})

const deployBtn = document.querySelector('.deploy');
deployBtn.addEventListener('click', async () => {
    const argumentsContructor = [];
    const gasEstimated = await new web3.eth.Contract(abi)
        .deploy({ data: bytecode, arguments: argumentsContructor })
        .estimateGas({ from: account })

    const result = await new web3.eth.Contract(abi)
        .deploy({ data: bytecode, arguments: argumentsContructor })
        .send({ gas: gasEstimated, from: account })

    console.log('Contract Address Created:', result.options.address)
})

