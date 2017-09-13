var StellarSdk = require('stellar-sdk');
StellarSdk.Network.useTestNetwork();
var server = new StellarSdk.Server('https://horizon-testnet.stellar.org');
var sourceKeys = StellarSdk.Keypair
  .fromSecret('SDPSMHIBHBTZCAVGYLXHGQICF2ONHIUBBM6SC3SCTENAZVMSIAW3U4YV');
var destinationId = 'GC4P7ZKVYLTT3UQUZR6K5PTH5D5QNGVNJNDEF6PY56WWLIBOC2OFYXMQ';

// Get each account's details and check its balance(s)
    var server = new StellarSdk.Server('https://horizon-testnet.stellar.org');
  // the JS SDK uses promises for most actions, such as retrieving an account
  server.loadAccount('GBGLUYEDRKHZ5TE5ZCNNB4JPSL44VAPH72NAM2ZLVNDVFCKIBQ7M2FQA').then((account) => {
    console.log('Balances for sender account: ' + 'GBGLUYEDRKHZ5TE5ZCNNB4JPSL44VAPH72NAM2ZLVNDVFCKIBQ7M2FQA');
    account.balances.forEach((balance) => {
      console.log('Type:', balance.asset_type, ', Balance:', balance.balance);
    });
  });


  // Get each account's details and check its balance(s)
    var server = new StellarSdk.Server('https://horizon-testnet.stellar.org');
  // the JS SDK uses promises for most actions, such as retrieving an account
  server.loadAccount('GC4P7ZKVYLTT3UQUZR6K5PTH5D5QNGVNJNDEF6PY56WWLIBOC2OFYXMQ').then((account) => {
    console.log('Balances for receiver account: ' + 'GC4P7ZKVYLTT3UQUZR6K5PTH5D5QNGVNJNDEF6PY56WWLIBOC2OFYXMQ');
    account.balances.forEach((balance) => {
      console.log('Type:', balance.asset_type, ', Balance:', balance.balance);
    });
  });
  

// First, check to make sure that the destination account exists.
// You could skip this, but if the account does not exist, you will be charged
// the transaction fee when the transaction fails.
server.loadAccount(destinationId)
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
    var transaction = new StellarSdk.TransactionBuilder(sourceAccount)
      .addOperation(StellarSdk.Operation.payment({
        destination: destinationId,
        // Because Stellar allows transaction in many currencies, you must
        // specify the asset type. The special "native" asset represents Lumens.
        asset: StellarSdk.Asset.native(),
        amount: "10"
      }))
      // A memo allows you to add your own metadata to a transaction. It's
      // optional and does not affect how Stellar treats the transaction.
      .addMemo(StellarSdk.Memo.text('Test Transaction'))
      .build();
    // Sign the transaction to prove you are actually the person sending it.
    transaction.sign(sourceKeys);
    // And finally, send it off to Stellar!
    return server.submitTransaction(transaction);
  })
  .then(function(result) {
    console.log('Success!');
    //console.log('Results:', result);
    // Get each account's details and check its balance(s)
    
  // Get each account's details and check its balance(s)
    var server = new StellarSdk.Server('https://horizon-testnet.stellar.org');
  // the JS SDK uses promises for most actions, such as retrieving an account
  server.loadAccount('GBGLUYEDRKHZ5TE5ZCNNB4JPSL44VAPH72NAM2ZLVNDVFCKIBQ7M2FQA').then((account) => {
    console.log('Balances for sender account: ' + 'GBGLUYEDRKHZ5TE5ZCNNB4JPSL44VAPH72NAM2ZLVNDVFCKIBQ7M2FQA');
    account.balances.forEach((balance) => {
      console.log('Type:', balance.asset_type, ', Balance:', balance.balance);
    });
    var server = new StellarSdk.Server('https://horizon-testnet.stellar.org');
  // the JS SDK uses promises for most actions, such as retrieving an account
  server.loadAccount('GC4P7ZKVYLTT3UQUZR6K5PTH5D5QNGVNJNDEF6PY56WWLIBOC2OFYXMQ').then((account) => {
    console.log('Balances for receiver account: ' + 'GC4P7ZKVYLTT3UQUZR6K5PTH5D5QNGVNJNDEF6PY56WWLIBOC2OFYXMQ');
    account.balances.forEach((balance) => {
      console.log('Type:', balance.asset_type, ', Balance:', balance.balance);
    });
  });
  });






  })
  .catch(function(error) {
    console.error('Something went wrong!', error);
  });