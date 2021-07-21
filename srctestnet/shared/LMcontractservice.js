import Web3 from 'web3'
import swal from 'sweetalert';
import Web3Modal from "web3modal";

import LMabi from './LMabi.json'
import POOLabi from './POOLabi.json'
import HODLwheelabi from './HODLwheelabi.json'
import Migrator from './Migrator.json'


import WalletConnectProvider from "@walletconnect/web3-provider";
import { BscConnector } from '@binance-chain/bsc-connector'

const getWeb3Client = async () => {

  const loginType = localStorage.getItem("loginType");


  if (window.ethereum || window.BinanceChain || Web3.givenProvider) {

    if (loginType === "metamask") {

     const web3Client = new Web3(window.ethereum || Web3.givenProvider);
    
      window.web3 = web3Client;
      //await window.ethereum.enable();
      await web3Client.eth.requestAccounts();
     var id = await web3Client.eth.net.getId();
        
    // return web3Client; 
     if (id == 56 || id == 97){
      return web3Client;
     }
     else {
       swal("Change Network to Binance Mainet");
     }

    }
   
    else if (loginType === "binance")
     
    {
      if (window.BinanceChain) {    
      
      const web3Client = new Web3(window.BinanceChain);
     // window.web3 = web3Client;
       
       await web3Client.eth.requestAccounts();
      
    //  console.log(acc[0]);
     
     var id = await web3Client.eth.net.getId();
      console.log("ID",id);
        
    // return web3Client; 
     if (id == 56 || id == 97){
      return web3Client;
     }
     else {
       swal("Change Network to Binance Mainet");
     }
       
    }

    else {

     await swal("Please Install Binance Wallet!!");
      window.location.reload();
    }

     }
    
     else if (loginType === "walletconnect")
     
     {   
         //  Create WalletConnect Provider
            const provider = new WalletConnectProvider({

              rpc: {
                1 : "https://bsc-dataseed.binance.org/",
                56: "https://bsc-dataseed.binance.org/",
                97: "https://data-seed-prebsc-1-s1.binance.org:8545"
             },
          });

           //   //  Enable session (triggers QR Code modal)
         await provider.enable();
         const web3Client = new Web3(provider);
         var id = await web3Client.eth.net.getId();

         console.log("id",id);
         return web3Client;
    }
     
   
}
    


  else {

    window.addEventListener('ethereum#initialized', handleEthereum, {
      once: true,
    });
  
    setTimeout(handleEthereum, 3000); // 3 seconds
 
  }

};


async function  handleEthereum() {
  // const provider= await detectEthereumProvider();
 
  
    await swal("Please Install Wallet!");
    window.location.reload()
  
}











//   if (window.ethereum) {
//     if (loginType === "metamask") {
//       const web3Client = new Web3(window.ethereum);
//       window.web3 = web3Client;
//       await window.ethereum.enable();
//      var id = await web3Client.eth.net.getId();
        
//     // return web3Client; 
//      if (id == 56 || id == 97 ){
//       return web3Client;
//      }
//      else {
//        swal("Change Network to Binance Mainet");
//      }

//     } 
   
//     else {
    
//     //   const bsc = new BscConnector({
//     //     supportedChainIds: [56, 97] // later on 1 ethereum mainnet and 3 ethereum ropsten will be supported

//     //   })


//     //   // const web3Client = new Web3(bsc);
//     //   // console.log(web3Client);
//     //   // const accounts = await web3Client.eth.getAccounts();
//     //   // console.log("ACC",accounts);
      
//     //   console.log("BSC", bsc);

//     //   // invoke method on bsc e.g.
//     //   await web3Client.activate();
//     //   console.log("activate")



//     //   const acc = await bsc.getAccount();
//     //  console.log(acc);

//     //   const id = await bsc.getChainId();
//     //   console.log(id);

//     //   console.log("logout");
//     //   await bsc.deactivate();
                     

//     // }


//     //  else {
//     //       //  Create WalletConnect Provider
//     //       const provider = new WalletConnectProvider({

//     //         rpc: {
//     //           1 : "https://bsc-dataseed.binance.org/",
//     //           56: "https://bsc-dataseed.binance.org/",
//     //           97: "https://data-seed-prebsc-1-s1.binance.org:8545"
//     //         },

//     //       });

        
//     //    console.log(provider);

//     //    console.log("Provider TYPE",typeof(provider));

//     //   //  Enable session (triggers QR Code modal)
//     //     await provider.enable();

//     //     const web3Client = new Web3(provider);
        

//     //     // // Subscribe to accounts change
//     //     //   provider.on("accountsChanged", (accounts: string[]) => {
//     //     //     console.log(accounts);
//     //     //   });

//     //     //   // Subscribe to chainId change
//     //     //   provider.on("chainChanged", (chainId: 97) => {
//     //     //     console.log(chainId);
//     //     //   });

//     //     //   // Subscribe to session disconnection
//     //     //   provider.on("disconnect", (code: 100, reason: string) => {
//     //     //     console.log(code, reason);
//     //     //   });
//     //     var id = await web3Client.eth.net.getId();

  
//     //     console.log("networkid",id);

//     //     // Close provider session
//     //   // await provider.disconnect()
         
//     //      if (id == 56){
//     //       return web3Client;
//     //     }
//     //     else
//     //     {
//     //       await provider.disconnect()
//     //       swal("Invalid Network, Please Switch to Binance network");
//     //       // window.reload();
//     //     }
//     //     //  alert("Invalid Network",id);
     
//      }
//     }
    
  

//   else {

//     alert("You have to connect with", loginType);
  
//   }

// };





// Claim BNB API
























const claimBNB = async (web3) => {
  
    console.log("Claim BNB called => " ,web3);
    var contractABI =  LMabi ;
    var contractAddress ="0x58980C72b67e1819356ba5a3Ee352dBb7e11Cd08";
    const contract = new web3.eth.Contract(contractABI,contractAddress);
    
    const data = contract.methods.claimBNBReward();
    const account = await web3.eth.getAccounts();
    const gas = await data.estimateGas({from: account[0]});
    const gasPrice = await web3.eth.getGasPrice();
    var tx = {
      from:account[0],
      to: contractAddress,
      data: data.encodeABI(),
      gasPrice: web3.utils.toHex(gasPrice),
      gasLimit: web3.utils.toHex(gas+10000),
    };  
    return new Promise((resolve,reject) => {
      web3.eth.sendTransaction(tx).on("transactionHash", (hash, err) => {
        if (!err) {
          console.log("HASH",hash);
          //resolve(hash);
        } else {
          console.log("1",err);
          reject(err);
        }
      }).on('confirmation', function(confirmationNumber, receipt){ resolve(receipt); })
      .on('error', function(err){
        console.log("2",err)
        reject(err)
      });
    });
  };





// Disruptive Transfer API

const disruptiveTransfertokens = async (web3,recipient,value) => {
 
    console.log("Disruptive Transfer called => " ,web3,recipient,value);

    var contractABI =  LMabi ;
    var contractAddress ="0x58980C72b67e1819356ba5a3Ee352dBb7e11Cd08";
    
    const contract = new web3.eth.Contract(contractABI,contractAddress);
 
    console.log("value",value);
    

    var amount = web3.utils.toWei(value,"ether")
    
    var transferamount = amount.slice(0, -9);

    const data = contract.methods.disruptiveTransfer( recipient, transferamount);
    const account = await web3.eth.getAccounts()

    
    // const gas = await data.estimateGas({from: account[0]});

    // console.log("gas",gas);

    const gasPrice = await web3.eth.getGasPrice();
    
    var tx = {
      from:account[0],
      to: contractAddress,
      data: data.encodeABI(),
      gasPrice: web3.utils.toHex(gasPrice),
      gasLimit: web3.utils.toHex(800000),
      value: web3.utils.toHex(web3.utils.toWei("1","ether"))
    };  

    return new Promise((resolve,reject) => {
      web3.eth.sendTransaction(tx).on("transactionHash", (hash, err) => {
        if (!err) {

          console.log("HASH",hash);
          //resolve(hash);
        } else {
          console.log("1",err);
          reject(err);
        }
      }).on('confirmation', function(confirmationNumber, receipt){ resolve(receipt); })
      .on('error', function(err){
        console.log("2",err);
        reject(err)
      });
    });
  };



/////////////////
//////////////
///////
///           SMALL INVESTOR BNB POOL
//////
//////////////
////////////////

// claim
const claimextraBNB = async (web3) => {
  
  console.log("Claim extra BNB called => " ,web3);
  var contractABI =  POOLabi ;
  var contractAddress = "0x19a8B617a86711E5eEA3eBaF55c753447a96478b";
  const contract = new web3.eth.Contract(contractABI,contractAddress);
  
  const data = contract.methods.claimextraBNB();
  const account = await web3.eth.getAccounts();
  const gas = await data.estimateGas({from: account[0]});
  const gasPrice = await web3.eth.getGasPrice();
  var tx = {
    from:account[0],
    to: contractAddress,
    data: data.encodeABI(),
    gasPrice: web3.utils.toHex(gasPrice),
    gasLimit: web3.utils.toHex(gas+10000),
  };  
  return new Promise((resolve,reject) => {
    web3.eth.sendTransaction(tx).on("transactionHash", (hash, err) => {
      if (!err) {
        console.log("HASH",hash);
        //resolve(hash);
      } else {
        console.log("1",err);
        reject(err);
      }
    }).on('confirmation', function(confirmationNumber, receipt){ resolve(receipt); })
    .on('error', function(err){
      console.log("2",err)
      reject(err)
    });
  });
};





/////////////////
//////////////
///////
///           HODL SPINNING WHEEL
//////
//////////////
////////////////


// tryyourluck
// freeSpin


// Normal Wheel 

const spinningwheel = async (web3,wheelno,value) => {
  
  console.log("Spinning wheel=> " ,web3);
  console.log(wheelno,value);
  
  var contractABI =  HODLwheelabi ;
  var contractAddress = "0xAE09b6b72B05eF8160Fb87C16301BE7Ce21151Dd";
  const contract = new web3.eth.Contract(contractABI,contractAddress);
 

  var amount = web3.utils.toWei(value.toString(),"ether")
    
  var investamount = amount.slice(0, -9);

  
  
  const data = contract.methods.tryyourluck(wheelno,investamount);
  const account = await web3.eth.getAccounts();
  const gas = await data.estimateGas({from: account[0]});
  const gasPrice = await web3.eth.getGasPrice();
  var tx = {
    from:account[0],
    to: contractAddress,
    data: data.encodeABI(),
    gasPrice: web3.utils.toHex(gasPrice),
    gasLimit: web3.utils.toHex(gas+10000),
  };  
  return new Promise((resolve,reject) => {
    web3.eth.sendTransaction(tx).on("transactionHash", (hash, err) => {
      if (!err) {
        console.log("HASH",hash);
        //resolve(hash);
      } else {
        console.log("1",err);
        reject(err);
      }
    }).on('confirmation', function(confirmationNumber, receipt){ 
      
      resolve(receipt); })
    .on('error', function(err){
      console.log("2",err)
      reject(err)
    });
  });
};


// Free Spin wheel

const freespinningwheel = async (web3) => {
  
  console.log("Spinning wheel=> " ,web3);
  var contractABI =  HODLwheelabi ;
  var contractAddress = "0xAE09b6b72B05eF8160Fb87C16301BE7Ce21151Dd";
  const contract = new web3.eth.Contract(contractABI,contractAddress);
  

  const data = contract.methods.freeSpin();
  const account = await web3.eth.getAccounts();
  const gas = await data.estimateGas({from: account[0]});
  const gasPrice = await web3.eth.getGasPrice();
  var tx = {
    from:account[0],
    to: contractAddress,
    data: data.encodeABI(),
    gasPrice: web3.utils.toHex(gasPrice),
    gasLimit: web3.utils.toHex(gas+10000),
  };  
  return new Promise((resolve,reject) => {
    web3.eth.sendTransaction(tx).on("transactionHash", (hash, err) => {
      if (!err) {
        console.log("HASH",hash);
        //resolve(hash);
      } else {
        console.log("1",err);
        reject(err);
      }
    }).on('confirmation', function(confirmationNumber, receipt){ resolve(receipt); })
    .on('error', function(err){
      console.log("2",err)
      reject(err)
    });
  });
};



// Claim Rewards
const claimgamerewards = async (web3) => {
  
  console.log("Claim rewards called=> " ,web3);
  var contractABI =  HODLwheelabi ;
  var contractAddress = "0xAE09b6b72B05eF8160Fb87C16301BE7Ce21151Dd";
  const contract = new web3.eth.Contract(contractABI,contractAddress);
  

  const data = contract.methods.claim();
  const account = await web3.eth.getAccounts();
  const gas = await data.estimateGas({from: account[0]});
  const gasPrice = await web3.eth.getGasPrice();
  var tx = {
    from:account[0],
    to: contractAddress,
    data: data.encodeABI(),
    gasPrice: web3.utils.toHex(gasPrice),
    gasLimit: web3.utils.toHex(gas+10000),
  };  
  return new Promise((resolve,reject) => {
    web3.eth.sendTransaction(tx).on("transactionHash", (hash, err) => {
      if (!err) {
        console.log("HASH",hash);
        //resolve(hash);
      } else {
        console.log("1",err);
        reject(err);
      }
    }).on('confirmation', function(confirmationNumber, receipt){ resolve(receipt); })
    .on('error', function(err){
      console.log("2",err)
      reject(err)
    });
  });
};








// const approve = async (web3,amount) => {
//   console.log("tokens Approve called => " ,web3,amount);
  
//   const GemStoneABI = [{"constant":true,"inputs":[],"name":"name","outputs":[{"name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"spender","type":"address"},{"name":"value","type":"uint256"}],"name":"approve","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"totalSupply","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"teamAddress","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[],"name":"pauseLimit","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"from","type":"address"},{"name":"to","type":"address"},{"name":"value","type":"uint256"}],"name":"transferFrom","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"toBurn","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"value","type":"uint256"}],"name":"findFivePercent","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[],"name":"unpauseLimit","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"decimals","outputs":[{"name":"","type":"uint8"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"spender","type":"address"},{"name":"addedValue","type":"uint256"}],"name":"increaseAllowance","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"totalBurn","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"limitPaused","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"","type":"address"}],"name":"isWhiteListed","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"owner","type":"address"}],"name":"balanceOf","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"burnAddress","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"airdropAddress","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"nextBurnTime","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_liquidityUser","type":"address"}],"name":"addLiquidityAddress","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"symbol","outputs":[{"name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"exchangeAddress","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"spender","type":"address"},{"name":"subtractedValue","type":"uint256"}],"name":"decreaseAllowance","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"marketingAddress","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"contractTime","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"to","type":"address"},{"name":"value","type":"uint256"}],"name":"transfer","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"maxBurnLimit","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"totalRelease","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_liquidityUser","type":"address"}],"name":"removeLiquidityAddress","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"receivers","type":"address[]"},{"name":"amount","type":"uint256"}],"name":"airdrop","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"basePercent","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"monthlyBurn","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"owner","type":"address"},{"name":"spender","type":"address"}],"name":"allowance","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"_maker","type":"address"}],"name":"getLiquidityStatus","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[],"name":"monthlyTokenBurn","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"releaseStartTime","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"transferLimit","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"inputs":[],"payable":true,"stateMutability":"payable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":true,"name":"from","type":"address"},{"indexed":true,"name":"to","type":"address"},{"indexed":false,"name":"value","type":"uint256"}],"name":"Transfer","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"owner","type":"address"},{"indexed":true,"name":"spender","type":"address"},{"indexed":false,"name":"value","type":"uint256"}],"name":"Approval","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"name":"_user","type":"address"}],"name":"AddedWhiteList","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"name":"_user","type":"address"}],"name":"RemovedWhiteList","type":"event"},{"anonymous":false,"inputs":[],"name":"Pause","type":"event"},{"anonymous":false,"inputs":[],"name":"Unpause","type":"event"}];
//   var GemStoneContractAddress = "0x0bF21793bB8f048Efe08E6369688d415dA1c5300";
//   var contractAddress ="0x8103443085c415db8cB4C0B61b94312cC926A562";
//     var amount = 10000000000;
//     const contract = new web3.eth.Contract(GemStoneABI,GemStoneContractAddress);
//     var value = web3.utils.toWei(amount.toString(), "ether");
//     const data = contract.methods.approve(contractAddress,value);
//     const account = await web3.eth.getAccounts()
//     const gas = await data.estimateGas({from: account[0]});
//     const gasPrice = await web3.eth.getGasPrice();
//     var tx = {
//       from:account[0],
//       to: GemStoneContractAddress,
//       data: data.encodeABI(),
//       gasPrice: web3.utils.toHex(gasPrice),
//       gasLimit: web3.utils.toHex(gas+10000),
//     };
//     return new Promise((resolve) => {
//       web3.eth.sendTransaction(tx).on("transactionHash", (hash, err) => {
//         if (!err) {
//           resolve(hash);
//         } else {
//           console.log(err);
//           alert(err);
//         }
//       });
//     });
//   };











  const contractService = {
    getWeb3Client,
    claimBNB,
    disruptiveTransfertokens,
    claimextraBNB,
    spinningwheel,
    freespinningwheel,
    claimgamerewards,
   // approve,
  };
  
  export default contractService;

  