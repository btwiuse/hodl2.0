import React,{useEffect,useState} from 'react';
import $ from 'jquery';
import logo from '../images/logo.png'
import HeroImage from '../images/hero-img.png'
import Icon3 from '../images/icons/3.png'
import Icon8 from '../images/icons/8.png'
import Icon1 from '../images/icons/1.png'
import Icon2 from '../images/icons/2.png'
import Icon11 from '../images/icons/11.png'
import Icon4 from '../images/icons/4.png'
import CoinGecko from 'coingecko-api'
import Web3 from 'web3'
import LMabi from '../shared/LMabi.json'
import POOLabi from '../shared/POOLabi.json'

import contractService from '../shared/LMcontractservice'
import { Confirm } from 'react-st-modal';
import swal from 'sweetalert'; 
import IconWarning from '../images/icons/warning.png'
import Functions from '../functions';
import AnimatedNumber from "animated-number-react";
import swalreact from '@sweetalert/with-react'

import Wheel from './wheel';
// import Wheel from './wheel/index.js'
// import './wheel/index.css';

function Dashboard(){

  const [maxTransactionAmount,setmaxTransactionAmount] = useState(0);
  const [TotalbnbinrewardPool,setTotalbnbinrewardPool] = useState(0);
  const [LMbalanceLPpool,setLMbalanceLPpool] = useState(0);
  const [oneBNBprice,setoneBNBprice] = useState(0);
  const [LPbnb,setLPbnb] = useState(0);
  const [circulatingSupply,setcirculatingSupply] = useState(0);
  const [LMBalanceuser,setLMBalanceuser] = useState(0);
  const [bnbreward,setbnbreward] = useState(0);
  const [nextAvailableclaim,setnextAvailableclaim] = useState(0);
  const [user,setUser] = useState(false);
  const [address,setaddress] = useState("");
  const [value,setValue] = useState(0);
  const [previousbnbreward,setpreviousbnbreward] = useState(0);
  

  // newBNBPOOL 
  const [extrabnbreward,setextrabnbreward] = useState(0);
  const [TotalbnbinextrarewardPool,setTotalbnbinextrarewardPool] = useState(0);
  const [startTime,setstartTime] = useState(0);
  const [endTime,setendTime] = useState(0);
  const [intervals,setIntervals] = useState(0);
  const [multiplier,setmultiplier] = useState(0);
  const [gasfees,setGasfees] = useState(0);
  const [collectiontime,setcollectiontime] = useState(startTime);
  const [campaignstatus, setcampaignstatus] = useState(false);
  const [campaignid,setcampaignid] = useState(0);
  const [feesnabled,setfeesenabled] = useState("Yes");
  const [startbalance,setstartbalance] = useState(0);
  const [endbalance,setendbalance] = useState(0);

  const [places, setPlaces] = useState(['0.5x', '0.5x', '1x', '1x', '0x', '1.5x'])
  const [riskvalue, setriskvalue] = useState('1');



  function web3apis() {
      

    let address = window.sessionStorage.getItem("walletAddress");

    const web3 = new Web3('https://data-seed-prebsc-1-s1.binance.org:8545');
    // const web3 = new Web3('https://bsc-dataseed1.binance.org:443');

    var contractABI = LMabi;
    var contractAddress ="0x58980C72b67e1819356ba5a3Ee352dBb7e11Cd08";
    var contract = new web3.eth.Contract(contractABI,contractAddress);

 
    // var contractABIPool = POOLabi;
    // var contractAddressPool ="0x19a8B617a86711E5eEA3eBaF55c753447a96478b";
    // var contractPool = new web3.eth.Contract(contractABIPool,contractAddressPool);


    // contractPool.methods.getBNBrewardshare(address).call().then(balance => {
    //     ////console.log()(balance);
    //     var tokens = web3.utils.toBN(balance).toString();
    //     setbnbrewardshare( web3.utils.fromWei(tokens, 'ether'))
    //     }
    //     )


   console.log("hi");

    contract.methods._maxTxAmount().call().then(amount => {
    // console.log(amount);
      var gwei = web3.utils.toBN(amount).toString();
      var tokens = web3.utils.toWei(gwei,"Gwei");
      setmaxTransactionAmount(web3.utils.fromWei(tokens, 'ether'))
      }
      )


     // get BNB balance of reward POOl  
     web3.eth.getBalance("0x58980C72b67e1819356ba5a3Ee352dBb7e11Cd08")
     .then(balance => {
         ////console.log()(balance);
         var tokens = web3.utils.toBN(balance).toString();
         setTotalbnbinrewardPool(web3.utils.fromWei(tokens, 'ether'))
           
     });


   // get TotalBNB in liquidity Pool 
     var wrappednBNBABI = [{"constant":true,"inputs":[{"name":"","type":"address"}],"name":"balanceOf","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"}];
     var wrappedBNBcontractAddress = "0xae13d989dac2f0debff460ac112a837c89baa7cd";
     
     var wrappedBNBcontract = new web3.eth.Contract(wrappednBNBABI,wrappedBNBcontractAddress);   
     
     wrappedBNBcontract.methods.balanceOf("0xb86B847bb093b0761de90162F8d093E091B96F2a").call().then(balance => {
         
         var tokens = web3.utils.toBN(balance).toString();
         setLPbnb( web3.utils.fromWei(tokens, 'ether'))
         //console.log()("lpbnb",LPbnb);
        }
         )


     // get LM token in LP 

     contract.methods.balanceOf("0xb86B847bb093b0761de90162F8d093E091B96F2a").call().then(balance => {
        ////console.log()(balance);
        var gwei = web3.utils.toBN(balance).toString();
        var tokens = web3.utils.toWei(gwei,"Gwei");
        setLMbalanceLPpool( web3.utils.fromWei(tokens, 'ether'))
    
        }
        )    
   
      

     //  circulating Supply LM token   
     contract.methods.balanceOf("0x000000000000000000000000000000000000dEaD").call().then(balance => {
        ////console.log()(balance);
        var gwei = web3.utils.toBN(balance).toString();
        var tokens = web3.utils.toWei(gwei,"Gwei");
        var csupply = Number(1000000000000000) - Number((web3.utils.fromWei(tokens, 'ether')));
        setcirculatingSupply(  csupply)
        }
        )


     // fetch latest 1 BNB price
        const CoinGeckoClient = new CoinGecko();
       // fetch price of 1 BNB
       CoinGeckoClient.simple.price({
        ids: ['binancecoin'],
        vs_currencies: ['usd'],
     }).then(data => {
      setoneBNBprice( data.data.binancecoin.usd)
     })


    // LM BALANCE user
     contract.methods.balanceOf(address).call().then(balance => {
     ////console.log()(balance);
     var gwei = web3.utils.toBN(balance).toString();
     var tokens = web3.utils.toWei(gwei,"Gwei");
     setLMBalanceuser( web3.utils.fromWei(tokens, 'ether'))
       }
         )


      contract.methods.calculateBNBReward(address).call().then(balance => {
      ////console.log()(balance);
      var tokens = web3.utils.toBN(balance).toString();
      setbnbreward( web3.utils.fromWei(tokens, 'ether'))
      }
      )



     // next Available Claim Date API

      contract.methods.nextAvailableClaimDate(address).call().then(time => {  
          ////console.log()(time);
          setnextAvailableclaim( time)
           if (time == 0) {
               setUser(true)
           }

          }
          )    
    

   }


  function web3apisBNBPool() 
  
  {
   
  
    
   console.log("hlo");
    let address = window.sessionStorage.getItem("walletAddress");

    const web3 = new Web3('https://data-seed-prebsc-1-s1.binance.org:8545');
  

    var contractABIPool = POOLabi;
    var contractAddressPool ="0x19a8B617a86711E5eEA3eBaF55c753447a96478b";
    var contractPool = new web3.eth.Contract(contractABIPool,contractAddressPool);


    //// get total bnb of user which can be claimed 
    contractPool.methods.getBNBrewardshare(address).call().then(balance => {
        // console.log("extrareward",balance);
        var tokens = web3.utils.toBN(balance).toString();
        setextrabnbreward( web3.utils.fromWei(tokens, 'ether'))
        }
        )


    // get total BNB balance of reward POOL 
    web3.eth.getBalance("0x19a8B617a86711E5eEA3eBaF55c753447a96478b")
        .then(balance => {
            ////console.log()(balance);
            var tokens = web3.utils.toBN(balance).toString();
            setTotalbnbinextrarewardPool(web3.utils.fromWei(tokens, 'ether'))
              
        });

    // contractPool.methods.getPoolBalance().call().then(balance => {
    //     console.log("poolbalance",balance);
    //     var tokens = web3.utils.toBN(balance).toString();
    //     setTotalbnbinextrarewardPool( web3.utils.fromWei(tokens, 'ether'))
    //     }
    //     )
    




 
    //// retrieve current campaignID
    contractPool.methods.campaignID().call().then (id => {
    //  console.log("id",id)
        setcampaignid(id);
       
        
    })


    //// get StartTime of the Campaign
    contractPool.methods.startcampaign().call().then(startTime => {

        // console.log("starttime ",startTime);

        setstartTime(startTime);
        setcollectiontime(startTime);
    }) 

    
    //// get StopTime of the Campaign 
    contractPool.methods.stopcampaign().call().then(startTime => {

        setendTime(startTime);
    })


    //// get current Interval of the Campaign
    contractPool.methods.rewardCycleBlock().call().then(cycle => {
       
        setIntervals(cycle);
    })


    //// get current multiplier
    contractPool.methods.multiplier().call().then(multiplier => {

        setmultiplier(multiplier);
    })




    //// get Current Fees
    contractPool.methods.fees().call().then(amount => {
        ////console.log()(amount);
   
        var tokens = web3.utils.toBN(amount).toString();
        if (Number(tokens)>0){
            setfeesenabled("Yes")   
        }
        else{
            setfeesenabled("No") 
        }
        setGasfees(web3.utils.fromWei(tokens, 'ether'))
    }) 



    //// get next collectable Time
    
    contractPool.methods.nextClaimDate(address).call().then(time => {


    if (Number(time) > 0){

    
        setcollectiontime(time);
    }    

    })

   



    //// get current Status of the Campaign
    contractPool.methods.checkCampaignStatus().call().then(value => {

        setcampaignstatus(value);    
    })
    

    contractPool.methods.endlimit().call().then(amount => {
        //  console.log("bal",amount);
          var gwei = web3.utils.toBN(amount).toString();
          var tokens = web3.utils.toWei(gwei,"Gwei");
          setendbalance(web3.utils.fromWei(tokens, 'ether'))
          console.log("startlimit", startbalance);
          
          }
          
          )

    
    contractPool.methods.startlimit().call().then(amount => {
        // console.log(amount);
        var gwei = web3.utils.toBN(amount).toString();
        var tokens = web3.utils.toWei(gwei,"Gwei");
        setstartbalance(web3.utils.fromWei(tokens, 'ether'))
        console.log("startlimit", startbalance);
        }
        )      

//    //// get user total earning
//     contractPool.methods.userearning(address).call().then(balance => {
        
//         var tokens = web3.utils.toBN(balance).toString();
//         setextrabnbreward( web3.utils.fromWei(tokens, 'ether'))
        
//     })

   }



  async function submitform(){
  
    ////console.log()(address);
    ////console.log()(value);

    const web3 = await contractService.getWeb3Client()
       
   
    if (value == '' || value == 0 )
   {
    const isConfirm =  Confirm(
      'Please enter Value',
      
    );
    
    }


   else if (address == '' ) {

    const isConfirm =  Confirm(
      'Please Enter recepient address',
      
    );

   }

   else  {

    if (web3) 
    {
    
     try {

        const txResult = await contractService.disruptiveTransfertokens(
            web3,
            address,
            value,
            );

    const txHash = txResult;
    ////console.log()("Tx Placed => ", txHash);

    //Save transaction 2
    const txDetails = {
     value: value,  
      txHash: txHash,
       transactionType: "Disruptive Transfer", 
      
    };

    //alert("transaction done");
    swal("Transaction done!", "You clicked the button!", "success");
      setTimeout(()=> {window.location.reload()} ,1000); 
    }

    catch
    {
        swal("Transaction Failed!");
    }

     }

     else {

      swal({
        title: 'Change Network to Binance Mainet',
        timer: 3000
        })

         }

        }
   }  


   async function claim(){
  
    var bnb = Number(bnbreward);
    // var bnb = a.toFixed(4);
    const web3 = await contractService.getWeb3Client()
     
    if (web3) 

    {
      try {
      
    setpreviousbnbreward(bnbreward);  
      const txResult = await contractService.claimBNB(
      web3
      );
  
      
    console.log("hello",txResult);

      const txHash = txResult;
      ////console.log()("Tx Placed => ", txHash);
  
      //Save transaction 2
      const txDetails = {
       value: value,  
        txHash: txHash,
         transactionType: "Claim Rewards", 
        
      };
  
     await swalreact(
        <div>
       <h3>Awesomeness !!</h3>
       <br></br>
       <h5>You have Successfully Claimed</h5> 
       
         <h5> BNB {bnb.toFixed(4)}</h5>  
      
       { 
       (bnb >= 1) &&  
            <>
            <h6> Wallet: {(bnb* 0.80).toFixed(2)}    |    Charities: {(bnb - (bnb*0.80)).toFixed(2)}  </h6>
            <h6> Congratulations on Contributing Towards Charity !</h6>
           </>
       }    
     
       <br></br>
       <p>Next Collection Date: {new Date(nextAvailableclaim* 1000).toLocaleString("en-US",{weekday: "long"})}, {new Date(nextAvailableclaim* 1000).toLocaleString("en-US",{month: "long"})} {new Date(nextAvailableclaim* 1000).toLocaleString("en-US",{day: "numeric"})}, {new Date(nextAvailableclaim* 1000).toLocaleString("en-US",{year: "numeric"})}  {new Date(nextAvailableclaim * 1000).toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true })}</p>
       <p>Support Us By Sharing Now !!</p>
       <br></br>
       <br></br>
         <img src={logo} alt="" className="img-fluid photo" />  
    
        </div>
    ) 


        // setTimeout(()=> {window.location.reload()} ,10); 
  
       }
       catch {
        swal("Transaction Failed!");
      }

      }
      

       else {
  
        swal({
          title: 'Change Network to Binance Mainet',
          timer: 3000
          })
  
           }               
   }


   async function claimextraBNB(){
  
    var bnb = Number(extrabnbreward);
    // var bnb = a.toFixed(4);
    const web3 = await contractService.getWeb3Client()
     
    if (web3) 

    {
      try {
      
    // setpreviousbnbreward(bnbreward);  
      const txResult = await contractService.claimextraBNB(
      web3
      );
  
      
      const txHash = txResult;
      ////console.log()("Tx Placed => ", txHash);
  
      //Save transaction 2
      const txDetails = {
       value: value,  
        txHash: txHash,
         transactionType: "Claim Rewards", 
        
      };
  
      swalreact(
        <div>
       <h3>Awesomeness !!</h3>
       <br></br>
       <h5>You have Successfully Claimed</h5> 
       
         <h5> BNB {bnb.toFixed(4)}</h5>  
      
       {/* { 
       (bnb >= 1) &&  
            <>
            <h6> Wallet: {(bnb* 0.80).toFixed(2)}    |    Charities: {(bnb - (bnb*0.80)).toFixed(2)}  </h6>
            <h6> Congratulations on Contributing Towards Charity !</h6>
           </>
       }     */}
     
       <br></br>
       <p>Next Collection Date: {new Date(nextAvailableclaim* 1000).toLocaleString("en-US",{weekday: "long"})}, {new Date(nextAvailableclaim* 1000).toLocaleString("en-US",{month: "long"})} {new Date(nextAvailableclaim* 1000).toLocaleString("en-US",{day: "numeric"})}, {new Date(nextAvailableclaim* 1000).toLocaleString("en-US",{year: "numeric"})}  {new Date(nextAvailableclaim * 1000).toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true })}</p>
       <p>Support Us By Sharing Now !!</p>
       <br></br>
       <br></br>
         <img src={logo} alt="" className="img-fluid photo" />  
    
        </div>
    ) 


        setTimeout(()=> {window.location.reload()} ,10000); 
  
       }
       catch {
        swal("Transaction Failed!");
      }

      }
      

       else {
  
        swal({
          title: 'Change Network to Binance Mainet',
          timer: 3000
          })
  
           }               
   }







async function buylink(){

var link = "https://exchange.pancakeswap.finance/#/swap?outputCurrency=0x58980C72b67e1819356ba5a3Ee352dBb7e11Cd08";

    // swal ({ title:"Buy tokens to earn rewards",
    // content: link ,  

    //        })


    swalreact(
        <div>
          <p>Your Current HODL balance is 0</p>  
          <h4>You need HODL Tokens to Earn BNB</h4>
          <br></br>
          {/* <br></br> */}
          <p>
            <a href={link} className="COLLECTION_MONEY bubbly-button">Buy Now!</a> 
          </p>
        </div>
)
}









// // wheel 3 
// wheel[3][1] = 0;
// wheel[3][2] = 250;
// wheel[3][3] = 50;
// wheel[3][4] = 150;
// wheel[3][5] = 100;
// wheel[3][6] = 0;
// wheel[3][7] = 150;
// wheel[3][8] = 100;
// wheel[3][9] = 75;
// wheel[3][10] = 150;
// wheel[3][11] = 0;
// wheel[3][12] = 150;
// wheel[3][13] = 175;
// wheel[3][14] = 50;
// wheel[3][15] = 250;
// wheel[3][16] = 0;

async function riskchange(event) {

    console.log(event.target.value
        );

    setriskvalue(event.target.value);

    if (event.target.value == 1){
        let newarry = ['0.5x', '0.5x', '1x', '1x', '0x', '1.5x']
        setPlaces(newarry);
    }
    else if (event.target.value == 2){
        let newarry = ['0x', '1x', '0.5x', '1.5x', '0x', '0.5x','2X','2.5X']
        setPlaces(newarry);
    }
    else if  (event.target.value == 3){
        let newarry = ['0x', '2.5x', '0.5x', '1.5x', '1x', '0x','1.5X','1X','0.75X','1.5X','0X','1.5X','1.75X','0.5X','2.5X','0X']
        setPlaces(newarry);
    }


  
}





  useEffect(()=>{

    
    web3apis();
    const interval = setInterval(web3apis, 30000);



    web3apisBNBPool();
    const intervalnew = setInterval(web3apisBNBPool, 30000);

    // console.log("intervals", setIntervals);
    
    // //console.log()("User",user);
    //console.log()("")
     

    // var contractABIPool = POOLabi;
    // var contractAddressPool ="0x19a8B617a86711E5eEA3eBaF55c753447a96478b";
    // var contractPool = new web3.eth.Contract(contractABIPool,contractAddressPool);
    
   
    //  if (collectiontime == 0){
    //     setcollectiontime(startTime);
    // }

    // let address = window.sessionStorage.getItem("walletAddress");
    // const web3 = new Web3('https://data-seed-prebsc-1-s1.binance.org:8545');
  

    // var contractABIPool = POOLabi;
    // var contractAddressPool ="0x19a8B617a86711E5eEA3eBaF55c753447a96478b";
    // var contractPool = new web3.eth.Contract(contractABIPool,contractAddressPool);


    // //// get total bnb of user which can be claimed 
    // contractPool.methods.getBNBrewardshare(address).call().then(balance => {
    //     console.log("extrareward",balance);
    //     var tokens = web3.utils.toBN(balance).toString();
    //     setextrabnbreward( web3.utils.fromWei(tokens, 'ether'))
    //     }
    //     )


    Functions();
    $('#auto_modal').modal('show');

    return () => clearInterval(interval,intervalnew);
  }, [])


  
    return ( 
    <>
    <br></br>

    <main id="main">

    
        <section id="services" className="services section-bg section_feature dashboard_page mb-0 pb-0 pt-2">
                <div className="container" data-aos="fade-up">
                    <div className="row">
                        <div className="col-xl-4 col-md-6 d-flex align-items-stretch mt-xl-0" data-aos="zoom-in"
                            data-aos-delay="300">
                            <div className="icon-box">
                                <div className="icon">
                                    <img src={Icon3} />
                                </div>
                                <h5>Max Transaction Amount</h5>
                                <p>$HODL { new Intl.NumberFormat().format(maxTransactionAmount)} </p>
                                {/* <p>$HODL 10,000,000,000,000 </p> */}
                            </div>
                        </div>
                        <div className="col-xl-4 col-md-6 d-flex align-items-stretch mt-md-0" data-aos="zoom-in"
                            data-aos-delay="200">
                            <div className="icon-box">
                                <div className="icon">
                                    <img src={Icon8} />
                                </div>
                                <h5>Total liquidity pool</h5>
                                <p>
                                    {/* $ { new Intl.NumberFormat().format(oneBNBprice * LPbnb * 2 )}   */}
                                    {/* formatValue = value => `$ ${new Intl.NumberFormat().format(value)}`;                     */}
                                    <AnimatedNumber
                                        value={(oneBNBprice * LPbnb * 2 ).toFixed(2)}
                formatValue={(value )=>`$ ${new Intl.NumberFormat().format(value)}`}
                                        duration={300}
                                    />
                                    
                                     </p>
                                
                            </div>
                        </div>
                        <div className="col-xl-4 col-md-6 d-flex align-items-stretch mt-xl-0" data-aos="zoom-in"
                            data-aos-delay="300">
                            <div className="icon-box">
                                <div className="icon">
                                    <img src={Icon1} />
                                </div>
                                <h5>Current 1 mil $HODL Price</h5>
                                <p>
                                    
                            {/* $ { (( Number(1000000) * Number(LPbnb) ) / Number(LMbalanceLPpool)) * oneBNBprice}   */}
                            <AnimatedNumber
                                value={ (( Number(1000000) * Number(LPbnb) ) / Number(LMbalanceLPpool)) * oneBNBprice}
                                formatValue={(value)=> `$ ${value.toFixed(8)}`}
                                duration={300}
                                />    
                            
                            
                            
                            </p>
                            </div>
                        </div>
                        <div className="col-xl-4 col-md-6 d-flex align-items-stretch mt-xl-0" data-aos="zoom-in"
                            data-aos-delay="400">
                            <div className="icon-box">
                                <div className="icon">
                                    <img src={Icon2} />
                                </div>
                                <h5>Total BNB in liquidity pool</h5>
                                <p>
                            {/* BNB {  new Intl.NumberFormat().format(LPbnb)} */}
                            {/* { //console.log()("renderlp",LPbnb) }  */}
                                {/* {LPbnb} */}
                            <AnimatedNumber
                                value={ LPbnb }
                                formatValue={(value)=> `BNB ${new Intl.NumberFormat().format(value)}` }
                                duration={300}
                                />
                                {/* <p>BNB NaN */}
                                </p>
                            </div>
                        </div>
                        <div className="col-xl-4 col-md-6 d-flex align-items-stretch mt-xl-0" data-aos="zoom-in"
                            data-aos-delay="400">
                            <div className="icon-box">
                                <div className="icon">
                                    <img src={Icon11} />
                                </div>
                                <h5>Total BNB in reward pool</h5>
                                <p>
                        {/* BNB {   new Intl.NumberFormat().format(TotalbnbinrewardPool)} */}
                        <AnimatedNumber
                                value={  new Intl.NumberFormat().format(TotalbnbinrewardPool)}
                                formatValue={(value)=> `BNB ${new Intl.NumberFormat().format(value)}` }
                                duration={300}
                                />

                                {/* <p>BNB NaN </p> */}
                                </p>
                            </div>
                        </div>
                        <div className="col-xl-4 col-md-6 d-flex align-items-stretch" data-aos="zoom-in" data-aos-delay="100">
                            <div className="icon-box">
                                <div className="icon">
                                    <img src={Icon4} />
                                </div>
                                <h5>Your $HODL balance</h5>
                                <p>$HODL {   new Intl.NumberFormat().format(LMBalanceuser)}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
         <section id="cta">
           </section>
           {user}
 { !(  (Number(LMBalanceuser) <= Number(endbalance)) && (Number(LMBalanceuser) >= Number(startbalance))  ) &&

        <section id="services" className="services section-bg section_feature dashboard_page mb-0 pb-0 pt-2">
                <div className="container" data-aos="fade-up">
                    <div className="row mt-3">
                        <div className="col-xl-12 col-md-12 d-flex align-items-stretch mt-xl-0" data-aos="zoom-in"
                            data-aos-delay="300">
                            <div className="icon-box">
   
                      <h5>My collectable BNB: {Number(bnbreward).toFixed(5)} BNB  {nextAvailableclaim} </h5>   
 

        <h6 style={{ color: 'DarkCyan' }}>*Forecasted Annual BNB Rewards: {(Number(bnbreward) * 364).toFixed(3)} BNB</h6>           
                                
                                <p>*Pool and Rewards are always changing based on buys, sells, collects by others and your percentage holdings.</p>
                                <br></br>



{ ((!user) && (nextAvailableclaim==0)) &&   <h5 style={{ color: 'red' }}>
  Network Error: Please Try Again Later Or Use a Different Browser  
       </h5> }


    { ((!user) && (nextAvailableclaim!=0)) &&   <h5>
  Next Collect Date: {new Date(nextAvailableclaim* 1000).toLocaleString("en-US",{weekday: "long"})}, {new Date(nextAvailableclaim* 1000).toLocaleString("en-US",{month: "long"})} {new Date(nextAvailableclaim* 1000).toLocaleString("en-US",{day: "numeric"})}, {new Date(nextAvailableclaim* 1000).toLocaleString("en-US",{year: "numeric"})}  {new Date(nextAvailableclaim * 1000).toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true })} 
       </h5> }
     { user && <h5>
        Next Collect Date: You need to Buy and Hold Tokens to Earn BNB
     </h5>  }

    <div className="Collect_MONEY mt-5">



    {
    
    
 ((!user) && (nextAvailableclaim < Math.round(Date.now() / 1000)) && bnbreward > 0) 
  
  ? <a onClick = {claim} className="COLLECTION_MONEY bubbly-button">
    
        Collect my BNB </a> 
        
        :
        
    ((!user) && ((nextAvailableclaim - Math.round(Date.now() / 1000)) > 946684782)) ? 
        <div>
             <p style={{ color: 'red' }}>Your Wallet is Under Zero Balance Punishment!</p>
      <a onClick = {()=> {
          swalreact(
            <div> 
            <h5>Your wallet is under Zero Balance Punishment. This occurs due to selling of all HODL tokens. </h5>
             <h5>
                 <br></br>
              To continue earning BNB rewards please buy HODL tokens or transfer to a New Wallet.     
              </h5>       
                     
         </div>
          )}
                 
          } className="COLLECTION_MONEY bubbly-button">More Information !</a>
        
        </div>
      :
    ((!user) && (nextAvailableclaim > Math.round(Date.now() / 1000)) && bnbreward > 0) ?
        
        
    <a onClick = {()=> {swalreact(
        <div>
        <h5>"Please wait till your collectible date is reached"</h5>
        <p>Your Collectible Date is {  new Date(nextAvailableclaim* 1000).toLocaleString("en-US",{weekday: "long"})}, {new Date(nextAvailableclaim* 1000).toLocaleString("en-US",{month: "long"})} {new Date(nextAvailableclaim* 1000).toLocaleString("en-US",{day: "numeric"})}, {new Date(nextAvailableclaim* 1000).toLocaleString("en-US",{year: "numeric"})}  {new Date(nextAvailableclaim * 1000).toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true })  }</p>
        
        
        </div>
        )}} 
        
        
        className="COLLECTION_MONEY bubbly-button">Collect my BNB </a> :

    ((!user) && ((nextAvailableclaim < Math.round(Date.now() / 1000)) || (nextAvailableclaim > Math.round(Date.now() / 1000))) && bnbreward <= 0 && nextAvailableclaim!=0 )  ? 
     <div>
      <p style={{ color: 'red' }}>Your Wallet is Under Zero Balance Punishment!</p>    
    <a onClick = {()=> {swalreact(<div><h5>You are on Zero HODL balance Punishment, Please buy HODL from new wallet to participate in HODL BNB rewards.</h5></div>)}} className="COLLECTION_MONEY bubbly-button">More Information !</a> 
    
    </div>
    :

    ((!user) && ((nextAvailableclaim == 0)))  ? 
    <div>
     {/* <p style={{ color: 'red' }}>Your Wallet is Under Zero Balance Punishment!</p>     */}
   {/* <a onClick = {()=> {swalreact(<div><h5>You are on Zero HODL balance Punishment, Please buy HODL from new wallet to participate in HODL BNB rewards.</h5></div>)}} className="COLLECTION_MONEY bubbly-button">More Information !</a>  */}
   
   </div>
   :


    <a onClick = {buylink} className="COLLECTION_MONEY bubbly-button">Collect my BNB</a>
      
        }
                              
                           
                      
                                </div>
  <br></br>
{  ((bnbreward) >= 1 ) &&

<p> 20% of reward will be donated towards charity.<a href="https://hodltoken.gitbook.io/hodl/features/charities-collection" target="_blank"> More Info</a> </p>  }


                            </div>
                        </div>                  
                    </div>                 
                </div>
            </section>
           
}




















{ (  (Number(LMBalanceuser) <= Number(endbalance)) && (Number(LMBalanceuser) >= Number(startbalance)) ) &&         

            <section class="bonus_rewards ">
<div class="section-title">
<h2>SMALL INVESTOR REWARDS</h2>
<div>
{/* <h5>Total Reward Pool: {Number(TotalbnbinextrarewardPool).toFixed(2)}</h5> */}
<h5>Your Reward Share: {Number(bnbreward/TotalbnbinrewardPool*100).toFixed(2)} % </h5>
{/* <h5>Your Reward Share: {Number(extrabnbreward/TotalbnbinextrarewardPool*100).toFixed(2)} % </h5> */}
</div>


{/* My BNB {extrabnbreward} */}

</div>
<div class="container bonusreswards" >


<div class="row">
<div class="col-md-6">
<div class="rewars_bonus">



{/* <h5>Start Time: {new Date(startTime* 1000).toLocaleString("en-US",{month: "long"})} {new Date(startTime* 1000).toLocaleString("en-US",{day: "numeric"})}, {new Date(startTime* 1000).toLocaleString("en-US",{year: "numeric"})}  {new Date(startTime * 1000).toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true })}</h5> */}
{/* <h5>End Time: {new Date(endTime* 1000).toLocaleString("en-US",{month: "long"})} {new Date(endTime* 1000).toLocaleString("en-US",{day: "numeric"})}, {new Date(endTime* 1000).toLocaleString("en-US",{year: "numeric"})}  {new Date(endTime * 1000).toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true })}</h5> */}
{/* <h5>Interval: Every {Number(intervals)/60} Mins</h5> */}
<h5 style={{ fontSize: '1.00rem'}} >Reward Multiplier: x{multiplier}</h5>
<h5 style={{ fontSize: '1.00rem'}} >Free Gas Fee: {feesnabled} </h5> 
{/* <h5> CampaignID: {campaignid}</h5> */}
<h5 style={{ fontSize: '1.00rem'}} > Minimum Balance: {startbalance}</h5>
<h5 style={{ fontSize: '1.00rem'}} > Maximum Balance: {endbalance}</h5>
 
<h5 style={{ fontSize: '1.00rem'}} >Next Collection Time: {new Date(collectiontime* 1000).toLocaleString("en-US",{month: "long"})} {new Date(collectiontime* 1000).toLocaleString("en-US",{day: "numeric"})}, {new Date(collectiontime* 1000).toLocaleString("en-US",{year: "numeric"})}  {new Date(collectiontime * 1000).toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true })} </h5> 
</div>
</div>

<div class="col-md-6">
<div class="rewars_bonus">
<h5 style={{ fontSize: '1.00rem'}} >Reward Pool: {Number(TotalbnbinextrarewardPool).toFixed(2)} BNB</h5>
<h5 style={{ fontSize: '1.00rem'}} >My Collectable BNB: {Number(extrabnbreward).toFixed(5)} BNB  </h5>

<br></br>

<a onClick = {claimextraBNB} class="reward_button " data-toggle="modal" data-target="#RewardsButton">Claim BNB</a>
</div>
</div>

{/* <div class="col-md-12">
<div class="rewars_bonus">
<h5>Collection Time:</h5>
</div>
</div> */}

</div>

</div>

</section>

}


<section id="services" className="services section-bg section_feature dashboard_page mb-0 pb-0 pt-2">
                <div className="container" data-aos="fade-up">
                    <div className="row mt-3">
                    <div className="icon-box">

 <select class="form-control dropdown-wheel" value={riskvalue} onChange={(e)=> {riskchange(e)} } >

  <option value="1">Low</option>
  <option value="2">Medium</option>
  <option  value="3">High</option>
  

                </select>

                             <Wheel items={places} risk={riskvalue}/>

                    </div>
                    </div>
                </div>
            </section>


    
    
    </main>
    <a href="#" className="back-to-top"><i className="ri-arrow-up-line"></i></a>
    <div id="preloader"></div>






















    </>
    )


}


export default Dashboard;