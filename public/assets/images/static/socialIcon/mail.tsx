import React from 'react';

const mail = ({ buttonColor, textColor }) => {
    return (
        <svg width="58" height="58" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
            <g opacity="0.2" filter="url(#filter0_d_1613_285)">
                <circle cx="24" cy="24" r="20" fill={buttonColor} shapeRendering="crispEdges" />
            </g>
            <path
                d="M30.498 17H16.722C15.7749 17 15.0086 17.7749 15.0086 18.722L15 29.054C15 30.0011 15.7749 30.776 16.722 30.776H30.498C31.4451 30.776 32.22 30.0011 32.22 29.054V18.722C32.22 17.7749 31.4451 17 30.498 17ZM30.1536 20.6593L24.0663 24.4649C23.7908 24.6371 23.4292 24.6371 23.1537 24.4649L17.0664 20.6593C16.9801 20.6108 16.9045 20.5453 16.8442 20.4668C16.7839 20.3882 16.7401 20.2983 16.7156 20.2024C16.6911 20.1065 16.6863 20.0066 16.7015 19.9087C16.7167 19.8109 16.7516 19.7172 16.804 19.6332C16.8565 19.5492 16.9255 19.4768 17.0068 19.4203C17.088 19.3637 17.1799 19.3243 17.2769 19.3043C17.3739 19.2843 17.4739 19.2842 17.5709 19.304C17.6679 19.3238 17.7599 19.363 17.8413 19.4194L23.61 23.027L29.3787 19.4194C29.4601 19.363 29.5521 19.3238 29.6491 19.304C29.7461 19.2842 29.8461 19.2843 29.9431 19.3043C30.0401 19.3243 30.132 19.3637 30.2132 19.4203C30.2945 19.4768 30.3635 19.5492 30.416 19.6332C30.4684 19.7172 30.5033 19.8109 30.5185 19.9087C30.5337 20.0066 30.5289 20.1065 30.5044 20.2024C30.4799 20.2983 30.4361 20.3882 30.3758 20.4668C30.3155 20.5453 30.2399 20.6108 30.1536 20.6593Z"
                fill={textColor}
            />
            <defs>
                <filter id="filter0_d_1613_285" x="0" y="0" width="48" height="48" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
                    <feFlood floodOpacity="0" result="BackgroundImageFix" />
                    <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha" />
                    <feOffset />
                    <feGaussianBlur stdDeviation="2" />
                    <feComposite in2="hardAlpha" operator="out" />
                    <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0" />
                    <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_1613_285" />
                    <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_1613_285" result="shape" />
                </filter>
            </defs>
        </svg>
    );
};

export default mail;
