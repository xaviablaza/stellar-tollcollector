var StellarSdk = require('stellar-sdk');

// create a completely new and unique sender and receiver for demonstration
// see more about KeyPair objects: https://stellar.github.io/js-stellar-sdk/Keypair.html
var sender = StellarSdk.Keypair.random();
var receiver = StellarSdk.Keypair.random();
console.log("Sender secret: " + sender.secret());
console.log("Receiver secret: " + receiver.secret());
// SAV76USXIJOBMEQXPANUOQM6F5LIOTLPDIDVRJBFFE2MDJXG24TAPUU7
console.log("Sender address: " + sender.publicKey());
console.log("Receiver address: " + receiver.publicKey());
// GCFXHS4GXL6BVUCXBWXGTITROWLVYXQKQLF4YH5O5JT3YZXCYPAFBJZB

// Create a test account and ask Friendbot to fund the newly created account
// The SDK does not have tools for creating test accounts, so you'll have to
// make your own HTTP request.
var request = require('request');

// For sender
request.get({
  url: 'https://horizon-testnet.stellar.org/friendbot',
  qs: { addr: sender.publicKey() },
  // json: true
}, (error, response, body) => {
  if (error || response.statusCode !== 200) {
    console.error('ERROR!', error || body);
  }
  else {
    console.log('SUCCESS! You have a new account :)\n', body);

    // Get each account's details and check its balance(s)
    var server = new StellarSdk.Server('https://horizon-testnet.stellar.org');
	// the JS SDK uses promises for most actions, such as retrieving an account
	server.loadAccount(sender.publicKey()).then((account) => {
	  console.log('Balances for sender account: ' + sender.publicKey());
	  account.balances.forEach((balance) => {
	    console.log('Type:', balance.asset_type, ', Balance:', balance.balance);
	  });
	});
  }
});

// For receiver
request.get({
  url: 'https://horizon-testnet.stellar.org/friendbot',
  qs: { addr: receiver.publicKey() },
  // json: true
}, (error, response, body) => {
  if (error || response.statusCode !== 200) {
    console.error('ERROR!', error || body);
  }
  else {
    console.log('SUCCESS! You have a new account :)\n', body);

    // Get each account's details and check its balance(s)
    var server = new StellarSdk.Server('https://horizon-testnet.stellar.org');
	// the JS SDK uses promises for most actions, such as retrieving an account
	server.loadAccount(receiver.publicKey()).then((account) => {
	  console.log('Balances for receiver account: ' + receiver.publicKey());
	  account.balances.forEach((balance) => {
	    console.log('Type:', balance.asset_type, ', Balance:', balance.balance);
	  });
	});
  }
});