var StellarSdk = require('stellar-sdk');
StellarSdk.Network.useTestNetwork();
var server = new StellarSdk.Server('https://horizon-testnet.stellar.org');
var sourceKeys = StellarSdk.Keypair.random();
console.log(sourceKeys.secret());

var request = require('request');
request.get({
    url: 'https://horizon-testnet.stellar.org/friendbot',
    qs: { addr: sourceKeys.publicKey() },
    json: true
}, function(error, response, body) {
    if (error || response.statusCode !== 200) {
        console.error('ERROR!', error || body);
    }
    else {
        console.log('SUCCESS! You have a new account :)\n', body);




        // First, check to make sure that the destination account exists.
        // You could skip this, but if the account does not exist, you will be charged
        // the transaction fee when the transaction fails.
        server.loadAccount(sourceKeys.publicKey())
        // If the account is not found, surface a nicer error message for logging.
            .catch(StellarSdk.NotFoundError, function (error) {
                throw new Error('The destination account does not exist!');
            })
            // If there was no error, load up-to-date information on your account.
            .then(function() {
                return server.loadAccount(sourceKeys.publicKey());
            })
            .then(function(sourceAccount) {
                // Start building the transaction.
                var transaction = new StellarSdk.TransactionBuilder(sourceAccount);
                MAX_ACCOUNTS = 100;
                for (i=0; i<MAX_ACCOUNTS; ++i) {
                    kp = StellarSdk.Keypair.random().publicKey();
                    console.log(kp);
                    transaction.addOperation(StellarSdk.Operation.createAccount({
                        destination: kp,
                        startingBalance: "20"
                    }));
                }
                // A memo allows you to add your own metadata to a transaction. It's
                // optional and does not affect how Stellar treats the transaction.
                transaction.addMemo(StellarSdk.Memo.text('Cool Transaction'));
                transaction = transaction.build();
                // Sign the transaction to prove you are actually the person sending it.
                transaction.sign(sourceKeys);
                // And finally, send it off to Stellar!
                return server.submitTransaction(transaction);
            })
            .then(function(result) {
                console.log('Success! Results:', result);
            })
            .catch(function(error) {
                console.error('Something went wrong!', error);
            });







    }
});

