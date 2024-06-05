import React from 'react';

const googlemap = ({ buttonColor, textColor }) => {
    return (
        <svg width="58" height="58" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
            <g opacity="0.2" filter="url(#filter0_d_1613_312)">
                <circle cx="24" cy="24" r="20" fill={buttonColor} shapeRendering="crispEdges" />
            </g>
            <path
                d="M24.027 23.1795C23.4561 23.1795 22.9086 22.9527 22.505 22.549C22.1013 22.1454 21.8745 21.5979 21.8745 21.027C21.8745 20.4561 22.1013 19.9086 22.505 19.505C22.9086 19.1013 23.4561 18.8745 24.027 18.8745C24.5979 18.8745 25.1454 19.1013 25.549 19.505C25.9527 19.9086 26.1795 20.4561 26.1795 21.027C26.1795 21.3097 26.1238 21.5896 26.0157 21.8507C25.9075 22.1119 25.7489 22.3492 25.549 22.549C25.3492 22.7489 25.1119 22.9075 24.8507 23.0157C24.5896 23.1238 24.3097 23.1795 24.027 23.1795ZM24.027 15C22.4285 15 20.8955 15.635 19.7653 16.7653C18.635 17.8955 18 19.4285 18 21.027C18 25.5472 24.027 32.22 24.027 32.22C24.027 32.22 30.054 25.5472 30.054 21.027C30.054 19.4285 29.419 17.8955 28.2887 16.7653C27.1585 15.635 25.6255 15 24.027 15Z"
                fill={textColor}
            />
            <defs>
                <filter id="filter0_d_1613_312" x="0" y="0" width="48" height="48" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
                    <feFlood floodOpacity="0" result="BackgroundImageFix" />
                    <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha" />
                    <feOffset />
                    <feGaussianBlur stdDeviation="2" />
                    <feComposite in2="hardAlpha" operator="out" />
                    <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0" />
                    <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_1613_312" />
                    <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_1613_312" result="shape" />
                </filter>
            </defs>
        </svg>
    );
};

export default googlemap;
