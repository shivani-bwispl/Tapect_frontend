import React from 'react';
import Image from 'next/image';
import PLUS from '../public/assets/images/icons/PLUS.svg';

const RenderLinks = ({ images, handleBackClick, handleSocialClick, title }) => {
    return (
        <>
            <div className="px-5 py-3">
                <div className="mb-4 font-nunito text-lg font-bold">{title}</div>
                <div className="grid grid-cols-1  gap-4 sm:grid-cols-2 md:grid-cols-3">
                {images && images.length > 0 && images.map((item, index) => (
                        <div className=" w-64 min-w-64  " key={index}>
                            <div className="themeShadow 0.25s h-[70px] px-3  rounded-[12px] border bg-[#f7f7f7] transition ease-out hover:bg-white hover:shadow-themeShadow">
                                <div className="flex h-full w-full items-center justify-between p-2">
                                <div className=" flex w-[20vh] items-center space-x-3" onClick={() => handleSocialClick(item.platform)}>
                                        <Image src={item.path} alt={item.platform} width={20} height={20} className="w-[3vh]" />
                                        <span className="text-themeBlack sm:text-md mx-2 text-sm font-bold capitalize">{item.platform}</span>
                                    </div>
                                    <div className=" ml-2  flex items-center justify-center rounded-[50%] border bg-white  hover:bg-[#f7f7f7] ">
                                    <Image src={PLUS} alt="plus" width={30} height={30} className="h-[3vh] w-[3vh]" />
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </>
    );
};

export default RenderLinks;
