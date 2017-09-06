# stellar-tollcollector

## Resource Paywall
Let’s say you have a public-facing service, perhaps for streaming or open wifi. You want to allow other people to use this service if they pay you small amounts. These payments could be used as spam prevention or to support your business. This is a job for the **toll collector**…

## Toll Collector
A simple service that keeps track of any XLM sent to a `toll address`. The toll collector has a database of public keys and amounts of XLM it has sent to the toll address. It watches for payments to the toll address on the Stellar network and adds them to this DB.

The toll collector service has one RPC or endpoint that you can call:

* `charge(publicKey, amount of XLM)` returns
  * `amount XLM charged`
  * `amount of XLM this key has left`
  
Your app can publish its Stellar toll address for payments. When someone tries to use your service, the server has them authenticate their public key and calls `charge` on the Toll Collector to decrements the consumer’s balance in the DB. You can send the consumer a message when their balance is zero.

Referenced from [Build Stellar Apps - Resource Paywall](https://www.stellar.org/developers/guides/things-to-build.html#resource-paywall)
