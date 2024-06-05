import React from 'react';

const telegram = ({ buttonColor, textColor }) => {
    return (
        <svg width="58" height="58" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
            <g opacity="0.2" filter="url(#filter0_d_1613_310)">
                <circle cx="24" cy="24" r="20" fill={buttonColor} shapeRendering="crispEdges" />
            </g>
            <path
                d="M23.61 15C18.8573 15 15 18.8573 15 23.61C15 28.3627 18.8573 32.22 23.61 32.22C28.3627 32.22 32.22 28.3627 32.22 23.61C32.22 18.8573 28.3627 15 23.61 15ZM27.605 20.8548C27.4759 22.2152 26.9162 25.5214 26.6321 27.0454C26.5116 27.6911 26.2705 27.9064 26.0466 27.9322C25.5472 27.9753 25.1684 27.605 24.6862 27.2865C23.9286 26.7871 23.4981 26.4771 22.7662 25.995C21.9138 25.4353 22.4649 25.1254 22.9556 24.626C23.0848 24.4968 25.2889 22.4907 25.332 22.3099C25.338 22.2825 25.3372 22.2541 25.3297 22.2271C25.3222 22.2001 25.3082 22.1753 25.2889 22.1549C25.2373 22.1119 25.1684 22.1291 25.1081 22.1377C25.0306 22.1549 23.8252 22.9556 21.4747 24.5399C21.1303 24.7723 20.8204 24.8929 20.5448 24.8843C20.2349 24.8757 19.6494 24.7121 19.2103 24.5657C18.6679 24.3935 18.246 24.2988 18.2804 23.9974C18.2976 23.8425 18.5129 23.6875 18.9175 23.5239C21.4317 22.4304 23.102 21.7072 23.9372 21.3628C26.3308 20.364 26.8215 20.1918 27.1487 20.1918C27.2176 20.1918 27.3812 20.209 27.4845 20.2951C27.5706 20.364 27.5964 20.4587 27.605 20.5276C27.5964 20.5793 27.6136 20.7343 27.605 20.8548Z"
                fill={textColor}
            />
            <defs>
                <filter id="filter0_d_1613_310" x="0" y="0" width="48" height="48" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
                    <feFlood floodOpacity="0" result="BackgroundImageFix" />
                    <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha" />
                    <feOffset />
                    <feGaussianBlur stdDeviation="2" />
                    <feComposite in2="hardAlpha" operator="out" />
                    <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0" />
                    <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_1613_310" />
                    <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_1613_310" result="shape" />
                </filter>
            </defs>
        </svg>
    );
};

export default telegram;
