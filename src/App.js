import React, { useState } from "react";
import "./App.css";

const App = () => {
  const dateArray = ["24-Apr-2024", "02-May-2024", "09-May-2024", "31-May-2024", "21-Jun-2024"];

  const strategyArray = [
    {
      View: "Bullish",
      Value: {
        "24-Apr-2024": ["Bull Call Spread", "Bull Put Spread", "Bull Put Spread", "Long Call", "Bull Put Spread", "Bull Call Spread", "Strategy1", "Bull Call Spread", "Strategy1", "Strategy1", "SpreadStrategy", "Bull Call Spread"],
        "02-May-2024": ["Bull Call Spread", "Bull Call Spread", "Bull Put Spread", "Long Call", "Long Call", "Long Call", "Bull Put Spread", "Bull Call Spread", "Strategy1", "Bull Call Spread", "Strategy2", "Strategy1", "Strategy2", "Bull Call Spread"],
        "09-May-2024": ["Strategy Put", "Strategy Call", "Strategy Call", "Strategy Call", "Strategy Put"]
      }
    },
    {
      View: "Bearish",
      Value: {
        "24-Apr-2024": ["Bear Call Spread", "Bear Call Spread", "Bear Call Spread", "Long Put", "Long Put", "Long Put", "Bear Call Spread"],
        "31-May-2024": ["Long Put", "Long Put", "Long Put", "Long Put", "Long Put"],
        "21-Jun-2024": ["Strategy3", "Strategy3", "Bear Put Spread", "Strategy3", "Long Put", "Long Put"]
      }
    },
    {
      View: "RangeBound",
      Value: {
        "24-Apr-2024": ["Short Straddle", "Short Strangle", "Short Strangle", "Iron Butterfly", "Short Strangle", "Short Straddle", "Strategy1", "Short Straddle", "Strategy1", "Strategy1", "SpreadStrategy", "Short Straddle"],
        "02-May-2024": ["Short Straddle", "Short Straddle", "Short Strangle", "Iron Butterfly", "Iron Butterfly", "Iron Butterfly", "Short Strangle", "Short Straddle", "Strategy1", "Short Straddle", "Strategy2", "Strategy1", "Strategy2", "Short Straddle"],
        "21-Jun-2024": ["Iron Condor", "Iron Butterfly", "Iron Butterfly", "Iron Butterfly", "Iron Condor"]
      }
    },
    {
      View: "Volatile",
      Value: {
        "02-May-2024": ["Long Straddle", "Long Strangle", "Long Strangle", "Long Strangle", "Long Straddle", "Strategy1", "Long Straddle", "Strategy1", "Strategy1", "Spread-Strategy", "Long Straddle"],
        "09-May-2024": ["Long Straddle", "Long Straddle", "Long Strangle", "Long Strangle", "Long Straddle", "Strategy1", "Long Straddle", "Strategy2", "Strategy1", "Strategy2", "Long Straddle"],
        "31-May-2024": ["Long Straddle", "Long Strangle", "Long Strangle", "Long Strangle", "Long Straddle"]
      }
    }
  ];

  const [selectedDate, setSelectedDate] = useState(dateArray[0]);
  const [selectedView, setSelectedView] = useState(strategyArray[0].View);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const formatDate = (dateString) => {
    const options = { day: "2-digit", month: "short", year: "numeric" };
    return new Intl.DateTimeFormat("en-GB", options).format(new Date(dateString));
  };

  const getStrategyCounts = (strategies) => {
    const strategyCount = {};
    strategies.forEach((strategy) => {
      strategyCount[strategy] = (strategyCount[strategy] || 0) + 1;
    });
    return strategyCount;
  };

  const currentStrategies =
    strategyArray.find((item) => item.View === selectedView)?.Value[selectedDate] || [];
  const strategyCounts = getStrategyCounts(currentStrategies);

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const handleDateSelect = (date) => {
    setSelectedDate(date);
    setIsDropdownOpen(false);
  };

  return (
    <div className="app">
      <div className="tab-container">
        {strategyArray.map((item) => (
          <button
            key={item.View}
            onClick={() => setSelectedView(item.View)}
            className={`tab-button ${selectedView === item.View ? "active" : ""}`}
          >
            {item.View}
          </button>
        ))}
      </div>

      <div className="dropdown-container">
        <div
          className={`dropdown ${isDropdownOpen ? "open" : ""}`}
          onClick={toggleDropdown}
        >
          <span>{formatDate(selectedDate)}</span>
          <span className="arrow">
            {isDropdownOpen ? (
              <i className="fas fa-angle-up"></i>
            ) : (
              <i className="fas fa-angle-down"></i>
            )}
          </span>
        </div>
        {isDropdownOpen && (
          <div className="dropdown-list">
            {dateArray.map((date) => (
              <div
                key={date}
                className="dropdown-item"
                onClick={() => handleDateSelect(date)}
              >
                {formatDate(date)}
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="strategy-list">
        {Object.keys(strategyCounts).length > 0 ? (
          Object.entries(strategyCounts).map(([strategy, count], index) => (
            <div key={index} className="strategy-card">
              <span>{strategy}</span>
              <span className="strategy-count">
                • {count} {count === 1 ? "Strategy" : "Strategies"}
              </span>
            </div>
          ))
        ) : (
          <div className="no-strategies">
            <p>There are no strategies for</p>
            <strong>{formatDate(selectedDate)}</strong>
          </div>
        )}
      </div>
    </div>
  );
};

export default App;
