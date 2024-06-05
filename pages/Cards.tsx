import React from 'react';
import Image from 'next/image';
import More from '../public/assets/images/icons/More.svg';
import card_img from '../public/assets/images/icons/card_img.png';
import profile_img from '../public/assets/images/profile-3.jpeg';
import Link from 'next/link';
import ShareModalPopup from './ShareModalPopup';
import { useImageContext } from '../components/ImageContext';
import { useContext } from 'react';
import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { setPageTitle } from '../store/themeConfigSlice';
import { imagepathURL } from '@/services/imgpthapi';

import Cookies from 'js-cookie';
import axiosInstance from '@/services/api';
import router from 'next/dist/client/router';

const Cards = ({ id, designation, isPrimary, onTogglePrimary, onRemoveCard, isSingleCard }: any) => {
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
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(setPageTitle('Cards'));
    });

    const handleRemoveCard = () => {
        if (!isSingleCard) {
            onRemoveCard(id); // Call the onRemoveCard function with the id of the current card
        }
    };
    const [userProfiles, setUserProfiles] = useState([]);
    const [first_name, setFirstName] = useState([]);
    const [last_name, setLastName] = useState([]);
    const { coverImage, profileImage }: any = useImageContext();
    const [showOptions, setshowOptions] = useState(false);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const handleTogglePrimary = () => {
        onTogglePrimary(id);
        setshowOptions(false);
    };
    const handleMoreClick = () => {
        setshowOptions(!showOptions);
    };
    useEffect(() => {
        const value = localStorage.getItem('userId');
        // console.log(isLoggedIn);
        const fetchUserProfile = async () => {
            try {
                const userId = localStorage.getItem('userId');
                if (!userId) {
                    throw new Error('User ID not found in localStorage');
                }
                const auth = localStorage.getItem('token');


                if (!auth || auth === "null") {
                    // Display error message
                    console.error('Token not found in localStorage');
                    // Redirect to login page
                    router.push('/Login');
                    return;
                }

                const config = {
                    headers: {
                        'Authorization': `Bearer ${auth}`, // Set the authorization header properly
                    },
                };
                const response = await axiosInstance.get(`/profileUpdate/${userId}`, config);
                const userProfileData = response.data;
                setUserProfiles([userProfileData]); // Assuming response.data is an object
            } catch (error) {
                console.error('Error fetching user profile:', error.message);
                setUserProfiles([]); // Reset user profile state to an empty array or set a default value
            }
        };
        fetchUserProfile();
    }, []);
    return (
        <div
            className="drop-shadow-themeShadow-3xl h-[400px] w-[370px] rounded-md border border-zinc-200 bg-white 
         max-lg:mx-4 max-lg:w-[350px] "
        >
            <div className="relative mb-10 flex items-center justify-center border-white-light ">
                {/* <div className="h-full w-full">
                    <Image src={coverImage} alt="cardImage" width={500} height={500} className="h-[100%] w-[100%] object-contain" />
                </div>
                <div className="outline-7 absolute bottom-[-33%] left-[5%] h-[90px] w-[90px] rounded-full border border-solid border-white bg-gray-lightGray outline outline-white">
                    <Image src={profileImage} alt="profileImage" width={500} height={500} className="h-[100%] w-[100%] min-w-fit rounded-full object-cover" />
                </div> */}

{userProfiles.map((userProfileData) => (
                <React.Fragment key={userProfileData}> {/* Assuming userProfileData has a unique 'id' */}
                    <div className="h-full w-full">
                        <Image
                            src={`${imagepathURL}/static/coverImages/${userProfileData.coverImage}`}
                            alt="cardImage"
                            width={500}
                            height={500}
                            className="h-[100%] w-[100%] object-contain"
                        />
                    </div>
                    <div className="outline-7 absolute bottom-[-25%] left-[5%] h-[90px] w-[90px] overflow-hidden rounded-full border border-solid border-white bg-gray-lightGray outline outline-white">
                        <Image
                            src={`${imagepathURL}/static/profileImages/${userProfileData.profileImage}`}
                            alt="profileImage"
                            width={500}
                            height={500}
                            className="h-[100%] w-[100%] min-w-fit rounded-full object-cover"
                        />
                    </div>
                </React.Fragment>
            ))}
                <div className="absolute left-3 top-3 z-10 flex w-1/2 ">{isPrimary && <span className="badge rounded-full bg-primary">Primary</span>}</div>
                <div className="absolute right-5 top-3 z-30">
                    <div className="cursor-pointer">
                        <Image src={More} width={3} height={3} alt="more" onClick={handleMoreClick} />
                    </div>

                    {showOptions && (
                        <div className="absolute z-30 mb-5 w-fit min-w-[12vw] bg-white">
                            <div className="flex flex-col rounded-md border border-white-light font-semibold dark:border-[#1B2E4B]">
                                <button className="border-b border-white-light px-4 py-2.5 hover:bg-[#F5EFFF] dark:border-[#1B2E4B] dark:hover:bg-[#eee]/10" onClick={handleTogglePrimary}>
                                    Set as Primary Card
                                </button>
                                {!isSingleCard && (
                                    <Link
                                        href="#"
                                        className="border-b border-white-light px-4 py-2.5 font-semibold text-red-500 hover:bg-[#F5EFFF] dark:border-[#1B2E4B] dark:hover:bg-[#eee]/10"
                                        onClick={handleRemoveCard}
                                    >
                                        Remove Card
                                    </Link>
                                )}
                            </div>
                        </div>
                    )}
                </div>
            </div>

            <div className="flex flex-col items-start px-4 pt-4">
                <div className="">
                    {userProfiles.map((userProfilesData) => (
                        <React.Fragment key={userProfilesData}>
                            <h1 className="text-xl mt-5  font-bold">{`${userProfilesData['first_name']} ${userProfilesData['last_name']}`}</h1>
                            <h3 className="text-sm text-gray">{`${userProfilesData['job_title']}`}</h3>
                        </React.Fragment>
                    ))}
                </div>
                <div className="my-3 flex items-center gap-5">
                    <button type="button" className="btn btn-primary border-primary">
                        <Link href="/profile" className="xs:text-[1vw] uppercase text-white">
                            Edit Profile
                        </Link>
                    </button>
                    <button type="button" className="btn btn-outline-primary">
                        <Link href="#" className="xs:text-[1vw]  uppercase text-primary " onClick={() => openModal('content1')}>
                            Share
                        </Link>
                    </button>
                </div>
            </div>
            <ShareModalPopup isOpen={isModalOpen} onClose={closeModal} modalContentId={currentModalContentId}></ShareModalPopup>
        </div>
    );
};
export default Cards;
