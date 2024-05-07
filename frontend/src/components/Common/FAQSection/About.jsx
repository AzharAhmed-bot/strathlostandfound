/* eslint-disable react/prop-types */
import NavBar from "../Navigation/NavBar";
import { useAppContext } from "../../../AppContext";
import {Toaster} from "react-hot-toast"
import Footer from "../Footer";
import Faq from "./FAQ";

const AboutPage = () => {
  const{reviews}=useAppContext();
  return (
    <>
      <NavBar />
     <Toaster toastOptions={{ duration: 3000 }} />
      <section className="py-16 bg-white">
        <Faq reviews={reviews}/>  
      </section> 
      <Footer />
    </>
  );
};

export default AboutPage;
