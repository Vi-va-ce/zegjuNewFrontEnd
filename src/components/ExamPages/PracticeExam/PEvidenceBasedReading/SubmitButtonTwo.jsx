import React, { useState } from 'react';
import axios from 'axios';

function ConfirmationDialog({ open, onConfirm, onCancel }) {
  if (!open) {
    return null;
  }

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white rounded-lg p-8">
        <div className="text-center">proceed to the next step</div>
        <div className="flex justify-center mt-4">
          <button className="w-[72px] h-[30px] bg-emerald-700 hover:bg-emerald-900 rounded-full text-white" onClick={onConfirm}>
            proceed
          </button>
          <button className="ml-4 w-[72px] h-[30px] bg-red-800 hover:bg-red-950 text-white rounded-full" onClick={onCancel}>
            cancel
          </button>
        </div>
      </div>
    </div>
  );
}

function SubmitButtonTwo({ onMessageReceived }) {
  const [showConfirmationDialog, setShowConfirmationDialog] = useState(false);

  const handleConfirm = async () => {
    try {
      const submitdata = {
        practice_section: 'EvidenceBasedReading',
        // Include any other relevant data to be sent to the API
      };
      Object.keys(localStorage).forEach((key) => {
        if (key.startsWith("explanation")) {
          localStorage.removeItem(key);
        }
      });

      const response = await axios.post('v2/student/practiceTestResult', submitdata);
      console.log(response.data);

      if (response.data === 'Response submitted') {
        onMessageReceived('Response submitted'); // Send message to parent component

        // Remove response data from local storage
        localStorage.removeItem('responseData');
      }
    } catch (error) {
      console.error('Error submitting user response:', error);
      // Handle the error as needed
    }
  };

  const handleCancel = () => {
    setShowConfirmationDialog(false);
  };

  const handleSubmit = () => {
    setShowConfirmationDialog(true);
  };

  return (
    <>
      <button className="w-[82px] h-[30px] bg-teal-700 hover:bg-teal-900 rounded-full" onClick={handleSubmit}>
        <div className="submit-text mb-1">Finish</div>
      </button>
      <ConfirmationDialog open={showConfirmationDialog} onConfirm={handleConfirm} onCancel={handleCancel} />
    </>
  );
}

export default SubmitButtonTwo;