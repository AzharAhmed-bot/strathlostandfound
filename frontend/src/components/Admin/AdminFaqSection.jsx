/* eslint-disable react/prop-types */
import { useState } from "react";
import { FaFontAwesomeFlag } from "react-icons/fa";
function AdminFaqSection({ question, answer, onSave }) {
  const [isOpen, setIsOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editedAnswer, setEditedAnswer] = useState(answer);

  const handleSave = () => {
    onSave(editedAnswer);
    setIsEditing(false);
  };

  return (
    <div className="border  border-gray-300 rounded-md mb-4">
      <div
        className="flex items-center justify-between px-4 py-3 cursor-pointer"
        onClick={() => setIsOpen(!isOpen)}
      >
        <div className="font-semibold text-lg flex items-center gap-2">
          {answer ? null: <FaFontAwesomeFlag className="text-green-400"/> } {question}
          </div>
        
        <div className="w-6 h-6 flex items-center justify-center rounded-full bg-gray-200">
          {isOpen ? (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4 text-gray-600"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M19 9l-7 7-7-7"
              />
            </svg>
          ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4 text-gray-600"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M9 5l7 7-7 7"
              />
            </svg>
          )}
        </div>
      </div>
      {isOpen && (
        <div className="px-4 py-3 border-t border-gray-300">
          {isEditing ? (
            <div className="flex items-center">
              <textarea
                className="w-full border rounded-md p-2"
                value={editedAnswer}
                onChange={(e) => setEditedAnswer(e.target.value)}
              />
              <button
                className="ml-4 bg-blue-500 text-white px-4 py-2 rounded-md"
                onClick={handleSave}
              >
                Save
              </button>
            </div>
          ) : (
            <>
              <p>{answer}</p>
              <button
                className="mt-2 bg-blue-500 text-white px-4 py-2 rounded-md"
                onClick={() => setIsEditing(true)}
              >
                Edit Answer
              </button>
            </>
          )}
        </div>
      )}
    </div>
  );
}

export default AdminFaqSection;
