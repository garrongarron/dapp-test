const path = require('path');
const fs = require('fs');
const solc = require('solc');

const myCoinPath = path.join(__dirname, './MyCoin.sol');
const code = fs.readFileSync(myCoinPath, 'utf8');

const input = {
    language: 'Solidity',
    sources:{
        'MyCoin.sol':{
            content:code
        }
    },
    settings:{
        outputSelection:{
            '*':{
                '*':['*']
            }
        }
    }
}

const output = JSON.parse(solc.compile(JSON.stringify(input)));

console.log('abi', JSON.stringify(output.contracts['MyCoin.sol'].MyCoin.abi))
console.log('bytecode', JSON.stringify(output.contracts['MyCoin.sol'].MyCoin.evm.bytecode.object))

module.exports = {
    abi: output.contracts['MyCoin.sol'].MyCoin.abi,
    bytecode: output.contracts['MyCoin.sol'].MyCoin.evm.bytecode.object
}