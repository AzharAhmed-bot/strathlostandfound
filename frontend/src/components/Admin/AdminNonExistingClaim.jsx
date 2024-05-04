/* eslint-disable react/prop-types */
import AdminNavProfile from "./AdminNavProfile";
import content from "../../../constants";
import {getUserName,getItemName,getCategoryName } from "../../services/getters";
import deleteByValue from "../../services/stateUpdaters/delete";
import defaultImage from "../../assets/default.webp";
import {toast, Toaster} from "react-hot-toast";
import {useState,useEffect} from "react";
import { FaInfo, FaThumbtack, FaTrash, FaTimesCircle, FaCheckCircle,FaClock, FaAlignLeft, FaMapMarkerAlt } from 'react-icons/fa'
import ConfirmationDialog from "./ConfirmationDialog";
const defaultUserImage =defaultImage;
 

const AdminNonExistingClaim = ({ claims ,users,categories,items}) => {
    const [nonExistingClaim,setNonExistingClaim]=useState([])
    const [isOpen,setisOpen]=useState(false)
    const [association,setAssociation]=useState(null)

    
    useEffect(() => {
      setNonExistingClaim(claims && claims.filter((claim) => claim.item_id === null));
    }, [claims]);

     function handleNonExistingRejectClaim(data) {
      if(data.Status==="Inactive"){
        toast.error("Item already claimed")
      }
    }
    
     function handleNonExistingDeleteClaim(data){
      
      fetch(`http://localhost:5000/claims/${data.id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'Application/json',
        }
      })
        .then((resp) => resp.json())
        .then(() => {
          toast.success("Claim deleted Successfully!")
          console.log('Claim deleted successfully');
          deleteByValue(data,setNonExistingClaim);
         
        })
        .catch((error) => console.log(error));
      }
     

       function handleClaim(claim){
        
        setAssociation(claim.id)
        setisOpen(!isOpen)
       }

       function onClose(){
        setisOpen(false);
       }

      return (
        <div className="bg-gray-100 min-h-screen pt-16">
        <AdminNavProfile />
        <Toaster toastOptions={{ duration: 2000 }} />
        <ConfirmationDialog isOpen={isOpen} onClose={onClose} association={association} />
  <div className="container mx-auto mt-12">
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {nonExistingClaim &&
        nonExistingClaim.map((claim) => (
          <div key={claim.id} className="w-auto px-5 py-3 bg-white rounded-2xl flex flex-col justify-start items-start gap-3 overflow-hidden shadow-lg transition duration-300 transform hover:scale-105">
            <img
              src={claim.image_proof || defaultUserImage}
              alt="Image proof"
              className="w-full h-auto rounded-2xl"
            />
            <div className="text-indigo-600 text-lg font-semibold font-inter">{content.AdminNonExistingClaim.claimTitle}{getUserName(claim.user_id,users)}</div>
            <div className="text-indigo-600 text-lg font-semibold font-inter">{content.AdminNonExistingClaim.itemTitle}{getItemName(claim.item_id,items)}</div>
            <div className="flex items-center gap-3">
              <FaInfo/>
              <div className="text-gray-600 text-lg font-medium font-inter">{content.AdminNonExistingClaim.claimIdTitle}{claim.id}</div>
            </div>
            <div className="flex items-center gap-3">
              <FaAlignLeft/>
              <div className="text-gray-600 text-lg font-medium font-inter">{content.AdminNonExistingClaim.descriptionTitle}{claim.description_proof}</div>
            </div>
            <div className="flex items-center gap-3">
            <FaThumbtack className="inline-block mr-2" />
              <div className="text-gray-600 text-lg font-medium font-inter">{content.AdminNonExistingClaim.categoryTitle}{getCategoryName(claim.category_id,categories)}</div>
            </div>
            <div className="flex items-center gap-3">
              <FaMapMarkerAlt/>
              <div className="text-gray-600 text-lg font-medium font-inter">{content.AdminNonExistingClaim.locationTitle}{claim.location}</div>
            </div>
            <div className='flex items-center gap-2'>
                  {claim.Status === 'Active' && <FaCheckCircle className="text-green-500" />}
                  {claim.Status === 'Inactive' && <FaTimesCircle className="text-red-500" />}
                  {claim.Status === 'Pending' && <FaClock className="text-yellow-500" />}
                  <p className={`text-lg font-medium font-inter ${
                    claim.Status === 'Active' ? 'text-green-500' :
                    claim.Status === 'Inactive' ? 'text-red-500' :
                    'text-yellow-500'
                  }`}>
                    {content.AdminNonExistingClaim.statusTitle}{claim.Status}
                  </p>
                </div>
            <div className="flex space-x-2">
              <button
                onClick={() => handleClaim(claim)}
                className="bg-green-600 text-white rounded-md px-4 py-2 hover:bg-green-700"
              >
                <FaThumbtack className="inline-block mr-2" />{content.AdminNonExistingClaim.claimButton}
              </button>
              <button
                onClick={() => handleNonExistingRejectClaim(claim)}
                className="bg-yellow-600 text-white rounded-md px-4 py-2 hover:bg-yellow-500"
              >
                <FaTimesCircle className="inline-block mr-2" />{content.AdminNonExistingClaim.rejectButton} 
              </button>
              <button
                onClick={() => handleNonExistingDeleteClaim(claim)}
                className="bg-red-600 text-white rounded-md px-4 py-2 hover:bg-red-700"
              >
                <FaTrash className="inline-block mr-2" />{content.AdminNonExistingClaim.deleteButton} 
              </button>
            </div>
          </div>
        ))}
    </div>
  </div>
</div>


      );      
};

export default AdminNonExistingClaim;
