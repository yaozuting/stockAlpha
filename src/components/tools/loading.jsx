import React from 'react';
import '../../components.css/index.css'; // External CSS for clean separation

export default function Loading() {
  return (
    <div className="loading-container">
      <div className="spinner"></div>
      <h1 className="loading-text">Loading<span className="dot">.</span><span className="dot">.</span><span className="dot">.</span></h1>
    </div>
  );
}
