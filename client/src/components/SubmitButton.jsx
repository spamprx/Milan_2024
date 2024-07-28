import React from 'react';

const SubmitButton = () => {
  return (
    <div className="flex items-center justify-center mb-4">
      <button
        className="bg-gray-900 text-white py-4 px-6 rounded hover:bg-gray-800 focus:outline-none focus:shadow-outline mb-8 mt-6"
        type="submit"
      >
        Submit
      </button>
    </div>
  );
};

export default SubmitButton;