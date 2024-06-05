import React from 'react';

const venmo = ({ buttonColor, textColor }) => {
    return (
        <svg width="58" height="58" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
            <g opacity="0.2" filter="url(#filter0_d_1613_348)">
                <circle cx="24" cy="24" r="20" fill={buttonColor} shapeRendering="crispEdges" />
            </g>
            <path
                d="M30.8428 15H16.4714C15.6861 15 15 15.565 15 16.3411V30.744C15 31.5247 15.6861 32.22 16.4714 32.22H30.8386C31.6281 32.22 32.22 31.5204 32.22 30.7444V16.3411C32.2246 15.565 31.6281 15 30.8428 15ZM24.4556 28.6453H20.4704L18.8726 19.0913L22.3608 18.76L23.2064 25.5584C23.9955 24.2727 24.9699 22.2528 24.9699 20.874C24.9699 20.1199 24.8408 19.6056 24.639 19.1828L27.8151 18.5401C28.1825 19.1466 28.3478 19.7701 28.3478 20.5608C28.3474 23.0784 26.1984 26.3491 24.4556 28.6453Z"
                fill={textColor}
            />
            <defs>
                <filter id="filter0_d_1613_348" x="0" y="0" width="48" height="48" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
                    <feFlood floodOpacity="0" result="BackgroundImageFix" />
                    <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha" />
                    <feOffset />
                    <feGaussianBlur stdDeviation="2" />
                    <feComposite in2="hardAlpha" operator="out" />
                    <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0" />
                    <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_1613_348" />
                    <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_1613_348" result="shape" />
                </filter>
            </defs>
        </svg>
    );
};

export default venmo;
