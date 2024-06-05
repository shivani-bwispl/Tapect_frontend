import Link from 'next/link';
import { useEffect, useState } from 'react';
import { setPageTitle } from '../store/themeConfigSlice';
import { useDispatch } from 'react-redux';
import IconUser from '@/components/Icon/IconUser';
import IconPhone from '@/components/Icon/IconPhone';
import ResetModel from './ResetModel';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import axiosInstance from '@/services/api';
import router from 'next/dist/client/router';
import { useParams } from 'react-router-dom';
import { FaCopy } from 'react-icons/fa';


const Setting = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [currentModalContentId, setCurrentModalContentId] = useState(null);
    const [email, setEmail] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const { slug_url } = useParams(); // Assumes you have a router setup to provide this param
    const [slugUrl, setSlugUrl] = useState('');
    const [slug, setSlug] = useState('');




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
        dispatch(setPageTitle('Account Setting'));
    });
    const [tabs, setTabs] = useState<string>('general');
    const toggleTabs = (name: string) => {
        setTabs(name);
    };
    const MySwal = withReactContent(Swal);

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

    useEffect(() => {
        fetchUserProfile(); // Fetch user profile data on component mount
    }, []); // Empty dependency array to run the effect only once

    const fetchUserProfile = async () => {
        try {
            setIsLoading(true);
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
            const response = await axiosInstance.get(`/getUserData/useremail/${userId}`, config);
            const { data } = response.data;
            setEmail(data.email); // Assuming email is a field in the user profile data
            setIsLoading(false);
        } catch (error) {
            console.error('Error fetching user profile:', error);
            setIsLoading(false);
        }
    };

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




    useEffect(() => {
        const fetchUserProfile = async () => {
            try {
                // Make a GET request to fetch data from the server
                const response = await axiosInstance.get('/slugURL/slug_url');
                // Extract 'slug_url' value from the response data
                const userProfileData = response.data;

                if (userProfileData.length > 0) {
                    // Assuming there is only one userProfileData object
                    const firstProfile = userProfileData[0];
                    setSlugUrl(firstProfile.slug_url);
                    setSlug(firstProfile.slug_url);
                }
            } catch (error) {
                console.error('Error fetching user profiles', error);
            }
        };


        fetchUserProfile();
    }, []);

    const updateUserSlugURL = async (newSlugUrl) => {
        try {
            const userId = localStorage.getItem('userId');
            if (!userId) {
                throw new Error('User ID not found in localStorage');
            }

            // Define the data to be sent in the request body
            const requestData = {
                newSlugUrl: newSlugUrl
            };

            // Make the PUT request using Axios
            const response = await axiosInstance.put(`/slugURL/user/${userId}`, requestData)
                .then(response => {
                    console.log('Response:', response.data);
                    showToast('success', 'URL Update Successfully');
                    // Handle successful response
                })
                .catch(error => {
                    console.error('Error:', error.response.data);
                    // Handle error
                });

        } catch (error) {
            console.error('Error updating slug URL:', error);
        }
    };


    const handleSlugChange = (event) => {
        setSlugUrl(event.target.value);
    };

    // Define a function to call updateUserSlugURL when the button is clicked
    const handleUpdateSlug = () => {
        const newSlugUrl = slugUrl;

        // Call updateUserSlugURL with the updated value
        updateUserSlugURL(newSlugUrl);
    };

    const copyToClipboard = () => {
        const fullUrl = `http://localhost:3000/setting/${slugUrl}`;
        navigator.clipboard.writeText(fullUrl).then(() => {
            alert('URL copied to clipboard!');
        }, () => {
            alert('Failed to copy URL');
        });
    };



    return (
        <div>
            <div className="pt-5">
                <div className="mb-5 flex items-center justify-between">
                    <h5 className="text-lg font-semibold dark:text-white-light">Settings</h5>
                </div>
                <div>
                    <ul className="mb-5 overflow-y-auto whitespace-nowrap border-b border-[#EBEDF2] font-semibold dark:border-[#191E3A] sm:flex">
                        <li className="inline-block">
                            <button
                                onClick={() => toggleTabs('general')}
                                className={`flex gap-2 border-b border-transparent p-4 hover:border-primary hover:text-primary ${tabs === 'general' ? '!border-primary text-primary' : ''}`}
                            >
                                General
                            </button>
                        </li>
                    </ul>
                </div>
                {tabs === 'general' ? (
                    <div className="px-5">
                        <form className="mb-5 rounded-md border border-[#EBEDF2] bg-white p-4 dark:border-[#191E3A] dark:bg-black">
                            <div className="flex justify-between">
                                <div className="mb-5 flex w-[300px]  items-center justify-start ">
                                    <h1 className="text-2xl font-semibold tracking-wide">Account Setting</h1>
                                </div>

                                <div className=" flex  w-[600px] flex-col">

                                    <div className="mb-4">
                                        <label htmlFor="slug">Profile Url </label>
                                        {/* <button onClick={copyToClipboard} style={{ background: 'none', border: 'none', cursor: 'pointer', padding: '0 0.5rem' }}>
        <FaCopy />
      </button> */}
                                        <div style={{ display: 'flex', alignItems: 'center', border: '1px solid #ccc', borderRadius: '4px', padding: '0.5rem' }}>
                                            <span>http://localhost:3000/setting/</span>
                                            <input
                                                id="slug"
                                                type="text"
                                                placeholder="Enter slug"
                                                className="form-input"
                                                value={slugUrl}
                                                onChange={handleSlugChange}
                                                style={{ border: 'none', outline: 'none', flexGrow: 1, padding: 0 }}
                                            />
                                        </div>





                                    </div>
                                    <div className="mb-4">
                                        <label htmlFor="email">Email</label>

                                        <input
                                            id="email"
                                            type="email"
                                            style={{ cursor: 'none', pointerEvents: 'none' }}
                                            placeholder="Jimmy@gmail.com"
                                            defaultValue={email}
                                            className="disable-cursor-pointer form-input"
                                        />
                                    </div>
                                </div>
                            </div>
                        </form>

                        <div>
                            <form className=" flex h-[250px] w-full items-center justify-between rounded-md border border-[#EBEDF2] bg-white p-4 ">
                                <h6 className="mb-5 w-[200px] text-2xl  font-semibold tracking-wide">Account Security</h6>
                                <div className=" flex w-[600px] flex-col items-start p-3 ">
                                    <div className="flex flex-col ">
                                        <span className=" m-2 cursor-pointer font-normal" onClick={() => openModal('content1')}>
                                            Reset Password
                                        </span>
                                        <span className="m-2 cursor-pointer font-normal" onClick={() => openModal('content2')}>
                                            Delete Account
                                        </span>
                                    </div>
                                </div>
                            </form>
                        </div>

                        <div className="mt-4 flex items-center justify-end gap-5 ">
                            <button type="button" className="underline underline-offset-4">
                                Cancel
                            </button>
                            <button type="button" className="btn btn-primary h-[40px] w-[130px]" onClick={handleUpdateSlug}>
                                Update
                            </button>
                        </div>
                    </div>
                ) : (
                    ''
                )}
            </div>
            <ResetModel isOpen={isModalOpen} onClose={closeModal} modalContentId={currentModalContentId}></ResetModel>
        </div>
    );
};
export default Setting;
