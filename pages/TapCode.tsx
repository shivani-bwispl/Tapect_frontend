import React from 'react';
import Image from 'next/image';
import QrCode from '../public/assets/images/icons/QrCode.svg';

const TapCode = () => {
    return (
        <>
            <div className="flex h-[calc(80vh-5rem)] items-center justify-center overflow-y-auto">
                <div className="h-[200px] w-[200px]">
                    <Image src={QrCode} width={500} height={500} alt="qrcode"></Image>
                </div>
            </div>
        </>
    );
};

export default TapCode;
