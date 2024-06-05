import React from 'react';

const mediakits = ({ buttonColor, textColor }) => {
    return (
        <svg width="58" height="58" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
            <g opacity="0.2" filter="url(#filter0_d_1613_374)">
                <circle cx="24" cy="24" r="20" fill={buttonColor} shapeRendering="crispEdges" />
            </g>
            <g filter="url(#filter1_i_1613_374)">
                <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M28.325 15H18.895C16.7425 15 15 16.7425 15 18.895V28.325C15 30.4775 16.7425 32.22 18.895 32.22H28.325C30.4775 32.22 32.22 30.4775 32.22 28.325V18.895C32.22 16.7425 30.4775 15 28.325 15ZM23.5784 22.2246L22.5253 21.6452L26.704 19.3457C27.7673 18.7606 29.0688 19.5299 29.0688 20.7436V26.4432C29.0688 27.6569 27.7673 28.4263 26.704 27.8411L22.5253 25.5416L23.5784 24.9622L27.1935 26.9515C27.5802 27.1643 28.0534 26.8846 28.0534 26.4432V20.7436C28.0534 20.3022 27.5802 20.0225 27.1935 20.2353L23.5784 22.2246ZM25.6315 24.9913L20.4527 27.8411C19.3893 28.4263 18.0879 27.657 18.0879 26.4432V20.7436C18.0879 19.5299 19.3893 18.7606 20.4527 19.3457L25.6315 22.1955C26.7332 22.8018 26.7332 24.385 25.6315 24.9913ZM25.142 24.1017C25.5426 23.8813 25.5426 23.3056 25.142 23.0851L19.9632 20.2353C19.5765 20.0225 19.1033 20.3022 19.1033 20.7436V26.4432C19.1033 26.8846 19.5765 27.1643 19.9632 26.9515L25.142 24.1017Z"
                    fill={textColor}
                />
            </g>
            <defs>
                <filter id="filter0_d_1613_374" x="0" y="0" width="48" height="48" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
                    <feFlood floodOpacity="0" result="BackgroundImageFix" />
                    <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha" />
                    <feOffset />
                    <feGaussianBlur stdDeviation="2" />
                    <feComposite in2="hardAlpha" operator="out" />
                    <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0" />
                    <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_1613_374" />
                    <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_1613_374" result="shape" />
                </filter>
                <filter id="filter1_i_1613_374" x="15" y="14" width="17.22" height="18.22" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
                    <feFlood floodOpacity="0" result="BackgroundImageFix" />
                    <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape" />
                    <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha" />
                    <feOffset dy="-1" />
                    <feGaussianBlur stdDeviation="0.5" />
                    <feComposite in2="hardAlpha" operator="arithmetic" k2="-1" k3="1" />
                    <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.12 0" />
                    <feBlend mode="normal" in2="shape" result="effect1_innerShadow_1613_374" />
                </filter>
            </defs>
        </svg>
    );
};

export default mediakits;
