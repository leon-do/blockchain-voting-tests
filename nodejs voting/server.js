var fs = require('fs')
var Web3 = require('web3')
var web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));


// ===============EXPRESS SHIT========================================
var express = require('express');
var app = express();


app.get('/', function (req, res) {
    res.send("sent 2 voteBitch")
    voteBitch([123,1]) //goes to VOTE section
})

app.listen(3000)



// ===============MAKE CONTRACT========================================

//from the voting.sol file
var code = fs.readFileSync('voteAB.sol').toString()



// ===============COMIPILE CONTRACT========================================

//compile voting.sol contract.
var contract =  web3.eth.compile.solidity(code)


// ===============VOTE========================================

//var VotingContract = web3.eth.contract(contract['<stdin>:myContract'].info.abiDefinition)
var VotingContract = web3.eth.contract([{"constant":false,"inputs":[{"name":"userArray","type":"uint256[]"}],"name":"totalVotes","outputs":[{"name":"","type":"uint256"}],"payable":false,"type":"function"},{"constant":true,"inputs":[],"name":"voteA","outputs":[{"name":"","type":"uint256"}],"payable":false,"type":"function"},{"constant":true,"inputs":[],"name":"voteB","outputs":[{"name":"","type":"uint256"}],"payable":false,"type":"function"}])

//0xb60d735C16be5D107ae53F49D561a0fFd0d3AEc4
var contractInstance = VotingContract.at('0x2B79dFf7cD509365B664ED7A1d4C06Ee04c15e31')


// voting
function voteBitch(votingArray){
    //voting array is [123,1] or [123,2]
    contractInstance.totalVotes(votingArray, {data: contract['<stdin>:myContract'].code, from: '0x26F14FaBCa8A3c18E12F0B83Ac991F5dC7A7A7f3'})
    .then(function(){
        console.log(contractInstance.voteA.call())
    })
}






