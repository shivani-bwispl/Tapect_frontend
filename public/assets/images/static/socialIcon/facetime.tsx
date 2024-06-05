import React from 'react';

const Facetime = ({ buttonColor, textColor }) => {
    return (
        <svg width="58" height="58" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
            <g opacity="0.2" filter="url(#filter0_d_2516_4837)">
                <circle cx="24" cy="24" r="20" fill={buttonColor} shapeRendering="crispEdges" />
            </g>
            <mask id="mask0_2516_4837" mask-type="luminance" maskUnits="userSpaceOnUse" x="13" y="13" width="22" height="22">
                <path
                    d="M30.785 15H16.435C16.0544 15 15.6894 15.1512 15.4203 15.4203C15.1512 15.6894 15 16.0544 15 16.435V30.785C15 31.1656 15.1512 31.5306 15.4203 31.7997C15.6894 32.0688 16.0544 32.22 16.435 32.22H30.785C31.1656 32.22 31.5306 32.0688 31.7997 31.7997C32.0688 31.5306 32.22 31.1656 32.22 30.785V16.435C32.22 16.0544 32.0688 15.6894 31.7997 15.4203C31.5306 15.1512 31.1656 15 30.785 15Z"
                    fill="white"
                    stroke="white"
                    strokeWidth="4"
                />
                <path
                    d="M23.6101 21.2183H17.8701V26.0017H23.6101V21.2183ZM28.8718 20.74L26.4801 22.6533V24.5667L28.8718 26.48V20.74Z"
                    fill={textColor}
                    stroke="black"
                    strokeWidth="4"
                    strokeLinejoin="round"
                />
            </mask>
            <g mask="url(#mask0_2516_4837)">
                <path d="M12.1299 12.1299H35.0899V35.0899H12.1299V12.1299Z" fill={textColor} />
            </g>
            <defs>
                <filter id="filter0_d_2516_4837" x="0" y="0" width="48" height="48" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
                    <feFlood floodOpacity="0" result="BackgroundImageFix" />
                    <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha" />
                    <feOffset />
                    <feGaussianBlur stdDeviation="2" />
                    <feComposite in2="hardAlpha" operator="out" />
                    <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0" />
                    <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_2516_4837" />
                    <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_2516_4837" result="shape" />
                </filter>
            </defs>
        </svg>
    );
};

export default Facetime;
