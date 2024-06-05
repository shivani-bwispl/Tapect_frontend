import React from 'react';

const hoobe = ({ buttonColor, textColor }) => {
    return (
        <svg width="58" height="58" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
            <g opacity="0.2" filter="url(#filter0_d_1613_364)">
                <circle cx="24" cy="24" r="20" fill={buttonColor} shapeRendering="crispEdges" />
            </g>
            <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M28.325 15H18.895C16.7425 15 15 16.7425 15 18.895V28.325C15 30.4775 16.7425 32.22 18.895 32.22H28.325C30.4775 32.22 32.22 30.4775 32.22 28.325V18.895C32.22 16.7425 30.4775 15 28.325 15ZM19.1246 21.6654C19.1246 21.6309 19.125 21.5968 19.1258 21.5631C20.4018 21.979 21.9513 22.2182 23.6104 22.2182C25.2689 22.2182 26.8179 21.9792 28.0936 21.5636C28.0944 21.5971 28.0948 21.6311 28.0948 21.6654C28.0948 22.2126 28.0705 22.7482 27.9896 23.2806C26.7894 23.5665 25.2715 23.7404 23.6104 23.7404C21.9673 23.7404 20.4643 23.5702 19.2703 23.2899C19.1666 22.7498 19.1246 22.2094 19.1246 21.6654ZM19.5566 24.3442C19.7433 24.8687 20.0003 25.3947 20.3457 25.9249C21.3196 26.0786 22.4288 26.1666 23.6104 26.1666C24.842 26.1666 25.995 26.071 26.9981 25.9051C27.3428 25.3715 27.5827 24.8483 27.7482 24.3274C26.5475 24.5716 25.1261 24.7109 23.6104 24.7109C22.1299 24.7109 20.7394 24.578 19.5566 24.3442ZM23.6097 29.17C22.5975 28.4358 21.8006 27.7187 21.1777 27.0124C21.9444 27.0935 22.7626 27.1371 23.6104 27.1371C24.4972 27.1371 25.3516 27.0894 26.1485 27.001C25.5202 27.6939 24.6939 28.4116 23.6097 29.17ZM23.6097 18.7434C25.6757 18.7434 27.4155 19.053 27.9359 20.5931C26.7521 20.9996 25.2533 21.2478 23.6104 21.2478C21.9669 21.2478 20.4677 20.9994 19.2836 20.5926C19.8042 19.0529 21.5439 18.7434 23.6097 18.7434Z"
                fill={textColor}
            />
            <defs>
                <filter id="filter0_d_1613_364" x="0" y="0" width="48" height="48" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
                    <feFlood floodOpacity="0" result="BackgroundImageFix" />
                    <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha" />
                    <feOffset />
                    <feGaussianBlur stdDeviation="2" />
                    <feComposite in2="hardAlpha" operator="out" />
                    <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0" />
                    <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_1613_364" />
                    <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_1613_364" result="shape" />
                </filter>
            </defs>
        </svg>
    );
};

export default hoobe;
