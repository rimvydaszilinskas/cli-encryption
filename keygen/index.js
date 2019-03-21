#!/usr/bin/env node
const fs = require('fs');
const sodium = require('sodium-native');
const figlet = require('figlet');
const chalk = require('chalk');
const clear = require('clear');

clear();

console.log(
    chalk.yellow(
        figlet.textSync("Keygen", {horizontalLayout: true})
    )
)

// asign buffers of size to keys
var secretKey = sodium.sodium_malloc(sodium.crypto_sign_SECRETKEYBYTES);
var publicKey = sodium.sodium_malloc(sodium.crypto_secretbox_KEYBYTES)

// generate tied key pair
sodium.crypto_sign_keypair(publicKey, secretKey);

fs.writeFile('key.public', publicKey, (err) => {
    if(err)
        console.error("An error has occured");
    else 
        console.log("Public key saved as key.public");
});

fs.writeFile('key.secret', secretKey, (err) => {
    if(err)
        console.log("An error has occured");
    else 
        console.log("Private key saved as key.private");
})