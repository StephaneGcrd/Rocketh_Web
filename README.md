# RockethWeb
Web Dapp for Rocket

## Lancer l'application

1 - Installer Ganache, Node, et Truffle sur l'ordinateur, ainsi que l'extension Metamask sur Chrome

2 - Cloner le git

3 - Installer les dépendances: `npm install`

4 - Lancer Ganache, sur HTTP://127.0.0.1:8545

5 - Configurer Metamask pour la blockchain configurée avec Ganache.

6 - Compiler le smart-contract : `truffle compile`

7 - Migrer le contrat sur la Blockchain : `truffle migrate`

8 - Lancer le serveur de dev client (configuré sur http://localhost:4000)  : `npm run c-dev`

9 - Lancer le serveur Node sur un autre terminal (qui communiquera avec la BDD, il est configuré sur http://localhost:8000) : `npm run s-dev`
