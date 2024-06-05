import React from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { Fragment, useState } from 'react';
import Image from 'next/image';
import Search from './Search';
import RenderLinks from './RenderLinks';
import PLUS from '../public/assets/images/icons/PLUS.svg';
import Link from 'next/link';
import SocialContent from './SocialContent';
import backArrow from '../public/assets/images/icons/backArrow.svg';

import IconX from '@/components/Icon/IconX';

const images = [
    { platform: 'message', path: './assets/images/static/social/message.svg' },
    { platform: 'email', path: './assets/images/static/social/email.svg' },
    { platform: 'instagram', path: './assets/images/static/social/instagram.svg', Social: true },
    { platform: 'website', path: './assets/images/static/social/website.svg' },
    { platform: 'linkedin', path: './assets/images/static/social/linkedin.svg', Social: true },
    // { platform: 'call', path: './assets/images/static/social/call.svg' },
    { platform: 'paypal', path: './assets/images/static/social/paypal.svg' },
    { platform: 'googlepay', path: './assets/images/static/social/googlepay.svg' },
    { platform: 'facetime', path: './assets/images/static/social/facetime.svg' },
    { platform: 'googlemap', path: './assets/images/static/social/googlemap.svg' },
    { platform: 'facebook', path: './assets/images/static/social/facebook.svg', Social: true },
    { platform: 'twitter', path: './assets/images/static/social/twitter.svg', Social: true },
    { platform: 'wechat', path: './assets/images/static/social/wechat.svg', Social: true },
    { platform: 'threads', path: './assets/images/static/social/threads.svg', Social: true },
    { platform: 'twitch', path: './assets/images/static/social/twitch.svg', Social: true },
    { platform: 'whatsapp', path: './assets/images/static/social/whatsapp.svg', Social: true },
    { platform: 'youtube', path: './assets/images/static/social/youtube.svg', Social: true },
    { platform: 'tiktok', path: './assets/images/static/social/tiktok.svg', Social: true },
    { platform: 'snapchat', path: './assets/images/static/social/snapchat.svg', Social: true },
    { platform: 'pinterest', path: './assets/images/static/social/pinterest.svg', Social: true },
    { platform: 'discord', path: './assets/images/static/social/discord.svg', Social: true },
    { platform: 'telegram', path: './assets/images/static/social/telegram.svg', Social: true },
    { platform: 'clubhouse', path: './assets/images/static/social/clubhouse.svg', Social: true },
    { platform: 'calendly', path: './assets/images/static/social/calendly.svg', Social: true },
    { platform: 'reviews', path: './assets/images/static/social/reviews.svg' },
    { platform: 'etsy', path: './assets/images/static/social/etsy.svg', Social: true },
    { platform: 'applestore', path: './assets/images/static/social/applestore.svg', Social: true },
    { platform: 'chilipiper', path: './assets/images/static/social/chilipiper.svg', Social: true },
    { platform: 'microsoftbooking', path: './assets/images/static/social/microsoftbooking.svg', Social: true },
    { platform: 'booksy', path: './assets/images/static/social/booksy.svg', Social: true },
    { platform: 'square', path: './assets/images/static/social/square.svg', Social: true },
    { platform: 'zillow', path: './assets/images/static/social/zillow.svg' },
    { platform: 'cashapp', path: './assets/images/static/social/cashapp.svg' },
    { platform: 'venmo', path: './assets/images/static/social/venmo.svg' },
    { platform: 'zelle', path: './assets/images/static/social/zelle.svg' },
    { platform: 'spotify', path: './assets/images/static/social/spotify.svg' },
    { platform: 'applemusic', path: './assets/images/static/social/applemusic.svg' },
    { platform: 'soundcloud', path: './assets/images/static/social/soundcloud.svg' },
    { platform: 'podcasts', path: './assets/images/static/social/podcasts.svg' },
    { platform: 'poshmark', path: './assets/images/static/social/poshmark.svg' },
    { platform: 'mediakits', path: './assets/images/static/social/mediakits.svg' },
    { platform: 'opensea', path: './assets/images/static/social/opensea.svg' },
    { platform: 'hoobe', path: './assets/images/static/social/hoobe.svg' },
    { platform: 'linktree', path: './assets/images/static/social/linktree.svg' },
    { platform: 'file', path: './assets/images/static/social/file.svg' },
    { platform: 'customlink', path: './assets/images/static/social/customlink.svg' },

    // Add more images as needed
];

const filterImages = (criteria) => {
    return images.filter((image) => /* Add your criteria here, for example: */ criteria.includes(image.platform));
};
const recommendedImages = filterImages(['message', 'email', 'instagram', 'website', 'linkedin']);
const contactImages = filterImages(['message', 'googlemap', 'facetime', 'whatsapp']);
const SocialMedia = filterImages(['instagram', 'linkedin', 'facebook', 'youtube', 'twitter', 'wechat', 'threads', 'twitch', 'tiktok', 'snapchat', 'pinterest', 'discord', 'telegram', 'clubhouse']);
const Business = filterImages(['website', 'calendly', 'reviews', 'etsy', 'appleStore', 'chiliPiper', 'microsoftbooking', 'booksy', 'square']);
const RealEstate = filterImages(['zillow']);
const Payments = filterImages(['paypal', 'googlepay', 'cashapp', 'venmo', 'zelle']);
const Music = filterImages(['spotify', 'applemusic', 'soundcloud', 'podcasts']);
const content = filterImages(['file', 'customlink']);
const More = filterImages(['poshmark', 'mediakits', 'opensea', 'hoobe', 'linktree']);
const Modal = ({ isOpen, onClose, onNewItem, formData, DeleteEle, selectedSocial, showContent, setShowContent, setSelectedSocial, onUpdateItem, SelectedSocialItem }:any) => {
    const handleSocialClick = (social) => {
        setSelectedSocial(social);
        setShowContent(true);
    };
    const handleBackClick = () => {
        setShowContent(false);
    };

    const renderContent = () => {
        if (selectedSocial) {
            const selectedImage = images.find((image) => image.platform === selectedSocial);
            const isCustom = selectedSocial === 'custom Link' || selectedSocial === 'file'; // Correct condition
            return (
                <SocialContent
                    handleBackClick={handleBackClick}
                    socialName={selectedSocial}
                    onUpdateItem={onUpdateItem}
                    image={selectedImage}
                    onClose={onClose}
                    Social={selectedImage.Social}
                    isCustom={isCustom ? selectedSocial : null}
                    onNewItem={onNewItem}
                    formData={formData}
                    DeleteEle={DeleteEle}
                    SelectedSocialItem={SelectedSocialItem}
                />
            );
        } else {
            // Default content when no social link is selected
            return <div>Select a social link</div>;
        }
    };
    const [searchResult, setSearchResult] = useState([]);
    const handleSearchResult = (result) => {
        setSearchResult(result);
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
                            <div className="flex min-h-screen items-start justify-center px-4">
                                <Transition.Child
                                    as={Fragment}
                                    enter="ease-out duration-300"
                                    enterFrom="opacity-0 scale-95"
                                    enterTo="opacity-100 scale-100"
                                    leave="ease-in duration-200"
                                    leaveFrom="opacity-100 scale-100"
                                    leaveTo="opacity-0 scale-95"
                                >
                                    <Dialog.Panel className="panel mx-auto my-auto h-[70vh] w-full overflow-x-hidden overflow-y-scroll rounded-[20px] border-0 bg-white px-6 py-6 text-black dark:text-white-dark sm:w-[500px] md:w-[890px]">
                                        <div className="flex  items-center justify-end  dark:bg-[#121c2c]">
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
                                        {/* Social Content */}
                                        {showContent ? (
                                            <div>
                                                <button className="p-2" onClick={handleBackClick}>
                                                    <Image src={backArrow} alt="back" width={20} height={20} />
                                                </button>
                                                {renderContent()}
                                            </div>
                                        ) : (
                                            <div>
                                                <div className="flex items-center justify-between px-5">
                                                    <h2 className=" py-5 text-xs font-bold uppercase sm:text-sm md:text-lg">Add Content</h2>
                                                    <Search images={images} onSearchResult={handleSearchResult} />
                                                </div>
                                                <div className="px-5 py-3 ">
                                                    <div className=" grid grid-cols-1  gap-4  sm:grid-cols-2 md:grid-cols-3 ">
                                                        {searchResult.map((item, index) => (
                                                            <div className=" w-64 min-w-64 " key={index}>
                                                                <div
                                                                    className=" themeShadow 0.25s h-[60px] w-full rounded-[12px]  border bg-[#f7f7f7] transition ease-out hover:bg-white hover:shadow-themeShadow"
                                                                    onClick={() => handleSocialClick(item.platform)}
                                                                >
                                                                    <div className="flex h-full w-full items-center justify-between  p-2 ">
                                                                        <div className=" flex w-[10vh] items-center space-x-3">
                                                                            <Image src={item.path} alt={item.platform} width={20} height={20} />
                                                                            <span className=" text-themeBlack  sm:text-md text-sm font-bold capitalize"> {item.platform}</span>
                                                                        </div>
                                                                        <div className="   flex items-center justify-center rounded-[50%] border bg-white  hover:bg-[#f7f7f7] ">
                                                                            <Image src={PLUS} alt="plus" width={20} height={20} className="h-[4vh] w-[4vh]" />
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        ))}
                                                    </div>
                                                </div>
                                                {/* contacts*/}
                                                <RenderLinks images={recommendedImages} handleSocialClick={handleSocialClick} handleBackClick={handleBackClick} title="Recommended" />
                                                <RenderLinks images={contactImages} handleSocialClick={handleSocialClick} handleBackClick={handleBackClick} title="Contact" />
                                                <RenderLinks images={SocialMedia} handleSocialClick={handleSocialClick} handleBackClick={handleBackClick} title="Social Media" />
                                                <RenderLinks images={Business} handleSocialClick={handleSocialClick} handleBackClick={handleBackClick} title="Business" />
                                                <RenderLinks images={RealEstate} handleSocialClick={handleSocialClick} handleBackClick={handleBackClick} title="Real Estate" />
                                                <RenderLinks images={Payments} handleSocialClick={handleSocialClick} handleBackClick={handleBackClick} title="Payments" />
                                                <RenderLinks images={Music} handleSocialClick={handleSocialClick} handleBackClick={handleBackClick} title="Music" />
                                                <RenderLinks images={content} handleSocialClick={handleSocialClick} handleBackClick={handleBackClick} title="Content" />
                                                <RenderLinks images={More} handleSocialClick={handleSocialClick} handleBackClick={handleBackClick} title="More" />
                                            </div>
                                        )}
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

export default Modal;
