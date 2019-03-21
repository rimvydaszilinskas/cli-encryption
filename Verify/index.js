#!/usr/bin/env node
const argv = require('minimist')(process.argv.slice(2));
const clear = require('clear');
const chalk = require('chalk');
const figlet = require('figlet');
const fs = require('fs');
const sodium = require('sodium-native');

// Clear the screen
clear();

// Print out the app name
console.log(
    chalk.yellow(
        figlet.textSync('Verify', {horizontalLayout: true})
    )
);

if(argv['_'].length < 2) {
    console.log(chalk.red('Not enough parameters supplied! Application is now exiting'));
    console.log(chalk.green('usage: verify SIGNATURE FILENAME'));
    process.exit(1);
}

// Split the arguments into FILE and SIGNATURE
const SIGNATURE = Buffer.from(argv['_'][0], 'hex');
const FILE = argv['_'][1];

// Check if the files exist
fs.readFile(FILE, (err, file) => {
    if(err) {
        console.log(chalk.red("Can't find file. Application is now exiting."));
        process.exit();
    }

    fs.readFile('key.public', (err, key) => {
        if(err) {
            console.log(chalk.red("Can't find key. Application is now exiting."));
            process.exit();
        }

        var message = Buffer.alloc(sodium.crypto_sign_BYTES - file.length);

        // fill in the message
        var decrypted = sodium.crypto_sign_open(message, SIGNATURE, key);

        if(decrypted) {
            console.log("Decrypted.", message.toString());
        } else {
            console.log("Failed to decrypt");
        }
    });
});

