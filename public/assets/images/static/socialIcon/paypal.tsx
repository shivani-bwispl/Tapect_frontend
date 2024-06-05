import React from 'react';

const paypal = ({ buttonColor, textColor }) => {
    return (
        <svg width="58" height="58" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
            <g opacity="0.2" filter="url(#filter0_d_1613_351)">
                <circle cx="24" cy="24" r="20" fill={buttonColor} shapeRendering="crispEdges" />
            </g>
            <path
                d="M22.3158 24.5571C22.4115 24.5571 24.631 24.6527 25.9511 24.3275H25.9607C27.4818 23.9544 29.596 22.8829 30.1413 19.3815C30.1413 19.3815 31.3563 15 25.3293 15H20.1538C19.685 15 19.2832 15.3444 19.2067 15.8036L17.0063 29.7326C16.9585 30.0196 17.1881 30.2875 17.4751 30.2875H20.7565L21.5601 25.198C21.6175 24.8345 21.9332 24.5571 22.3158 24.5571Z"
                fill={textColor}
            />
            <path
                d="M30.9833 20.0608C30.2084 23.6292 27.7689 25.5138 23.8848 25.5138H22.4785L21.4932 31.7512C21.4549 32 21.6462 32.22 21.895 32.22H23.7126C24.0379 32.22 24.3249 31.9808 24.3727 31.6556C24.4493 31.2729 24.8702 28.4794 24.9563 28.0011C25.0041 27.6758 25.2911 27.4367 25.6164 27.4367H26.0373C28.7351 27.4367 30.8494 26.3365 31.4712 23.17C31.7199 21.888 31.586 20.8357 30.9833 20.0608Z"
                fill={textColor}
            />
            <defs>
                <filter id="filter0_d_1613_351" x="0" y="0" width="48" height="48" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
                    <feFlood floodOpacity="0" result="BackgroundImageFix" />
                    <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha" />
                    <feOffset />
                    <feGaussianBlur stdDeviation="2" />
                    <feComposite in2="hardAlpha" operator="out" />
                    <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0" />
                    <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_1613_351" />
                    <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_1613_351" result="shape" />
                </filter>
            </defs>
        </svg>
    );
};

export default paypal;
