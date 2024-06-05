import React from 'react';

const MailBox = ({ textColor, buttonColor,className }) => {
    return (
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <g>
                <circle opacity="0.3" cx="12" cy="12" r="10"  fill={buttonColor} />
                <path
                    d="M12.9193 13.1588C12.6456 13.3413 12.3277 13.4377 12 13.4377C11.6723 13.4377 11.3544 13.3413 11.0807 13.1588L6.57324 10.1538C6.54823 10.1371 6.52387 10.1197 6.5 10.1018V15.026C6.5 15.5905 6.95815 16.0386 7.51262 16.0386H16.4874C17.0519 16.0386 17.5 15.5805 17.5 15.026V10.1018C17.4761 10.1197 17.4517 10.1371 17.4266 10.1538L12.9193 13.1588Z"
                    fill={textColor}
                />
                <path
                    d="M6.93076 9.61746L11.4382 12.6226C11.6089 12.7363 11.8044 12.7932 12 12.7932C12.1956 12.7932 12.3911 12.7363 12.5618 12.6226L17.0692 9.61746C17.339 9.43774 17.5 9.13696 17.5 8.81233C17.5 8.25414 17.0459 7.80005 16.4877 7.80005H7.51228C6.95412 7.80007 6.5 8.25416 6.5 8.81287C6.5 9.13696 6.66105 9.43774 6.93076 9.61746Z"
                    fill={textColor}
                />
            </g>
            <defs>
                <filter id="filter0_d_1984_5933" x="0" y="0" width="24" height="24" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
                    <feFlood floodOpacity="0" result="BackgroundImageFix" />
                    <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha" />
                    <feOffset />
                    <feGaussianBlur stdDeviation="1" />
                    <feComposite in2="hardAlpha" operator="out" />
                    <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0" />
                    <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_1984_5933" />
                    <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_1984_5933" result="shape" />
                </filter>
            </defs>
        </svg>
    );
};

export default MailBox;
