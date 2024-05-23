/* eslint-disable react/prop-types */
import  { useState } from "react";
import content from "../../../constants";

const ConfirmationDialog = ({ isOpen, onClose ,association}) => {
  const [inputValue, setInputValue] = useState("");

  const handleConfirm = () => {
    // Perform action on confirmation, e.g., submit inputValue
    console.log("Confirmed:", inputValue);
    onClose();
    const intInput=parseInt(inputValue)
    
    fetch(`http://localhost:5000/claims/${association}`,{
        method:"PATCH",
        headers:{
            "Content-Type":"Application/json"
        },
        body:JSON.stringify({item_id : intInput})
    }).then(resp=>resp.json())
    .then(data=>console.log(data));
  };

  const handleCancel = () => {
    // Action on cancellation, if needed
    onClose();
  };

  return (
    <div
      className={`fixed inset-0 z-50 bg-gray-800 bg-opacity-50 flex items-center justify-center ${
        isOpen ? "" : "hidden"
      }`}
    >
      <div className="bg-white p-8 rounded-md shadow-md">
        <h2 className="text-lg font-semibold mb-4">Enter associated item id</h2>
        <input
          type="text"
          placeholder="Enter something..."
          className="border border-gray-300 rounded-md p-2 w-full mb-4"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
        />
        <div className="flex justify-end">
          <button
            onClick={handleConfirm}
            className="bg-blue-500 text-white px-4 py-2 rounded-md mr-2"
          >
           {content.Dialog.confirm}
          </button>
          <button
            onClick={handleCancel}
            className="bg-gray-400 text-gray-800 px-4 py-2 rounded-md"
          >
            {content.Dialog.cancel}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmationDialog;
