const HDWalletProvider = require('truffle-hdwallet-provider');
const Web3 = require('web3');
const { abi, bytecode } = require('./compile');

const mnemonic = "cheese giraffe repair asset advance lens easily youth merge staff brief leg";
const provider = new HDWalletProvider(mnemonic, 'http://127.0.0.1:8545');

const web3 = new Web3(provider)

const deploy = async () => {
    const accounts = await web3.eth.getAccounts();

    const argumentsContructor = [];
    const gasEstimated = await new web3.eth.Contract(abi)
        .deploy({ data: bytecode, arguments: argumentsContructor })
        .estimateGas({ from: accounts[0] })

    const result = await new web3.eth.Contract(abi)
        .deploy({ data: bytecode, arguments: argumentsContructor })
        .send({ gas: gasEstimated, from: accounts[0] })

    console.log('Contract Address Created:', result._address)
}

deploy()