"use client";

import React from "react";

// Generate larger dataset: 10 clients over 12 months
const generateRandomChange = () => (Math.random() * 24 - 12).toFixed(1); // Random value between -12% and +12%
const clients = [
  "Client A", "Client B", "Client C", "Client D", "Client E",
  "Client F", "Client G", "Client H", "Client I", "Client J"
];
const months = [
  "Apr 24", "May 24", "Jun 24", "Jul 24", "Aug 24", "Sep 24",
  "Oct 24", "Nov 24", "Dec 24", "Jan 25", "Feb 25", "Mar 25"
];

const heatmapData = clients.map((client) => ({
  client,
  changes: Array(12).fill(0).map(() => parseFloat(generateRandomChange())),
}));

const getColor = (value) => {
  if (value > 10) return "btn-success brightness-150";
  if (value > 5) return "btn-success brightness-100";
  if (value > 0) return "btn-success brightness-50";
  if (value < -10) return "btn-error brightness-150";
  if (value < -5) return "btn-error brightness-100";
  if (value < 0) return "btn-error brightness-50";
  return "btn-neutral btn-ghost"; // Neutral
};

//Mockup for a component that displays a heatmap of portfolio performance
//Generated from AI with adjustments to make it look nicer
//Will most likely be replaced with a real component before adding it to the app
const Heatmap = () => {
  const handleClick = (client, month, value) => {
    alert(`Clicked: ${client} - ${month}: ${value.toFixed(1)}%`);
    // Replace with real action, e.g., router.push(`/client/${client}/${month}`);
  };

  return (
    <div className="w-full p-4 bg-base-100 rounded-lg shadow-lg">
      <h2 className="text-xl font-bold mb-4">Portfolio Performance Heatmap</h2>
      <div className="overflow-x-auto">
        {/* Grid Container */}
        <div
          className="grid w-260"
          style={{
            gridTemplateColumns: `repeat(${months.length + 1}, minmax(0, 1fr))`, // +1 for client column
          }}
        >
          {/* Header Row */}
          <div className="font-semibold text-center p-2 bg-base-200 rounded-tl-lg">
            Client
          </div>
          {months.map((month, index) => (
            <div
              key={index}
              className={`font-semibold text-center p-2 bg-base-200 ${index === months.length - 1 ? "rounded-tr-lg" : ""
                }`}
            >
              {month}
            </div>
          ))}

          {/* Data Rows */}
          {heatmapData.map((row, rowIndex) => (
            <React.Fragment key={rowIndex}>
              {/* Client Name */}
              <div className="font-semibold text-center bg-base-200">
                {row.client}
              </div>
              {/* Heatmap Cells */}
              {row.changes.map((change, colIndex) => (
                <div
                  key={colIndex}
                  className="flex justify-center items-center"
                >
                  <div
                    className="tooltip"
                    data-tip={`${row.client} - ${months[colIndex]}: ${change.toFixed(1)}%`}
                  >
                    <button
                      className={`btn w-20 h-20 rounded-none ${getColor(change)}`}
                      onClick={() =>
                        handleClick(row.client, months[colIndex], change)
                      }
                    >
                      {change.toFixed(1)}%
                    </button>
                  </div>
                </div>
              ))}
            </React.Fragment>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Heatmap;
