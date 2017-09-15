var StellarSdk = require('stellar-sdk');

// Use the test network
StellarSdk.Network.useTestNetwork();

// Use this keypair as the source account
var rootKeypair = StellarSdk.Keypair.fromSecret("SCNAG43G3YF2QENBNU445AHVWJTLOULCYWXEXBWN2H5FD4WJ5WJSFZ65");

// Get each account's details to get its sequence number
var server = new StellarSdk.Server('https://horizon-testnet.stellar.org');

// Let server load the account to get its sequence number
server.loadAccount(rootKeypair.publicKey()).then(function(account) {
    var secondaryAddress = "GBLHWGL4QAHS222BR6L2H5GJ64DMV65PND37ZRZ6AY7WNTHQ22UGPG6L";
    var transaction1 = new StellarSdk.TransactionBuilder(account)
        .addOperation(StellarSdk.Operation.setOptions({
            signer: {
                ed25519PublicKey: secondaryAddress,
                weight: 1
            }
        }))
        .addOperation(StellarSdk.Operation.setOptions({
            masterWeight: 1, // set master key weight
            lowThreshold: 1,
            medThreshold: 2, // a payment is medium threshold
            highThreshold: 2 // make sure to have enough weight to add up to the high threshold!
        }))
        .build();

    transaction1.sign(rootKeypair); // only need to sign with the root signer as the 2nd signer won't be added to the account till after this transaction completes

    // now create a payment with the account that has two signers
    var transaction2 = new StellarSdk.TransactionBuilder(account)
        .addOperation(StellarSdk.Operation.payment({
            destination: "GAODPIDH74GJ6EFG57CA43PJ6MBPE4QCFFDCJQQ674D5GNH4P5MFURE2",
            asset: StellarSdk.Asset.native(),
            amount: "2000" // 2000 XLM
        }))
        .build();

    var secondKeypair = StellarSdk.Keypair.fromSecret("SD6CBBBPDJX4Z57V4XI2LOJBYM4Q2COT3WJAHR46TFW7FI5JUGJ5R2BH");

    // now we need to sign the transaction with both the root and the secondaryAddress
    transaction2.sign(rootKeypair);
    transaction2.sign(secondKeypair);

    server.submitTransaction(transaction1).then(function(transactionResult) {
        console.log(transactionResult);
        server.submitTransaction(transaction2).then(function(transactionResult) {
            console.log(transactionResult);
            server.loadAccount("GAODPIDH74GJ6EFG57CA43PJ6MBPE4QCFFDCJQQ674D5GNH4P5MFURE2").then(function(account) {
                account.balances.forEach(function(balance) {
                    console.log('Type:', balance.asset_type, ', Balance:', balance.balance);
                });
            });
        }).catch(function(err) {
            console.log(err);
        });
    });
});