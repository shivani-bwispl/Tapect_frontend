/* eslint-disable @next/next/no-img-element */
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useImageContext } from '../components/ImageContext';
import Tippy from '@tippyjs/react';
import 'tippy.js/dist/tippy.css';
import Image from 'next/image';
import info_icon from '../public/assets/images/icons/info_icon.svg';
import axiosInstance from '@/services/api';
import { imagepathURL } from '@/services/imgpthapi';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import router from 'next/dist/client/router';


interface UserProfile {
    coverImage: string;
    profileImage: string;
    logoImage: string;
    // Add more properties if needed
}


const FileUpload = () => {
    const [userProfiles, setUserProfiles] = useState<UserProfile>({ coverImage: '', profileImage: '', logoImage: '' });
    const { coverImage, setCoverImage, profileImage, setProfileImage, logoImage, setLogoImage } = useImageContext();

    const defaultCoverImage = '/cover_default.png';
    const defaultProfileImage = '/profileImg_default.png';
    const defaultLogoImage = '/logo_default.png';


    // console.log(imagepathURL+'/static/profileImages/'+userProfiles.profileImage);
    const [error, setError] = useState(null);
    const MySwal = withReactContent(Swal);

    // const handleImagePath = () => {
    //     const response = await axiosInstance.get(`/files/${fieldName}`);
    // }


    const showToast = (type: string, message: string) => {
        MySwal.fire({
            title: message,
            toast: true,
            position: 'top',
            showConfirmButton: false,
            timer: 3000,
            background: type === 'success' ? '#4CAF50' : '#F44336',
            showCloseButton: true,
        });
    };
    const handleImageChange = async (event, setImageFunction, defaultImage, fieldName) => {
        const file = event.target.files[0];
        if (!file) return;

        if (file.type.startsWith('image/')) {
            try {
                const formData = new FormData();
                formData.append('userId', localStorage.getItem('userId'));
                formData.append(fieldName, file);


                const auth = localStorage.getItem('token');


                if (!auth || auth === "null") {
                    // Display error message
                    console.error('Token not found in localStorage');
                    // Redirect to login page
                    router.push('/Login');
                    return;
                }

                const response = await axiosInstance.post(`/uploadProfileImages/${fieldName}`, formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                        'Authorization': `Bearer ${auth}`,
                    },

                });

                const imageUrl = response.data.imageUrl;
                setImageFunction(imageUrl);
                // console.log('File uploaded successfully');
                showToast('success', 'File uploaded successfully.');


                if (response.status === 200 || response.status === 201) {

                    showToast('success', response.data.message);

                    console.log(response.data.message);
                    // window.location.reload(); // Refresh the page without loading
                } else {

                    showToast('error', response.statusText);

                    console.error('Failed to customize theme:', response.statusText);
                }
            } catch (error) {
                showToast('error', error.message);

                console.error('Error uploading file:', error.message);
                setImageFunction(defaultImage);
            }
        } else {
            showToast('error', 'Invalid file type. Please upload an image.');

            console.error('Invalid file type. Please upload an image.');
            setImageFunction(defaultImage);
        }
    };

    const handleResetButtonClick = (setImageFunction, defaultImagePath) => {
        setImageFunction(defaultImagePath);
    };

    const handleButtonClick = (inputId) => {
        document.getElementById(inputId).click();
    };

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
                const response = await axiosInstance.get(`/uploadProfileImages/${userId}`, config);
                const userProfileData = response.data;
                // console.log(userProfileData, 'userProfileDataimg');
                setUserProfiles(userProfileData);
            } catch (error) {
                console.error('Error fetching user profile:', error.message);
                setUserProfiles({ coverImage: '', profileImage: '', logoImage: '' }); // Set default empty profile
            }
        };

        fetchUserProfile();
    }, []);

    return (
        <>

            <div className="grid grid-cols-2 p-3 lg:grid-cols-2">
                {/* Cover Image */}
                <div className="flex flex-col items-start justify-center">
                    <div className="mb-4 flex items-center justify-evenly">
                        <Tippy content="Popover on top" placement="top">
                            <Image src={info_icon} width={20} height={20} alt="info" />
                        </Tippy>
                        <h3 className="text-md mx-1 font-semibold">Cover</h3>
                    </div>
                    <div className="relative mb-4">

                        <img src={`${imagepathURL}/static/coverImages/${userProfiles.coverImage ? userProfiles.coverImage : defaultCoverImage}`} alt="Cover"  style={{ width: '100vw', height:'180px' }} 
     className="rounded-md border border-gray-300 object-fill" />


                        <button
                            onClick={() => handleButtonClick('coverImageInput')}
                            className="absolute inset-0 flex h-full w-full items-center justify-center rounded-md bg-black opacity-0 hover:opacity-50"
                        >
                            <span className="rounded-md bg-red-500 px-2 py-1 text-white">Change Image</span>
                        </button>
                        <input id="coverImageInput" type="file" accept="image/*" className="hidden" onChange={(event) => handleImageChange(event, setCoverImage, defaultCoverImage, 'coverImage')} />
                    </div>

                    {/* {coverImage !== defaultCoverImage && (
                        <button onClick={() => handleResetButtonClick(setCoverImage, defaultCoverImage)} className="rounded-md bg-red-500 px-2 py-1 text-white">
                            Reset
                        </button>
                    )} */}
                </div>

                {/* Profile Image */}
                <div className="mx-3 flex w-full items-start justify-evenly gap-2">
                    <div className="flex flex-col items-start justify-left">
                        <div className="mb-4 flex items-start justify-left">
                            <Tippy content="dimension 200 x 200" placement="top">
                                <Image src={info_icon} width={20} height={20} alt="info" />
                            </Tippy>
                            <h3 className="text-md mx-1 font-semibold">Profile</h3>
                        </div>
                        <div className="relative mb-4">


                            <img src={`${imagepathURL}/static/profileImages/${userProfiles.profileImage ? userProfiles.profileImage : defaultProfileImage}`}  alt="Profile" className="rounded-[50%] border border-gray-300 object-cover"  style={{width:'180px',height:'180px'}}/>
                            <button
                                onClick={() => handleButtonClick('profileImageInput')}
                                className="absolute inset-0 flex h-full w-full items-center justify-center rounded-[50%] bg-black opacity-0 hover:opacity-50"
                            >
                                <span className="rounded-md bg-red-500 px-2 py-1 text-white">Change Image</span>
                            </button>
                            <input
                                id="profileImageInput"
                                type="file"
                                accept="image/*"
                                className="hidden"
                                onChange={(event) => handleImageChange(event, setProfileImage, defaultProfileImage, 'profileImage')} />
                        </div>

                        {/* {profileImage !== defaultProfileImage && (
                            <button onClick={() => handleResetButtonClick(setProfileImage, defaultProfileImage)} className="rounded-md bg-red-500 px-2 py-1 text-white">
                                Reset
                            </button>
                        )} */}
                    </div>

                    {/* Logo Image */}
                    <div className="flex flex-col items-ceneter justify-center">
                        <div className="mb-4 flex items-center justify-left">
                            <Tippy content="dimension 200 x 200" placement="top">
                                <Image src={info_icon} width={20} height={20} alt="info" />
                            </Tippy>
                            <h3 className="text-md mx-1 font-semibold">Logo</h3>
                        </div>
                        <div className="relative mb-4">
                            <img src={`${imagepathURL}/static/logoImages/${userProfiles.logoImage ? userProfiles.logoImage : defaultLogoImage}`} alt="Logo" className="rounded-[50%] border border-gray-300 object-cover" style={{width:'180px',height:'180px'}} />
                            <button
                                onClick={() => handleButtonClick('logoImageInput')}
                                className="absolute inset-0 flex h-full w-full items-center justify-center rounded-[50%] bg-black opacity-0 hover:opacity-25"
                            >
                                <span className="rounded-md bg-red-500 px-2 py-1 text-white">Change Image</span>
                            </button>
                            <input id="logoImageInput" type="file" accept="image/*" className="hidden" onChange={(event) => handleImageChange(event, setLogoImage, defaultLogoImage, 'logoImage')} />
                        </div>

                        {/* {logoImage !== defaultLogoImage && (
                            <button onClick={() => handleResetButtonClick(setLogoImage, defaultLogoImage)} className="rounded-md bg-red-500 px-2 py-1 text-white">
                                Reset
                            </button>
                        )} */}
                    </div>
                </div>
            </div></>
    );
};

export default FileUpload;


