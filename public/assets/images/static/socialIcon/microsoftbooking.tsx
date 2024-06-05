import React from 'react';

const microsoftbooking = ({ buttonColor, textColor }) => {
    return (
        
        <svg width="58" height="58" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
            <g opacity="0.2" filter="url(#filter0_d_1613_378)">
                <circle cx="24" cy="24" r="20" fill={buttonColor} shapeRendering="crispEdges" />
            </g>
            <mask id="mask0_1613_378" style={{ maskType: 'luminance' }} maskUnits="userSpaceOnUse" x="15" y="15" width="18" height="18">
                <path d="M32.22 15H15V32.22H32.22V15Z" fill={textColor} />
            </mask>
            <g mask="url(#mask1_1613_378)">
    <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M28.325 15H18.895C16.7425 15 15 16.7425 15 18.895V28.325C15 30.4775 16.7425 32.22 18.895 32.22H28.325C30.4775 32.22 32.22 30.4775 32.22 28.325V18.895C32.22 16.7425 30.4775 15 28.325 15ZM20.2891 25.5956H27.3812C27.7034 25.5956 27.7219 25.6188 27.6871 25.9363C27.6083 26.8107 27.209 27.6251 26.5659 28.2228C25.9229 28.8205 25.0815 29.1593 24.2037 29.1741C23.3105 29.1865 22.4163 29.1823 21.5224 29.1782C21.0756 29.1762 20.6289 29.1741 20.1824 29.1741C20.0179 29.1741 19.9507 29.1138 19.9507 28.9423V25.9294C19.9507 25.6118 19.9692 25.5956 20.2891 25.5956ZM21.1052 24.0047C20.5195 23.4631 20.1332 22.7401 20.0086 21.9522C19.9716 21.7223 19.953 21.4898 19.953 21.2569V18.3552C19.9484 18.0493 19.9646 18.0354 20.2751 18.0354C21.2486 18.0354 22.2236 18.0392 23.2001 18.0469C23.4898 18.0469 23.513 18.0701 23.513 18.3622V24.6732C23.513 24.9374 23.5014 24.9513 23.2372 24.9374C22.4419 24.8748 21.6909 24.5462 21.1052 24.0047ZM27.4391 24.9606H24.4122C24.1828 24.9606 24.1527 24.9304 24.1503 24.7033V21.6509C24.1503 21.4423 24.199 21.4053 24.403 21.4192C25.1443 21.4716 25.8505 21.7555 26.4219 22.2308C26.9933 22.7061 27.401 23.3488 27.5875 24.0683C27.6342 24.2746 27.6683 24.4835 27.6895 24.694C27.7196 24.9281 27.6848 24.9606 27.4391 24.9606Z"
        fill={textColor}
    />
</g>

            <defs>
                <filter id="filter0_d_1613_378" x="0" y="0" width="48" height="48" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
                    <feFlood floodOpacity="0" result="BackgroundImageFix" />
                    <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha" />
                    <feOffset />
                    <feGaussianBlur stdDeviation="2" />
                    <feComposite in2="hardAlpha" operator="out" />
                    <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0" />
                    <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_1613_378" />
                    <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_1613_378" result="shape" />
                </filter>
                <filter id="filter1_i_1613_378" x="15" y="14" width="17.22" height="18.22" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
                    <feFlood floodOpacity="0" result="BackgroundImageFix" />
                    <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape" />
                    <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha" />
                    <feOffset dy="-1" />
                    <feGaussianBlur stdDeviation="0.5" />
                    <feComposite in2="hardAlpha" operator="arithmetic" k2="-1" k3="1" />
                    <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.12 0" />
                    <feBlend mode="normal" in2="shape" result="effect1_innerShadow_1613_378" />
                </filter>
            </defs>
        </svg>
    );
};

export default microsoftbooking;
