import handleSignUp from "../../../services/authhandlers/handleSignUp";
import content from "../../../../constants"
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast, Toaster } from "react-hot-toast";
import { BsTelephoneFill, BsFillShieldLockFill } from "react-icons/bs";
import { FaEnvelope, FaUsers } from "react-icons/fa";
import { CgSpinner } from "react-icons/cg";
import register from "@assets/register.webp";
import loginpagebg from "@assets/Loginpagebg.webp";
import NavBar from "../Navigation/NavBar";

const SignUp = () => {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone_number, setPhoneNumber] = useState("");
  const [emailError, setEmailError] = useState("");
  const [phoneError, setPhoneError] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [typingTimeout, setTypingTimeout] = useState(null);

  const handleEmailChange = (value) => {
    setEmail(value);
    clearTimeout(typingTimeout);
    const timeoutId = setTimeout(() => {
      checkEmailFormat(value);
    }, 500);
    setTypingTimeout(timeoutId);
  };

  const checkEmailFormat = (value) => {
    const emailRegex = /^[a-zA-Z]+.[a-zA-Z]+@strathmore.edu$/;
    if (!emailRegex.test(value)) {
      setEmailError(" Use your Strathmore email!");
    } else {
      setEmailError("");
    }
  };

  const handleSignUpWrapper=async(e)=>{
    e.preventDefault(); 
    handleSignUp(name,email,password,phone_number,toast,navigate,checkEmailFormat,setIsLoading,setEmailError,setPhoneError,setError)
  }

  return (
    <>
      <NavBar />
      <Toaster toastOptions={{ duration: 4000 }} />
      <div className="min-h-screen flex items-center justify-center" style={{ backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url(${loginpagebg})`, backgroundSize: "cover" }}>
        <div className="flex  justify-center lg:flex-row mt-20 w-auto lg:w-full max-w-4xl mx-auto">
          <div className=" w-full md:w-1/2 lg:w-1/2 p-6 bg-gray-100 shadow-lg rounded-l-lg">
          {error && <div className="text-red-500 text-sm mt-1 ml-6">{error}</div>}
            <h2 className="text-3xl font-bold text-center mb-6">{content.register.title}</h2>
            <form onSubmit={handleSignUpWrapper}>
              <div className="mb-4">
                <label htmlFor="name" className="flex items-center text-gray-700 font-medium mb-1">
                  <FaUsers className="mr-2" />
                  {content.register.fullName}
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  placeholder="Enter your full name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full h-10 px-4 py-2 bg-white rounded-3xl border-b border-black gap-2.5 "
                  required
                />
              </div>
              <div className="mb-4">
                <label htmlFor="email" className="flex items-center text-gray-700 font-medium mb-1">
                  <FaEnvelope className="mr-2" />
                  {content.register.email}
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  autoComplete="email"
                  placeholder="Enter your email address"
                  value={email}
                  onChange={(e) => handleEmailChange(e.target.value)}
                  className="w-full h-10 px-4 py-2 bg-white rounded-3xl border-b border-black gap-2.5 "
                  required
                />
                {emailError && <div className="text-red-500 text-sm mt-1">{emailError}</div>}
              </div>
              <div className="mb-4">
                <label htmlFor="password" className="flex items-center text-gray-700 font-medium mb-1">
                  <BsFillShieldLockFill className="mr-2" />
                  {content.register.password}
                </label>
                <input
                  type="password"
                  id="password"
                  name="password"
                  autoComplete="current-password"
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full h-10 px-4 py-2 bg-white rounded-3xl border-b border-black gap-2.5 "
                  required
                />
              </div>
              <div className="mb-4">
                <label htmlFor="phone" className="flex items-center text-gray-700 font-medium mb-1">
                  <BsTelephoneFill className="mr-2" />
                  {content.register.PhoneNumber}
                </label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  placeholder="Enter your phone number"
                  value={phone_number}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                  className="w-full h-10 px-4 py-2 bg-white rounded-3xl border-b border-black gap-2.5 "
                  required
                />
                {phoneError && <div className="text-red-500 text-sm mt-1">{phoneError}</div>}
              </div>
              <div className="flex justify-center">
                <button
                  type="submit"
                  className="w-40 bg-yellow-600 text-black font-semibold py-2 rounded-lg transition duration-300 flex items-center justify-center hover:bg-yellow-700"
                  disabled={isLoading}
                >
                  {isLoading ? <CgSpinner className="animate-spin mr-2" size={24} /> : null}
                  {content.register.buttonLabel}
                </button>
              </div>
            </form>
            <p className="text-center mt-4">
            {content.register.action}{" "}
              <span onClick={()=>navigate("/login")} className="text-blue-500 hover:underline cursor-pointer">
              {content.register.result}
              </span>
            </p>
          </div>
          <div className=" sm:block hidden">
            <img src={register} alt="Register" className="lg:w-full lg:h-full h-full rounded-r-lg" />
          </div>
        </div>
      </div>
    </>
  );
};

export default SignUp;
