import React from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { Fragment, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import QrCode from '../public/assets/images/icons/QrCode.svg';
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import IconX from '@/components/Icon/IconX';
import QrScanner from 'react-qr-scanner';


const ActivateModal = ({ isOpen, onClose, modalContentId }) => {

    const handleScan = (data) => {
        if (data) {
            console.log('QR Code Data:', data);
            onClose(); // Close the modal after successfully reading the QR code
        }
    };

    const handleError = (err) => {
        console.error('QR Code Scan Error:', err);
    };

    const previewStyle = {
        height: 240,
        width: 320,
    };
    return (
        <>
            {isOpen && (
                <div style={{ display: isOpen ? 'block' : 'none' }}>
                    <Transition appear show={isOpen} as={Fragment}>
                        <Dialog as="div" open={isOpen} onClose={onClose}>
                            <Transition.Child
                                as={Fragment}
                                enter="ease-out duration-300"
                                enterFrom="opacity-0"
                                enterTo="opacity-100"
                                leave="ease-in duration-200"
                                leaveFrom="opacity-100"
                                leaveTo="opacity-0"
                            >
                                <div className="fixed inset-0" />
                            </Transition.Child>
                            <div className="fixed inset-0 z-[999] bg-[black]/60">
                                <div className="flex min-h-screen items-center justify-center px-4">
                                    <Transition.Child
                                        as={Fragment}
                                        enter="ease-out duration-300"
                                        enterFrom="opacity-0 scale-95"
                                        enterTo="opacity-100 scale-100"
                                        leave="ease-in duration-200"
                                        leaveFrom="opacity-100 scale-100"
                                        leaveTo="opacity-0 scale-95"
                                    >
                                        <Dialog.Panel className="bg-white my-8 w-70 w-[40vw] max-w-5xl  p-8 overflow-x-hidden overflow-y-scroll rounded-[20px] border-0 bg-white  text-black dark:text-white-dark">

                                            <div className="modal-content">
                                                <form className="space-y-5">
                                                    {modalContentId === 'content1' && (
                                                        <div>
                                                            <div className="flex items-center justify-between dark:bg-[#121c2c]">
                                                                <h2 className="text-2xl font-semibold">Activate your card</h2>
                                                                <button
                                                                    onClick={() => {
                                                                        onClose(false);
                                                                    }}
                                                                    type="button"
                                                                    className="text-white-dark hover:text-dark"
                                                                >
                                                                    <IconX className="w-12" />
                                                                </button>
                                                            </div>

                                                            <div className="h-[120px] mt-8 ">
                                                                <span className="text-xs">
                                                                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
                                                                    minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit
                                                                    in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui
                                                                    officia deserunt mollit anim id est laborum.
                                                                </span>
                                                            </div>
                                                            <div className="mt-3">
                                                                <span className=" text-primary underline">
                                                                    <Link href="#">Learn more</Link>
                                                                </span>
                                                            </div>
                                                            <div className="my-4 h-[30px] w-[500px] font-bold ">Card activation key</div>
                                                            <input type="text" className="form-input h-[50px] w-full] rounded-lg border "></input>
                                                            <div className="my-6 flex justify-end">
                                                                <button type="button" className="mr-10 underline underline-offset-4" onClick={() => onClose(false)}>
                                                                    Cancel
                                                                </button>

                                                                <button type="button" className="btn btn-primary h-[40px] w-[130px]">
                                                                    Activate card
                                                                </button>
                                                            </div>
                                                        </div>
                                                    )}
                                                    {modalContentId === 'content2' && (
                                                       <div>
                                                       <div className="flex items-center justify-between dark:bg-[#121c2c]">
                                                           <h2 className="mb-5 text-2xl font-semibold text-center">Activate tapect card</h2>
                                                           <button
                                                               onClick={() => {
                                                                   onClose(false);
                                                               }}
                                                               type="button"
                                                               className="text-white-dark hover:text-dark"
                                                           >
                                                               <IconX className="w-12" />
                                                           </button>
                                                       </div>
                                                       
                                                       <div className="flex items-center justify-center">
                                                           <div className="text-center">
                                                               <Image src={QrCode} height={200} width={200} alt="qrcode" />
                                                               {/* <QrScanner
                                                                   delay={300}
                                                                   style={previewStyle}
                                                                   onError={handleError}
                                                                   onScan={handleScan}
                                                               /> */}
                                                           </div>
                                                       </div>
                                                       
                                                       <div className="mt-4 flex flex-col items-center justify-center">
                                                           <span className="text-sm font-normal">To activate tapect card,</span>
                                                           <span className="mb-5 text-sm font-normal">start by scanning the QR code with your phone</span>
                                                       </div>
                                                   </div>
                                                   
                                                    )}
                                                </form>
                                            </div>
                                        </Dialog.Panel>
                                    </Transition.Child>
                                </div>
                            </div>
                        </Dialog>
                    </Transition>
                </div>
            )}

        </>
    );
};

export default ActivateModal;
