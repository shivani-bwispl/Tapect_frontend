/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/jsx-no-target-blank */
/* eslint-disable @next/next/no-img-element */
import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import Share from '../public/assets/images/static/socialIcon/Share';
import Call from '../public/assets/images/static/socialIcon/Call';
import Call2 from '../public/assets/images/static/socialIcon/Call2';
import MailBox from '../public/assets/images/static/socialIcon/MailBox';
import Download from '../public/assets/images/static/socialIcon/Download';
import Location from '../public/assets/images/static/socialIcon/Location';
import WebsiteIcon from '../public/assets/images/static/socialIcon/WebsiteIcon';
import tapect_logo from '../public/assets/images/tapect_logo.svg';
import etsy from "../public/assets/images/static/socialIcon/etsy";

import { useImageContext } from '../components/ImageContext';
import { useColorContext } from '../components/ColorContext';
import { useLeadCapture } from '../components/LeadCaptureContext';
import Linked_in from '../public/assets/images/static/socialIcon/Linked_in';
import applemusic from '../public/assets/images/static/socialIcon/applemusic';
import booksy from '../public/assets/images/static/socialIcon/booksy';
import calendly from '../public/assets/images/static/socialIcon/calendly';
import cashapp from '../public/assets/images/static/socialIcon/cashapp';
import clubhouse from '../public/assets/images/static/socialIcon/clubhouse';
import discord from '../public/assets/images/static/socialIcon/discord';
import facetime from '../public/assets/images/static/socialIcon/facetime';
import googlemap from '../public/assets/images/static/socialIcon/googlemap';
import hoobe from '../public/assets/images/static/socialIcon/hoobe';
import link from '../public/assets/images/static/socialIcon/link';
import linktree from '../public/assets/images/static/socialIcon/linktree';
import mail from '../public/assets/images/static/socialIcon/mail';
import mediakits from '../public/assets/images/static/socialIcon/mediakits';
import microsoftbooking from '../public/assets/images/static/socialIcon/microsoftbooking';
import opensea from '../public/assets/images/static/socialIcon/opensea';
import paypal from '../public/assets/images/static/socialIcon/paypal';
import pinterest from '../public/assets/images/static/socialIcon/pinterest';
import podcasts from '../public/assets/images/static/socialIcon/podcasts';
import poshmark from '../public/assets/images/static/socialIcon/poshmark';
import reviews from '../public/assets/images/static/socialIcon/reviews';
import Instagram_card from '../public/assets/images/static/socialIcon/Instagram_card';
import Facebook_card from '../public/assets/images/static/socialIcon/Facebook_card';
import Twitter_card from '../public/assets/images/static/socialIcon/Twitter_card';
import zillow from '../public/assets/images/static/socialIcon/zillow';
import zelle from '../public/assets/images/static/socialIcon/zelle';
import youtube from '../public/assets/images/static/socialIcon/youtube';
import whatsapp from '../public/assets/images/static/socialIcon/whatsapp';
import website from '../public/assets/images/static/socialIcon/website';
import wechat from '../public/assets/images/static/socialIcon/wechat';
import venmo from '../public/assets/images/static/socialIcon/venmo';
import twiteer from '../public/assets/images/static/socialIcon/twiteer';
import twitch from '../public/assets/images/static/socialIcon/twitch';
import tiktok from '../public/assets/images/static/socialIcon/tiktok';
import threads from '../public/assets/images/static/socialIcon/threads';
import message from '../public/assets/images/static/socialIcon/message';
import telegram from '../public/assets/images/static/socialIcon/telegram';
import soundcloud from '../public/assets/images/static/socialIcon/soundcloud';
import snapchat from '../public/assets/images/static/socialIcon/snapchat';
import spotify from '../public/assets/images/static/socialIcon/spotify';
import gpay from '../public/assets/images/static/socialIcon/gpay';
import { imagepathURL } from '@/services/imgpthapi';

import { useRouter } from 'next/router';
import toastUtils from '../services/toastUtils'; // Import the toast utility service
import axiosInstance from '@/services/api';
interface CustomLink {
    file: string;
    label: string;
    // Add other properties if applicable
}
const CustomCard = ({ formData, SocialItems }: any) => {
    const { showPhonenumberInput, showEmailInput, showCompanyInput, showWebsiteInput, showJobtitleInput }: any = useLeadCapture();
    // console.log('Image path URL:', imagepathURL);

    const { coverImage, profileImage, logoImage }: any = useImageContext();
    const defaultCoverImage = '/cover_default.png';
    const defaultProfileImage = '/profileImg_default.png';
    const defaultLogoImage = '/logo_default.png';
    const { backgroundColor, textColor, buttonColor, buttontextColor, sketchPickerColor, sketchPickerLightColor, flag }: any = useColorContext();
    const [finalColor, setFinalColor] = useState({
        bgSub: '',
        bg: '#FFFFFF',
        buttonColor: '#652dbf',
        buttontextColor: '#000000',
        textColor: '#000000',
    });


    // Define formData state and setFormData setter function
    const [contactformData, setFormData] = useState({
        fullname: '',
        contact_email: '',
        contact_phonenumber: '',
        contact_jobtitle: '',
        company: '',
        website: '',
        // Add more fields as needed
    });

    const [users, setUsers] = useState([]);
    const [inputValue, setInputValue] = useState('');
    const router = useRouter();
    const [userProfiles, setUserProfiles] = useState([]);
    const [companyProfiles, setCompanyProfiles] = useState([]);
    const [socialLinks, setSocialLinks] = useState([]);
    const [customLinks, setCustomLinks] = useState([

        { file: '', label: '', custom_url: '', linktitle: '' },
    ]);

    const [error, setError] = useState(null);
    const [successMessage, setSuccessMessage] = useState(null); // State variable for success message
    // Define handleInputChange function to update form data
    const handleInputChange = (event) => {
        const { name, value } = event.target;

        // Update form data state
        setFormData({
            ...contactformData,
            [name]: value,
        });
    };

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [currentModalContentId, setCurrentModalContentId] = useState(null);

    const closeModal = () => {
        setIsModalOpen(false);
    };
    const openModal = () => {
        setIsModalOpen(true);
    };

    useEffect(() => {
        if (sketchPickerLightColor && flag === 0) {
            setFinalColor({
                bg: sketchPickerLightColor,
                bgSub: sketchPickerLightColor === '#000000' ? '#FFFFFF' : sketchPickerColor,
                buttonColor: sketchPickerColor,
                buttontextColor: '#FFFFFF',
                textColor: sketchPickerColor,
            });
        }
    }, [sketchPickerColor, sketchPickerLightColor, flag]);

    useEffect(() => {
        if (backgroundColor && flag === 1) {
            setFinalColor({
                bgSub: '',
                bg: backgroundColor,
                buttonColor: buttonColor,
                buttontextColor: buttontextColor,
                textColor: textColor,
            });
        }
    }, [backgroundColor, buttonColor, buttontextColor, textColor, flag]);

    // const customImages = {
    //     linkedin: <Linked_in buttonColor={flag === 0 ? finalColor.bgSub : finalColor.buttonColor} textColor={flag === 0 ? finalColor.bgSub : finalColor.textColor} />,
    //     instagram: <Instagram_card buttonColor={flag === 0 ? finalColor.bgSub : finalColor.buttonColor} textColor={flag === 0 ? finalColor.bgSub : finalColor.textColor} />,
    //     facebook: <Facebook_card buttonColor={flag === 0 ? finalColor.bgSub : finalColor.buttonColor} textColor={flag === 0 ? finalColor.bgSub : finalColor.textColor} />,
    //     twitter: <Twitter_card buttonColor={flag === 0 ? finalColor.bgSub : finalColor.buttonColor} textColor={flag === 0 ? finalColor.bgSub : finalColor.textColor} />,
    //     // applemusic: <applemusic buttonColor={flag === 0 ? finalColor.bgSub : finalColor.buttonColor} textColor={flag === 0 ? finalColor.bgSub : finalColor.textColor} />,
    // };

    // const renderedIcons = Object.values(SocialItems).map(({ id, image: { platform }, link }) =>
    //     customImages.hasOwnProperty(platform) ? (
    //         <div key={id} className="icon-container">
    //             {customImages[platform]}
    //         </div>
    //     ) : null
    // );

    useEffect(() => {
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
                setUserProfiles([userProfileData]);
            } catch (error) {
                console.error('Error fetching user profile:', error.message);
                setUserProfiles([]);
            }
        };

        fetchUserProfile();

        const fetchUserCompanyProfile = async () => {
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
                const response = await axiosInstance.get(`/CompanyProfile/${userId}`, config);
                const CompanyProfileData = response.data;
                setCompanyProfiles([CompanyProfileData]);
            } catch (error) {
                console.error('Error fetching user profile:', error.message);
                setCompanyProfiles([]);
            }
        };

        fetchUserCompanyProfile();
    }, []);

    const handleContactFormSubmit = async (contactformData) => {
        try {
            // Make API call to update company profile
            await handleContactUpdate(contactformData);
            // Optionally, perform any additional actions after successful update
            // Clear form fields
            setFormData({ ...contactformData, fullname: '', contact_email: '', contact_phonenumber: '', contact_jobtitle: '', company: '', website: '' });

            console.log('Company profile updated successfully');
        } catch (error: any) {
            console.error('Error updating company profile:', error.message);
            // Optionally, handle the error and display an error message to the user
        }
    };

    const handleContactUpdate = async (data) => {
        try {
            const userId = localStorage.getItem('userId');
            if (!userId) {
                throw new Error('User ID not found in localStorage');
            }

            // Include userId in the data object
            data.userId = userId;
            // const auth = localStorage.getItem('token');


            // if (!auth || auth === "null") {
            //     // Display error message
            //     console.error('Token not found in localStorage');
            //     // Redirect to login page
            //     router.push('/Login');
            //     return;
            // }

            // const config = {
            //     headers: {
            //         'Authorization': `Bearer ${auth}`, // Set the authorization header properly
            //     },
            // };
            const response = await axiosInstance.post('/contact_details/', data);
            // console.log(response.data); // Log the response from the server
            console.log('Contact Shared Successfully')
            window.location.reload();

            // Optionally, perform any additional actions after successful update
        } catch (error: any) {
            console.error('Error updating company profile:', error.message);
            throw error; // Rethrow the error to handle it in the caller function
        }
    };

    useEffect(() => {
        const fetchUserSocialLinks = async () => {
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
                const response = await axiosInstance.get(`/SocialLinks/${userId}`, config);
                const responseData = response.data;

                if (responseData.existingSocialLink && typeof responseData.existingSocialLink === 'object') {
                    const { Social_Media, Business, Contact, Payment, Music, Custom_link } = responseData.existingSocialLink;

                    // Combine social media and business links into one array
                    const allSocialLinks = [...Social_Media, ...Business, ...Contact, ...Music, ...Payment];

                    // Set custom links in state
                    setCustomLinks(Custom_link || []);
                    // console.log(Custom_link);

                    // Set all social links in state
                    setSocialLinks(allSocialLinks);
                } else {
                    throw new Error('Social links data is not in the expected format');
                }
            } catch (error: any) {
                console.error('Error fetching user social lidnks:', error.message);
                setSocialLinks([]); // Reset social links state to an empty array

            }
        };

        fetchUserSocialLinks(); // Call fetchUserSocialLinks when the component mounts
    }, []);
    // Function to render platform icons dynamically
    const renderPlatformIcon = (platform) => {
        // Define a mapping between platform names and their corresponding icons
        const platformIcons = {
            linkedin: Linked_in,
            instagram: Instagram_card,
            facebook: Facebook_card,
            twitter: Twitter_card,
            applemusic: applemusic,
            booksy: booksy,
            calendly: calendly,
            cashapp: cashapp,
            clubhouse: clubhouse,
            discord: discord,
            facetime: facetime,
            googlemap: googlemap,
            hoobe: hoobe,
            link: link,
            linktree: linktree,
            mail: mail,
            mediakits: mediakits,
            microsoftbooking: microsoftbooking,
            opensea: opensea,
            paypal: paypal,
            pinterest: pinterest,
            podcasts: podcasts,
            poshmark: poshmark,
            reviews: reviews,
            zillow: zillow,
            etsy: etsy,
            zelle: zelle,
            youtube: youtube,
            whatsapp: whatsapp,
            website: website,
            wechat: wechat,
            venmo: venmo,
            twiteer: twiteer,
            twitch: twitch,
            tiktok: tiktok,
            threads: threads,
            message: message,
            telegram: telegram,
            spotify: spotify,
            soundcloud: soundcloud,
            snapchat: snapchat,
            googlepay: gpay,
            // Add more platform names and their corresponding components here
        };

        // Check if the platform exists in the platformIcons mapping
        if (platformIcons.hasOwnProperty(platform)) {
            const PlatformComponent = platformIcons[platform];
            return <PlatformComponent buttonColor={flag === 0 ? finalColor.bgSub : finalColor.buttonColor} textColor={flag === 0 ? finalColor.bgSub : finalColor.textColor} />;
        } else {
            // Return a default icon or handle the case when the platform is not found
            return <img src="default-icon.png" alt="Default" />;
        }
    };
    // const handleDownload = () => {
    //     if (customLinks.length > 0) { // Check if customLinks array is not empty
    //         const link = document.createElement('a');
    //         link.href = customLinks[0].file; // Access file property of the first object
    //         link.download = customLinks[0].label; // Access label property of the first object
    //         document.body.appendChild(link);
    //         link.click();
    //         document.body.removeChild(link);
    //     }
    // };

    const handleDownload = () => {
        if (customLinks.length > 0) { // Check if customLinks array is not empty
                    const fileURL = `${imagepathURL.endsWith('/') ? imagepathURL : imagepathURL + '/'}${customLinks[0].file}`; // Construct the full file URL

            // const fileURL = imagepathURL + customLinks[0].file; // Construct the full file URL
            console.log('Downloading file from URL:', fileURL); // Log the file URL to the console
    
            const link = document.createElement('a');
            link.href = fileURL;
            link.target = '_blank'; // Open the link in a new tab
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        } else {
            console.log('No custom links available for download');
        }
    };

  
    
    return (
        <>
            {isModalOpen && (
                <div className="modal bottom-15 left-18 w-4/4 absolute   z-50 h-auto rounded-md border bg-white ">
                    <button className="absolute right-4  top-2 cursor-pointer text-2xl " onClick={closeModal}>
                        &times;
                    </button>
                    <form>
                        <div className="ml-4 mt-3">
                            <span className="  h-[30px] w-[90px]  text-lg font-bold">Share your details</span>
                        </div>
                        <div className="mt-1 flex flex-col  items-center justify-start px-2">
                            <div className=" my-1">
                                <input
                                    id="fullname"
                                    type="text"
                                    name="fullname"
                                    placeholder="Full Name"
                                    value={contactformData.fullname}
                                    onChange={(e) => {
                                        handleInputChange(e);
                                        setInputValue(e.target.value);
                                    }}
                                    className="form-input w-[230px] placeholder:text-xs placeholder:text-gray"
                                />
                            </div>
                            {showEmailInput && (
                                <div className=" my-1">
                                    <input
                                        id="contact_email"
                                        type="email"
                                        placeholder="Email"
                                        name="contact_email"
                                        value={contactformData.contact_email}
                                        onChange={(e) => {
                                            handleInputChange(e);
                                            setInputValue(e.target.value);
                                        }}
                                        className="form-input w-[230px] placeholder:text-xs placeholder:text-gray"
                                    />
                                </div>
                            )}
                            {showPhonenumberInput && (
                                <div className=" my-1">
                                    <input
                                        id="contact_phonenumber"
                                        type="tel"
                                        placeholder="Phone number"
                                        name="contact_phonenumber"
                                        value={contactformData.contact_phonenumber}
                                        onChange={(e) => {
                                            handleInputChange(e);
                                            setInputValue(e.target.value);
                                        }}
                                        className="form-input w-[230px] placeholder:text-xs placeholder:text-gray"
                                    />
                                </div>
                            )}
                            {showJobtitleInput && (
                                <div className=" my-1">
                                    <input
                                        id="contact_jobtitle"
                                        type="text"
                                        placeholder="Job title"
                                        name="contact_jobtitle"
                                        value={contactformData.contact_jobtitle}
                                        onChange={(e) => {
                                            handleInputChange(e);
                                            setInputValue(e.target.value);
                                        }}
                                        className="form-input w-[230px] placeholder:text-xs placeholder:text-gray"
                                    />
                                </div>
                            )}
                            {showCompanyInput && (
                                <div className=" my-1">
                                    <input
                                        id="company"
                                        type="text"
                                        placeholder="Company"
                                        name="company"
                                        value={contactformData.company}
                                        onChange={(e) => {
                                            handleInputChange(e);
                                            setInputValue(e.target.value);
                                        }}
                                        className="form-input w-[230px] placeholder:text-xs placeholder:text-gray"
                                    />
                                </div>
                            )}
                            {showWebsiteInput && (
                                <div className=" my-1">
                                    <input
                                        id="website"
                                        type="text"
                                        placeholder="Website"
                                        value={contactformData.website}
                                        onChange={(e) => {
                                            handleInputChange(e);
                                            setInputValue(e.target.value);
                                        }}
                                        name="website"
                                        className="form-input w-[230px] placeholder:text-xs placeholder:text-gray"
                                    />
                                </div>
                            )}
                            <div className="my-3 ">
                                <button type="button" className="btn btn-primary h-[40px] w-[230px] text-base" onClick={() => handleContactFormSubmit(contactformData)}>
                                    Submit
                                </button>
                            </div>
                        </div>
                    </form>
                </div>
            )}
            {isModalOpen && <div className="overlay absolute z-40 m-auto h-[520px] w-full rounded-[25px] bg-black bg-opacity-50 backdrop-blur-sm"></div>}

            <div
                className={`grid max-w-[100%] scrollbar-hide overflow-y-auto  overflow-x-hidden rounded-[25px] border border-[#ccc] md:grid-cols-1 xl:grid-cols-1 `}
                style={{ height: '600px', width: '320px', backgroundColor: finalColor.bg, color: flag === 0 ? finalColor.bgSub : finalColor.textColor }}
            >
                <div className="relative mb-8 flex  w-full items-center justify-center border-white-light dark:border-[#1b2e4b]">
                    {userProfiles.map((userProfileData, index) => (
                        <React.Fragment key={index}>
                            {/* <img src={`${imagepathURL}/static/coverImages/${userProfiles.coverImage ? userProfiles.coverImage : defaultCoverImage}`} alt="Cover"  width={1600} 
     height={160}     style={{ width: '100vw', height:'160px' }} 
     className="rounded-md border border-gray-300 object-fill" /> */}

                            {userProfileData['coverImage'] ? (
                                <img
                                    src={`${imagepathURL}/static/coverImages/${userProfileData['coverImage']}`}
                                    alt="Cover Image"
                                    width={500}
                                    height={500}
                                    className="h-full w-full object-cover"
                                />
                            ) : (
                                <img
                                    src={`${imagepathURL}/static/coverImages/${defaultCoverImage}`}
                                    alt="Default Cover Image"
                                    width={500}
                                    height={500}
                                    className="h-full w-full object-cover"
                                />
                            )}


                            {userProfileData['profileImage'] ? (
                                <div className="absolute bottom-[-5.5vh] left-[1vh] h-24 w-24 p-0.5 rounded-full border border-solid border-white bg-gray-lightGray">
                                    <img src={`${imagepathURL}/static/profileImages/${userProfileData['profileImage']}`} alt="Preview" width={160} height={160} className="h-full w-full rounded-full object-cover" />
                                </div>
                            ) : (
                                <img
                                    src={`${imagepathURL}/static/profileImages/${defaultProfileImage}`}
                                    alt="Default Profile Image"
                                    width={160}
                                    height={160}
                                    className="absolute bottom-[-5.5vh] left-[1vh] h-24 w-24 p-0.5 rounded-full border border-solid border-white bg-gray-lightGray"
                                />
                            )}
                            {userProfileData['logoImage'] ? (
                                <><div className="absolute bottom-[-5.9vh] left-[4.5rem] h-14 w-14 p-0.5 rounded-full border border-solid border-white bg-gray-lightGray">
                                    <img src={`${imagepathURL}/static/logoImages/${userProfileData['logoImage']}`} alt="Preview" width={160} height={160} className="h-full w-full rounded-full object-cover" />
                                </div>


                                </>
                            ) : (
                                <div className="absolute bottom-[-5.9vh] left-[4.5rem] h-14 w-14 p-0.5 rounded-full border border-solid border-white bg-gray-lightGray">
                                    <img
                                        src={`${imagepathURL}/static/logoImages/${defaultLogoImage}`}
                                        alt="Preview" width={160} height={160} className="h-full w-full rounded-full object-cover" />
                                </div>

                            )}
                        </React.Fragment>
                    ))}
                </div>
                <div className="mt-8 flex flex-col p-4">
                    <div className="mb-2 font-normal">
                        {userProfiles.map((userProfilesData) => (
                            <React.Fragment key={userProfilesData}>
                                <h1 className="my-2 text-[20px] font-bold">{`${formData.first_name || userProfilesData['first_name']} ${formData.last_name || userProfilesData['last_name']}`}</h1>
                                <h6 className="my-2 font-normal">{`${formData.job_title || userProfilesData['job_title']} At ${formData.organization_name || userProfilesData['organization_name']
                                    }`}</h6>
                                {formData.phone_number || userProfilesData['phone_number'] ? (
                                    <div className="flex items-center justify-start">
                                        <Call buttonColor={flag === 0 ? finalColor.bgSub : finalColor.buttonColor} textColor={flag === 0 ? finalColor.bgSub : finalColor.textColor} className={undefined}></Call>
                                        <div className="my-2 ml-2 font-normal">
                                            <a href={`tel:${formData.phone_number || userProfilesData['phone_number']}`}>{formData.phone_number || userProfilesData['phone_number']}</a>
                                        </div>
                                    </div>
                                ) : null}
                                {formData.profile_email || userProfilesData['profile_email'] ? (
                                    <div className="flex items-center justify-start">
                                        <MailBox buttonColor={flag === 0 ? finalColor.bgSub : finalColor.buttonColor} textColor={flag === 0 ? finalColor.bgSub : finalColor.textColor} className={undefined}></MailBox>
                                        <div className="my-2 ml-2 font-normal">
                                            <a href={`mailto:${formData.profile_email || userProfilesData['profile_email']}`}>{formData.profile_email || userProfilesData['profile_email']}</a>
                                        </div>
                                    </div>
                                ) : null}
                                <div className="my-2 flex w-full flex-col items-start justify-center overflow-y-auto overflow-x-hidden overscroll-contain">
                                    <div className="text-md overflow-auto overscroll-contain break-all">{formData.note || userProfilesData['note']}</div>
                                </div>
                            </React.Fragment>
                        ))}
                    </div>
                    {/* <div className="mb-2 grid grid-cols-5 sm:grid-cols-5 md:grid-cols-5 lg:grid-cols-5">{renderedIcons}</div> */}

                    <div className="grid grid-cols-5 justify-evenly">
                        {error && <p>{error}</p>}
                        {socialLinks.map((link, index) => (
                            <div key={index} className="mb-2"> {/* Adding margin bottom for row space */}
                                <a href={link.linktitle} target='_blank'>
                                    {renderPlatformIcon(link.platform)}
                                </a>
                            </div>
                        ))}
                    </div>
                    {/* 
                    {formData.LinkTitle || formData.FileTitle ? (
                        <>
                            <span className="my-3 text-[20px] font-bold">Quick Links</span>
                            <div className="w-[270px] px-2">
                                {formData.LinkTitle ? (
                                    <div className="flex items-center justify-between">
                                        <span className="text-md font-semibold">{formData.LinkTitle}</span>
                                        <div className="flex h-[30px] w-[30px] items-center justify-center">
                                            <Share textColor={finalColor.textColor}></Share>
                                        </div>
                                    </div>
                                ) : null}
                                {formData.FileTitle ? (
                                    <div className="flex items-center justify-between">
                                        <span className="text-md font-semibold">{formData.FileTitle}</span>
                                        <div className="flex h-[30px] w-[30px] items-center justify-center">
                                            <Download textColor={finalColor.textColor}></Download>
                                        </div>
                                    </div>
                                ) : null}
                            </div>
                        </>
                    ) : null} */}
                    <div className='mt-4'>
                        <span className="my-4 text-[20px] font-bold mt-4">Quick Links</span> {/* Adding margin top to the title */}
                        {customLinks.map((customLink, index) => (
                            <div key={index} className="mt-3">
                                <div className="flex justify-between">
                                    {customLink && customLink.custom_url && (
                                        <div className="mt-2">
                                            <a href={customLink.custom_url} className="text-md font-semibold" target='_blank'>{customLink.linktitle}</a>
                                        </div>
                                    )}
                                    <div>
                                        {customLink && customLink.custom_url && <a href={customLink.custom_url}><Share textColor={textColor} /></a>}
                                    </div>
                                </div>
                                <div className="flex justify-between">
                                    {customLink && customLink.label && (
                                        <span className="text-md font-semibold">{customLink.label}</span>
                                    )}
                                    <div>
                                        {customLink && customLink.label &&
                                            
                                            <Download textColor={textColor} onClick={handleDownload} />

                                        }
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>


                    {/* ---------------------company info-------------------------- */}
                    <div>
                        <div className="mb-3 mt-5 flex w-full flex-wrap items-center justify-start text-[20px] font-bold">
                            {/* {formData.company_name || (companyProfiles.length > 0 && companyProfiles[0]['company_name'])} */}
                            {formData?.company_name || (companyProfiles?.length > 0 && companyProfiles[0]?.company_name)}

                        </div>

                        <div >
                            {companyProfiles.length > 0 && (
                                <>
                                    {formData.street_address ||
                                        companyProfiles[0]?.street_address ||
                                        formData.city ||
                                        companyProfiles[0]?.city ||
                                        formData.state ||
                                        companyProfiles[0]?.state ||
                                        formData.country ||
                                        companyProfiles[0]?.country ||
                                        formData.post_code ? (
                                        <div className="my-4 flex w-full items-start  gap-3">
                                            <a
                                                href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
                                                    [
                                                        formData.street_address || companyProfiles[0]?.street_address,
                                                        formData.city || companyProfiles[0]?.city,
                                                        formData.state || companyProfiles[0]?.state,
                                                        formData.country || companyProfiles[0]?.country,
                                                        formData.post_code,
                                                    ].filter(Boolean).join(', ')
                                                )}`}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="flex items-start"
                                                style={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', maxWidth: '300px' }}
                                            >
                                                <Location textColor={finalColor.textColor} className="h-9 w-9 flex-shrink-0" />
                                                <div className=" flex flex-col flex-wrap" style={{ width: '200px' }}>
                                                    <span className="text-md break-all px-1 font-normal">
                                                        {[
                                                            formData.street_address || companyProfiles[0]?.street_address,
                                                            formData.city || companyProfiles[0]?.city,
                                                            formData.state || companyProfiles[0]?.state,
                                                            formData.country || companyProfiles[0]?.country,
                                                            formData.post_code,
                                                        ].filter(Boolean).join(' ')}
                                                    </span>
                                                </div>
                                            </a>
                                        </div>
                                    ) : null}

                                    {formData.company_contact || companyProfiles[0]?.company_contact ? (
                                        <div className="my-4 flex w-full items-start">
                                            <Call2 textColor={flag === 0 ? finalColor.bgSub : finalColor.textColor}></Call2>
                                            <div className=" flex flex-col flex-wrap" style={{ width: '200px' }}>
                                                <a href={`tel:${formData.company_contact || companyProfiles[0]?.company_contact}`} className="text-md break-all px-2 font-normal">
                                                    {formData.company_contact || companyProfiles[0]?.company_contact}
                                                </a>
                                            </div>
                                        </div>
                                    ) : null}

                                    {formData.website || companyProfiles[0]?.website ? (
                                        <div className="my-4 flex items-start">
                                            <a href={formData.website || companyProfiles[0]?.website} target="_blank" rel="noopener noreferrer" className="flex items-center">
                                                <WebsiteIcon textColor={finalColor.textColor} className="h-9 w-9 flex-shrink-0" />
                                                <div className=" flex flex-col flex-wrap" style={{ width: '200px' }}>
                                                    <span className="text-md break-all px-2 font-normal">{formData.website || companyProfiles[0]?.website}</span>
                                                </div>
                                            </a>
                                        </div>
                                    ) : null}
                                </>
                            )}
                            {/* {formData.street_address ||
                            
                                (companyProfiles.length > 0 && companyProfiles[0]?.street_address) ||
                                formData.city ||
                                (companyProfiles.length > 0 && companyProfiles[0]?.city) ||
                                formData.state ||
                                (companyProfiles.length > 0 && companyProfiles[0]?.state) ||
                                formData.country ||
                                (companyProfiles.length > 0 && companyProfiles[0]?.country) ||
                                formData.post_code ? (
                                <div className="my-4 flex w-full items-start  gap-3">
                                    <a
                                        href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
                                            [
                                                formData.street_address || (companyProfiles.length > 0 && companyProfiles[0]?.street_address),
                                                formData.city || (companyProfiles.length > 0 && companyProfiles[0]?.city),
                                                formData.state || (companyProfiles.length > 0 && companyProfiles[0]?.state),
                                                formData.country || (companyProfiles.length > 0 && companyProfiles[0]?.country),
                                                formData.post_code,
                                            ]
                                                .filter(Boolean)
                                                .join(', ')
                                        )}`}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="flex items-start"
                                        style={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', maxWidth: '300px' }}
                                    >
                                        <Location textColor={finalColor.textColor} className="h-9 w-9 flex-shrink-0" />
                                        <div className=" flex flex-col flex-wrap" style={{ width: '200px' }}>
                                            <span className="text-md break-all px-1 font-normal">
                                                {[
                                                    formData.street_address || (companyProfiles.length > 0 && companyProfiles[0]?.street_address),
                                                    formData.city || (companyProfiles.length > 0 && companyProfiles[0]?.city),
                                                    formData.state || (companyProfiles.length > 0 && companyProfiles[0]?.state),
                                                    formData.country || (companyProfiles.length > 0 && companyProfiles[0]?.country),
                                                    formData.post_code,
                                                ]
                                                    .filter(Boolean)
                                                    .join(' ')}
                                            </span>
                                        </div>
                                    </a>
                                </div>
                            ) : null} */}

                            {/* {formData.company_contact || (companyProfiles[0] && companyProfiles[0]?.company_contact) ? (
                                <div className="my-4 flex w-full items-start">
                                    <Call2 textColor={flag === 0 ? finalColor.bgSub : finalColor.textColor}></Call2>
                                    <div className=" flex flex-col flex-wrap" style={{ width: '200px' }}>
                                        <a href={`tel:${formData.company_contact || (companyProfiles[0] && companyProfiles[0]?.company_contact)}`} className="text-md break-all px-2 font-normal">
                                            {formData.company_contact || (companyProfiles[0] && companyProfiles[0]?.company_contact)}
                                        </a>
                                    </div>
                                </div>
                            ) : null} */}

                            {/* {formData.website || (companyProfiles[0] && companyProfiles[0]?.website) ? (
                                <div className="my-4 flex items-start">
                                    <a href={formData.website || (companyProfiles[0] && companyProfiles[0]?.website)} target="_blank" rel="noopener noreferrer" className="flex items-center">
                                        {/* <WebsiteIcon textColor={finalColor.textColor} className="h-9 w-9 flex-shrink-0" /> */}
                            {/* <WebsiteIcon textColor={finalColor.textColor} className="h-9 w-9 flex-shrink-0" />

                                        <div className=" flex flex-col flex-wrap" style={{ width: '200px' }}>
                                            <span className="text-md break-all px-2 font-normal">{formData.website || (companyProfiles[0] && companyProfiles[0]?.website)}</span>
                                        </div>
                                    </a>
                                </div>
                            ) : null}  */}


                        </div>

                        {/* {companyProfiles.map((CompanyProfileData) => (
                            <React.Fragment key={CompanyProfileData}>
                                <div className="mb-3 mt-5 flex w-full flex-wrap items-center justify-start text-[20px] font-bold">
                                    {`${formData.company_name || CompanyProfileData["company_name"]} `}
                                </div>

                                {formData.street_address || CompanyProfileData["street_address"] ||
                                    formData.city || CompanyProfileData["city"] ||
                                    formData.state || CompanyProfileData["state"] ||
                                    formData.country || CompanyProfileData["country"] ||
                                    formData.post_code || CompanyProfileData["post_code"] ? (
                                    <div className="my-2 flex w-full items-start">
                                        <a
                                            href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
                                                `${formData.street_address || CompanyProfileData["street_address"]} 
                                                ${formData.city || CompanyProfileData["city"]} 
                                                ${formData.state || CompanyProfileData["state"]} 
                                                ${formData.country || CompanyProfileData["country"]} 
                                                ${formData.post_code || CompanyProfileData["post_code"]}`
                                            )}`}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="flex items-center"
                                        >
                                            <Location textColor={finalColor.textColor} className="h-9 w-9 flex-shrink-0" />
                                            <div className="ml-2 flex flex-col flex-wrap" style={{ width: "200px" }}>
                                                <span className="text-md break-all px-2 font-normal">
                                                    {[
                                                        formData.street_address || CompanyProfileData["street_address"],
                                                        formData.city || CompanyProfileData["city"],
                                                        formData.state || CompanyProfileData["state"],
                                                        formData.country || CompanyProfileData["country"],
                                                        formData.post_code || CompanyProfileData["post_code"]
                                                    ].filter(Boolean).join(" ")}
                                                </span>
                                            </div>
                                        </a>
                                    </div>
                                ) : null}

                                {CompanyProfileData && (CompanyProfileData["company_contact"] || formData.company_contact) ? (
                                    <div className="my-2 flex w-full items-start">
                                        <Call2 textColor={flag === 0 ? finalColor.bgSub : finalColor.textColor}></Call2>
                                        <div className="ml-2 flex flex-col flex-wrap" style={{ width: "200px" }}>
                                            <a href={`tel:${CompanyProfileData["company_contact"] || formData.company_contact}`}>
                                                {CompanyProfileData["company_contact"] || formData.company_contact}
                                            </a>
                                        </div>
                                    </div>
                                ) : null}

                                {CompanyProfileData && (CompanyProfileData["website"] || formData.website) ? (
                                    <div className="my-2 flex items-start">
                                        <a href={CompanyProfileData["website"] || formData.website} target="_blank" rel="noopener noreferrer" className="flex items-center">
                                            <WebsiteIcon textColor={finalColor.textColor} className="h-9 w-9 flex-shrink-0" />
                                            <div className="ml-2 flex flex-col flex-wrap" style={{ width: "200px" }}>
                                                <span className="text-md break-all px-2 font-normal">{CompanyProfileData["website"] || formData.website}</span>
                                            </div>
                                        </a>
                                    </div>
                                ) : null}

                            </React.Fragment>
                        ))} */}
                    </div>

                    <div>
                        <button type="button" className="btn my-4 w-full" style={{ background: finalColor.buttonColor, color: finalColor.buttontextColor }}>
                            Save as Contact
                        </button>
                        <button type="button" className="btn mb-7 w-full" style={{ color: finalColor.textColor, borderColor: finalColor.textColor }} onClick={openModal}>
                            Share your details
                        </button>
                    </div>
                </div>
                <div className="inset-0 bottom-0 z-0 flex items-center justify-center p-3">
                    <Image src={tapect_logo} width={80} height={80} alt="tapectlogo" />
                </div>
            </div>
        </>
    );
};

export default CustomCard;
