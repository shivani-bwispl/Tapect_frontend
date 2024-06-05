import Link from 'next/link'; // Import Link from next/link

import { Fragment, SetStateAction, useEffect, useState } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { useDispatch, useSelector } from 'react-redux';
import { IRootState } from '../store';
import { Tab } from '@headlessui/react';
import FileUpload from './FileUpload';
import CustomCard from './CustomCard';
import About from './About';
import Loader from '../components/Loader';
import { useForm } from 'react-hook-form';
import LeadCapture from './LeadCapture';
import SocialLinks from './SocialLinks';
import CompanyInfo from './CompanyInfo';
import UserProfile_logo from '../public/assets/images/icons/UserProfile_logo.svg';
// import MoreLinks from './MoreLinks';
import { ImageProvider } from '../components/ImageContext';
import ColorPicker from './ColorPicker';
import TapCode from './TapCode';
import Setting from './setting';
import { useColorContext } from '../components/ColorContext';
import { ColorProvider } from '../components/ColorContext';
import ColorPalette from './ColorPalette';
import { setPageTitle } from '@/store/themeConfigSlice';
import router, { useRouter } from 'next/router';
import ErrorDisplay from '../components/ErrorDisplay';
import sweetAService from '../services/sweetAlertService';
import { LeadCaptureProvider } from '../components/LeadCaptureContext';
//? socialLinks
import Image from 'next/image';
import Delete from '../public/assets/images/icons/Delete.svg';
//?

//? MoreLinks
import CustomLink from '../public/assets/images/icons/customlink.svg';
import File from '../public/assets/images/icons/File.svg';
import axiosInstance from '@/services/api';
import NavItem from '@/components/Layouts/NavItem';
import React from 'react';
import { useParams } from 'react-router-dom';


//?

const Profile = () => {
    const {
        register,
        handleSubmit,
        control,
        formState: { errors },
    } = useForm();

    const router = useRouter();
    const dispatch = useDispatch();
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [error, setError] = useState(null);
    const [userProfiles, setUserProfiles] = useState([]);

    const [users, setUsers] = useState([]);
    // const [viewCardUrl, setViewCardUrl] = useState([FormData]);
    const [viewCardUrl, setViewCardUrl] = useState<string>('');
    const [linkCardUrl, setlinkCardUrl] = useState<string>('');

    const { slug_url } = useParams(); // Assumes you have a router setup to provide this param


    // //? social Links
    const [showModal, setShowModal] = useState(false);
    const [selectedSocial, setSelectedSocial] = useState(null);
    const [showContent, setShowContent] = useState(false);

    //? Tabs
    const [hoveredTab, setHoveredTab] = useState(null);

    const handleMouseEnter = (tabIndex) => {
        setHoveredTab(tabIndex);
    };

    const handleMouseLeave = () => {
        setHoveredTab(null);
    };

    const tabData = [
        { icon: 'Mycard', label: 'My Card', alt: 'home' },
        { icon: 'Social', label: 'Social Links', alt: 'social' },
        // { icon: 'Links', label: 'Links', alt: 'links' },
        { icon: 'CompanyInfo', label: 'Company Info', alt: 'company info' },
        { icon: 'Customize', label: 'Customize Theme', alt: 'customize' },
        { icon: 'TapCode', label: 'Tap Code', alt: 'tap code' },
        { icon: 'LeadForm', label: 'Lead Capture Form', alt: 'lead form' },
    ];

    //? todo
    const [SocialItems, setSocialItems] = useState([]);

    //? selected Todo
    const [SelectedSocialItem, setSelectedSocialItem] = useState(null);


    const handleNewItem = (itemName, image, link) => {
        const newSocialItem = {
            id: Math.floor(Math.random() * 100000),
            image: image,
            name: itemName,
            link: link,
        };
        const updatedSocialItems = [...SocialItems, newSocialItem];
        setSocialItems(updatedSocialItems);
    };

    const updateSocialItem = (id, name, link) => {
        setSocialItems((prevItems) => {
            return prevItems.map((item) => {
                if (item.id === id) {
                    return { ...item, name, link };
                }
                return item;
            });
        });
    };

    const DeleteEle = (id) => {
        const updatedSocialItems = SocialItems.filter((item) => item.id !== id);
        setSocialItems(updatedSocialItems);
    };

    const handleEdit = (id) => {
        const ele = SocialItems.find((SocialItem) => SocialItem.id === id);
        console.log(ele);

        setSelectedSocialItem(ele);
        setShowModal(true);
        setShowContent(true);
    };

    interface FormData {
        first_name: string;
        last_name: string;
        organization_name: string;
        job_title: string;
        email: string;
        phone_number: string;
        profile_email: string;
        company_name: string;
        company_contact: string;
        street_address: string;
        city: string;
        state: string;
        country: string;
        post_code: string;
        website: string;
        note: string;
        bgcolor: string;
        LinkTitle: string;
        FileTitle: string;
    }

    const [formData, setFormData] = useState<FormData>({
        first_name: '',
        last_name: '',
        organization_name: '',
        job_title: '',
        email: '',
        phone_number: '',
        profile_email: '',
        company_name: '',
        company_contact: '',
        street_address: '',
        city: '',
        state: '',
        country: '',
        post_code: '',
        website: '',
        note: '',
        bgcolor: '',
        LinkTitle: '',
        FileTitle: '',
    });

    // Handler to update form data
    const handleFormChange = (newFormData: SetStateAction<FormData>) => {
        setFormData(newFormData);
    };

    const [remainingChars, setRemainingChars] = useState(250);
    const maxChars = 250;

    const handleInputChange = (e: any) => {
        const { name, value } = e.target;

        if (value.length <= maxChars) {
            handleFormChange({
                ...formData,
                [name]: value,
            });
            setRemainingChars(maxChars - value.length);
        }

        if (value.length === maxChars) {
            // Display alert when character count reaches 250
            alert('Maximum character limit reached (250 characters)');
        }
    };

    useEffect(() => {
        dispatch(setPageTitle('Profile'));
        // Check if the user is authenticated

        const isLoggedIn = localStorage.getItem('isLoggedIn');
        const userId = localStorage.getItem('userId');

        if (!isLoggedIn) {
            // Redirect to the login page if not authenticated
            router.replace('/Login');
        }
    }, [dispatch]);

    
    // ---------------------get user all data--------------------------

    const getuseralldata = async () => {
        const userId = localStorage.getItem("userId");
        const requestBody = {
            userId: userId
        };


        try {
            // console.log(requestBody, "userId");

            const response = await axiosInstance.post(
                "/getUserData",
                requestBody
            );
            const responsedata = response.data;



            const userDetails = responsedata.data.userProfiles;
            const { tags } = userDetails || {};
            let tagsArray = Array.isArray(tags) ? tags : [tags];
            const tagsUrl = encodeURIComponent(tagsArray.join(','));

            setlinkCardUrl(tagsUrl);
            const viewCardUrl = `/ViewCard?${tagsUrl}`;
            console.log(tagsUrl,"viewCardUrl")
            setViewCardUrl(viewCardUrl);





        } catch (error) {
            console.error("There was a problem with the Axios request:", error);
        }
    };

    useEffect(() => {
        getuseralldata();
    }, []);

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
                // console.log(userProfileData, "userProfileData")

                setUserProfiles([userProfileData]); // Assuming response.data is an object
            } catch (error) {
                console.error('Error fetching user profile:', error.message);
                setUserProfiles([]); // Reset user profile state to an empty array or set a default value
            }
        };
        fetchUserProfile(); // Call fetchUserProfile when the component mounts
    }, []);

    // useEffect(() => {
    //     const fetchUserProfile = async () => {
    //       try {
    //         // Make a GET request to fetch data from the server
    //         const response = await axiosInstance.get('/slugURL/slug_url');
    //         // Extract 'slug_url' and 'user_id' values from the response data
    //         const userProfileData = response.data.map(profile => ({
    //           slug_url: profile.slug_url,
    //           user_id: profile.user_id // Assuming user_id is a field in the fetched data
    //         }));
            
    //         console.log(userProfileData);
    //       } catch (error) {
    //         console.error('Error fetching user profiles', error);
    //       }
    //     };
      
    //     fetchUserProfile();
    //   }, [slug_url]);
  

    // ----------------------------------------------
    const { backgroundColor, textColor, buttonColor, buttontextColor, updateBackgroundColor, updateTextColor, updateButtonColor, updateButtonTextColor, setFlag }: any = useColorContext();

    const [loading, setLoading] = useState(false);

    return (
        <>
        <div className='h-96 ...'>
            <div className="flex h-fit w-full cursor-pointer items-center justify-between px-2 pl-5 mt-2 py-3">
                {userProfiles.map((userProfilesData) => (
                    <React.Fragment key={userProfilesData}>
                        <div className="flex flex-col items-start justify-center gap-0">
                            <div className="flex items-center gap-2">
                                <Image src={UserProfile_logo} width={50} height={50} alt="userprofile_logo" />
                               
                                <div className='pl-2'>
                                <span className="text-base font-bold">
                                    {`${userProfilesData.first_name} ${userProfilesData.last_name}`}

                                </span><br></br>
                                <span className="text-md   ">{userProfilesData.profile_email}</span>
                            </div>
                            </div>
                           
                        </div>
                    </React.Fragment>
                ))}
            </div>

            <ImageProvider>
                <ColorProvider>
                    <LeadCaptureProvider>
                    <div className=" md:mx-0 mt-5 lg:mx-5  bg-white grid grid-cols-1 px-3 pt-2 rounded-2xl lg:grid-cols-4  responsive-container overflow-x:hidden">

                        <div className="lg:col-span-3 mr-5" >
                                <div>
                                    <div id="border_top">
                                        <div className="mb-5">
                                            <Tab.Group>
                                                <Tab.List className="mt-3 flex flex-wrap gap-x-5 border-b font-bold border-white-light px-2 dark:border-[#191E3A]" >
                                                    {tabData.map((tab, index) => (
                                                        <Tab key={index} as={Fragment}>
                                                            {({ selected }) => (
                                                                <div
                                                                className={`ml-${index > 0 ? 2 : 0} ${selected ? 'border-b font-bold !border-secondary text-primary !outline-none' : ''}
                                                                flex items-center hover:border-b hover:!border-secondary hover:text-primary text-[#717171]`}

                                                                    onMouseEnter={() => handleMouseEnter(index)}
                                                                    onMouseLeave={handleMouseLeave}
                                                                >
                                                                    <Image
                                                                        alt={tab.alt}
                                                                        width={16}
                                                                        height={16}
                                                                        src={`/assets/images/icons/${tab.icon}-${selected || hoveredTab === index ? 'hover' : 'default'}.svg`}
                                                                    />
                                                                    <button className={` flex items-center border-transparent p-2 py-2`}>{tab.label}</button>
                                                                </div>
                                                            )}
                                                        </Tab>
                                                    ))}
                                                </Tab.List>

                                                <Tab.Panels style={{ overflowY: 'scroll',  overflowX: 'hidden' , scrollbarWidth: 'thin', scrollbarColor: 'rgba(101, 45, 191, 0.5) rgba(250 248 255)' }} className="h-[calc(90vh-6.5rem)]  sm:pr-0 pr-8 pl-4">
                                                    <Tab.Panel >
                                                        <div className="active  pt-5">
                                                            <FileUpload></FileUpload>
                                                            <About formData={formData} handleInputChange={handleInputChange} />
                                                        </div>
                                                    </Tab.Panel>
                                                    <Tab.Panel>

                                                        <SocialLinks
                                                            selectedSocial={selectedSocial}
                                                            showContent={showContent}
                                                            setShowContent={setShowContent}
                                                            showModal={showModal}
                                                            setShowModal={setShowModal}
                                                            handleNewItem={handleNewItem}
                                                            SocialItems={SocialItems}
                                                            DeleteEle={DeleteEle}
                                                            formData={formData}
                                                            setSelectedSocial={setSelectedSocial}
                                                            updateSocialItem={updateSocialItem}
                                                            handleEdit={handleEdit}
                                                        />

                                                    </Tab.Panel>

                                                    <Tab.Panel>
                                                        <CompanyInfo formData={formData} handleInputChange={handleInputChange}></CompanyInfo>
                                                    </Tab.Panel>
                                                    <Tab.Panel>
                                                        <div className="  mx-3" >
                                                            <ColorPalette />
                                                            <div className=' p-3 mt-5 bg-whit rounded-2xl  pb-8 border  border-white-light '>
                                                                <h2 className="text-base mx-3  my-5 text-left font-semibold ">Customize Theme </h2>

                                                                <div className="grid grid-cols-1 lg:grid-cols-2 justify-items-left ml-1">
                                                                    <ColorPicker category="backgroundColor" label="Background Color" onChange={updateBackgroundColor} />
                                                                    <ColorPicker category="textColor" label="Text Color" onChange={updateTextColor} />
                                                                    <ColorPicker category="buttonColor" label="Button Color" onChange={updateButtonColor} />
                                                                    <ColorPicker category="buttontextColor" label="Button Text" onChange={updateButtonTextColor} />
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </Tab.Panel>
                                                    <Tab.Panel>
                                                        <TapCode />
                                                    </Tab.Panel>
                                                    <Tab.Panel>
                                                        <LeadCapture />
                                                    </Tab.Panel>
                                                </Tab.Panels>
                                            </Tab.Group>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* <div className="panel min-h-screen w-full rounded-tl-lg max-lg:min-w-60 lg:w-72 "> */}
                            <div className="  mt-10 border-white-light dark:border-[#1b2e4b] w-full rounded-tl-lg max-lg:min-w-60 lg:w-100   " style={{ maxHeight: 'calc(100vh )' }}>

                                <div className="mb-5 flex flex-col items-center justify-start gap-2">
                                    <h5 className="text-lg font-semibold dark:text-white-light">Card live preview</h5>


                                        
                                    {viewCardUrl && (
                                        <Link href={viewCardUrl} target="_blank" rel="noopener noreferrer">
                                            <div className="cursor-pointer text-primary underline">View Card</div>
                                        </Link>
                                    )}

       
                                </div>
                                <div className="my-3 flex flex-shrink-0  items-center justify-center  max-md:min-w-60">
                                    <CustomCard formData={formData} SocialItems={SocialItems} />
                                </div>
                            </div>
                        </div>
                    </LeadCaptureProvider>
                </ColorProvider>
            </ImageProvider>
            </div>
        </>
    );
};

export default Profile;