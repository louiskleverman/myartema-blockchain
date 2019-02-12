
# MyArtema - Blockchain version
My Artema is an art social network based on blockchain technology. It will be able to reward it's artists that utilize the app and will think through how to make an artists life better.

## Technologies used

The technologies and langiuages used for this project are the following :
*   React
*   Javascript
*   HTML5/CSS3
*   Solidity
*   IPFS
*   Truffle
*   Web3/truffle contract
*   Ganache

## Getting Started

### Requirements for the project 

To install this project you will need the following

#### Node

#### Truffle

Truffle is a **smartcontract** to **webclient** framework that helps deploying apps using smart contracts very easily 

```
npm install -g truffle
```

#### Ganache

Ganache is a private blockchain that is being used to deploy the app for testing
there are 2 Ganache clients you can use :

##### Ganache CLI

The ganache command line

```
npm install -g ganache-cli
```
##### Ganache UX client

The ganache software that can be installed from ganaches main website

#### IPFS

Not required since Infura is doing all the hosting

### How to run the project

In order to run the project you must first of all clone the project

```
git clone https://github.com/louiskleverman/myartema-blockchain.git
```

Once cloned you have to install the packages with the following :

```
npm install
npm install -g webpack webpack-cli webpack-dev-server
```

Next you have to launch ganache in order to deploy your contracts to a private ethereum network

Once installed and ganache running you have to compile the contracts end migrate them

```
truffle compile
truffle migrate
```

If you're using ganache-cli then use the following instead

```
truffle migrate --network ganache-cli
```

Then to run the app you simply need to run the following 

```
npm run start
```

## Ideas

### Notifications window

each time there's a transaction going on, instead of holting the window, just have a status box to the bottom right with all the ongoing transactions. 

### Donations

when on the artist page, if the viewer wants to send ether, just type the amount (quantity converts into dollars when typing the amount) and send easily

### artema coin 

Instead of using ether maybe use artema coins ? rewarded also to those that just use the app

When buying you can buy in artema coins of in ether

