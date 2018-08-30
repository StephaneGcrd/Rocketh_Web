var WalletProvider = require("truffle-wallet-provider");
const Wallet = require('ethereumjs-wallet');
var ropstenPrivateKey = new Buffer("000000 PRIVATE KEY","hex");
var ropstenWallet = Wallet.fromPrivateKey(ropstenPrivateKey);
var ropstenProvider = new WalletProvider(ropstenWallet, "https://ropsten.infura.io/5XxOjE0NluqxE87JK4WZ");

module.exports = {
  // See <http://truffleframework.com/docs/advanced/configuration>
  // to customize your Truffle configuration!
  networks: {
    development: {
      host: "127.0.0.1",
      port: 8545,
      network_id: "*", // Match any network id
      from: "0xf99bc2801C53Be5303e6cdE55D3A5e0d6Ad9926d"
    },
    ropsten: {
      provider: ropstenProvider,
      gas: 4600000,
      network_id: 3
    }
  }
};
