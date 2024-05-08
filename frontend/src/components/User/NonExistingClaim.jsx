/* eslint-disable react/prop-types */
import { useState } from "react";
import content from "../../../constants";
import { getCategoryId } from "../../services/getters";
import handlePostNonExistingClaim from "../../services/Claimshandlers/handlePostNonExistingClaim";
import { FaFileImage, FaMapMarker, FaThumbtack, FaInfo } from "react-icons/fa";
import { toast, Toaster } from "react-hot-toast";
import { CgSpinner } from "react-icons/cg";
import { Link } from "react-router-dom";
import NavProfile from "./NavProfile";
import { useAppContext } from "../../AppContext";
import claim from "@assets/claim.webp";

export default function NonExistingClaim() {
  const { categories }=useAppContext();
  const user_id = sessionStorage.getItem("user_id");
  const userInt=parseInt(user_id)
  
  const [category, setCategory] = useState("");
  const [itemName, setItemName] = useState("");
  const [location, setLocation] = useState("");
  const [image_proof, setImageProof] = useState([]);
  const [description_proof, setDescriptionProof] = useState("");
  const [loading, setLoading] = useState(false);



  const handleImageChange = (e) => {
    const selectedImage = e.target.files[0];
    setImageProof(selectedImage);
  };

  const category_id=getCategoryId(category,categories);
  const categoryInt=parseInt(category_id)
  const handleSubmit = async (e) => {
    e.preventDefault();
   
    handlePostNonExistingClaim(categoryInt,userInt,image_proof,location,description_proof,setLoading,toast)
    
  };

  return (
    <div className="h-screen w-full bg-green-100">
      <NavProfile />
      <Toaster toastOptions={{ duration: 7000 }} />
      <div className="flex justify-center flex-col-reverse lg:flex-row w-auto lg:w-full max-w-4xl mx-auto">
        <div className="w-full lg:w-3/4 mx-auto p-6 lg:mt-16 bg-white rounded-l-lg shadow-lg">
          <form>
            <div className="mb-4">
              <div className="flex items-center text-blue-800">
                <FaThumbtack />
                <label htmlFor="location" className="block text-gray-700 font-medium">
                  {content.NonExistingClaim.categoryTitle}
                </label>
              </div>
              <select
                value={category}
                required
                onChange={(e) => setCategory(e.target.value)}
                className="w-full px-4 py-2 bg-white rounded-3xl border-b border-black focus:outline-none"
              >
                <option value="">Select a category</option>
                {categories &&
                  categories.map((category) => (
                    <option key={category.id} value={category.name}>
                      {category.name}
                    </option>
                  ))}
              </select>
            </div>
            <div className="mb-4">
              <div className="flex items-center text-blue-800">
                <FaInfo />
                <label htmlFor="itemName" className="block text-gray-700 font-medium">
                  {content.NonExistingClaim.itemTitle}
                </label>
              </div>
              <input
                type="text"
                id="itemName"
                placeholder="Item"
                value={itemName}
                required
                onChange={(e) => setItemName(e.target.value)}
                className="w-full px-4 py-2 bg-white rounded-3xl border-b border-black focus:outline-none"
              />
            </div>
            <div className="mb-4">
              <div className="flex items-center text-blue-800">
                <FaMapMarker />
                <label htmlFor="location" className="block text-gray-700 font-medium">
                  {content.NonExistingClaim.locationTitle}
                </label>
              </div>
              <input
                type="text"
                id="location"
                placeholder="Location"
                value={location}
                required
                onChange={(e) => setLocation(e.target.value)}
                className="w-full px-4 py-2 bg-white rounded-3xl border-b border-black focus:outline-none"
              />
            </div>
            <div className="mb-4">
              <div className="flex items-center text-blue-800">
                <FaFileImage />
                <label className="block text-gray-700 font-medium">{content.NonExistingClaim.imageTitle}</label>
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
                <label htmlFor="description_proof" className="block text-gray-700 font-medium">
                  {content.NonExistingClaim.descriptionTitle}
                </label>
              </div>
              <textarea
                id="description_proof"
                placeholder="Description Proof"
                value={description_proof}
                required
                onChange={(e) => setDescriptionProof(e.target.value)}
                className="w-full px-4 py-2 bg-white rounded-3xl border-b border-black focus:outline-none"
              />
            </div>
            <button
              onClick={handleSubmit}
              type="submit"
              className="mt-4 w-full bg-blue-800 flex items-center h-10 justify-center hover:bg-blue-900 text-white font-semibold py-2 rounded-lg transition duration-300"
            >
              {loading && <CgSpinner size={30} className="ml-5 animate-spin" />}
              {content.NonExistingClaim.claimLabel}
            </button>
            <p className="text-center mt-4">
              {content.NonExistingClaim.action}{" "}
              <Link to="/home" className="text-blue-500 hover:underline">
                {content.NonExistingClaim.result}
              </Link>
            </p>
          </form>
        </div>
        <div className="p-8 text-black shadow-xl border-b-4 lg:border-b-0 w-full lg:w-3/4 bg-white mt-16 rounded-r-lg">
          <h2 className="text-3xl font-semibold mb-8 font-['Inter']">{content.NonExistingClaim.title}</h2>
          <div className="space-y-10">
            <div className="flex space-x-4 items-center">
              <div className="bg-blue-500 rounded-full w-16 h-10 flex items-center justify-center">
                <span className="text-white text-lg font-semibold font-['Inter']">{content.NonExistingClaim.one}</span>
              </div>
              <p className="font-semibold font-['Inter']">{content.NonExistingClaim.stepOne}</p>
            </div>
            <div className="flex space-x-4 items-center">
              <div className="bg-blue-500 rounded-full w-10 h-10 flex items-center justify-center">
                <span className="text-white text-lg font-semibold font-['Inter']">{content.NonExistingClaim.two}</span>
              </div>
              <p className="font-semibold font-['Inter']">{content.NonExistingClaim.stepTwo}</p>
            </div>
            <div className="flex space-x-4 items-center">
              <div className="bg-blue-500 rounded-full w-12 h-10 flex items-center justify-center">
                <span className="text-white text-lg font-semibold font-['Inter']">{content.NonExistingClaim.three}</span>
              </div>
              <p className="font-semibold font-['Inter']">{content.NonExistingClaim.stepThree}</p>
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
