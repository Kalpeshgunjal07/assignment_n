import React from "react";
import "../styles/App.css";

const StrategyList = ({ strategies }) => {
  return (
    <div className="strategy-list">
      {strategies.map((strategy, index) => (
        <div key={index} className="strategy-item">
          <span>{strategy}</span>
          <span>{index + 1} Strategies</span>
        </div>
      ))}
    </div>
  );
};

export default StrategyList;
