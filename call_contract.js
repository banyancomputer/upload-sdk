

const run = async () => {

    const Web3 = require('web3');
    var FileReader = require('filereader');
    const fs = require('fs');
    const {TextEncoder} = require("util")

    const PRIVATE_KEY = process.env.PRIVATE_KEY;
    const API_KEY = process.env.API_KEY;
    
    const web3 = new Web3(API_KEY)

    const contract_abi = [
        {
            "anonymous": false,
            "inputs": [
                {
                    "indexed": true,
                    "internalType": "uint256",
                    "name": "offerId",
                    "type": "uint256"
                },
                {
                    "indexed": true,
                    "internalType": "uint256",
                    "name": "blockNumber",
                    "type": "uint256"
                },
                {
                    "indexed": false,
                    "internalType": "bytes",
                    "name": "proof",
                    "type": "bytes"
                }
            ],
            "name": "ProofAdded",
            "type": "event"
        },
        {
            "inputs": [
                {
                    "internalType": "bytes",
                    "name": "_proof",
                    "type": "bytes"
                }
            ],
            "name": "save_proof",
            "outputs": [],
            "stateMutability": "nonpayable",
            "type": "function"
        }
    ]
    const contract_address = '0xd9145CCE52D386f254917e481eB44e9943F39138';
    const my_addr = '0x8A4E8e012a5B9EC7817a7936e41DcD84489CE5ed';
    var bao_contract = web3.eth.contract(contract_abi, contract_address);

    let txtFile = "bao_slice.txt";
    let proof = fs.readFileSync(txtFile,'utf8');
    var enc = new TextEncoder();
    let _proof = enc.encode(proof)


    let tx = {
        from: my_addr,
        to: contract_address,
        data: await bao_contract.methods.save_proof(_proof).encodeABI()
     };
     
    let signedTx = await this.web3.eth.accounts.signTransaction(tx, PRIVATE_KEY);
    let result = await this.web3.eth.sendSignedTransaction(signedTx.rawTransaction);
    console.log(result);
}
    
run();
//log_proof.methods.save_proof(_proof).send(); 

