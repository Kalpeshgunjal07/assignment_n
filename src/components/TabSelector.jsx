import React from "react";
import "../styles/App.css";

const TabSelector = ({ tabs, selectedTab, onTabChange }) => {
  return (
    <div className="tab-container">
      {tabs.map((tab) => (
        <button
          key={tab}
          onClick={() => onTabChange(tab)}
          className={`tab-button ${selectedTab === tab ? "active" : ""}`}
        >
          {tab}
        </button>
      ))}
    </div>
  );
};

export default TabSelector;
