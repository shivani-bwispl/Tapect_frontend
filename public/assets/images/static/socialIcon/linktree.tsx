import React from 'react';

const linktree = ({ buttonColor, textColor }) => {
    return (
        <svg width="58" height="58" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
            <g opacity="0.2" filter="url(#filter0_d_1613_358)">
                <circle cx="24" cy="24" r="20" fill={buttonColor} shapeRendering="crispEdges" />
            </g>
            <path
                d="M25.2584 19.1995L28.132 16.2456L29.8002 17.9532L26.7867 20.8268H31.0257V23.1982H26.7659L29.8002 26.1456L28.132 27.8203L24.0136 23.681L19.8944 27.8203L18.2262 26.1521L21.2605 23.2046H17V20.8268H21.2397L18.2262 17.9539L19.8937 16.2456L22.7673 19.1995V15H25.2584V19.1995ZM22.7673 26.5941H25.2584V32.22H22.7673V26.5941Z"
                fill={textColor}
            />
            <defs>
                <filter id="filter0_d_1613_358" x="0" y="0" width="48" height="48" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
                    <feFlood floodOpacity="0" result="BackgroundImageFix" />
                    <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha" />
                    <feOffset />
                    <feGaussianBlur stdDeviation="2" />
                    <feComposite in2="hardAlpha" operator="out" />
                    <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0" />
                    <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_1613_358" />
                    <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_1613_358" result="shape" />
                </filter>
            </defs>
        </svg>
    );
};

export default linktree;
