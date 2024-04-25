import { FaEnvelope } from "react-icons/fa";
import { useState } from "react";
import { toast, Toaster } from "react-hot-toast";
import { CgSpinner } from "react-icons/cg";


  

    const Forgot = () => {

  const [email, setEmail] = useState("");
  const [loading,setLoading]=useState(false)



  const handleSendPasswordEmail =async (e) => {
    e.preventDefault();
    setLoading(true); // Set loading state to true
  
    
    try{
      const response=await fetch("http://localhost:5000/forgot",{
        method:"POST",
        headers:{
          "Content-Type":"Application/json"
        },
        body:JSON.stringify({email})
      })
      const data=await response.json()
      if(response.status===200){
        toast.success("Email sent successfully 1 more step :")
        console.log(data.forgot_token)
        localStorage.setItem("forgot_token",data.forgot_token)
       
      }

      else if(response.status===402){
        toast.error("Email doens't exist please check twice")
      }
      else if(response.status===500){
        toast.error("Please check your internet connection")
      }
      
    }
    catch(err){
      console.log(err)
    }
    finally{
      setLoading(false)
    
  }
}
  

  return (
    <div className="bg-blue-600 h-screen flex items-center justify-center">
      <Toaster toastOptions={{ duration: 4000 }} />
      <div className="bg-white rounded-lg shadow-lg p-8 max-w-md w-full">
            <div className="mb-4 flex items-center text-blue-800">
              <FaEnvelope />
              <label htmlFor="email" className="block text-gray-700 font-medium">
                Email
              </label>
            </div>
            <input
              type="email"
              id="email"
              name={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Please write your email to reset Password"
              className="mt-1 px-4 py-2 w-full border rounded-lg focus:outline-none focus:ring focus:border-blue-300"
              required
              autoComplete="username"
            />
            <button
              onClick={handleSendPasswordEmail}
              className="bg-blue-500 flex items-center justify-center text-white py-2 px-4 mt-4 rounded-full hover:bg-blue-600 focus:outline-none focus:ring focus:border-blue-300"
            >
            {loading && (
                <CgSpinner size={30} className="ml-5  animate-spin" />
              )}
              Verify Email
            </button>
      </div>
    </div>
  );
};

export default Forgot;
