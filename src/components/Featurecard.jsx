import React from "react";

const FeatureCard = ({ title, desc, price, hours, onToggle, isSelected }) => {
  return (
    <label className="flex items-start gap-4 p-4 border rounded-xl shadow-sm transition-all duration-300 cursor-pointer hover:shadow-lg">
      <input
        type="checkbox"
        className="mt-1 accent-purple-600 w-5 h-5"
        checked={isSelected}
        onChange={onToggle}
      />
      <div className="flex flex-col">
        <h3 className="font-semibold text-lg text-gray-800">
          {title}
        </h3>
        <p className="text-sm text-gray-600 mt-1">
          {desc}
        </p>
        <div className="text-sm mt-3 text-gray-700">
          💲{price} • 🕒 {hours} hours
        </div>
      </div>
    </label>
  );
};

export default FeatureCard;
