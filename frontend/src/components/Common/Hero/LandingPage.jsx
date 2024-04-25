/* eslint-disable react/no-unknown-property */
import NavBar from "../Navigation/NavBar";
import HeroServices from "./HeroServices";
import HeroStatistics from "./HeroStatistics";
import content from '../../../../constants';
import Footer from "../Footer";
import { useNavigate } from "react-router-dom";
import lostandfound from '@assets/lostandfound.webp';

const LandingPage = () => {

  const navigate = useNavigate();
  function handleViewLostItems() {
    navigate("/home");
  }
  
  return (
    <>
      <NavBar />
      {/* Hero Section */}
        <div className="bg-[#e8f5e2] h-full w-full flex flex-col-reverse justify-center  lg:flex-row  items-center  lg:px-24">
          {/* Left Section */}
          <div className="text-center  lg:text-left mb-10 lg:mb-0 lg:w-1/2">
            <h1 className="text-4xl lg:text-5xl font-bold mb-6 text-black ">
              {content.hero.title}
            </h1>
            <h1 className="text-4xl lg:text-4xl font-bold mb-6 text-black ">
            {content.hero.subTitle}
            </h1>
            <h3 className="text-2xl lg:text-3xl mb-6 lg:mb-8 font-semibold">
            {content.hero.description}
            </h3>
             <button onClick={handleViewLostItems} className="bg-gradient-to-r from-blue-500 to-blue-700 hover:from-blue-600 hover:to-blue-800 text-white font-bold py-4 px-16 rounded-full shadow-lg transform transition-all duration-500 ease-in-out hover:scale-110 hover:brightness-110 hover:animate-pulse active:animate-bounce">
             {content.hero.buttonLabel}
            </button>  
          </div>
          
          {/* Right Section */}
          <div className="w-full lg:w-1/2  flex justify-center overflow-hidden mt-28">
            {/* Lazy-loaded image */}
            <img src={lostandfound} alt="LostnFound"  className="w-auto h-auto  object-cover rounded-md" style={{ maxWidth: '700px' }} />
          </div>
        </div>
      {/* Statistics Section */}
      <HeroStatistics/>
      {/* Our Services Section */}
      <HeroServices/>
      <Footer />
    </>
  );
};

export default LandingPage;
