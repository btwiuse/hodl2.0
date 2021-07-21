import React from 'react';
import Web3 from 'web3'
import HODLwheelabi from '../../shared/HODLwheelabi.json'
import contractService from '../../shared/LMcontractservice'
import { Confirm } from 'react-st-modal';
import swalreact from '@sweetalert/with-react'
import swal from 'sweetalert'; 

import './index.css';

export default class Wheel extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedItem: null,
      maxBet: 0,
      minBet: 0,
      currentearning: 0,
      totalearning:0,
      invested: 0,
      nextfreespindate:0,
      fees:0,
      newuser:true,
      userInput:0,
      riskvalue:"low",
      open:false
    };
    this.selectItem = this.selectItem.bind(this);
    this.getResult = this.getResult.bind(this);
    this.onInputchange = this.onInputchange.bind(this);
    this.claim = this.claim.bind(this);
    
    // this.onSubmitForm = this.onSubmitForm.bind(this);
  }




  componentDidMount() { 

    const web3 = new Web3('https://data-seed-prebsc-1-s1.binance.org:8545');

     // const web3 = new Web3('https://bsc-dataseed1.binance.org:443');
  

     this.getAPI();

      // set Interval
      this.interval = setInterval(this.getAPI, 50000);
  }


  getAPI = () => 
  
  {
   const web3 = new Web3('https://data-seed-prebsc-1-s1.binance.org:8545');
   // const web3 = new Web3('https://bsc-dataseed1.binance.org:443');

   let address = "0x5025a0ed570AE30E9DEf852C1A7cb7ab09994D2D";
 
   var contractABI =  HODLwheelabi ;
   var contractAddress = "0xAE09b6b72B05eF8160Fb87C16301BE7Ce21151Dd";
   const contract = new web3.eth.Contract(contractABI,contractAddress);
  
    // get MIN BET Amount
      contract.methods.minbet().call().then(amount => {
      
      // //console.log("minbet",amount);
      var gwei = web3.utils.toBN(amount).toString();
      var tokens = web3.utils.toWei(gwei,"Gwei");
       this.setState({ minBet: web3.utils.fromWei(tokens, 'ether')})
      }
      )

    
    // get MAX BET Amount
    contract.methods.maxbet().call().then(amount => {
        // //console.log("maxbet",amount);
        var gwei = web3.utils.toBN(amount).toString();
        var tokens = web3.utils.toWei(gwei,"Gwei");
        this.setState({ maxBet: web3.utils.fromWei(tokens, 'ether')})
        }
        )  

   
    // current earninig
     contract.methods.userearning(address).call().then(amount => {
        //console.log("userearninig",amount);
        var gwei = web3.utils.toBN(amount).toString();
        var tokens = web3.utils.toWei(gwei,"Gwei");
        this.setState({ currentearning: web3.utils.fromWei(tokens, 'ether')})
        }
        )  

     // TOTAL earninig
     contract.methods.usertotalearning(address).call().then(amount => {
      //console.log("usertotalearninig",amount);
        var gwei = web3.utils.toBN(amount).toString();
        var tokens = web3.utils.toWei(gwei,"Gwei");
        this.setState({ totalearning: web3.utils.fromWei(tokens, 'ether')})
        }
        )  

     // TOTAL invvested
     contract.methods.userinvested(address).call().then(amount => {
        //console.log("userinvested",amount);
        var gwei = web3.utils.toBN(amount).toString();
        var tokens = web3.utils.toWei(gwei,"Gwei");
        this.setState({ invested: web3.utils.fromWei(tokens, 'ether')})
        }
        )  
   
    //   Next Free Spin 
    contract.methods.nextSpinDate(address).call().then(time => {  
        //console.log("nextspin",time);
        this.setState({ nextfreespindate: time});
        
    } )    

    // current fees
    contract.methods.fees().call().then(fees => {  
        //console.log("fees",fees);
        this.setState({ fees: fees});
        
    } )    
        
   };



   onInputchange(event) {
    this.setState({
      [event.target.name]: event.target.value
    });
  }


  riskChange(event) {

    console.log(event.target.value);

    this.setState({riskvalue: event.target.value});
  }


setValue(e) {

  this.setState({
    userInput: e
  });

}



 async selectItem(risk) {

    console.log("risk",risk);

    const web3 = await contractService.getWeb3Client();
   
     var value = Number(this.state.userInput);

     if (value >= Number(this.state.minBet) &&  value <= Number(this.state.maxBet) )
    {

      if (web3) 
      {
      
       try {
          // swal("Wait for the transaction to be completed!");
          await this.setState({ open: true });
          const txResult = await contractService.spinningwheel(
              web3,
              risk,
              value,
              );
              await this.setState({ open: false });
  
     console.log(txResult.logs[2].topics[1]);
     
     var luckynunber = parseInt(txResult.logs[2].topics[1], 16);
     var winningamount = parseInt(txResult.logs[2].topics[2], 16);
     console.log("luckynumber",luckynunber);
     console.log("winningamount",winningamount); 
    
     this.rotatewheel(risk,luckynunber,winningamount); 

     
      }
  
      catch
      { 
        await this.setState({ open: false });
          swal("Transaction Failed!!!!!!");
      }
  
       }
  
       else {
  
        swal({
          title: 'Change Network to Binance Mainet',
          timer: 3000
          })
  
           }
  
     }
 
 
      
    else {
      
      const isConfirm =  Confirm(
        'Please enter Correct Value',
        
      );}


  }

 async winningmessage(amount) {

  //  swal(`You won ${(amount)/10**9}`)
 setTimeout(() => {swal(`You won ${(amount)/10**9}`)},10000);
//  setTimeout(() => {window.location.reload()},15000); 
 
  }


  rotatewheel(risk,luckynunber,winningamount) {

  

  if (risk ==1) {

  if (this.state.selectedItem === null) {

    var selectedItem;

    if (luckynunber == 100){
      selectedItem = 2;
    }
    else if (luckynunber == 50 ){
      selectedItem = 0;
    }
    else if (luckynunber == 0 ){
     selectedItem = 4;
   }
   else if (luckynunber == 150 ){
     selectedItem = 5;
   }

  console.log("selectedItem",selectedItem);
     
   if (this.props.onSelectItem) {
       this.props.onSelectItem(selectedItem);
      
     }
    else {
      setTimeout (this.winningmessage(winningamount), 20000); 
    } 
     this.setState({ selectedItem });
    
   } 
   else {
     this.setState({ selectedItem: null });
     setTimeout(this.selectItem, 50);
   }

  }


  // ['0x', '1x', '0.5x', '1.5x', '0x', '0.5x','2X','2.5X']
  else if (risk ==2) 
  {

    if (this.state.selectedItem === null) {
  
      var selectedItem;
  
      if (luckynunber == 100){
        selectedItem = 1;
      }
      else if (luckynunber == 50 ){
        selectedItem = 2;
      }
      else if (luckynunber == 0 ){
       selectedItem = 4;
     }
     else if (luckynunber == 150 ){
       selectedItem = 5;
     }
     else if (luckynunber == 200 ){
      selectedItem = 6;
    }
    else if (luckynunber == 250 ){
      selectedItem = 7;
    }
  
    console.log("selectedItem",selectedItem);
       
     if (this.props.onSelectItem) {
         this.props.onSelectItem(selectedItem);
        
       }
      else {
        setTimeout (this.winningmessage(winningamount), 20000); 
      } 
       this.setState({ selectedItem });
      
     } 
     else {
       this.setState({ selectedItem: null });
       setTimeout(this.selectItem, 50);
     }
  
    }


    // ['0x', '2.5x', '0.5x', '1.5x', '1x', '0x','1.5X','1X','0.75X','1.5X','0X','1.5X','1.75X','0.5X','2.5X','0X']
    else if (risk ==3) 
    {
  
      if (this.state.selectedItem === null) {
    
        var selectedItem;
    
        if (luckynunber == 0){
          selectedItem = 0;
        }
        else if (luckynunber == 250 ){
          selectedItem = 1;
        }
        else if (luckynunber == 50 ){
         selectedItem = 2;
       }
       else if (luckynunber == 150 ){
         selectedItem = 3;
       }
       else if (luckynunber == 100 ){
        selectedItem = 4;
      }
      else if (luckynunber == 75 ){
        selectedItem = 9;
      }
      else if (luckynunber == 175 ){
        selectedItem = 13;
      }


      console.log("selectedItem",selectedItem);
         
       if (this.props.onSelectItem) {
           this.props.onSelectItem(selectedItem);
          
         }
        else {
          setTimeout (this.winningmessage(winningamount), 20000); 
        } 
         this.setState({ selectedItem });
        
       } 
       else {
         this.setState({ selectedItem: null });
         setTimeout(this.selectItem, 50);
       }
    
      }


}







async claim() {

  var rewards = this.state.currentearning;
  // var bnb = a.toFixed(4);
  
  const web3 = await contractService.getWeb3Client()
   
  if (web3) 

  {
    try {
      this.setState({ open: true });
    const txResult = await contractService.claimgamerewards(
    web3
    );
    this.setState({ open: false });
    
     swal(`You Successfully Claimed ${rewards}`);

      // setTimeout(()=> {window.location.reload()} ,10); 

     }
     catch {
      this.setState({ open: false });
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







  getResult(){
    const { selectedItem } = this.state;
    const { items } = this.props;

    alert(selectedItem);
  }



  render() {
    const { selectedItem } = this.state;
    const items = this.props.items;
    const riskvalue = this.props.risk;

    const open = this.state.open;

  //  if (open == true){
  //    swal ("Wait");
  //  }


    const wheelVars = {
      '--nb-item': items.length,
      '--selected-item': selectedItem,
    };
    const spinning = selectedItem !== null ? 'spinning' : '';

    return (
      <>
      <div class="div-wheel">  

<div class="dropdown">
              
             

                <a  type="button" class="btn btn-primary get-started-btn scrollto wheel-btn-right" data-toggle="modal" data-target="#wheelModal"><b>Connect</b></a>
            </div>
        <div class="wheel-container">

     

            <div class={`wheel ${spinning}`} style={wheelVars} >
            {items.map((item, index) => (
                <div class="wheel-item" key={index} style={{ '--item-nb': index }}>
                {item}
                </div>
            ))}
            </div>
        
        </div>


    { open ?   <p> Wait fo the Transaction to be Completed!</p> : <p></p>  }

        <div>
              <div class="btn-div">
                  <div>
                 
 { !open ? <a  type="button" class="btn btn-primary get-started-btn scrollto btn-spin" onClick={() => this.selectItem(riskvalue)}><b>SPIN</b></a>
 
  : <a  type="button" class="btn btn-primary get-started-btn scrollto btn-spin" ><b>SPIN</b></a>
}   

     <label> Enter Custom Amount: <input type="text" name="userInput" class="textbox-wheel form-control" placeholder="Enter value" value={this.state.userInput} onChange={this.onInputchange} ></input> </label>
      <a  type="button" class="btn btn-primary get-started-btn scrollto btn-min" onClick={()=>this.setValue(this.state.minBet)} ><b>MIN</b></a>
                    <a  type="button" class="btn btn-primary get-started-btn scrollto btn-max" onClick={()=>this.setValue(this.state.maxBet)} ><b>MAX</b></a>

                 
                  </div>
                  <div class="claimed-div">   

   { !open ?   <a  type="button" class="btn btn-primary get-started-btn scrollto btn-claimed" onClick={this.claim}>Claim</a>
    : <a  type="button" class="btn btn-primary get-started-btn scrollto btn-claimed">Claim</a>                          
}           
                        

                    </div>
              </div>
        </div>
       </div>
      


      <div className="modal fade" id="wheelModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
<div className="modal-dialog modal-dialog-centered modal-connect modal-content-confirm" role="document">
  <div className="modal-content modal-content-confirm modal-content-custom">
    <div className="modal-body connect-body text-center">
      <div class="row ">
          <div class="col-md-12">
             <h4 className="confirm-heading">Disclaimer</h4>

             </div>
          <div class="col-md-12 text-center">
          <a   class="btn-get-started scrollto  confirm-btn" id="confirmBtn">Spin</a>
          </div>
      </div>

    
    </div>
  </div>
</div>
</div>
      </>
    );
  }
}