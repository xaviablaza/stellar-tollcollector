var StellarSdk = require('stellar-sdk');
StellarSdk.Network.useTestNetwork();
var server = new StellarSdk.Server('https://horizon-testnet.stellar.org');

// Account that will have funds to fund the newly created account
var source_account = StellarSdk.Keypair.random();
console.log(source_account.secret());

// Fund the source account with funds from friendbot
var request = require('request');
request.get({
    url: 'https://horizon-testnet.stellar.org/friendbot',
    qs: { addr: source_account.publicKey() },
    // json: true
}, (error, response, body) => {
    if (error || response.statusCode !== 200) {
    console.error('ERROR!', error || body);
} else {
    console.log('SUCCESS! You have a new account :)\n', body);

    // Get each account's details and check its balance(s)
    var server = new StellarSdk.Server('https://horizon-testnet.stellar.org');
    // the JS SDK uses promises for most actions, such as retrieving an account
    server.loadAccount(source_account.publicKey()).then((account) => {
        console.log('Balances for source account: ' + source_account.publicKey());
    account.balances.forEach((balance) => {
        console.log('Type:', balance.asset_type, ', Balance:', balance.balance);

    var new_account = StellarSdk.Keypair.random();
    // Create and submit a new transaction to create a new account
    var transaction = new StellarSdk.TransactionBuilder(account)
    // this operation funds the new account with XLM
        .addOperation(StellarSdk.Operation.createAccount({
            destination: new_account.publicKey(),
            startingBalance: "100"
        }))
        .build();

    transaction.sign(StellarSdk.Keypair.fromSecret(source_account.secret())); // sign the transaction

    server.submitTransaction(transaction)
        .then(function (transactionResult) {
            console.log(transactionResult);
            server.loadAccount(new_account.publicKey()).then((account) => {
                console.log('Balances for new_account: ' + new_account.publicKey());
                console.log(new_account.secret());
            account.balances.forEach((balance) => {
                console.log('Type:', balance.asset_type, ', Balance:', balance.balance);
        });
        });
        })
        .catch(function (err) {
            console.error(err);
        });
})
})
}
})
