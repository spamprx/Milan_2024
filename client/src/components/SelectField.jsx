import React from 'react';
import Select from 'react-select';

const SelectField = ({ label, id, options, value, onChange, onMenuOpen, placeholder, isMulti }) => {
  const selectedValues = Array.isArray(value) ? value : [];

  // Disable options that are already selected
  const updatedOptions = options.map(option => ({
    ...option,
    isDisabled: selectedValues.some(v => v.value === option.value)
  }));

  return (
    <div className="mb-4">
      <label className="block text-gray-700 font-bold mb-2 text-left" htmlFor={id}>
        {label}
      </label>
      <Select
        id={id}
        options={options}
        value={value}
        onChange={onChange}
        onMenuOpen={onMenuOpen}
        placeholder={placeholder}
        isMulti={isMulti}
      />
    </div>
  );
};

export default SelectField;