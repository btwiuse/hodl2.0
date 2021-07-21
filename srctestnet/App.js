import React,{useEffect} from 'react';
import Header from './components/header'
import Footer from './components/footer'
import StayConnected from './components/stayconnected'
import Introduction from './components/introduction'
import Features from './components/features'
import Tokenomics from './components/tokenomics'
import Smart from './components/smart'
import Roadmap from './components/roadmap'
import Faq from './components/faq'
import Team from './components/team'
import Functions from './functions';
import HeroSector from './components/HeroSector'


import loadingimage from './images/loader.png'

function App() {
  useEffect(()=>{
    Functions()
  })
  return ( 
    <>
      <Header />
      <HeroSector />
      <main id="main">
        <StayConnected/>
        <Introduction/>
        <Features/>
        <Tokenomics/>
        <Smart/>
        <Roadmap/>
        <StayConnected/>
        <Faq/>
        <Team/>
      </main>
      <Footer />
      <a href="#" className="back-to-top"><i className="ri-arrow-up-line"></i></a>
      <div id="preloader">
        <img src= {loadingimage} class="loader_image"/>

        </div>
    </>
  );
}

export default App;
