import React from 'react';
import './LoadingOverlay.css'; // Thêm CSS cho hiệu ứng

const LoadingOverlay = () => {
    return (
        <div className="loading-overlay">
            <div className="spinner"></div>
        </div>
    );
};

export default LoadingOverlay;
