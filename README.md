# Encryption
3 part CLI application.
* keygen - generates key.public and key.secret ```keygen```
* sign - signs file using key.secret and returns the signature in HEX ```sign FILENAME```.
* verify - verifies wether the signature is correct ```verify HEX_SIGNATURE FILENAME```.

Each CLI app has to be installed separately before using. Just ```cd``` to each directory and install using ```npm install -g```.