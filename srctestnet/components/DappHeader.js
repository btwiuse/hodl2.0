import logo from '../images/logo.png'
import React,{Component} from 'react'
import Web3 from 'web3'
import LMabi from '../shared/LMabi.json'
import contractService from '../shared/LMcontractservice'
import { Button, Modal, ModalHeader, ModalBody } from 'reactstrap';
import HeroImage from '../images/hero-img.png'

import Metamask from '../images/MetaMask.png'
import TrustWallet from '../images/trust.png'
import Safepal from '../images/safepal.jpg'
import TP from '../images/tokenpocket.png'
import BSC from '../images/bscw.png'
import BCW from '../images/BinanceChainWallet.jpeg'
import MW from '../images/MathWallet.jpeg'
import WC from '../images/wc.png'

import swal from 'sweetalert';

import {parse, stringify} from 'flatted';
import WalletConnectProvider from "@walletconnect/web3-provider";
import Web3Modal from "web3modal";

export class DappHeader extends Component {

  constructor(props) {
    super(props);

    this.state = {
        wallet: "",
        address: "",
    };

    
  };


  logoutUser = async () => {
    

     if (window.sessionStorage.getItem("walletName") == "walletconnect") {

       const provider = new WalletConnectProvider({

         rpc: {
           1 : "https://bsc-dataseed.binance.org/",
           56: "https://bsc-dataseed.binance.org/",
           97: "https://data-seed-prebsc-1-s1.binance.org:8545"
         },

       });

    
      // //  console.log(provider);
        await provider.disconnect();
 
      }

      // const providerOptions = {
      //   walletconnect: {
      //   package: WalletConnectProvider, // required
      //   options: {
      //     infuraId: "27e484dcd9e3efcfd25a83a78777cdf1" , // required
        
      //     rpc: {
      //                 1 : "https://bsc-dataseed.binance.org/",
      //                 56: "https://bsc-dataseed.binance.org/",
      //                 97: "https://data-seed-prebsc-1-s1.binance.org:8545"
      //     },  
      //   }
      // }
      //  };
      //  const web3Modal = new Web3Modal({
      // disableInjectedProvider: true ,
      // network: "mainnet", // optional
      // cacheProvider: true, // optional
      // providerOptions // required
      //    });

        
      //   await web3Modal.clearCachedProvider();


 

  // };


  localStorage.removeItem("provider");
  window.sessionStorage.removeItem("walletAddress");
  window.sessionStorage.removeItem("walletName");
   
   window.location.reload(); 


}

  requestAuth = async () => {
    
    try {
        console.log("Metamask auth requested");

        localStorage.setItem("loginType", "metamask");
        
        const web3 = await contractService.getWeb3Client();
       // const accounts = await web3.eth.getAccounts();
       await this.userLogin(web3);

    } 
    catch (e) {
        console.error(e);
    }
  };
 

 
 
  walletconnect = async () => {
    
    try {
        console.log("walletconnect auth requested");
       
        localStorage.setItem("loginType", "walletconnect");
        
        const web3 = await contractService.getWeb3Client();
      
       await this.userLogin(web3);
    }
      
     catch (e) {
        console.error(e);
    }
  };


  requestAuthBSC = async () => {
     
    try {
      console.log("Metamask auth requested");

      localStorage.setItem("loginType", "binance");
      
      const web3 = await contractService.getWeb3Client();
    // const accounts = await web3.eth.getAccounts();
    // console.log(accounts[0]);
    await this.userLogin(web3); 
    // await this.userLogin(web3);
    // window.location.reload();
  } 
  catch (e) {
      console.error(e);
  }
};


   
  requestAuthBSCWallet = async () => {

     
    try {
        console.log("bscwallet auth requested");
       
        localStorage.setItem("loginType", "bsc");
        
      const web3 = await contractService.getWeb3Client();
      
       await this.userLogin(web3);

    }
     catch (e) {

        console.error(e);
    }

  }; 



 


 
   userLogin = async (web3) => {
    
    const accounts = await web3.eth.getAccounts();
    const providerName = localStorage.getItem("loginType");
    let loginType = localStorage.getItem("loginType");
    
    const networkId = await web3.eth.net.getId();

    console.log('User login params => ',accounts, networkId);
    window.sessionStorage.setItem("walletAddress", accounts[0]);
    window.sessionStorage.setItem("walletName", providerName);

     window.location.reload(); 
    
  };


 
  render() 
  {

     let connect_button;
     let logout_button;
     this.wallet = window.sessionStorage.getItem("walletName");
     this.address = window.sessionStorage.getItem("walletAddress");
     
     console.log(this.wallet,this.address);
     
      
     if (this.address) {

      connect_button = <a type="button" class="btn btn-primary get-started-btn scrollto address" >{this.address}</a>
      logout_button = <a onClick={this.logoutUser}  type="button" class="btn btn-primary get-started-btn scrollto address" >Logout</a>  
      var showlogout = true;    
    } 

      else 

      {
       connect_button = <a href="#about"  type="button" class="btn btn-primary get-started-btn scrollto" data-toggle="modal" data-target="#exampleModalCenter">Connect</a>
       var showlogout = false; 
      }


    return (
    <div>

    <header id="header" className="fixed-top ">
    <div className="container d-flex login-logut align-items-center ">
      <a href="/" className="logo mr-auto"><img src={logo} alt="" className="img-fluid" /></a>

        {/* <a href="/guide" className="get-started-btn scrollto">Guide</a> */}
          {connect_button}
          {showlogout && logout_button }
        </div> 
        </header>

        <div className="modal fade" id="exampleModalCenter" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
  <div className="modal-dialog modal-dialog-centered modal-connect" role="document">
    <div className="modal-content modal-content-custom">
      <div className="modal-body connect-body text-center">
        <div class="connect-header">
            <div class="connect-flex connect-header-title">
                <h5 color="text" class="sc-gtsrHT sc-bCwfaz itNBpW kcUtoS">Connect to a wallet</h5>
            </div>
            <button class="sc-hKFxyN  sc-eCApnc connect-label-btn fAYopv" aria-label="Close the dialog" scale="md">
                <svg viewBox="0 0 24 24" color="primary" width="20px" xmlns="http://www.w3.org/2000/svg" class="sc-bdnxRM connect-close-btn">
                
                <path d="M18.3 5.70997C17.91 5.31997 17.28 5.31997 16.89 5.70997L12 10.59L7.10997 5.69997C6.71997 5.30997 6.08997 5.30997 5.69997 5.69997C5.30997 6.08997 5.30997 6.71997 5.69997 7.10997L10.59 12L5.69997 16.89C5.30997 17.28 5.30997 17.91 5.69997 18.3C6.08997 18.69 6.71997 18.69 7.10997 18.3L12 13.41L16.89 18.3C17.28 18.69 17.91 18.69 18.3 18.3C18.69 17.91 18.69 17.28 18.3 16.89L13.41 12L18.3 7.10997C18.68 6.72997 18.68 6.08997 18.3 5.70997Z"></path>
                </svg>
            </button>
        </div>
        
        <div className="connect-pad-list connect-pad-list-top connect-flex connect-list-direction">
          <a onClick={this.requestAuth} class="link-effect"> 
            <button class="connect-list-btn connect-wallet-label" width="100%" id="wallet-connect-metamask"
           scale="md" >
              <div color="primary" class="sc-gtsrHT bGLBCp">Metamask</div>
              <img class="connect_wallet_img" src={Metamask} />
            </button>
          </a>
        </div>

        <div className="connect-pad-list connect-flex connect-list-direction">
          <a onClick={this.requestAuth} class="link-effect"> 
            <button class="connect-list-btn connect-wallet-label" width="100%" id="wallet-connect-metamask"
           scale="md" >
              <div color="primary" class="sc-gtsrHT bGLBCp">Trust Wallet</div>
              <img class="connect_wallet_img" src={TrustWallet} />
            </button>
          </a>
        </div>

        <div className="connect-pad-list connect-flex connect-list-direction">
          <a onClick={this.requestAuth} class="link-effect"> 
            <button class="connect-list-btn connect-wallet-label" width="100%" id="wallet-connect-metamask"
           scale="md" >
              <div color="primary" class="sc-gtsrHT bGLBCp">SafePal Wallet</div>
              <img class="connect_wallet_img" src={Safepal} />
            </button>
          </a>
        </div>
        <div className="connect-pad-list  connect-flex connect-list-direction">
          <a onClick={this.requestAuth} class="link-effect"> 
            <button class="connect-list-btn connect-wallet-label" width="100%" id="wallet-connect-metamask"
           scale="md" >
              <div color="primary" class="sc-gtsrHT bGLBCp">TokenPocket Wallet</div>
              <img class="connect_wallet_img" src={TP} />
            </button>
          </a>
        </div>
        <div className="connect-pad-list  connect-flex connect-list-direction">
          <a onClick={this.requestAuth} class="link-effect"> 
            <button class="connect-list-btn connect-wallet-label" width="100%" id="wallet-connect-metamask"
           scale="md" >
              <div color="primary" class="sc-gtsrHT bGLBCp">Math Wallet</div>
              <img class="connect_wallet_img" src={MW} />
            </button>
          </a>
        </div>
        <div className="connect-pad-list connect-pad-list-bottom connect-flex connect-list-direction">
          <a onClick={this.requestAuthBSCWallet} class="link-effect"> 
            <button class="connect-list-btn connect-wallet-label" width="100%" id="wallet-connect-metamask"
           scale="md" >
              <div color="primary" class="sc-gtsrHT bGLBCp">Binance Chain Wallet</div>
              <img class="connect_wallet_img" src={BCW} />
            </button>
          </a>
        </div>
    
        <div className="connect-pad-list connect-pad-list-bottom connect-flex connect-list-direction">
          <a onClick={this.walletconnect} class="link-effect"> 
            <button class="connect-list-btn connect-wallet-label" width="100%" id="wallet-connect-metamask"
           scale="md" >
              <div color="primary" class="sc-gtsrHT bGLBCp">Wallet Connect</div>
              <img class="connect_wallet_img" src={WC} />
            </button>
          </a>
        </div>
            
      </div>
    </div>
  </div>
</div>



  </div>
  );
  }
}

export default DappHeader;

