import React from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { Fragment, useState } from 'react';
import { useRef } from 'react';

import Image from 'next/image';
import DOWNLOAD_white from '@/public/assets/images/icons/DOWNLOAD_white.svg';
import QR_CODE from '@/public/assets/images/icons/QR_CODE.svg';
import Copy_Doc from '@/public/assets/images/icons/Copy_Doc.svg';
import instagram from '@/public/assets/images/icons/instagram.svg';
import Share from '@/public/assets/images/icons/Share.svg';

import IconX from '@/components/Icon/IconX';

const images = [
    { name: 'instagram', path: './assets/images/static/social/instagram.svg', href: 'https://instagram.com' },
    {
        name: 'whatsapp',
        path: './assets/images/static/social/whatsapp.svg',
        href: 'https://api.whatsapp.com/send?text=Check%20out%20my%20Tapect%20digital%20business%20card:%20%20%20https%3A%2F%2Ftapect.com%2Fbusiness-card',
    },
    {
        name: 'Email',
        path: './assets/images/static/social/email.svg',
        href: 'mailto:?subject=Check%20out%20this%20amazing%20Tapect%20application&body=Hey%20there,%0A%0ACheck%20out%20this%20awesome%20Tapect%20application%20I%20found:%0A%0Ahttp://localhost:3000',
    },
    { name: 'twitter', path: './assets/images/static/social/twitter.svg', href: 'https://twitter.com/intent/tweet?url=http://localhost:3000/#&text=Check%20out%20my%20Tapect%20application' },
    { name: 'facebook', path: './assets/images/static/social/facebook.svg', href: 'https://www.facebook.com/sharer/sharer.php?u=http://localhost:3000' },
    { name: 'linkedin', path: './assets/images/static/social/linkedin.svg', href: 'https://www.linkedin.com/sharing/share-offsite/?url=http://localhost:3000' },
];

const ShareModal = ({ isOpen, onClose, modalContentId }) => {
    const [link, setLink] = useState(''); // State to hold the value of the input field
    const [copied, setCopied] = useState(false);
    const [downloaded, setDownloaded] = useState(false);
    const inputRef = useRef(null);

    // Function to handle copying the link to clipboard
    const copyToClipboard = () => {
        // Check if the input field reference exists and has a value
        if (inputRef.current && inputRef.current.value) {
            // Select the text in the input field
            inputRef.current.select();
            // Copy the selected text to the clipboard
            document.execCommand('copy');
            // Set copied state to true to show the popover
            setCopied(true);
            // After 2 seconds, set copied state back to false to hide the popover
            setTimeout(() => {
                setCopied(false);
            }, 2000);
        }
    };
    const downloadQRCode = () => {
        // Create a temporary link
        const link = document.createElement('a');
        // Set the href attribute of the link to the direct link of the QR code image
        link.href = '/path/to/qr-code-image.png'; // Replace this with the actual path to your QR code image
        // Set the download attribute to specify the filename
        link.download = 'qr-code.png';
        // Simulate a click event on the link to trigger the download
        link.click();
        // Show the downloaded popover
        setDownloaded(true);
        // After 2 seconds, hide the downloaded popover
        setTimeout(() => {
            setDownloaded(false);
        }, 2000);
    };
    return (
        <>  {isOpen && (
            <div style={{ display: isOpen ? 'block' : 'none' }}>
                {/* <button type="button" onClick={() => setModal5(true)} className="btn btn-warning">
                    Extra large
                </button> */}
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
                            <div className="flex min-h-screen items-start justify-center px-5">
                                <Transition.Child
                                    as={Fragment}
                                    enter="ease-out duration-300"
                                    enterFrom="opacity-0 scale-95"
                                    enterTo="opacity-100 scale-100"
                                    leave="ease-in duration-200"
                                    leaveFrom="opacity-100 scale-100"
                                    leaveTo="opacity-0 scale-95"
                                >
                                    <Dialog.Panel className="panel my-5  w-[80vw] max-w-5xl overflow-y-auto  overflow-x-hidden  rounded-[20px] border-0 bg-white p-0 px-10 py-10 text-black dark:text-white-dark">
                                        <div className="flex  items-center justify-end  dark:bg-[#121c2c]">
                                            <button
                                                onClick={() => {
                                                    onClose(false);
                                                }}
                                                type="button"
                                                className="text-white-dark hover:text-dark"
                                            >
                                                <IconX className="mt-2 w-12 pl-7" />
                                            </button>
                                        </div>
                                        <div className="modal-content  overflow-y-auto">
                                            <form className="space-y-4">
                                                {modalContentId === 'content1' && (
                                                    <div>
                                                        <div className="flex justify-between border-b-2 pb-5">
                                                            <div>
                                                                <h2 className=" text-2xl font-semibold"> Scan QR Code to Share your Card</h2>
                                                                <span className=" mr-2 text-xs font-normal">
                                                                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
                                                                    ad minim veniam,
                                                                </span>

                                                                <button type="button" onClick={downloadQRCode} className=" btn btn-primary mt-3  border-primary text-sm font-medium">
                                                                    <Image src={DOWNLOAD_white} width={15} height={15} alt="download " className="mr-2 "></Image>
                                                                    Download Qr Code
                                                                </button>
                                                                {downloaded && <span className="text-primary">Downloaded!</span>}
                                                            </div>
                                                            <div>
                                                                <Image src={QR_CODE} width={140} height={140} alt="qrcode" className=" mt-4"></Image>
                                                            </div>
                                                        </div>
                                                        <div className="border-b-2 pb-5">
                                                            <h2 className=" mt-3 text-2xl font-semibold">Copy Card Link </h2>
                                                            <div className="mt-3 flex">
                                                                <input
                                                                    ref={inputRef}
                                                                    type="text"
                                                                    value={link}
                                                                    onChange={(e) => setLink(e.target.value)}
                                                                    placeholder="Enter link here"
                                                                    className="form-input border-purple-200"
                                                                />
                                                                <Image src={Copy_Doc} onClick={copyToClipboard} width={40} height={40} alt="copy_doc" className="ml-3"></Image>
                                                            </div>
                                                            {copied && <span className="text-primary">Copied!</span>} {/* Display the copied popover if copied is true */}
                                                        </div>
                                                        <div>
                                                            <h2 className=" my-3 text-2xl font-semibold">Share Card Via </h2>

                                                            <div className="grid grid-cols-1  gap-6 sm:grid-cols-2 md:grid-cols-3">
                                                                {images.map((item, index) => (
                                                                    <div className="  " key={index}>
                                                                        <a href={item.href} target="_blank" rel="noopener noreferrer">
                                                                            <div className="themeShadow 0.25s    h-[65px] rounded-[10px] border bg-[#F7F7F7] transition ease-out hover:bg-white hover:shadow-themeShadow">
                                                                                <div className="flex h-full w-full items-center justify-between p-1">
                                                                                    <div className=" m-1 flex items-center space-x-2">
                                                                                        <Image src={item.path} alt={item.name} width={30} height={30} className="sm:w-[4vh]" />
                                                                                        <span className="text-themeBlack sm:text-md mx-2 text-sm font-bold capitalize">{item.name}</span>
                                                                                    </div>
                                                                                    <div className="   flex items-center justify-center  ">
                                                                                        <Image src={Share} alt="share" width={20} height={20} className="w-[4vw] md:w-[3vh]" />
                                                                                    </div>
                                                                                </div>
                                                                            </div>
                                                                        </a>
                                                                    </div>
                                                                ))}
                                                            </div>
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

export default ShareModal;
