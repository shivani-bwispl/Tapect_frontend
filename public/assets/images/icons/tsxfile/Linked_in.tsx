import React from 'react';

const Linked_in = ({ buttonColor, textColor }) => {
    return (
        <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
            <g opacity="0.2" filter="url(#filter0_d_802_252)">
                <circle cx="24" cy="24" r="20" fill={buttonColor} />
            </g>
            <path
                d="M30.6667 15.4288C31.1719 15.4288 31.6563 15.6295 32.0136 15.9867C32.3708 16.344 32.5714 16.8284 32.5714 17.3336V30.6669C32.5714 31.1721 32.3708 31.6566 32.0136 32.0138C31.6563 32.371 31.1719 32.5717 30.6667 32.5717H17.3334C16.8282 32.5717 16.3437 32.371 15.9865 32.0138C15.6293 31.6566 15.4286 31.1721 15.4286 30.6669V17.3336C15.4286 16.8284 15.6293 16.344 15.9865 15.9867C16.3437 15.6295 16.8282 15.4288 17.3334 15.4288H30.6667ZM30.1905 30.1908V25.1431C30.1905 24.3197 29.8634 23.53 29.2811 22.9477C28.6989 22.3655 27.9092 22.0384 27.0857 22.0384C26.2762 22.0384 25.3334 22.5336 24.8762 23.2765V22.2193H22.2191V30.1908H24.8762V25.4955C24.8762 24.7622 25.4667 24.1622 26.2 24.1622C26.5536 24.1622 26.8928 24.3027 27.1428 24.5527C27.3929 24.8028 27.5333 25.1419 27.5333 25.4955V30.1908H30.1905ZM19.1238 20.7241C19.5482 20.7241 19.9551 20.5555 20.2552 20.2555C20.5553 19.9554 20.7238 19.5484 20.7238 19.1241C20.7238 18.2384 20.0095 17.5146 19.1238 17.5146C18.697 17.5146 18.2876 17.6841 17.9857 17.986C17.6839 18.2878 17.5143 18.6972 17.5143 19.1241C17.5143 20.0098 18.2381 20.7241 19.1238 20.7241ZM20.4476 30.1908V22.2193H17.8095V30.1908H20.4476Z"
                fill={textColor}
            />
            <defs>
                <filter id="filter0_d_802_252" x="0" y="0" width="48" height="48" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
                    <feFlood floodOpacity="0" result="BackgroundImageFix" />
                    <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha" />
                    <feOffset />
                    <feGaussianBlur stdDeviation="2" />
                    <feComposite in2="hardAlpha" operator="out" />
                    <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0" />
                    <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_802_252" />
                    <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_802_252" result="shape" />
                </filter>
            </defs>
        </svg>
    );
};

export default Linked_in;
