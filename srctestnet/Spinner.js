import React,{useState} from 'react';
import Header from './components/header'
import Footer from './components/footer'
import Functions from './functions';

import Wheel from './components/wheel';






function Spinner() {
  const [places, setPlaces] = useState(['0.5x', '0.5x', '1x', '1x', '0x', '1.5x'])

  // useEffect(()=>{
  //   Functions()
    
  // })
  return (
    <>
      <Header />
      <main id="main">
      <section id="services" className="services section-bg section_feature">
        <div className="container" data-aos="fade-up">
         <div className="row">
            <div className="col-xl-12 col-md-12 d-flex align-items-stretch mt-4 mt-xl-0" data-aos="zoom-in" data-aos-delay="300">
               <div class="icon-box terms mt-5 wheel-bg-main">
                  {/* <div class="row">
                     <h2>What should you eat today?</h2>
                  </div> */}
                  <div class="row">
                      <Wheel items={places} />
                    </div>  
                     
               </div>
             
            </div>
         </div>
        </div>
     
      </section>
      </main>
      <Footer />
     





    </>
  );
}

export default Spinner;