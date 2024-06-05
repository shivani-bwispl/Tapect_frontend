/* eslint-disable react-hooks/rules-of-hooks */
// /* eslint-disable react-hooks/exhaustive-deps */
// /* eslint-disable react/jsx-no-target-blank */
// /* eslint-disable @next/next/no-img-element */
// /* eslint-disable react/jsx-key */
// import React, { useState, useEffect } from "react";
// import Image from "next/image";
// import dynamic from 'next/dynamic';

// import Share from "../public/assets/images/static/socialIcon/Share";
// import Call from "../public/assets/images/static/socialIcon/Call";
// import MailBox from "../public/assets/images/static/socialIcon/MailBox";
// import Download from "../public/assets/images/static/socialIcon/Download";
// import Location from "../public/assets/images/static/socialIcon/Location";
// import WebsiteIcon from "../public/assets/images/static/socialIcon/WebsiteIcon";
// import tapect_logo from "../public/assets/images/tapect_logo.svg";
// import Linked_in from "../public/assets/images/static/socialIcon/Linked_in";
// import applemusic from "../public/assets/images/static/socialIcon/applemusic";
// import booksy from "../public/assets/images/static/socialIcon/booksy";
// import calendly from "../public/assets/images/static/socialIcon/calendly";
// import cashapp from "../public/assets/images/static/socialIcon/cashapp";
// import clubhouse from "../public/assets/images/static/socialIcon/clubhouse";
// import discord from "../public/assets/images/static/socialIcon/discord";
// import facetime from "../public/assets/images/static/socialIcon/facetime";
// import googlemap from "../public/assets/images/static/socialIcon/googlemap";
// import hoobe from "../public/assets/images/static/socialIcon/hoobe";
// import link from "../public/assets/images/static/socialIcon/link";
// import linktree from "../public/assets/images/static/socialIcon/linktree";
// import mail from "../public/assets/images/static/socialIcon/mail";

// import mediakits from "../public/assets/images/static/socialIcon/mediakits";
// import microsoftbooking from "../public/assets/images/static/socialIcon/microsoftbooking";
// import opensea from "../public/assets/images/static/socialIcon/opensea";
// import paypal from "../public/assets/images/static/socialIcon/paypal";
// import pinterest from "../public/assets/images/static/socialIcon/pinterest";
// import podcasts from "../public/assets/images/static/socialIcon/podcasts";
// import poshmark from "../public/assets/images/static/socialIcon/poshmark";
// import reviews from "../public/assets/images/static/socialIcon/reviews";
// import Instagram_card from "../public/assets/images/static/socialIcon/Instagram_card";
// import Facebook_card from "../public/assets/images/static/socialIcon/Facebook_card";
// import Twitter_card from "../public/assets/images/static/socialIcon/Twitter_card";
// import zillow from "../public/assets/images/static/socialIcon/zillow";
// import etsy from "../public/assets/images/static/socialIcon/etsy";

// import zelle from "../public/assets/images/static/socialIcon/zelle";
// import youtube from "../public/assets/images/static/socialIcon/youtube";
// import whatsapp from "../public/assets/images/static/socialIcon/whatsapp";
// import website from "../public/assets/images/static/socialIcon/website";
// import wechat from "../public/assets/images/static/socialIcon/wechat";
// import venmo from "../public/assets/images/static/socialIcon/venmo";
// import twiteer from "../public/assets/images/static/socialIcon/twiteer";
// import twitch from "../public/assets/images/static/socialIcon/twitch";
// import tiktok from "../public/assets/images/static/socialIcon/tiktok";
// import threads from "../public/assets/images/static/socialIcon/threads";
// import message from "../public/assets/images/static/socialIcon/message";
// import telegram from "../public/assets/images/static/socialIcon/telegram";
// import soundcloud from "../public/assets/images/static/socialIcon/soundcloud";
// import snapchat from "../public/assets/images/static/socialIcon/snapchat";
// import spotify from "../public/assets/images/static/socialIcon/spotify";
// import gpay from "../public/assets/images/static/socialIcon/gpay";
// import BlankLayout from "@/components/Layouts/BlankLayout";
// import { useLeadCapture } from "../components/LeadCaptureContext";
// import { useImageContext } from "../components/ImageContext";
// import { useColorContext } from "../components/ColorContext";
// import { imagepathURL } from '@/services/imgpthapi';
// import { useParams } from 'react-router-dom';


// import { useRouter } from "next/dist/client/router";
// import axiosInstance from "@/services/api";
// import Swal from "sweetalert2";
// import withReactContent from "sweetalert2-react-content";



// const ViewCard = () => {
//     // Define state variables and setters
//     const [isModalOpen, setIsModalOpen] = useState(false);
//     const router = useRouter();
//     const MySwal = withReactContent(Swal);
//     const [error, setError] = useState(null);





//     const [contactformData, setContactformData] = useState({
//         fullname: "",
//         contact_email: "",
//         contact_phonenumber: "",
//         contact_jobtitle: "",
//         company: "",
//         website: ""
//     });
//     const [emailError, setEmailError] = useState("");


//     const { showPhonenumberInput, showEmailInput, showCompanyInput, showWebsiteInput, showJobtitleInput }: any = useLeadCapture();

//     const {
//         backgroundColor, textColor, buttonColor, buttontextColor, sketchPickerColor, sketchPickerLightColor, flag
//     }: any = useColorContext();



//     const CutomCardHeight = { height: "100dvh", width: "350px" };


//     const [finalColor, setFinalColor] = useState({
//         bgSub: "",
//         bg: "#FFFFFF",
//         buttonColor: "#652dbf",
//         buttontextColor: "#000000",
//         textColor: "#000000"
//     });


//     const [inputValue, setInputValue] = useState("");



//     const [isHovered, setIsHovered] = useState(false);
//     const [isHovered2, setIsHovered2] = useState(false);
//     const buttonStyle = {
//         background: isHovered ? `white` : buttonColor,
//         color: isHovered ? `${textColor}` : buttontextColor,
//         borderColor: isHovered ? `${textColor}` : ""
//     };



//     const [userProfiles, setUserProfiles] = useState([]);
//     const [companyProfiles, setCompanyProfiles] = useState([]);
//     const [socialLinks, setSocialLinks] = useState([]);
//     const [customLinks, setCustomLinks] = useState([]);
//     const [loading, setLoading] = useState(true);

//     const { slug_url } = useParams(); // Assumes you have a router setup to provide this param


//     // ---------------------get user all data--------------------------

//     const getuseralldata = async () => {
//         const userId = localStorage.getItem("userId");
//         const requestBody = {
//             userId: userId
//         };
//         try {
//             const response = await axiosInstance.post(
//                 "/getUserData",
//                 requestBody
//             );
//             const responsedata = response.data;

//             // Accessing individual data fields
//             const userDetails = responsedata.data.userProfiles;
//             if (Array.isArray([userDetails])) {
//                 setUserProfiles([userDetails]);
//             } else {
//                 console.error("userDetails is not an array:", userDetails);
//             }

//             const userSocialDetails = responsedata.data.usersocialDetail;
//             if (userSocialDetails && typeof userSocialDetails === "object") {
//                 const {
//                     Social_Media,
//                     Business,
//                     Contact,
//                     Payment,
//                     Music,
//                     Custom_link
//                 } = userSocialDetails;

//                 // Combine social media and business links into one array
//                 const allSocialLinks = [
//                     ...Social_Media,
//                     ...Business,
//                     ...Contact,
//                     ...Music,
//                     ...Payment
//                 ];
//                 // console.log(allSocialLinks, "allSocialLinks");
//                 // Set custom links in state
//                 setCustomLinks(Custom_link || []);

//                 // Set all social links in state
//                 setSocialLinks(allSocialLinks);
//             } else {
//                 throw new Error(
//                     "Social links data is not in the expected format"
//                 );
//             }

//             // const userCustomizeprofile = responsedata.data.userCustomizeprofile;
//             // setUserProfiles(userDetails);

//             const userCompanyprofile = responsedata.data.userCompanyprofile;
//             setCompanyProfiles([userCompanyprofile]);
//         } catch (error) {
//             console.error("There was a problem with the Axios request:", error);
//         }
//     };





//     useEffect(() => {

//         getuseralldata();
//     }, []);


//     useEffect(() => {
//         const fetchUserProfile = async () => {
//             try {
//                 // Make a GET request to fetch data from the server
//                 const response = await axiosInstance.get('/slugURL/slug_url');
//                 // Extract 'slug_url' and 'user_id' values from the response data
//                 const userProfileData = response.data.map(profile => ({
//                     slug_url: profile.slug_url,
//                     user_id: profile.user_id // Assuming user_id is a field in the fetched data
//                 }));

//                 console.log(userProfileData);
//             } catch (error) {
//                 console.error('Error fetching user profiles', error);
//             }
//         };

//         fetchUserProfile();
//     }, [slug_url]);


//     useEffect(() => {
//         if (sketchPickerLightColor && flag === 0) {
//             setFinalColor({
//                 bg: sketchPickerLightColor,
//                 bgSub:
//                     sketchPickerLightColor === "#000000"
//                         ? "#FFFFFF"
//                         : sketchPickerColor,
//                 buttonColor: sketchPickerColor,
//                 buttontextColor: "#FFFFFF", // Corrected property name
//                 textColor: sketchPickerColor
//             });
//         }
//     }, [sketchPickerColor, sketchPickerLightColor, flag]);

//     useEffect(() => {
//         if (backgroundColor && flag === 1) {
//             setFinalColor(prevColor => ({
//                 ...prevColor, // Keep previous state
//                 bg: backgroundColor,
//                 buttonColor: buttonColor,
//                 buttontextColor: buttontextColor, // Correct property name
//                 textColor: textColor
//             }));
//         }
//     }, [backgroundColor, buttonColor, buttontextColor, textColor, flag]);



//     // ---------------------------Helper Functions:-------------------


//     const showToast = () => {
//         MySwal.fire({
//             title: "Submitted successfully",
//             toast: true,
//             position: "top",
//             showConfirmButton: false,
//             timer: 3000,
//             background: "#4CAF50",
//             showCloseButton: true
//         });
//     };

//     const closeModal = () => { setIsModalOpen(false); };
//     const openModal = () => { setIsModalOpen(true); };


//     // Define handleInputChange function to update form data
//     const handleInputChange = event => {
//         const { name, value } = event.target;

//         // Update form data state
//         setContactformData({
//             ...contactformData,
//             [name]: value
//         });
//     };

//     const handleContactFormSubmit = async contactformData => {
//         if (!contactformData.contact_email) {
//             setEmailError("Please enter your email");
//             return;
//         }

//         try {
//             // Make API call to update company profile
//             await handleContactUpdate(contactformData);
//             // Optionally, perform any additional actions after successful update
//             console.log("Company profile updated successfully");
//             // Clear form fields by setting the state to empty values
//             setContactformData({
//                 fullname: "",
//                 contact_email: "",
//                 contact_phonenumber: "",
//                 contact_jobtitle: "",
//                 company: "",
//                 website: ""
//             });
//             setEmailError("");
//             showToast();
//         } catch (error) {
//             console.error("Error updating company profile:", error.message);
//             // Optionally, handle the error and display an error message to the user
//         }
//     };

//     const handleContactUpdate = async data => {
//         try {
//             const userId = localStorage.getItem("userId");

//             if (!userId) {
//                 throw new Error("User ID not found in localStorage");
//             }

//             // Include userId in the data object
//             data.userId = userId;

//             const response = await axiosInstance.post(
//                 "/contact_details/",
//                 data
//             );
//             //  console.log(response.data); // Log the response from the server
//             console.log("contact Shared Successfully");
//             window.location.reload();

//             // Optionally, perform any additional actions after successful update
//         } catch (error) {
//             console.error("Error updating company profile:", error.message);
//             throw error; // Rethrow the error to handle it in the caller function
//         }
//     };

//     // Function to render platform icons dynamically
//     const renderPlatformIcon = platform => {
//         // Define a mapping between platform names and their corresponding icons
//         const platformIcons = {
//             linkedin: Linked_in,
//             instagram: Instagram_card,

//             facebook: Facebook_card,
//             twitter: Twitter_card,
//             applemusic: applemusic,
//             booksy: booksy,
//             calendly: calendly,
//             cashapp: cashapp,
//             clubhouse: clubhouse,
//             discord: discord,
//             facetime: facetime,
//             googlemap: googlemap,
//             hoobe: hoobe,
//             link: link,
//             linktree: linktree,
//             mail: mail,
//             mediakits: mediakits,
//             microsoftbooking: microsoftbooking,
//             opensea: opensea,
//             paypal: paypal,
//             pinterest: pinterest,
//             podcasts: podcasts,
//             poshmark: poshmark,
//             reviews: reviews,
//             zillow: zillow,
//             etsy: etsy,
//             zelle: zelle,
//             youtube: youtube,
//             whatsapp: whatsapp,
//             website: website,
//             wechat: wechat,
//             venmo: venmo,
//             twiteer: twiteer,
//             twitch: twitch,
//             tiktok: tiktok,
//             threads: threads,
//             message: message,
//             telegram: telegram,
//             spotify: spotify,
//             soundcloud: soundcloud,
//             snapchat: snapchat,
//             googlepay: gpay
//             // Add more platform names and their corresponding components here
//         };
//         // Check if the platform exists in the platformIcons mapping
//         if (platformIcons.hasOwnProperty(platform)) {
//             const PlatformComponent = platformIcons[platform];
//             return (
//                 <PlatformComponent
//                     buttonColor={
//                         flag === 0 ? finalColor.bgSub : finalColor.buttonColor
//                     }
//                     textColor={
//                         flag === 0 ? finalColor.bgSub : finalColor.textColor
//                     }
//                 />
//             );
//         } else {
//             // Return a default icon or handle the case when the platform is not found
//             return <img src="default-icon.png" alt="Default" />;
//         }
//     };

//     return (
//         <>
//             {isModalOpen && (
//                 <div className="fixed inset-0 z-50 flex items-center justify-center  bg-opacity-50">
//                     <div className="relative mx-auto w-[300px] max-w-sm rounded-md border bg-white p-4">
//                         <button className="absolute right-4 top-2 cursor-pointer text-2xl" onClick={closeModal}>
//                             &times;
//                         </button>
//                         <form>
//                             <div className=" ml-4 mt-3">
//                                 <span className="h-[30px] w-[90px] text-lg font-bold">Share your details</span>
//                             </div>
//                             <div className="mt-1 flex flex-col items-center justify-center px-2">
//                                 <div className="my-1">
//                                     <input
//                                         id="fullname"
//                                         type="text"
//                                         name="fullname"
//                                         placeholder="Full Name"
//                                         value={contactformData.fullname}
//                                         onChange={(e) => {
//                                             handleInputChange(e);
//                                             setInputValue(e.target.value);
//                                         }}
//                                         className="form-input w-[230px] placeholder:text-xs placeholder:text-gray"
//                                     />
//                                 </div>
//                                 {showEmailInput && (
//                                     <div className="my-1">
//                                         <input
//                                             id="contact_email"
//                                             type="email"
//                                             placeholder="Email"
//                                             name="contact_email"
//                                             value={contactformData.contact_email}
//                                             onChange={(e) => {
//                                                 handleInputChange(e);
//                                                 setInputValue(e.target.value);
//                                                 setEmailError('');
//                                             }}
//                                             className="form-input w-[230px] placeholder:text-xs placeholder:text-gray"
//                                         />
//                                         {emailError && <div className="text-red-500">{emailError}</div>}
//                                     </div>
//                                 )}
//                                 {showPhonenumberInput && (
//                                     <div className="my-1">
//                                         <input
//                                             id="contact_phonenumber"
//                                             type="tel"
//                                             placeholder="Phone number"
//                                             name="contact_phonenumber"
//                                             value={contactformData.contact_phonenumber}
//                                             onChange={(e) => {
//                                                 handleInputChange(e);
//                                                 setInputValue(e.target.value);
//                                             }}
//                                             className="form-input w-[230px] placeholder:text-xs placeholder:text-gray"
//                                         />
//                                     </div>
//                                 )}
//                                 {showJobtitleInput && (
//                                     <div className="my-1">
//                                         <input
//                                             id="contact_jobtitle"
//                                             type="text"
//                                             placeholder="Job title"
//                                             name="contact_jobtitle"
//                                             value={contactformData.contact_jobtitle}
//                                             onChange={(e) => {
//                                                 handleInputChange(e);
//                                                 setInputValue(e.target.value);
//                                             }}
//                                             className="form-input w-[230px] placeholder:text-xs placeholder:text-gray"
//                                         />
//                                     </div>
//                                 )}
//                                 {showCompanyInput && (
//                                     <div className="my-1">
//                                         <input
//                                             id="company"
//                                             type="text"
//                                             placeholder="Company"
//                                             name="company"
//                                             value={contactformData.company}
//                                             onChange={(e) => {
//                                                 handleInputChange(e);
//                                                 setInputValue(e.target.value);
//                                             }}
//                                             className="form-input w-[230px] placeholder:text-xs placeholder:text-gray"
//                                         />
//                                     </div>
//                                 )}
//                                 {showWebsiteInput && (
//                                     <div className="my-1">
//                                         <input
//                                             id="website"
//                                             type="text"
//                                             name="website"
//                                             placeholder="Website"
//                                             value={contactformData.website}
//                                             onChange={(e) => {
//                                                 handleInputChange(e);
//                                                 setInputValue(e.target.value);
//                                             }}
//                                             className="form-input w-[230px] placeholder:text-xs placeholder:text-gray"
//                                         />
//                                     </div>
//                                 )}
//                                 <div className="my-3">
//                                     <button type="button" onClick={() => handleContactFormSubmit(contactformData)} className="btn btn-primary h-[40px] w-[230px] text-base">
//                                         Submit
//                                     </button>
//                                 </div>
//                             </div>
//                         </form>
//                     </div>
//                 </div>
//             )}
//             {isModalOpen && <div className="absolute z-40 h-full w-full bg-black bg-opacity-50 backdrop-blur-sm"></div>}


//             <div className="flex min-h-screen flex-col items-center justify-center bg-gray-100">

//                 <div>

//                     {/* Add other user details you want to display here */}
//                 </div>
//                 <div

//                     className={`mx-auto mb-8 mt-8 grid  overflow-y-auto overflow-x-hidden rounded-3xl border md:grid-cols-1 xl:grid-cols-1`}
//                     style={{ ...CutomCardHeight, backgroundColor, color: textColor }}
//                 >
//                     <div className="relative mb-8 mt-[-4px] border-white-light dark:border-[#1b2e4b]">
//                         {userProfiles.map((userProfileData, index) => (
//                             <div key={index} className="relative mb-8 mt-[-4px] border-white-light dark:border-[#1b2e4b]">
//                                 {userProfileData['coverImage'] && (

//                                     <img src={`${imagepathURL}/static/coverImages/${userProfileData['coverImage']}`} alt="Preview" width={500} height={500} className="h-full w-full object-cover" />
//                                 )}

//                                 {userProfileData['profileImage'] && (
//                                     <div className="absolute bottom-[-6vh] left-[1vh] h-24 w-24 p-0.5 rounded-full border border-solid border-white bg-gray-lightGray">
//                                         <img src={`${imagepathURL}/static/profileImages/${userProfileData['profileImage']}`} alt="Preview" width={160} height={160} className="h-full w-full rounded-full object-cover" />
//                                     </div>
//                                 )}

//                                 {userProfileData['logoImage'] && (
//                                     <><div className="absolute bottom-[-5.9vh] left-[8.5vh] h-14 w-14 p-0.5 rounded-full border border-solid border-white bg-gray-lightGray">
//                                         <img src={`${imagepathURL}/static/logoImages/${userProfileData['logoImage']}`} alt="Preview" width={160} height={160} className="h-full w-full rounded-full object-cover" />
//                                     </div>


//                                     </>
//                                 )}
//                             </div>
//                         ))}
//                     </div>

//                     <div className=" flex flex-col px-6 py-4 mt-5 max-md:w-5/6 " >
//                         <div className="mb-2 mt-0   font-normal">
//                             {userProfiles.map((userProfilesData) => (
//                                 <React.Fragment key={userProfilesData}>
//                                     <h1 className="my-2 text-[20px] font-bold">
//                                         {`
//                       ${userProfilesData['first_name']} 
//                       ${userProfilesData['last_name']}
//                     `}
//                                     </h1>
//                                     <h6 className="my-2 font-normal">
//                                         {`
//                       ${userProfilesData['job_title']} At
//                       ${userProfilesData['organization_name']} 
//                     `}
//                                     </h6>
//                                     <div className="flex items-center justify-start">
//                                         <Call textColor={textColor} buttonColor={undefined} className={undefined}></Call>
//                                         <div className="my-2 ml-2 font-normal">
//                                             <a href={`tel:${userProfilesData['phone_number']}`}>{userProfilesData['phone_number']}</a>
//                                         </div>
//                                     </div>
//                                     <div className="flex items-center justify-start">
//                                         <MailBox className="mr-5" textColor={textColor} buttonColor={undefined}></MailBox>
//                                         <div className="my-2 ml-3 font-normal">
//                                             <a href={`mailto:${userProfilesData['profile_email']}`}>{userProfilesData['profile_email']}</a>
//                                         </div>
//                                     </div>
//                                     <div className="my-2 flex w-full flex-col items-start justify-center overflow-y-auto overflow-x-hidden overscroll-contain">
//                                         <div className="text-md overflow-auto overscroll-contain">
//                                             {`
//                       ${userProfilesData['note']} 

//                     `}
//                                         </div>
//                                     </div>
//                                 </React.Fragment>
//                             ))}
//                         </div>
//                         <div className=" my-5 grid grid-cols-5 gap-4 sm:grid-cols-5 md:grid-cols-5 lg:grid-cols-5">
//                             {error && <p>{error}</p>}
//                             {socialLinks.map((link, index) => (
//                                 <div key={index}>

//                                     <a href={link.linktitle} target='_blank'>   {renderPlatformIcon(link.platform)}</a>
//                                 </div>
//                             ))}
//                         </div>
//                         <>

//                             <div className="mt-5">
//                                 <span className="my-4  text-[20px] font-bold">Quick Links</span>
//                                 {customLinks.map((customLink, index) => (
//                                     <div key={index} className="mt-3">
//                                         <div className="flex justify-between ">
//                                             {customLink && customLink.linktitle && (
//                                                 <div className="mt-2 ">
//                                                     <a href={customLink.custom_url} className="text-md font-semibold" target='_blank'>{customLink.linktitle}</a>
//                                                 </div>
//                                             )}
//                                             <div>
//                                                 {customLink && customLink.custom_url && <a href={customLink.custom_url}><Share textColor={textColor} /></a>}
//                                             </div>
//                                         </div>
//                                         <div className="flex justify-between">
//                                             {customLink && customLink.label && (
//                                                 <span className="text-md font-semibold">{customLink.label}</span>
//                                             )}
//                                             <div>
//                                                 {customLink && customLink.label && <Download textColor={textColor} onClick={undefined} />}
//                                             </div>
//                                         </div>
//                                     </div>
//                                 ))}
//                             </div>

//                         </>
//                         {companyProfiles.map((CompanyProfileData) => (
//                             <React.Fragment key={CompanyProfileData}>
//                                 <div className="mb-3 mt-5 flex w-full flex-wrap items-center justify-start pr-4 text-[20px] font-bold">
//                                     {`
//                       ${CompanyProfileData['company_name']} 
//                     `}
//                                 </div>
//                                 <div className="my-4 flex w-full items-start">
//                                     <Location textColor={textColor} className="h-9 w-9 flex-shrink-0"></Location>
//                                     <div className=" ml-2 flex flex-col flex-wrap" style={{ width: '350px' }}>
//                                         <span className="text-md break-all px-2 font-normal">
//                                             {`
//                      ${CompanyProfileData['street_address']},
//                      ${CompanyProfileData['city']} ,
//                      ${CompanyProfileData['state']},
//                      ${CompanyProfileData['country']},
//                      ${CompanyProfileData['post_code']}
//                     `}
//                                         </span>
//                                     </div>
//                                 </div>
//                                 <div className="my-4 flex w-full items-start">
//                                     <Call textColor={textColor} className="h-9 w-9 flex-shrink-0" buttonColor={undefined}></Call>
//                                     <div className="ml-2 flex flex-col flex-wrap" style={{ width: '200px' }}>
//                                         <span className="text-md break-all px-2 font-normal">
//                                             {`
//                       ${CompanyProfileData['company_contact']} 
//                     `}{' '}
//                                         </span>
//                                     </div>
//                                 </div>
//                                 <div className="my-4 flex items-start">
//                                     <WebsiteIcon textColor={textColor} className="h-9 w-9 flex-shrink-0"></WebsiteIcon>
//                                     <div className="ml-2 flex flex-col flex-wrap" style={{ width: '200px' }}>
//                                         <span className="text-md break-all px-2 font-normal">
//                                             {`
//                       ${CompanyProfileData['website']} 
//                     `}
//                                         </span>
//                                     </div>
//                                 </div>
//                                 <div>
//                                     <button
//                                         type="button"
//                                         className="btn my-4 w-full"
//                                         style={{ background: buttonColor, color: buttontextColor }}
//                                         onMouseEnter={() => setIsHovered(true)}
//                                         onMouseLeave={() => setIsHovered(false)}
//                                     >
//                                         Save as Contact
//                                     </button>
//                                     <button type="button" className="btn mb-7 w-full" style={{ color: textColor, borderColor: textColor }} onClick={openModal}>
//                                         Share your details
//                                     </button>
//                                 </div>
//                             </React.Fragment>
//                         ))}
//                         <div className=" flex items-center justify-center  p-2">
//                             <Image src={tapect_logo} width={80} height={80} alt="tapectlogo"></Image>
//                         </div>
//                     </div>
//                 </div>
//             </div>
//         </>
//     );
// };
// ViewCard.getLayout = (page: any) => {
//     return <BlankLayout>{page}</BlankLayout>;
// };

// export default ViewCard;



/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/jsx-no-target-blank */
/* eslint-disable @next/next/no-img-element */
/* eslint-disable react/jsx-key */
import React, { useState, useEffect } from "react";
import Image from "next/image";
import dynamic from 'next/dynamic';

import Share from "../public/assets/images/static/socialIcon/Share";
import Call from "../public/assets/images/static/socialIcon/Call";
import MailBox from "../public/assets/images/static/socialIcon/MailBox";
import Download from "../public/assets/images/static/socialIcon/Download";
import Location from "../public/assets/images/static/socialIcon/Location";
import WebsiteIcon from "../public/assets/images/static/socialIcon/WebsiteIcon";
import tapect_logo from "../public/assets/images/tapect_logo.svg";
import Linked_in from "../public/assets/images/static/socialIcon/Linked_in";
import applemusic from "../public/assets/images/static/socialIcon/applemusic";
import booksy from "../public/assets/images/static/socialIcon/booksy";
import calendly from "../public/assets/images/static/socialIcon/calendly";
import cashapp from "../public/assets/images/static/socialIcon/cashapp";
import clubhouse from "../public/assets/images/static/socialIcon/clubhouse";
import discord from "../public/assets/images/static/socialIcon/discord";
import facetime from "../public/assets/images/static/socialIcon/facetime";
import googlemap from "../public/assets/images/static/socialIcon/googlemap";
import hoobe from "../public/assets/images/static/socialIcon/hoobe";
import link from "../public/assets/images/static/socialIcon/link";
import linktree from "../public/assets/images/static/socialIcon/linktree";
import mail from "../public/assets/images/static/socialIcon/mail";

import mediakits from "../public/assets/images/static/socialIcon/mediakits";
import microsoftbooking from "../public/assets/images/static/socialIcon/microsoftbooking";
import opensea from "../public/assets/images/static/socialIcon/opensea";
import paypal from "../public/assets/images/static/socialIcon/paypal";
import pinterest from "../public/assets/images/static/socialIcon/pinterest";
import podcasts from "../public/assets/images/static/socialIcon/podcasts";
import poshmark from "../public/assets/images/static/socialIcon/poshmark";
import reviews from "../public/assets/images/static/socialIcon/reviews";
import Instagram_card from "../public/assets/images/static/socialIcon/Instagram_card";
import Facebook_card from "../public/assets/images/static/socialIcon/Facebook_card";
import Twitter_card from "../public/assets/images/static/socialIcon/Twitter_card";
import zillow from "../public/assets/images/static/socialIcon/zillow";
import etsy from "../public/assets/images/static/socialIcon/etsy";

import zelle from "../public/assets/images/static/socialIcon/zelle";
import youtube from "../public/assets/images/static/socialIcon/youtube";
import whatsapp from "../public/assets/images/static/socialIcon/whatsapp";
import website from "../public/assets/images/static/socialIcon/website";
import wechat from "../public/assets/images/static/socialIcon/wechat";
import venmo from "../public/assets/images/static/socialIcon/venmo";
import twiteer from "../public/assets/images/static/socialIcon/twiteer";
import twitch from "../public/assets/images/static/socialIcon/twitch";
import tiktok from "../public/assets/images/static/socialIcon/tiktok";
import threads from "../public/assets/images/static/socialIcon/threads";
import message from "../public/assets/images/static/socialIcon/message";
import telegram from "../public/assets/images/static/socialIcon/telegram";
import soundcloud from "../public/assets/images/static/socialIcon/soundcloud";
import snapchat from "../public/assets/images/static/socialIcon/snapchat";
import spotify from "../public/assets/images/static/socialIcon/spotify";
import gpay from "../public/assets/images/static/socialIcon/gpay";
import BlankLayout from "@/components/Layouts/BlankLayout";
import { useLeadCapture } from "../components/LeadCaptureContext";
import { useImageContext } from "../components/ImageContext";
    import { useColorContext } from "../components/ColorContext";
import { imagepathURL } from '@/services/imgpthapi';
import { useParams } from 'react-router-dom';


import { useRouter } from "next/dist/client/router";
import axiosInstance from "@/services/api";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";



const ViewCard = () => {
    // Define state variables and setters
    const [isModalOpen, setIsModalOpen] = useState(false);
    const router = useRouter();
    const MySwal = withReactContent(Swal);
    const [error, setError] = useState(null);
    const { query } = router;
    // console.log(query);


    const [contactformData, setContactformData] = useState({
        fullname: "",
        contact_email: "",
        contact_phonenumber: "",
        contact_jobtitle: "",
        company: "",
        website: ""
    });
    const [emailError, setEmailError] = useState("");


    const { showPhonenumberInput, showEmailInput, showCompanyInput, showWebsiteInput, showJobtitleInput }: any = useLeadCapture();


    const [userProfiles, setUserProfiles] = useState([]);
    const [companyProfiles, setCompanyProfiles] = useState([]);
    const [socialLinks, setSocialLinks] = useState([]);
    const [customLinks, setCustomLinks] = useState([]);
    const [loading, setLoading] = useState(true);
    const [CustomizeProfile, setCustomizeProfile] = useState([]);

    const { slug_url } = useParams(); // Assumes you have a router setup to provide this param


    const {
        backgroundColor, textColor, buttonColor, buttontextColor, sketchPickerColor, sketchPickerLightColor, flag
    }: any = useColorContext();

    const CutomCardHeight = { height: "100vh", width: "450px" };


    const [inputValue, setInputValue] = useState("");



    const [isHovered, setIsHovered] = useState(false);
    const [isHovered2, setIsHovered2] = useState(false);
    
    const buttonStyle = {
        background: isHovered ? `white` : buttonColor,
        color: isHovered ? `${textColor}` : buttontextColor,
        borderColor: isHovered ? `${textColor}` : ""
    };




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



    // // ---------------------get user all data--------------------------

    // const getuseralldata = async () => {
    //     const userId = localStorage.getItem("userId");
    //     const requestBody = {
    //         userId: userId
    //     };
    //     try {
    //         const response = await axiosInstance.post(
    //             "/getUserData",
    //             requestBody
    //         );
    //         const responsedata = response.data;

    //         // Accessing individual data fields
    //         const userDetails = responsedata.data.userProfiles;
    //         if (Array.isArray([userDetails])) {
    //             setUserProfiles([userDetails]);
    //         } else {
    //             console.error("userDetails is not an array:", userDetails);
    //         }

    //         const userSocialDetails = responsedata.data.usersocialDetail;
    //         if (userSocialDetails && typeof userSocialDetails === "object") {
    //             const {
    //                 Social_Media,
    //                 Business,
    //                 Contact,
    //                 Payment,
    //                 Music,
    //                 Custom_link
    //             } = userSocialDetails;

    //             // Combine social media and business links into one array
    //             const allSocialLinks = [
    //                 ...Social_Media,
    //                 ...Business,
    //                 ...Contact,
    //                 ...Music,
    //                 ...Payment
    //             ];
    //             // console.log(allSocialLinks, "allSocialLinks");
    //             // Set custom links in state
    //             setCustomLinks(Custom_link || []);

    //             // Set all social links in state
    //             setSocialLinks(allSocialLinks);
    //         } else {
    //             throw new Error(
    //                 "Social links data is not in the expected format"
    //             );
    //         }

    //         // const userCustomizeprofile = responsedata.data.userCustomizeprofile;
    //         // setUserProfiles(userDetails);

    //         const userCompanyprofile = responsedata.data.userCompanyprofile;
    //         setCompanyProfiles([userCompanyprofile]);
    //     } catch (error) {
    //         console.error("There was a problem with the Axios request:", error);
    //     }
    // };





    // useEffect(() => {

    //     getuseralldata();
    // }, []);

    // const queryParam = query; 

    // console.log(queryParam,"queryParam")

    // const getuseralldata = async () => {

    // if (!queryParam) return;
    // console.log(queryParam,"queryParamif")

    //     try {
    //         const response = await axiosInstance.get(`/getUserData/Viewcard/${queryParam}`);

    //         const responsedata = response.data;

    //         // Accessing individual data fields
    //         const userDetails = responsedata.data.userProfiles;
    //         if (Array.isArray([userDetails])) {
    //             setUserProfiles([userDetails]);
    //         } else {
    //             console.error("userDetails is not an array:", userDetails);
    //         }

    //         const userSocialDetails = responsedata.data.usersocialDetail;
    //         if (userSocialDetails && typeof userSocialDetails === "object") {
    //             const {
    //                 Social_Media,
    //                 Business,
    //                 Contact,
    //                 Payment,
    //                 Music,
    //                 Custom_link
    //             } = userSocialDetails;

    //             // Combine social media and business links into one array
    //             const allSocialLinks = [
    //                 ...Social_Media,
    //                 ...Business,
    //                 ...Contact,
    //                 ...Music,
    //                 ...Payment
    //             ];
    //             // console.log(allSocialLinks, "allSocialLinks");
    //             // Set custom links in state
    //             setCustomLinks(Custom_link || []);

    //             // Set all social links in state
    //             setSocialLinks(allSocialLinks);
    //         } else {
    //             throw new Error(
    //                 "Social links data is not in the expected format"
    //             );
    //         }

    //         // const userCustomizeprofile = responsedata.data.userCustomizeprofile;
    //         // setUserProfiles(userDetails);

    //         const userCompanyprofile = responsedata.data.userCompanyprofile;
    //         setCompanyProfiles([userCompanyprofile]);
    //     } catch (error) {
    //         console.error("There was a problem with the Axios request:", error);
    //     }
    // };

    // useEffect(() => {

    //     getuseralldata();
    // }, []);
    const queryParams = router.query;
    // console.log(queryParams, "queryParams");

    useEffect(() => {
        if (Object.keys(queryParams).length === 0) return;
        // console.log(queryParams, "queryParams in if");

        const fetchData = async () => {
            try {
                // Extract the dynamic query parameter key and value
                const queryParamKey = Object.keys(queryParams)[0];
                const queryParamValue = queryParams[queryParamKey];
                // console.log(queryParamKey, "queryParamKey");

                const response = await axiosInstance.get(`/getUserData/Viewcard/${queryParamKey}`);
                const responsedata = response.data.data;


                // Extract and set UserProfileData
                const userProfileData = responsedata.allSimilarData.UserProfileData;

                if (Array.isArray(userProfileData)) {

                    setUserProfiles(userProfileData);
                } else {
                    console.error("UserProfileData is not an array:", userProfileData);
                }


                // Extract and set SocialLinkdata
                const socialLinkData = responsedata.allSimilarData.SocialLinkdata;
                if (socialLinkData && typeof socialLinkData[0] === 'object') {
                    const {
                        Social_Media = [],
                        Business = [],
                        Contact = [],
                        Payment = [],
                        Music = [],
                        Custom_link = []
                    } = socialLinkData[0];

                    // Combine social media and business links into one array
                    const allSocialLinks = [
                        ...Social_Media,
                        ...Business,
                        ...Contact,
                        ...Music,
                        ...Payment
                    ];

                    // Set custom links in state
                    setCustomLinks(Custom_link);

                    // Set all social links in state
                    setSocialLinks(allSocialLinks);
                }

                // Extract and set CompanyProfiledata
                const companyProfileData = responsedata.allSimilarData.CompanyProfiledata;
                if (Array.isArray(companyProfileData)) {
                    setCompanyProfiles(companyProfileData);
                } else {
                    console.error("CompanyProfiledata is not an array:", companyProfileData);
                }

                // // Extract and set CustomizeProfiledata
                const customizeProfileData = responsedata.allSimilarData.CustomizeProfiledata;
                console.log(customizeProfileData, "customizeProfileData")
                if (Array.isArray(customizeProfileData)) {



                    setCustomizeProfile(customizeProfileData);
                } else {
                    console.error("CustomizeProfiledata is not an array:", customizeProfileData);
                }

                setLoading(false);  // Ensure loading state is updated
            } catch (err) {
                setError(err.message);  // Set the error message instead of the whole error object
                setLoading(false);
            }
        };

        fetchData();
    }, [queryParams]);



    useEffect(() => {
        const fetchUserProfile = async () => {
            try {
                // Make a GET request to fetch data from the server
                const response = await axiosInstance.get('/slugURL/slug_url');
                // Extract 'slug_url' and 'user_id' values from the response data
                const userProfileData = response.data.map(profile => ({
                    slug_url: profile.slug_url,
                    user_id: profile.user_id // Assuming user_id is a field in the fetched data
                }));

                // console.log(userProfileData);
            } catch (error) {
                console.error('Error fetching user profiles', error);
            }
        };

        fetchUserProfile();
    }, [slug_url]);




    const [finalColor, setFinalColor] = useState({
        bgSub: "",
        bg: "#FFFFFF",
        buttonColor: "#652dbf",
        buttontextColor: "#000000",
        textColor: "#000000"
    });


    useEffect(() => {
        if (sketchPickerLightColor && flag === 0) {
            setFinalColor({
                bg: sketchPickerLightColor,
                bgSub: sketchPickerLightColor === "#000000" ? "#FFFFFF" : sketchPickerColor,
                buttonColor: sketchPickerColor,
                buttontextColor: "#FFFFFF", // Corrected property name
                textColor: sketchPickerColor
            });
        }
    }, [sketchPickerColor, sketchPickerLightColor, flag]);



    useEffect(() => {
        if (backgroundColor && flag === 1) {
            setFinalColor(prevColor => ({
                ...prevColor, // Keep previous state
                bg: backgroundColor,
                buttonColor: buttonColor,
                buttontextColor: buttontextColor, // Correct property name
                textColor: textColor
            }));
        }
    }, [backgroundColor, buttonColor, buttontextColor, textColor, flag]);



    // ---------------------------Helper Functions:-------------------


    const showToast = () => {
        MySwal.fire({
            title: "Submitted successfully",
            toast: true,
            position: "top",
            showConfirmButton: false,
            timer: 3000,
            background: "#4CAF50",
            showCloseButton: true
        });
    };

    const closeModal = () => { setIsModalOpen(false); };
    const openModal = () => { setIsModalOpen(true); };


    // Define handleInputChange function to update form data
    const handleInputChange = event => {
        const { name, value } = event.target;

        // Update form data state
        setContactformData({
            ...contactformData,
            [name]: value
        });
    };

    const handleContactFormSubmit = async contactformData => {
        if (!contactformData.contact_email) {
            setEmailError("Please enter your email");
            return;
        }

        try {
            // Make API call to update company profile
            await handleContactUpdate(contactformData);
            // Optionally, perform any additional actions after successful update
            console.log("Company profile updated successfully");
            // Clear form fields by setting the state to empty values
            setContactformData({
                fullname: "",
                contact_email: "",
                contact_phonenumber: "",
                contact_jobtitle: "",
                company: "",
                website: ""
            });
            setEmailError("");
            showToast();
        } catch (error) {
            console.error("Error updating company profile:", error.message);
            // Optionally, handle the error and display an error message to the user
        }
    };

    const handleContactUpdate = async data => {
        try {
            const userId = localStorage.getItem("userId");

            if (!userId) {
                throw new Error("User ID not found in localStorage");
            }

            // Include userId in the data object
            data.userId = userId;

            const response = await axiosInstance.post(
                "/contact_details/",
                data
            );
            //  console.log(response.data); // Log the response from the server
            console.log("contact Shared Successfully");
            window.location.reload();

            // Optionally, perform any additional actions after successful update
        } catch (error) {
            console.error("Error updating company profile:", error.message);
            throw error; // Rethrow the error to handle it in the caller function
        }
    };

    // Function to render platform icons dynamically
    const renderPlatformIcon = platform => {
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
            googlepay: gpay
            // Add more platform names and their corresponding components here
        };
        // Check if the platform exists in the platformIcons mapping
        if (platformIcons.hasOwnProperty(platform)) {
            const PlatformComponent = platformIcons[platform];
            return (
                <PlatformComponent
                buttonColor={
                    flag === 0
                        ? finalColor.bgSub
                        : CustomizeProfile[0]?.buttonColor || finalColor.buttonColor
                }
                textColor={
                    flag === 0
                        ? finalColor.bgSub
                        : CustomizeProfile[0]?.textColor || finalColor.textColor
                }
            />
            
            
            );
        } else {
            // Return a default icon or handle the case when the platform is not found
            return <img src="default-icon.png" alt="Default" />;
        }
    };

    return (
        <>
            {isModalOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center  bg-opacity-50">
                    <div className="relative mx-auto w-[300px] max-w-sm rounded-md border bg-white p-4">
                        <button className="absolute right-4 top-2 cursor-pointer text-2xl" onClick={closeModal}>
                            &times;
                        </button>
                        <form>
                            <div className=" ml-4 mt-3">
                                <span className="h-[30px] w-[90px] text-lg font-bold">Share your details</span>
                            </div>
                            <div className="mt-1 flex flex-col items-center justify-center px-2">
                                <div className="my-1">
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
                                    <div className="my-1">
                                        <input
                                            id="contact_email"
                                            type="email"
                                            placeholder="Email"
                                            name="contact_email"
                                            value={contactformData.contact_email}
                                            onChange={(e) => {
                                                handleInputChange(e);
                                                setInputValue(e.target.value);
                                                setEmailError('');
                                            }}
                                            className="form-input w-[230px] placeholder:text-xs placeholder:text-gray"
                                        />
                                        {emailError && <div className="text-red-500">{emailError}</div>}
                                    </div>
                                )}
                                {showPhonenumberInput && (
                                    <div className="my-1">
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
                                    <div className="my-1">
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
                                    <div className="my-1">
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
                                    <div className="my-1">
                                        <input
                                            id="website"
                                            type="text"
                                            name="website"
                                            placeholder="Website"
                                            value={contactformData.website}
                                            onChange={(e) => {
                                                handleInputChange(e);
                                                setInputValue(e.target.value);
                                            }}
                                            className="form-input w-[230px] placeholder:text-xs placeholder:text-gray"
                                        />
                                    </div>
                                )}
                                <div className="my-3">
                                    <button type="button" onClick={() => handleContactFormSubmit(contactformData)} className="btn btn-primary h-[40px] w-[230px] text-base">
                                        Submit
                                    </button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            )}
            {isModalOpen && <div className="absolute z-40 h-full w-full bg-black bg-opacity-50 backdrop-blur-sm"></div>}


            <div className="flex min-h-screen flex-col items-center justify-center bg-gray-100">

                {/* <div
                    

                        className={`mx-auto mb-8 mt-8 grid  overflow-y-auto overflow-x-hidden rounded-3xl border md:grid-cols-1 xl:grid-cols-1`}
                        style={{ ...CutomCardHeight, backgroundColor, color: textColor }}

                    > */}
                <div
                    style={{
                        ...CutomCardHeight, // Apply any additional styles
                        ...(CustomizeProfile.map(profile => ({
                            backgroundColor: profile.backgroundColor || backgroundColor,
                            color: profile.textColor || textColor
                        })).reduce((acc, val) => ({ ...acc, ...val }), {}))
                    }}
                         className={`mx-auto  grid  overflow-y-auto overflow-x-hidden  md:grid-cols-1 xl:grid-cols-1`}
                >
                    <div className="relative mb-8 mt-[-4px] border-white-light dark:border-[#1b2e4b]">
                        {userProfiles.map((userProfileData, index) => (
                            <div key={index} className="relative mb-8 mt-[-4px] border-white-light dark:border-[#1b2e4b]">
                                {userProfileData['coverImage'] && (

                                    <img src={`${imagepathURL}/static/coverImages/${userProfileData['coverImage']}`} alt="Preview" width={550} height={550} className="h-full w-full object-cover" />
                                )}

                                {userProfileData['profileImage'] && (
                                    <div className="absolute bottom-[-7vh] left-[1vh] h-32 w-32 p-0.5 rounded-full border border-solid border-white bg-gray-lightGray">
                                        <img src={`${imagepathURL}/static/profileImages/${userProfileData['profileImage']}`} alt="Preview" width={180} height={180} className="h-full w-full rounded-full object-cover" />
                                    </div>
                                )}

                                {userProfileData['logoImage'] && (
                                    <><div className="absolute bottom-[-6.9vh] left-[6.5rem] h-16 w-16 p-0.5 rounded-full border border-solid border-white bg-gray-lightGray">
                                        <img src={`${imagepathURL}/static/logoImages/${userProfileData['logoImage']}`} alt="Preview" width={160} height={160} className="h-full w-full rounded-full object-cover" />
                                    </div>


                                    </>
                                )}
                            </div>
                        ))}
                    </div>

                    <div className=" flex flex-col px-6 py-4 mt-5 max-md:w-5/6 " >
                        <div className="mb-2 mt-0   font-normal">
                            {userProfiles.map((userProfilesData) => (
                                <React.Fragment key={userProfilesData}>
                                    <h1 className="my-2 text-[26px] font-bold">
                                        {`
                      ${userProfilesData['first_name']} 
                      ${userProfilesData['last_name']}
                    `}
                                    </h1>
                                    <h6 className="my-2 font-normal text-base">
                                        {`
                      ${userProfilesData['job_title']} At
                      ${userProfilesData['organization_name']} 
                    `}
                                    </h6>
                                    <div className="flex items-center justify-start">
                                        <Call
    textColor={CustomizeProfile[0]?.textColor || textColor} // Use buttontextColor of the first profile, or default textColor
    buttonColor={CustomizeProfile[0]?.buttonColor||buttonColor}// Use buttonColor of the first profile
    className={CustomizeProfile[0]?.className} // Use className of the first profile if available
></Call>


                                        <div className="my-2 ml-2 text-base font-normal">
                                            <a href={`tel:${userProfilesData['phone_number']}`}>{userProfilesData['phone_number']}</a>
                                        </div>
                                    </div>
                                    <div className="flex items-center justify-start">
                                        <MailBox className=""  textColor={CustomizeProfile[0]?.textColor || textColor} // Use buttontextColor of the first profile, or default textColor
    buttonColor={CustomizeProfile[0]?.buttonColor||buttonColor}// Use buttonColor of the first profile
   ></MailBox>
                                        <div className="my-2 ml-2 text-base font-normal">
                                            <a href={`mailto:${userProfilesData['profile_email']}`}>{userProfilesData['profile_email']}</a>
                                        </div>
                                    </div>
                                    <div className="my-2 flex w-full flex-col items-start justify-center overflow-y-auto overflow-x-hidden overscroll-contain">
                                        <div className="text-base overflow-auto overscroll-contain">
                                            {`
                      ${userProfilesData['note']} 
                     
                    `}
                                        </div>
                                    </div>
                                </React.Fragment>
                            ))}
                        </div>
                        <div className=" my-5 grid grid-cols-5 gap-4 sm:grid-cols-5 md:grid-cols-5 lg:grid-cols-5">
                            {error && <p>{error}</p>}
                            {socialLinks.map((link, index) => (
                                <div key={index}>

                                    <a href={link.linktitle} target='_blank'>   {renderPlatformIcon(link.platform)}</a>
                                </div>
                            ))}
                        </div>
                        <>

                            <div className="mt-5">
                                <span className="my-4  text-[26px] font-bold">Quick Links</span>
                                {customLinks.map((customLink, index) => (
                                    <div key={index} className="mt-3">
                                        <div className="flex justify-between ">
                                            {customLink && customLink.custom_url && (
                                                <div className="mt-2 ">
                                                    <a href={customLink.custom_url} className="text-base hover:font-semibold" target='_blank'>{customLink.linktitle}</a>
                                                </div>
                                            )}
                                            <div>
                                                {customLink && customLink.custom_url && <a href={customLink.custom_url}><Share  textColor={CustomizeProfile[0]?.textColor || textColor} 
      /></a>}
                                            </div>
                                        </div>
                                        <div className="flex justify-between">
                                            {customLink && customLink.label && (
                                                <span className="text-md font-semibold">{customLink.label}</span>
                                            )}
                                            <div>
                                                {customLink && customLink.label && <Download textColor={CustomizeProfile[0]?.textColor || textColor}  onClick={handleDownload} />}
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>

                        </>
                        {companyProfiles.map((CompanyProfileData) => (
                            <React.Fragment key={CompanyProfileData}>
                                <div className="mb-3 mt-8 flex w-full flex-wrap items-center justify-start pr-4 text-[26px] font-bold">
                                    {`
                      ${CompanyProfileData['company_name']} 
                    `}
                                </div>
                                <div className="my-3 flex w-full items-start">
                                    <Location textColor={CustomizeProfile[0]?.textColor || textColor}  className="h-9 w-9 flex-shrink-0"></Location>
                                    <div className=" ml-2 flex flex-col flex-wrap" style={{ width: '350px' }}>
                                        <span className="text-base break-all px-2 font-normal">
                                            {`
                     ${CompanyProfileData['street_address']},
                     ${CompanyProfileData['city']} ,
                     ${CompanyProfileData['state']},
                     ${CompanyProfileData['country']},
                     ${CompanyProfileData['post_code']}
                    `}
                                        </span>
                                    </div>
                                </div>
                                <div className="my-3 flex w-full items-start">
                                    <Call textColor={CustomizeProfile[0]?.textColor || textColor}  buttonColor={undefined} className="h-20 w-20 flex-shrink-0"  ></Call>
                                    <div className="ml-2 flex flex-col flex-wrap" style={{ width: '200px' }}>
                                        <span className="text-base break-all px-2 font-normal">
                                            {`
                      ${CompanyProfileData['company_contact']} 
                    `}{' '}
                                        </span>
                                    </div>
                                </div>
                                <div className="my-3 flex items-start">
                                    <WebsiteIcon textColor={CustomizeProfile[0]?.textColor || textColor}  className="h-9 w-9 flex-shrink-0"></WebsiteIcon>
                                    <div className="ml-2 flex flex-col flex-wrap" style={{ width: '200px' }}>
                                        <span className="text-base break-all px-2 font-normal">
                                            {`
                      ${CompanyProfileData['website']} 
                    `}
                                        </span>
                                    </div>
                                </div>
                                <div>
                                    <button
                                        type="button"
                                        className="btn my-4 w-full py-3 text-base"
                                        style={{
                                            ...(CustomizeProfile.map((profile, index) => ({
                                                background: profile.buttonColor || buttonColor,
                                                color: profile.buttontextColor || buttontextColor,
                                                key: profile.id || index  // Assuming index is unique
                                            })).reduce((acc, val) => ({ ...acc, ...val }), {}))
                                        }}

                                        onMouseEnter={() => setIsHovered(true)}
                                        onMouseLeave={() => setIsHovered(false)}
                                    >
                                        Save as Contact
                                    </button>
                                    <button type="button" className="btn mb-7  py-3 text-base  w-full" 
                                    
                                     style={{
                                         ...(CustomizeProfile.map(profile => ({
                                            color: profile.textColor || textColor,
                                            borderColor: profile.textColor || textColor
                                         })).reduce((acc, val) => ({ ...acc, ...val }), {}))
                                     }}

                                    onClick={openModal}>
                                        Share your details
                                    </button>
                                </div>
                            </React.Fragment>
                        ))}
                        <div className=" flex items-center justify-center  p-2">
                            <Image src={tapect_logo} width={80} height={80} alt="tapectlogo"></Image>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};
ViewCard.getLayout = (page: any) => {
    return <BlankLayout>{page}</BlankLayout>;
};

export default ViewCard;

