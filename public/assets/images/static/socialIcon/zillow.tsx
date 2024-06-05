import React from 'react';

const zillow = ({ buttonColor, textColor }) => {
    return (
        <svg width="58" height="58" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
            <g opacity="0.2" filter="url(#filter0_d_1613_370)">
                <circle cx="24" cy="24" r="20" fill={buttonColor} shapeRendering="crispEdges" />
            </g>
            <path
                d="M23.8437 15L16.0086 21.1899V23.9652C18.4381 22.5208 24.0582 20.2844 26.6011 19.6494C26.68 19.6322 26.7159 19.653 26.7639 19.7054C27.0308 20.0117 27.9019 21.0679 28.1387 21.3563C28.1477 21.3664 28.1543 21.3784 28.1581 21.3914C28.162 21.4043 28.1629 21.418 28.1608 21.4314C28.1588 21.4447 28.1538 21.4575 28.1462 21.4687C28.1387 21.4799 28.1288 21.4893 28.1171 21.4962C26.359 22.8816 24.7545 24.4516 23.3314 26.1794C23.3099 26.2059 23.3271 26.2102 23.34 26.2009C25.2357 25.3872 29.6741 24.0914 31.6788 23.7241V21.1899L23.8437 15ZM23.4993 23.0195C21.9667 23.5275 17.6194 25.3923 16 26.3028V32.22H31.6788V26.5259C29.5335 26.889 23.1391 28.7932 20.2282 30.2899C20.202 30.3054 20.1712 30.3113 20.1411 30.3066C20.111 30.3019 20.0834 30.2869 20.0632 30.2641L18.5966 28.5213C18.5572 28.4775 18.5521 28.451 18.6045 28.372C19.7339 26.7218 22.0406 24.1395 23.5072 23.0496C23.5373 23.0281 23.5294 23.0066 23.4986 23.0195H23.4993Z"
                fill={textColor}
            />
            <defs>
                <filter id="filter0_d_1613_370" x="0" y="0" width="48" height="48" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
                    <feFlood floodOpacity="0" result="BackgroundImageFix" />
                    <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha" />
                    <feOffset />
                    <feGaussianBlur stdDeviation="2" />
                    <feComposite in2="hardAlpha" operator="out" />
                    <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0" />
                    <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_1613_370" />
                    <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_1613_370" result="shape" />
                </filter>
            </defs>
        </svg>
    );
};

export default zillow;
