import React from 'react';

const InputField = ({ label, id, type, placeholder, value, onChange , readOnly, }) => {
  return (
    <div className="mb-4">
      <label
        className="block text-gray-700 font-bold mb-2 text-left"
        htmlFor={id}
      >
        {label}
      </label>
      <input
        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        id={id}
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        readOnly={readOnly}
        disabled={readOnly}
      />
    </div>
  );
};

export default InputField;