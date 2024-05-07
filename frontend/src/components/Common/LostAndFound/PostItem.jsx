
/* eslint-disable react/prop-types */
import  { useState } from "react";
import handlePostItem from "../../../services/handlePostItem";
import content from "../../../../constants";
import NavProfile from "../../User/NavProfile";
import AdminNavProfile from "../../Admin/AdminNavProfile";
import { toast, Toaster } from "react-hot-toast";
import { CgSpinner } from "react-icons/cg";
import { useAppContext } from "../../../AppContext";
import postingItem from "@assets/postingItem.webp";

const PostItem = () => {
  const{categories}=useAppContext();
  const user_id =parseInt(sessionStorage.getItem("user_id"))
  const userRole = sessionStorage.getItem("role");

  const token = sessionStorage.getItem("token")

  const [location, setLocation] = useState("");
  const [date, setDate] = useState("");
  const [image, setImage] = useState([]);
  const [description, setDescription] = useState("");
  const [name, setname] = useState("")
  const [category, setCategory] = useState("");
  const [loading, setLoading] = useState(false);

  const handleImageChange = (e) => {
    const selectedImage = e.target.files[0];
    setImage(selectedImage);
  };
  
  const optionList = categories && categories.map((category) => {
    return <option key={category.id} value={category.id}>{category.name}</option>
  })

  const handleSubmit = async (e) => {
    e.preventDefault();
    handlePostItem(name,location,date,user_id,image,description,category,setLoading,token,toast)

  }
  return (
    <>
  {userRole === "student" ? <NavProfile /> : <AdminNavProfile />}
  <Toaster toastOptions={{ duration: 4000 }} />
  <div className="min-h-screen bg-green-100 flex items-center justify-center">
    <div className="flex justify-center lg:flex-row mt-20 w-auto lg:w-full max-w-4xl mx-auto">
    <div className="hidden sm:block  h-auto w-full ">
        <img className="h-full w-full mt-1 ml-1" src={postingItem} alt="Item posted" />
      </div>
      <div className="max-w-md h-auto  w-full p-6 bg-white rounded-r-lg shadow-lg">
        <div className="flex justify-center items-center">
          <h1 className="py-3 text-black text-4xl font-bold font-['Inter']">Post lost item here</h1>
        </div>
        <form onSubmit={handleSubmit} className="space-y-4 h-auto">
          <div className="flex flex-col  space-y-1 text-blue-800">
            <label htmlFor="name" className="font-medium">
              {content.post.itemTitle}
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={name}
              placeholder="Enter item name"
              onChange={(e) => setname(e.target.value)}
              className="px-4 py-2 bg-white rounded-3xl border-b border-black focus:outline-none"
              required
            />
          </div>
          <div className="flex flex-col space-y-1 text-blue-800">
            <label htmlFor="location" className="font-medium">
            {content.post.locationTitle}
            </label>
            <input
              type="text"
              id="location"
              name="location"
              value={location}
              placeholder="Enter location of lost item"
              onChange={(e) => setLocation(e.target.value)}
              className="px-4 py-2 bg-white rounded-3xl border-b border-black focus:outline-none"
              required
            />
          </div>
          <div className="flex flex-col space-y-1 text-blue-800">
            <label htmlFor="date" className="font-medium">
            {content.post.dateTitle}
            </label>
            <input
              type="date"
              id="date"
              name="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="px-4 py-2 bg-white rounded-3xl border-b border-black focus:outline-none"
              required
            />
          </div>
          <div className="flex flex-col space-y-1 text-blue-800">
            <label htmlFor="image" className="font-medium">
            {content.post.imageTitle}
            </label>
            <input
              type="file"
              accept="image/*"
              id="image"
              name="image"
              onChange={handleImageChange}
              className="px-4 py-2 bg-white rounded-3xl border-b border-black focus:outline-none"
            />
          </div>
          <div className="flex flex-col space-y-1 text-blue-800">
            <label htmlFor="description" className="font-medium">
            {content.post.descriptionTitle}
            </label>
            <textarea
              id="description"
              name="description"
              value={description}
              placeholder="Enter the description of the item"
              onChange={(e) => setDescription(e.target.value)}
              className="px-4 py-2 bg-white rounded-3xl border-b border-black focus:outline-none"
              required
            />
          </div>
          <div className="flex flex-col space-y-1 text-blue-800">
            <label htmlFor="category" className="font-medium">
            {content.post.categoryTitle}
            </label>
            <select
              id="category"
              name="category"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="px-4 py-2 bg-white rounded-3xl border-b border-black focus:outline-none"
              required
            >
              {optionList}
            </select>
          </div>
          <div className="flex justify-center flex-col items-center">
              <button
                type="submit"
                className="mt-4 w-52  bg-blue-800 flex  items-center h-10 justify-center hover:bg-blue-700 text-white font-semibold py-2 rounded-lg transition duration-300"
              >
                {loading && (
                  <CgSpinner size={30} className="ml-5  animate-spin" />
                )}
                {content.post.postLabel}
              </button>
            </div>   
        </form>
      </div> 
    </div>
  </div>
</>

  );
};

export default PostItem;
