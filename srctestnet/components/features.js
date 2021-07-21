import Icons1 from '../images/icons/9.png'
import Icons2 from '../images/icons/8.png'
import Icons3 from '../images/icons/11.png'
import Icons4 from '../images/icons/10.png'
import Icons5 from '../images/icons/12.png'
import Icons6 from '../images/icons/7.png'
import sectionBg from '../images/world.jpg'

function Features(){
    return(
        <section id="services" className="services section-bg section_feature" style={{ backgroundImage: `url(${sectionBg})` }}>
      <div className="container" data-aos="fade-up">

        <div className="section-title">
          <h2>FEATURES</h2>

        </div>

        <div className="row">

            <div className="col-xl-4 col-md-6 d-flex align-items-stretch   mt-xl-0" data-aos="zoom-in" data-aos-delay="300">
            <div className="icon-box">
              <div className="icon">


                <img src={Icons1} />
              </div>
              <h4><a href="">Earn $BNB by hodling $HODL</a></h4>
              <p>4% of every transaction is taken and redistributed to all $HODL holders in <strong>$BNB</strong>. Accumulate $BNB by hodling the $HODL Token !
</p>
            </div>
          </div>



          <div className="col-xl-4 col-md-6 d-flex align-items-stretch   mt-md-0" data-aos="zoom-in" data-aos-delay="200">
            <div className="icon-box">
              <div className="icon">



                <img src={Icons2} />

              </div>
              <h4><a href="">Automatic Liquidity Pool</a></h4>
              <p>4% of every transaction contributes toward automatically generating further liquidity on Pancake Swap. Benefiting long term for $HODL holders the most!</p>
            </div>
          </div>
  <div className="col-xl-4 col-md-6 d-flex align-items-stretch   mt-xl-0" data-aos="zoom-in" data-aos-delay="300">
            <div className="icon-box">
              <div className="icon">

                <img src={Icons3} />
              </div>
              <h4><a href="">RFI Static Rewards</a></h4>
              <p>2% of every transaction is taken and re distributed to all $HODL holders. The burn address is also a holder thus each transaction helps deflate the supply.</p>
            </div>
          </div>

          <div className="col-xl-4 col-md-6 d-flex align-items-stretch   mt-xl-0" data-aos="zoom-in" data-aos-delay="400">
            <div className="icon-box">
              <div className="icon">

                <img src={Icons4} />
              </div>
              <h4><a href="">Inbuilt Anti-Whale Mechanism</a></h4>
              <p>Transaction (Sell/Buy) that trade more than 1% of the total supply will be rejected. <br />
Whales who make transfer (between 2 wallets) that is larger than 1% of the total supply will be charged 1BNB which will further be donated to Charities
</p>
            </div>
          </div>


          <div className="col-xl-4 col-md-6 d-flex align-items-stretch   mt-xl-0" data-aos="zoom-in" data-aos-delay="400">
            <div className="icon-box">
              <div className="icon">

                <img src={Icons5} />

              </div>
              <h4><a href="">Highly Secured</a></h4>
              <p>All Initial Liquidity Provided will be locked with Unicrypt. The contract is Trustless for $HODL community. We will release the audit reports shortly as they are under progress.
</p>
            </div>
          </div>


             <div className="col-xl-4 col-md-6 d-flex align-items-stretch" data-aos="zoom-in" data-aos-delay="100">
            <div className="icon-box">
              <div className="icon">

                <img src={Icons6} />

              </div>
              <h4><a href="">Built for the Community</a></h4>
              <p>$HODL is a community driven token built on Binance Chain. It will be available on Unicrypt for Presale with No Transaction Fee for early investors.
<br />
PCS Launch price will see atleast 10%  uplift and introduction of transaction fee’s
.</p>
            </div>
          </div>

        </div>

      </div>
    </section>
    )
}
export default Features;