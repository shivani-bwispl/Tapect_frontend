import React from 'react';

const youtube = ({ buttonColor, textColor }) => {
    return (
        <svg width="58" height="58" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
            <g opacity="0.2" filter="url(#filter0_d_1613_300)">
                <circle cx="24" cy="24" r="20" fill={buttonColor} shapeRendering="crispEdges" />
            </g>
            <path
                d="M23.8205 17C24.2803 17.0026 25.4307 17.0138 26.6534 17.0629L27.0873 17.0818C28.3178 17.1395 29.5473 17.2394 30.1578 17.409C30.9715 17.638 31.6104 18.3045 31.8265 19.15C32.1709 20.4933 32.214 23.1125 32.2191 23.7471L32.22 23.878V24.0278C32.214 24.6624 32.1709 27.2826 31.8265 28.6249C31.6078 29.4731 30.968 30.1404 30.1578 30.366C29.5473 30.5356 28.3178 30.6355 27.0873 30.6932L26.6534 30.713C25.4307 30.7612 24.2803 30.7732 23.8205 30.775L23.6182 30.7758H23.3986C22.4256 30.7698 18.3563 30.7259 17.0613 30.366C16.2485 30.1369 15.6088 29.4705 15.3926 28.6249C15.0482 27.2817 15.0052 24.6624 15 24.0278V23.7471C15.0052 23.1125 15.0482 20.4924 15.3926 19.15C15.6113 18.3019 16.2511 17.6346 17.0622 17.4099C18.3563 17.0491 22.4265 17.0052 23.3995 17H23.8205ZM21.8875 20.8747V26.902L27.0537 23.8883L21.8875 20.8747Z"
                fill={textColor}
            />
            <defs>
                <filter id="filter0_d_1613_300" x="0" y="0" width="48" height="48" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
                    <feFlood floodOpacity="0" result="BackgroundImageFix" />
                    <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha" />
                    <feOffset />
                    <feGaussianBlur stdDeviation="2" />
                    <feComposite in2="hardAlpha" operator="out" />
                    <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0" />
                    <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_1613_300" />
                    <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_1613_300" result="shape" />
                </filter>
            </defs>
        </svg>
    );
};

export default youtube;
