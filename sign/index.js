#!/usr/bin/env node
const argv = require('minimist')(process.argv.slice(2));
const fs = require('fs');
const sodium = require('sodium-native');
const clear = require('clear');
const figlet = require('figlet');
const chalk = require('chalk');

clear();

// reads file and reads key.secret, signs file and writes the signature in console in HEX
console.log(
    chalk.yellow(
        figlet.textSync("Signer", {horizontalLayout: true})
    )
);

const FILE = argv['_'];

// check if the filename exists in the parameters
if(FILE.length === 0) {
    console.log(chalk.red("No filename specified. App is exiting."));
    process.exit(1);
}

fs.readFile(FILE[0], (err, data) => {
    if(err){
        console.error("No such file!");
        process.exit(1);
    }

    fs.readFile('key.secret', (err, secret) => {
        if(err) {
            console.error("An error occured");
            process.exit(1);
        }

        // assign a size to signedmessage buffer
        var signedMessage = Buffer.alloc(sodium.crypto_sign_BYTES + data.length);

        // fill in the signedMessage
        sodium.crypto_sign(signedMessage, data, secret);

        console.log(signedMessage.toString('hex'));
    });

})