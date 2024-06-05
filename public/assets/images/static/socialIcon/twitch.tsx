import React from 'react';

const twitch = ({ buttonColor, textColor }) => {
    return (
        <svg width="58" height="58" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
            <g opacity="0.2" filter="url(#filter0_d_1613_302)">
                <circle cx="24" cy="24" r="20" fill={buttonColor} shapeRendering="crispEdges" />
            </g>
            <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M16.7858 15C16.5774 15 16.3775 15.0828 16.2302 15.2302C16.0828 15.3775 16 15.5774 16 15.7858V28.1791C16 28.3875 16.0828 28.5874 16.2302 28.7347C16.3775 28.8821 16.5774 28.9649 16.7858 28.9649H20.3796V31.6105C20.38 31.7311 20.416 31.849 20.4832 31.9492C20.5504 32.0494 20.6457 32.1275 20.7572 32.1736C20.8686 32.2197 20.9913 32.2318 21.1096 32.2083C21.2279 32.1849 21.3367 32.127 21.4222 32.0418L24.5 28.9649H28.5539C28.7623 28.9647 28.962 28.8818 29.1092 28.7344L31.4859 26.3577C31.6333 26.2105 31.7162 26.0108 31.7164 25.8024V15.7858C31.7164 15.5774 31.6336 15.3775 31.4863 15.2302C31.3389 15.0828 31.139 15 30.9306 15H16.7858ZM23.1763 19.5403C23.1763 19.3666 23.1073 19.2001 22.9845 19.0772C22.8617 18.9544 22.6951 18.8854 22.5214 18.8854C22.3478 18.8854 22.1812 18.9544 22.0584 19.0772C21.9356 19.2001 21.8666 19.3666 21.8666 19.5403V23.2703C21.8666 23.444 21.9356 23.6106 22.0584 23.7334C22.1812 23.8562 22.3478 23.9252 22.5214 23.9252C22.6951 23.9252 22.8617 23.8562 22.9845 23.7334C23.1073 23.6106 23.1763 23.444 23.1763 23.2703V19.5403ZM27.5559 19.5403C27.5559 19.3666 27.4869 19.2001 27.3641 19.0772C27.2413 18.9544 27.0748 18.8854 26.9011 18.8854C26.7274 18.8854 26.5608 18.9544 26.438 19.0772C26.3152 19.2001 26.2462 19.3666 26.2462 19.5403V23.2703C26.2462 23.444 26.3152 23.6106 26.438 23.7334C26.5608 23.8562 26.7274 23.9252 26.9011 23.9252C27.0748 23.9252 27.2413 23.8562 27.3641 23.7334C27.4869 23.6106 27.5559 23.444 27.5559 23.2703V19.5403Z"
                fill={textColor}
            />
            <defs>
                <filter id="filter0_d_1613_302" x="0" y="0" width="48" height="48" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
                    <feFlood floodOpacity="0" result="BackgroundImageFix" />
                    <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha" />
                    <feOffset />
                    <feGaussianBlur stdDeviation="2" />
                    <feComposite in2="hardAlpha" operator="out" />
                    <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0" />
                    <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_1613_302" />
                    <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_1613_302" result="shape" />
                </filter>
            </defs>
        </svg>
    );
};

export default twitch;
