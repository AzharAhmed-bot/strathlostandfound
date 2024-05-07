/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import  { useState } from "react";
import { FaFileImage,FaMapMarker } from "react-icons/fa";
import { toast, Toaster } from "react-hot-toast";
import { CgSpinner } from "react-icons/cg";
import { Link } from "react-router-dom";
import { FaThumbtack, FaInfo} from "react-icons/fa";
import { useAppContext } from "../../AppContext";
import NavProfile from "./NavProfile";
import claim from "@assets/claim.webp";

export default function MyClaimcard() {
  const user_id=sessionStorage.getItem("user_id")
  const sessionitem=localStorage.getItem("item_name")
  const item_id=localStorage.getItem("item_id")
  const sessioncategory=localStorage.getItem("category_name")
  const category_id=localStorage.getItem("category_id")

  const [location,setLocation]=useState("")
  const [image_proof, setImageProof] = useState([]);
  const [description_proof, setDescriptionProof] = useState("");
  const [loading,setLoading]=useState(false)
  const [isClaiming, setIsClaiming] = useState(false);

  const handleImageChange = (e) => {
    const selectedImage = e.target.files[0];
    setImageProof(selectedImage)
    
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true)
    const formData=new FormData()
    formData.append("user_id",user_id)
    formData.append("item_id",item_id)
    formData.append("image_proof",image_proof)
    formData.append("description_proof",description_proof)
    formData.append("category_id",category_id)
    formData.append("location",location)
    try{
        const response=await fetch("http://localhost:5000/claims",{
        method:"POST",
        body:formData
    })
    if(response.status===201){
        console.log("echooo")
        toast.success("You have claimed the item successfully. You'll receive an email to come pick your item once you have verified as the true owner. It won't take Long!")
    }
}  
 catch(error){
    console.log(error)
    toast.error("Error making claim. Its probably not you but the server :) ")
 }
 finally{
    setLoading(false)
    setIsClaiming(true)
    localStorage.removeItem("category_id")
    localStorage.removeItem("category_name")
    localStorage.removeItem("item_id")
    localStorage.removeItem("item_name")
 }
  };
  return (
    <div className=" h-screen  w-full bg-green-100">
      <NavProfile/>
        <Toaster toastOptions={{ duration: 7000 }}/>
      <div className="flex justify-center flex-col-reverse  lg:flex-row w-auto lg:w-full  max-w-4xl mx-auto">
      <div className="w-full lg:w-3/4 mx-auto p-6 lg:mt-16 bg-white rounded-l-lg shadow-lg">
        <form>
          <div className="mb-4">
              <div className="flex items-center text-blue-800">
                <FaThumbtack />
                <label htmlFor="location" className="block text-gray-700 font-medium">
                  Category
                </label>
              </div>
              <input
              type="text"
              readOnly
              placeholder="Item"
              value={sessioncategory}
              className="w-full px-4 py-2 bg-white rounded-3xl border-b border-black focus:outline-none"
            />
          </div>
          <div className="mb-4">
          <div className="flex items-center text-blue-800">
                <FaInfo />
                <label htmlFor="location" className="block text-gray-700 font-medium">
                  Item set
                </label>
              </div>
            <input
              type="text"
              placeholder="Item"
              readOnly
              value={sessionitem}
              className="w-full px-4 py-2 bg-white rounded-3xl border-b border-black focus:outline-none"
            />
          </div>
          <div className="mb-4">
          <div className="flex items-center text-blue-800">
                <FaMapMarker />
                <label htmlFor="location" className="block text-gray-700 font-medium">
                  Location
                </label>
              </div>
            <input
              type="text"
              placeholder="Location"
              required
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              className="w-full px-4 py-2 bg-white rounded-3xl border-b border-black focus:outline-none"
            />
          </div>
          <div className="mb-4">
            <div className="flex items-center text-blue-800">
              <FaFileImage />
              <label className="block text-gray-700 font-medium">
                Image Proof
              </label>
            </div>
            <input
              type="file"
              accept="image/*"
              required
              onChange={handleImageChange}
              className="mt-1 w-full px-4 py-2 bg-white rounded-3xl border-b border-black focus:outline-none"
            />
          </div>
          <div className="mb-4">
          <div className="flex items-center text-blue-800">
                <FaInfo />
                <label htmlFor="location" className="block text-gray-700 font-medium">
                  Description
                </label>
              </div>
            <textarea
              placeholder="Description Proof"
              required
              value={description_proof}
              onChange={(e) => setDescriptionProof(e.target.value)}
              className="w-full px-4 py-2 bg-white rounded-3xl border-b border-black focus:outline-none"
            />
          </div>
          <button
              disabled={isClaiming}
              onClick={handleSubmit}
              type="submit"
              className="mt-4 w-full bg-blue-800 flex items-center h-10 justify-center hover:bg-blue-900 text-white font-semibold py-2 rounded-lg transition duration-300"
            >
              {loading && <CgSpinner size={30} className="ml-5 animate-spin" />}
              Claim Item
            </button>
            <p className="text-center mt-4">
             Wanna Make another claim?{" "}
            <Link to="/home" className="text-blue-500 hover:underline">
              Visit Home
            </Link>
          </p>
        </form>
      </div>
      
      <div className="p-8 text-black shadow-xl border-b-4 lg:border-b-0 w-full lg:w-3/4 bg-white  mt-16 rounded-r-lg ">
          <h2 className="text-3xl font-semibold mb-10  font-['Inter']">How to Claim an item?</h2>
          <div className="space-y-10">
            <div className="flex space-x-4 items-center">
              <div className="bg-blue-500 rounded-full w-10 h-10 flex items-center justify-center">
                <span className="text-white text-lg font-semibold font-['Inter']">1</span>
              </div>
              <p className="font-semibold font-['Inter']">Item name has been set for you</p>
            </div>
            <div className="flex space-x-4 items-center">
              <div className="bg-blue-500 rounded-full w-10 h-10 flex items-center justify-center">
                <span className="text-white text-lg font-semibold font-['Inter']">2</span>
              </div>
              <p className="font-semibold font-['Inter']">Item category is also set</p>
            </div>
            <div className="flex space-x-4 items-center">
              <div className="bg-blue-500 rounded-full w-16 h-10 flex items-center justify-center">
                <span className="text-white text-lg font-semibold font-['Inter']">3</span>
              </div>
              <p className="font-semibold font-['Inter']">Fill in the item description, it’s location of losing and the category and click Claim</p>
              
            </div>
            <div className="flex justify-center items-center">
            <img className="h-40" src={claim} alt="" />
            </div>  
          </div>
      </div>
      </div>
    </div>
  );
}
