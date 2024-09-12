import React, { useState, useEffect } from "react";
import { ChevronDown } from "lucide-react";

const Filter = ({ options, onCategoryChange, title, isSingle }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedCategories, setSelectedCategories] = useState([]);

  // Set "Select All" as default when the component mounts and for single mode
  useEffect(() => {
    if (isSingle) {
      setSelectedCategories(options.length > 0 ? ["Select All"] : []);
    }
  }, [isSingle, options]);

  const handleCategoryChange = (category) => {
    if (isSingle) {
      setSelectedCategories([category]);
      setIsOpen(false);
      if (onCategoryChange) {
        onCategoryChange(category);
      }
    } else {
      setSelectedCategories((prev) =>
        prev.includes(category)
          ? prev.filter((c) => c !== category)
          : [...prev, category]
      );
    }
  };

  const handleSave = () => {
    setIsOpen(false);
    if (onCategoryChange) {
      onCategoryChange(selectedCategories);
    }
  };

  const handleSelectAll = () => {
    if (isSingle) {
      setSelectedCategories(["Select All"]);
      setIsOpen(false);
      if (onCategoryChange) {
        onCategoryChange("Select All");
      }
    } else {
      if (selectedCategories.length === options.length) {
        setSelectedCategories([]);
      } else {
        setSelectedCategories([...options]);
      }
    }
  };

  return (
    <div className="w-full md:w-1/3 md:mx-12 max-w-52 scale-75 md:scale-100 sm:min-w-44">
      <div className="bg-[#270B5D] rounded-2xl overflow-hidden">
        <div
          className="px-4 py-2 bg-[#6539BA] text-white flex flex-col rounded-2xl justify-between items-center cursor-pointer"
          onClick={() => setIsOpen(!isOpen)}
        >
          <div className="flex justify-between items-center w-full text-[#D1CCB6] font-extralight">
            {title}
            <ChevronDown
              className={`transition-transform ${
                isOpen ? "transform rotate-180" : ""
              }`}
              size={24}
            />
          </div>
          <span className="text-md text-[#D1CCB6] font-bold text-left w-full">
            {isSingle
              ? selectedCategories[0]
              : `${selectedCategories.length} selected`}
          </span>
        </div>

        {isOpen && (
          <div className="py-2 px-4 text-white">
            {/* "Select All" option visible even when `isSingle` is true */}
            <div
              className="flex items-center cursor-pointer space-x-2 py-2 hover:bg-[#6539BA] rounded-lg"
              onClick={handleSelectAll}
            >
              <div
                className={`w-4 h-4 border-2 rounded-full ${
                  selectedCategories.includes("Select All")
                    ? "bg-white border-white"
                    : "border-white"
                }`}
              ></div>
              <span className="text-sm text-[#D1CCB6] truncate text-left">
                Select All
              </span>
            </div>

            {options.map((category, index) => (
              <div
                key={index}
                className="flex items-center cursor-pointer space-x-2 py-2 hover:bg-[#6539BA] rounded-lg"
                onClick={() => handleCategoryChange(category)}
              >
                <div
                  className={`w-4 h-4 border-2 rounded-full ${
                    selectedCategories.includes(category)
                      ? "bg-white border-white"
                      : "border-white"
                  }`}
                ></div>
                <span className="text-sm text-[#D1CCB6] truncate text-left">
                  {category}
                </span>
              </div>
            ))}

            {!isSingle && (
              <div
                className="mt-4 py-2 px-4 bg-[#6539BA] text-center text-white cursor-pointer rounded-md hover:bg-[#5328A4]"
                onClick={handleSave}
              >
                Save
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Filter;
