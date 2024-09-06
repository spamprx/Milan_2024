import React, { useState } from "react";
import { ChevronDown } from "lucide-react";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("SPORTS BOYS");

  const categories = ["SPORTS BOYS", "SPORTS GIRLS", "CULTI", "TECHY"];

  return (
    <div className="w-32">
      <div className="bg-indigo-900 rounded-lg overflow-hidden">
        <div
          className="px-4 py-2 bg-indigo-800 text-white flex justify-between items-center cursor-pointer"
          onClick={() => setIsOpen(!isOpen)}
        >
          <span>{selectedCategory}</span>
          <ChevronDown
            className={`transition-transform ${
              isOpen ? "transform rotate-180" : ""
            }`}
            size={16}
          />
        </div>
        {isOpen && (
          <div className="py-2">
            {categories.map((category, index) => (
              <div
                key={index}
                className="px-4 py-2 text-white flex items-center space-x-2 hover:bg-indigo-800 cursor-pointer"
                onClick={() => {
                  setSelectedCategory(category);
                  setIsOpen(false);
                }}
              >
                <span className="text-sm">{category}</span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
