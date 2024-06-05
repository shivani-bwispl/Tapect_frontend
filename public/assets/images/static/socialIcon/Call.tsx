import React from 'react';

const Call = ({ textColor, buttonColor,className }) => {
    return (
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <g>
                <circle opacity="0.3" cx="12" cy="12" r="10"  fill={buttonColor} />
                <path
                    d="M14.9343 17.4971C14.3502 17.4572 13.5267 17.2527 12.7229 16.9608C9.88888 15.9313 7.12357 13.1885 6.53585 9.35204C6.43135 8.66904 6.54135 8.04504 7.05128 7.53708C7.22217 7.36722 7.37421 7.17823 7.54117 7.00439C8.16974 6.3477 9.08824 6.33095 9.73921 6.96172C9.94545 7.16108 10.1552 7.35765 10.3564 7.56339C10.6318 7.83906 10.7913 8.21233 10.8013 8.6048C10.8114 8.99727 10.6712 9.37843 10.4102 9.66823C10.2531 9.84526 10.0881 10.0135 9.92228 10.1814C9.74117 10.3648 9.51606 10.4701 9.27446 10.5466C8.97628 10.6415 8.92089 10.7683 9.05642 11.0574C9.91285 12.8779 11.2534 14.1888 13.0781 14.9899C13.3221 15.0968 13.4348 15.0485 13.533 14.8029C13.7483 14.2643 14.1431 13.8715 14.5969 13.5541C15.1103 13.1953 15.8458 13.275 16.3321 13.6993C16.5988 13.9318 16.8535 14.178 17.0954 14.4369C17.3557 14.7195 17.5004 15.0921 17.5 15.479C17.4996 15.8658 17.3543 16.2381 17.0935 16.5202C17.0177 16.6039 16.9395 16.6857 16.8668 16.7718C16.4292 17.2881 15.8741 17.5298 14.9343 17.4971Z"
                    fill={textColor}
                />
            </g>
            <defs>
                <filter id="filter0_d_1984_5925" x="0" y="0" width="24" height="24" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
                    <feFlood floodOpacity="0" result="BackgroundImageFix" />
                    <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha" />
                    <feOffset />
                    <feGaussianBlur stdDeviation="1" />
                    <feComposite in2="hardAlpha" operator="out" />
                    <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0" />
                    <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_1984_5925" />
                    <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_1984_5925" result="shape" />
                </filter>
            </defs>
        </svg>
    );
};

export default Call;
