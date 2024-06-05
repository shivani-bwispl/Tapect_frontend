import React from 'react';

const reviews = ({ buttonColor, textColor }) => {
    return (
        <svg width="58" height="58" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
            <g opacity="0.2" filter="url(#filter0_d_1613_304)">
                <circle cx="24" cy="24" r="20" fill={buttonColor} shapeRendering="crispEdges" />
            </g>
            <path
                d="M32.7107 22.0428H24.6044V25.3746H29.2353C29.0356 26.4516 28.4298 27.3625 27.5166 27.9728C26.7448 28.4888 25.7599 28.7939 24.6021 28.7939C22.3607 28.7939 20.4649 27.2795 19.7873 25.2445C19.6168 24.7285 19.518 24.1765 19.518 23.6089C19.518 23.0412 19.6168 22.4893 19.7873 21.9733C20.4671 19.9405 22.363 18.4261 24.6044 18.4261C25.8676 18.4261 27.0006 18.8613 27.8936 19.7139L30.3616 17.2436C28.8696 15.8526 26.9243 15 24.6044 15C21.2412 15 18.3312 16.9295 16.9154 19.7431C16.3321 20.9053 16 22.2201 16 23.6111C16 25.0022 16.3321 26.3147 16.9154 27.4769C18.3312 30.2905 21.2412 32.22 24.6044 32.22C26.9288 32.22 28.8763 31.4482 30.2988 30.1334C31.9254 28.6346 32.8655 26.4269 32.8655 23.8041C32.8655 23.1938 32.8117 22.6082 32.7107 22.0428Z"
                fill={textColor}
            />
            <defs>
                <filter id="filter0_d_1613_304" x="0" y="0" width="48" height="48" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
                    <feFlood floodOpacity="0" result="BackgroundImageFix" />
                    <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha" />
                    <feOffset />
                    <feGaussianBlur stdDeviation="2" />
                    <feComposite in2="hardAlpha" operator="out" />
                    <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0" />
                    <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_1613_304" />
                    <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_1613_304" result="shape" />
                </filter>
            </defs>
        </svg>
    );
};

export default reviews;
