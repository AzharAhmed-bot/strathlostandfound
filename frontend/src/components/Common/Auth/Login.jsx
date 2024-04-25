/* eslint-disable react/no-unknown-property */
/* eslint-disable react/no-unescaped-entities */
/* eslint-disable react/prop-types */
import content from "../../../../constants"
import  { useState } from "react";
import loginpagebg from "@assets/Loginpagebg.webp";
import login from "@assets/login.webp";
import NavBar from "../Navigation/NavBar";
import { BsFillShieldLockFill } from "react-icons/bs";
import { FaEnvelope } from "react-icons/fa";
import {toast, Toaster} from "react-hot-toast";
import { handleSignIn } from "../../../services/handleSignIn";
import { Link } from "react-router-dom";
import {CgSpinner} from "react-icons/cg"
import { useNavigate } from "react-router-dom";

// Component for the login page
const LogIn = () => {
  const navigate=useNavigate()

  // Initialize state variables
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [emailerror, setemailError] = useState("");
  const [error,setError]=useState("")
  const [passworderror,setpasswordError]=useState("")

   // Function to handle sign-in with error handling and navigation
  const handleSignInWrapper=async(e)=>{
    e.preventDefault()
    handleSignIn(email, password, setLoading, setemailError, setpasswordError, setError, navigate, toast);
  }
  
  // Render the login page
  return (
    <>
      <NavBar />
      <Toaster toastOptions={{ duration: 4000 }} />
      
      <div className="min-h-screen flex items-center justify-center" style={{ backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url(${loginpagebg})`, backgroundSize: "cover" }}>
      <div className="flex  justify-center lg:flex-row mt-20 w-auto lg:w-full max-w-4xl mx-auto">
        <div className="w-full md:w-1/2 lg:w-1/2 p-6 bg-gray-100 shadow-lg rounded-l-lg">
          <h2 className="text-2xl font-semibold text-center mb-6">{content.login.title}</h2>
          <form onSubmit={handleSignInWrapper}>
            {error && (
              <div className="text-red-500 text-sm mt-2">{error}</div>
            )}
            <div className="mb-4">
              <div className="flex items-center text-gray-700">
                <FaEnvelope className="mr-2" />
                <label htmlFor="email" className="block text-gray-700 font-medium">
                  {content.login.email}
                </label>
              </div>
              <input
                type="email"
                id="email"
                name="email"
                value={email}
                placeholder="Enter your email address"
                onChange={(e) => setEmail(e.target.value)}
                className="w-full h-10 px-4 py-2 bg-white rounded-3xl border-b border-black gap-2.5 "
                required
                autoComplete="username"
              />
              {emailerror && (
                <div className="text-red-500 text-sm mt-2">{emailerror}</div>
              )}
            </div>
            <div className="mb-4">
              <div className="flex items-center text-gray-700">
                <BsFillShieldLockFill className="mr-2" />
                <label htmlFor="password" className="block text-gray-700 font-medium">
                  {content.login.password}
                </label>
              </div>
              <input
                type="password"
                id="password"
                name="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your password"
                className="mt-1 px-4 py-2 w-full bg-white rounded-3xl border-b border-black gap-2.5 "
                required
                autoComplete="current-password"
              />
              {passworderror && (
                <div className="text-red-500 text-sm mt-2">{passworderror}</div>
              )}
            </div>
            <div className="flex justify-center flex-col items-center">
              <button
                type="submit"
                className="mt-4 w-52  bg-yellow-600 flex  items-center h-10 justify-center hover:bg-yellow-700 text-black font-semibold py-2 rounded-lg transition duration-300"
              >
                {loading && (
                  <CgSpinner size={30} className="ml-5  animate-spin" />
                )}
                {content.login.buttonLabel}
              </button>
            </div>
          </form>
          <p className="text-center mt-4">
          {content.login.action1}{" "}
            <br />
            <Link to="/signup" className="text-blue-500 hover:underline">
            {content.login.result1}
            </Link>
          </p>
          <p className="text-center mt-4">
          {content.login.action2}{" "}
            <br />
            <Link to="/forgot" className="text-blue-500 hover:underline">
            {content.login.result2}
            </Link>
          </p>
        </div>
        <div className="sm:block hidden">
          <img className="lg:w-full lg:h-full h-full rounded-r-lg " rel="preload" fetchpriority="high" src={login} alt="login page" />
        </div>
        </div>
      </div>
    </>
  );
  
};

export default LogIn;
