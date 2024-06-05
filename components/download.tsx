import React from 'react';

const Download = ({ textColor, onClick }) => {
    const handleDownloadClick = () => {
        // Handle download logic here
        // For example, initiate a file download
        console.log('Downloading...');
    };

    return (
        <div>
            {/* Your download button */}
            <button style={{ color: textColor }} onClick={onClick || handleDownloadClick}>
                Download
            </button>
        </div>
    );
};

Download.defaultProps = {
    textColor: 'black', // Default text color
    onClick: null, // Default onClick handler
};

export default Download;
