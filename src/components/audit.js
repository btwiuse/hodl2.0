// function Audit(){
//     return (
//     <section id="cta" >
//       <div className="container" data-aos="zoom-in">
//         <div className="row">
//           <div className="col-lg-6 text-center ">
//             <h3 className="text-center">Audited By TechRate</h3>
         
//           <div class="button_cacla"> 
//                   <a href="https://github.com/TechRate/Smart-Contract-Audits/blob/main/HODL.pdf" class="btn-get-started scrollto reward_button123" target="_blank">Click Here!</a>
//                </div>
//                </div>
//              <div><br></br></div>

//                <div className="col-lg-6 text-center ">
//             <h3 className="text-center">PooCoin Chart</h3>
         
//           <div class="button_cacla"> 
//                   <a href="https://poocoin.app/tokens/0x0e3eaf83ea93abe756690c62c72284943b96a6bc" class="btn-get-started scrollto reward_button123"target="_blank">Click Here!</a>
//                </div>
//                </div>


//           {/* <div className="col-lg-3 cta-btn-container text-center">
//              <div className="social-links  social_links ">
             
//             </div>
//             </div> */}
//         </div>
//       </div>
//     </section>
//     )
//   }
//   export default Audit;


function Audit(){
  return(
      <section id="cta" >
      <div className="container" data-aos="zoom-in">

        <div className="row official_information">

        <div className="col-lg-4 text-center text-lg-left burn">
            <h3>PooCoin Chart</h3>
            <br />
             <a className="cta-btn align-middle" href="https://poocoin.app/tokens/0x0e3eaf83ea93abe756690c62c72284943b96a6bc" target="_blank">Click Here!</a>

          </div>


          <div className="col-lg-4 text-center text-lg-left">
            <h3>Audited By TechRate</h3>
            <br />
             <a className="cta-btn align-middle" href="https://github.com/TechRate/Smart-Contract-Audits/blob/main/HODL.pdf" target="_blank">Click Here!</a>

          </div>

        

          <div className="col-lg-4 text-center text-lg-left">
            <h3>DexGuru Chart</h3>
            <br />
             <a className="cta-btn align-middle" href="https://app.unicrypt.network/amm/pancake-v2/pair/0x2941273449aB4eB6FCdf8f84763F017FaE264091" target="_blank">Click Here!</a>

          </div>

        </div>

      </div>
    </section>
  )
}
export default Audit;