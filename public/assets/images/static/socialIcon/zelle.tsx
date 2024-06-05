import React from 'react';

const zelle = ({ buttonColor, textColor }) => {
    return (
        <svg width="58" height="58" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
            <g opacity="0.2" filter="url(#filter0_d_1613_353)">
                <circle cx="24" cy="24" r="20" fill={buttonColor} shapeRendering="crispEdges" />
            </g>
            <path
                d="M25.1612 32.22H23.1228C23.0308 32.22 22.9427 32.1835 22.8777 32.1185C22.8127 32.0535 22.7762 31.9654 22.7762 31.8734V29.8896H19.4779C19.3512 29.8894 19.2297 29.839 19.1402 29.7494C19.0506 29.6598 19.0002 29.5384 19 29.4117V27.8088C19.0001 27.7017 19.0359 27.5976 19.1019 27.5132L24.9416 20.0641H19.7397C19.6128 20.0641 19.4911 20.0137 19.4013 19.9239C19.3116 19.8342 19.2612 19.7125 19.2612 19.5855V17.8083C19.2612 17.545 19.4757 17.3304 19.739 17.3304H22.7741V15.3466C22.7741 15.1557 22.9297 15 23.1206 15H25.159C25.3499 15 25.5056 15.1557 25.5056 15.3466V17.3304H28.6073C28.8706 17.3304 29.0852 17.545 29.0852 17.8083V19.3416C29.085 19.4482 29.0494 19.5516 28.984 19.6358L23.1077 27.1559H28.6073C28.8706 27.1559 29.0852 27.3704 29.0852 27.6337V29.411C29.0852 29.5378 29.0349 29.6594 28.9453 29.7491C28.8557 29.8389 28.7341 29.8894 28.6073 29.8896H25.5077V31.8734C25.5077 31.9654 25.4712 32.0535 25.4062 32.1185C25.3412 32.1835 25.2531 32.22 25.1612 32.22Z"
                fill={textColor}
            />
            <defs>
                <filter id="filter0_d_1613_353" x="0" y="0" width="48" height="48" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
                    <feFlood floodOpacity="0" result="BackgroundImageFix" />
                    <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha" />
                    <feOffset />
                    <feGaussianBlur stdDeviation="2" />
                    <feComposite in2="hardAlpha" operator="out" />
                    <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0" />
                    <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_1613_353" />
                    <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_1613_353" result="shape" />
                </filter>
            </defs>
        </svg>
    );
};

export default zelle;
