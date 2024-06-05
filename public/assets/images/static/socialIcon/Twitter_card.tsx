import React from 'react';

const twitter_card = ({ buttonColor, textColor }) => {
    return (
        <svg width="58" height="58" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
            <g opacity="0.2" filter="url(#filter0_d_802_260)">
                <circle cx="24.0002" cy="24" r="20" fill={buttonColor} />
            </g>
            <path
                d="M28.9301 15.4288H31.5588L25.8159 22.6904L32.5719 32.5717H27.2812L23.1379 26.5787L18.3971 32.5717H15.7668L21.9094 24.8047L15.4291 15.4288H20.8525L24.5977 20.9067L28.9285 15.4288H28.9301ZM28.0075 30.831H29.4641L20.0619 17.0781H18.4988L28.0075 30.831Z"
                fill={textColor}
            />
            <defs>
                <filter id="filter0_d_802_260" x="0.000244141" y="0" width="48" height="48" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
                    <feFlood floodOpacity="0" result="BackgroundImageFix" />
                    <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha" />
                    <feOffset />
                    <feGaussianBlur stdDeviation="2" />
                    <feComposite in2="hardAlpha" operator="out" />
                    <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0" />
                    <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_802_260" />
                    <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_802_260" result="shape" />
                </filter>
            </defs>
        </svg>
    );
};

export default twitter_card;
