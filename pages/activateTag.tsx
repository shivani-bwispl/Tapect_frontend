/* eslint-disable react/no-unescaped-entities */
/* eslint-disable react-hooks/rules-of-hooks */
import next from 'next';
import React from 'react';
import Image from 'next/image';
import { useState } from 'react';
import Link from 'next/link';
import Tapect_card from '../public/assets/images/icons/Tapect_Card.svg';
import ActivateModal from './ActivateModal';

const activateTag = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [currentModalContentId, setCurrentModalContentId] = useState(null);
    const openModal = (contentId) => {
        setCurrentModalContentId(contentId);
        setIsModalOpen(true);
    };
    const closeModal = () => {
        setIsModalOpen(false);
        setCurrentModalContentId(null);
    };

    return (
        <>
            <div className="mx-5 my-3 h-screen  bg-white   ">
                <div className=" flex h-[50px] w-full items-center justify-center border-b text-gray">
                    <span className="font-base p-5 text-base">Activate tag</span>
                </div>
                <div className=" my-20 grid w-full items-center justify-center justify-items-center ">
                    <span className="my-5 text-2xl font-semibold">Activate your tapect card</span>
                    <Image src={Tapect_card} width={250} height={250} alt="tapect card" className="my-5"></Image>
                    <div className="my-5  md:w-[850px]">
                        <span className="text-base font-normal">
                            lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
                            exercitation ullamco laboris nisi ut aliquip exea commodo consequat.
                        </span>
                    </div>
                    <div className=" my-5 flex items-center justify-between gap-3 md:flex-row">
                        <button type="button" className="btn btn-outline-primary  w-[248px] hover:bg-[#652dbf] hover:text-white" onClick={() => openModal('content1')}>
                            Activate manually
                        </button>
                        <button type="button" className="btn btn-primary  w-full hover:border-primary hover:bg-white hover:text-primary md:w-[240px]" onClick={() => openModal('content2')}>
                            Scan QR code
                        </button>
                    </div>
                    <div className="mb-5 flex  items-center justify-start gap-2">
                        <h5 className="text-sm font-normal dark:text-white-light">Don't have any card?</h5>
                        <span className=" text-primary underline">
                            <Link href="#">Purchase card here</Link>
                        </span>
                    </div>
                </div>
                <ActivateModal isOpen={isModalOpen} onClose={closeModal} modalContentId={currentModalContentId}></ActivateModal>
            </div>
        </>
    );
};

export default activateTag;
