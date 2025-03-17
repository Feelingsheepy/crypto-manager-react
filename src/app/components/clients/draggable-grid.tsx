"use client";

import React, { useRef, useState } from "react";

//Mockup of a component that displays a draggable grid with clickable buttons
//Generated from AI, I have not adjusted it and it does not look very good right now
//Will most likely be replaced with a real component before adding it to the app (I want to use it for the heatmap)
const DraggableGridWithClick = () => {
  const containerRef = useRef(null);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);
  const [dragDistance, setDragDistance] = useState(0);

  const DRAG_THRESHOLD = 5; // Pixels moved before considering it a drag

  // Start dragging
  const handleMouseDown = (e) => {
    setIsDragging(true);
    setStartX(e.pageX - containerRef.current.offsetLeft);
    setScrollLeft(containerRef.current.scrollLeft);
    setDragDistance(0); // Reset distance
    containerRef.current.style.cursor = "grabbing";
  };

  // Move while dragging
  const handleMouseMove = (e) => {
    if (!isDragging) return;
    e.preventDefault();
    const x = e.pageX - containerRef.current.offsetLeft;
    const walk = x - startX;
    setDragDistance(Math.abs(walk)); // Track how far the mouse moved
    if (dragDistance > DRAG_THRESHOLD) {
      containerRef.current.scrollLeft = scrollLeft - walk * 1.5;
    }
  };

  // Stop dragging
  const handleMouseUp = () => {
    setIsDragging(false);
    containerRef.current.style.cursor = "grab";
  };

  // Handle button click
  const handleButtonClick = (item) => {
    if (dragDistance <= DRAG_THRESHOLD) {
      alert(`Clicked: ${item}`); // Only fires if not dragged
    }
  };

  return (
    <div className="p-4 bg-base-100 rounded-lg shadow-lg max-w-4xl mx-auto">
      <h2 className="text-xl font-bold mb-4">Draggable Grid with Clicks</h2>
      <div
        ref={containerRef}
        className="grid gap-2 overflow-x-auto select-none"
        style={{
          gridTemplateColumns: "repeat(20, minmax(0, 100px))",
          cursor: "grab",
        }}
        onMouseDown={handleMouseDown}
        onMouseUp={handleMouseUp}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseUp} // Use handleMouseUp for consistency
      >
        {/* Header Row */}
        {Array.from({ length: 20 }, (_, i) => (
          <div
            key={i}
            className="bg-base-200 text-center p-2 font-semibold rounded"
          >
            Col {i + 1}
          </div>
        ))}
        {/* Data Rows with Clickable Buttons */}
        {Array.from({ length: 5 }, (_, row) =>
          Array.from({ length: 20 }, (_, col) => (
            <div
              key={`${row}-${col}`}
              className="flex justify-center items-center p-2"
            >
              <button
                className="btn btn-sm btn-primary"
                onClick={() => handleButtonClick(`Item ${row + 1}-${col + 1}`)}
              >
                {row + 1}-{col + 1}
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default DraggableGridWithClick;
