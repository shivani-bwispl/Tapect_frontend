/* eslint-disable @next/next/no-img-element */
import React, { useEffect, useState } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { Fragment } from 'react';
import Swal from 'sweetalert2';
import IconX from '@/components/Icon/IconX';
import axiosInstance from '@/services/api';
import router from 'next/dist/client/router';
import withReactContent from 'sweetalert2-react-content';

const MySwal = withReactContent(Swal);


const EditSocial = ({ isOpen, onClose, SelectedSocialItem, SelectedSocialId, selectedSocial, socialName, updateSelectedSocialItem }) => {

    // console.log(SelectedSocialItem, 'SelectedSocialItem');
    // console.log(selectedSocial, 'selectedSocial');
    // console.log(SelectedSocialItem.platform, "socialName")
        // console.log(updateSelectedSocialItem, "updateSelectedSocialItem")

    const socialplatformName = SelectedSocialItem ? SelectedSocialItem.platform : '';
    const imageUrl = SelectedSocialItem && SelectedSocialItem.image ? SelectedSocialItem.image : '';

    const showToast = (p0: string) => {
        MySwal.fire({
            title: 'Data updated successfully',
            toast: true,
            position: 'top',
            showConfirmButton: false,
            timer: 3000,
            background: '#4CAF50',
            showCloseButton: true,
        });
    };

    // const [item, setItem] = useState(SelectedSocialItem.username || '');

    const [linkTitle, setLinkTitle] = useState(SelectedSocialItem ? SelectedSocialItem.linktitle || '' : '');

    const [label, setLabel] = useState(SelectedSocialItem ? SelectedSocialItem.label || '' : '');
    const [file, setFile] = useState(SelectedSocialItem ? SelectedSocialItem.file || '' : '');
    const [fileError, setFileError] = useState('');
    const [filePath, setFilePath] = useState('');



    useEffect(() => {
        if (SelectedSocialItem) {
            setItem(SelectedSocialItem.item);
            setLinkTitle(SelectedSocialItem.linkTitle || '');
            setLabel(SelectedSocialItem.label || '');
            setFile(SelectedSocialItem.file || '');
            setFilePath(SelectedSocialItem.file || '');
        }
    }, [SelectedSocialItem]);


    // Validation function for file upload
    const validateFile = () => {
        if (!file) {
            setFileError('Please upload a file');
            return false;
        }
        if (file.size > 1024 * 1024) {
            setFileError('File size exceeds the limit (1MB)');
            return false;
        }
        if (!label.trim()) {
            setFileError('File title cannot be empty');
            return false;
        }
        // Additional validation logic can be added here if needed
        return true;
    };



    const handleFileChange = (e) => {
        const selectedFile = e.target.files[0];
        if (!selectedFile) {
            setFileError('Please select a file');
            return;
        }

        if (selectedFile.size > 1024 * 1024) { // Check file size (1MB limit)
            setFileError('File size exceeds the 1MB limit');
            return;
        }

        // Update the SelectedSocialItem.file by calling the prop function
        if (updateSelectedSocialItem) {
            updateSelectedSocialItem(prevState => ({
                ...prevState,
                file: selectedFile
            }));
        }

        setFile(selectedFile); // Set the file object itself
        setFilePath(selectedFile.name); // Set the file name in filePath state
        setFileError('');
    };
    const handleLabelChange = (event) => {
        console.log("Label state before update:", label);
        setLabel(event.target.value);
        console.log("Label state after update:", event.target.value);
    };
    
    


    const [item, setItem] = useState(
        SelectedSocialItem
            ? SelectedSocialItem.username ||
            SelectedSocialItem.wechat_number ||
            SelectedSocialItem.profile_link ||
            SelectedSocialItem.channel_link ||
            SelectedSocialItem.server_link ||
            SelectedSocialItem.telegram_link ||
            SelectedSocialItem.phone_number ||
            SelectedSocialItem.contact_number ||
            SelectedSocialItem.whatsapp_number ||
            SelectedSocialItem.email_address ||
            SelectedSocialItem.business_address ||
            SelectedSocialItem.facetime ||
            SelectedSocialItem.paypal_link ||
            SelectedSocialItem.payment_username ||
            SelectedSocialItem.spotify_link ||
            SelectedSocialItem.apple_link ||
            SelectedSocialItem.music_username ||
            SelectedSocialItem.custom_url ||
            SelectedSocialItem.label ||
            SelectedSocialItem.file ||
            SelectedSocialItem.poshmark_username ||
            SelectedSocialItem.mediakits_user ||
            SelectedSocialItem.opensea_user ||
            SelectedSocialItem.hoobe_user ||
            SelectedSocialItem.linktree_user ||

            ''
            : ''
    );

    useEffect(() => {
        if (SelectedSocialItem) {
            setItem(
                SelectedSocialItem.username ||
                SelectedSocialItem.wechat_number ||
                SelectedSocialItem.profile_link ||
                SelectedSocialItem.channel_link ||
                SelectedSocialItem.server_link ||
                SelectedSocialItem.telegram_link ||
                SelectedSocialItem.phone_number ||
                SelectedSocialItem.contact_number ||
                SelectedSocialItem.whatsapp_number ||
                SelectedSocialItem.email_address ||
                SelectedSocialItem.business_address ||
                SelectedSocialItem.facetime ||
                SelectedSocialItem.paypal_link ||
                SelectedSocialItem.payment_username ||
                SelectedSocialItem.spotify_link ||
                SelectedSocialItem.apple_link ||
                SelectedSocialItem.music_username ||
                SelectedSocialItem.custom_url ||
                SelectedSocialItem.url ||

                // SelectedSocialItem.label ||
                SelectedSocialItem.poshmark_username ||
                SelectedSocialItem.mediakits_user ||
                SelectedSocialItem.opensea_user ||
                SelectedSocialItem.hoobe_user ||
                SelectedSocialItem.linktree_user ||
                ''
            );

            setLinkTitle(SelectedSocialItem.linktitle || '');
            setLabel(SelectedSocialItem.label || '');
            setFile(SelectedSocialItem.file || '');
            setFilePath(SelectedSocialItem.file || '');
        }
    }, [SelectedSocialItem]);




    const handleUpdate = async () => {
        try {
            const userId = localStorage.getItem('userId');
            if (!userId) {
                throw new Error('User ID not found in localStorage');
            }
            if (!SelectedSocialId) {
                throw new Error('SelectedSocialId is not provided');
            }

            if (!socialplatformName) {
                throw new Error('Social name is not provided');
            }
            // const isEditing = existingSocialLinks.some(entry => entry.socialMediaId === SelectedSocialId);

            const requestData = {
                userId,
                linktitle: linkTitle,
                platform: socialplatformName,
                username: '',
                wechat_number: '',
                profile_link: '',
                channel_link: '',
                server_link: '',
                telegram_link: '',
                phone_number: '',
                contact_number: '',
                whatsapp_number: '',
                email_address: '',
                business_address: '',
                facetime: '',
                paypal_link: '',
                payment_username: '',
                spotify_link: '',
                apple_link: '',
                music_username: '',
                image: '',
                svg: '',
                url: '',
                custom_url: '',
                label: label,
                file: SelectedSocialItem.file,
                poshmark_username: '',
                mediakits_user: '',
                opensea_user: '',
                hoobe_user: '',
                linktree_user: '',
                icon: '',
                businessId: SelectedSocialId,
                socialMediaId: SelectedSocialId,
                contactId: SelectedSocialId,
                paymentId: SelectedSocialId,
                musicId: SelectedSocialId,
                customlinkId: SelectedSocialId,
                MoreSocialId: SelectedSocialId
            };

            const platformFields = {
                instagram: ['username'],
                linkedin: ['profile_link'],
                facebook: ['profile_link'],
                message: ['username'],
                email: ['username'],
                website: ['url'],
                paypal: ['paypal_link'],
                googlemap: ['url'],
                facetime: ['facetime'],
                whatsapp: ['whatsapp_number'],
                googlepay: ['payment_username'],
                youtube: ['channel_link'],
                twitter: ['username'],
                wechat: ['wechat_number'],
                threads: ['profile_link'],
                twitch: ['channel_link'],
                tiktok: ['username'],
                snapchat: ['username'],
                pinterest: ['username'],
                discord: ['server_link'],
                telegram: ['telegram_link'],
                clubhouse: ['username'],
                calendly: ['url'],
                reviews: ['contact_number'],
                etsy: ['url'],
                applestore: ['username'],
                chilipiper: ['url'],
                microsoftbooking: ['url'],
                booksy: ['url'],
                square: ['url'],
                zillow: ['username'],
                cashapp: ['payment_username'],
                venmo: ['payment_username'],
                zelle: ['payment_username'],
                spotify: ['spotify_link'],
                applemusic: ['apple_link'],
                soundcloud: ['music_username'],
                podcasts: ['music_username'],
                poshmark: ['poshmark_username'],
                mediakits: ['mediakits_user'],
                opensea: ['opensea_user'],
                hoobe: ['hoobe_user'],
                linktree: ['linktree_user'],
                file: ['file'],
                customlink: ['custom_url'],
            };


            // // Set relevant fields based on platform name
            // const platformName = socialplatformName.toLowerCase();
            // if (platformFields.hasOwnProperty(platformName)) {
            //     const fields = platformFields[platformName];
            //     fields.forEach((field) => {
            //         requestData[field] = item; // Assuming todoName contains the value for the field
            //     });
            // }

            // if (socialplatformName.toLowerCase() === 'file') {
            //     requestData['file'] = file || SelectedSocialItem.file;
            // } else if (platformFields.hasOwnProperty(socialplatformName.toLowerCase())) {
            //     const fields = platformFields[socialplatformName.toLowerCase()];
            //     fields.forEach((field) => {
            //       requestData[field] = item;
            //     });
            //   }

            // console.log("SelectedSocialItem.file:", SelectedSocialItem.file);
            // console.log("SelectedSocialItem.label:", SelectedSocialItem.label);


            if (socialplatformName.toLowerCase() === 'file') {
                requestData['file'] = file || SelectedSocialItem.file;
            } else if (platformFields.hasOwnProperty(socialplatformName.toLowerCase())) {
                const fields = platformFields[socialplatformName.toLowerCase()];
                fields.forEach((field) => {
                    requestData[field] = item;
                });
            } else {
                // Include existing file data if not related to the platform type
                requestData['file'] = SelectedSocialItem.file;
            }


            console.log("Request data sent to server:", requestData);

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
                    'X-Selected-Social-Id': SelectedSocialId,
                    'Authorization': `Bearer ${auth}`,
                },
            };


            const formData = new FormData();
            for (const key in requestData) {
                formData.append(key, requestData[key]);
            }

            // const response = await axiosInstance.post('/SocialLinks/', requestData);
            const response = await axiosInstance.post('/SocialLinks/', formData, config);
            setLabel('');
            console.log("response data sent to server:", response);

            console.log("Label state before update:", label);


        
            
            console.log("Response data from server:", response.data.label);

            showToast(SelectedSocialItem ? 'Data updated successfully' : 'Link added successfully');
            // Assuming you have imported the router properly

            setTimeout(() => {
                //   window.location.reload(); // Refresh the page without loading
                // router.reload();
            }, 2000);

            // console.log(response.data,"responsedata"); // Log the response from the server
            console.log('Data updated successfully:', response.data);

            // Reset fields and errors
            setLinkTitle('');

            setItem('');
            // setLabel('New Value'); // Test setting a hardcoded value to see if it reflects in the input field
            setFileError('');
            console.log("Label state after update:", label);

            //   setFile(SelectedSocialItem.file);
            //    setFilePath(SelectedSocialItem.file);

            onClose();
        } catch (error) {
            console.error('Error:', error.message);
            // Handle error if needed
        }
    };

    return (
        <>
            {isOpen && (
                <div style={{ display: isOpen ? 'block' : 'none' }}>
                    <Transition appear show={isOpen} as={Fragment}>
                        <Dialog as="div" open={isOpen} onClose={onClose}>
                            <Transition.Child as={Fragment} enter="ease-out duration-300" enterFrom="opacity-0" enterTo="opacity-100" leave="ease-in duration-200" leaveFrom="opacity-100" leaveTo="opacity-0">
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
                                        <Dialog.Panel className="panel my-auto h-[70vh] w-[50vw] max-w-5xl overflow-y-auto overflow-x-hidden rounded-[20px] border-0 bg-white p-0 px-10 py-10 text-black dark:text-white-dark">
                                            <div className="flex items-center justify-between dark:bg-[#121c2c]">
                                                <div>
                                                    <span className="text-[24px] tracking-wide"> Social Link</span>
                                                </div>
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
                                            <div className="p-3">
                                                <div className="m-4 flex items-center">
                                                    <div className="flex items-center space-x-3">
                                                        <img src={imageUrl} alt="instagram" className="h-12 w-12" />
                                                        <h1 className="text-lg font-medium capitalize">{socialplatformName}</h1>
                                                    </div>
                                                </div>
                                                {socialplatformName === 'file' ? (
                                                    <div>
                                                        <div className="m-4">
                                                            <h2 className=" pb-2 text-sm font-normal">File Title*</h2>
                                                            {/* <input
                                                                type="text"
                                                                placeholder="File title"
                                                                className="form-input h-[45px]"
                                                                value={label}
                                                                onChange={handleLabelChange}

                                                                // onChange={(event) => setLabel(event.target.value)} // Add onChange handler to update the 'label' state
                                                            /> */}
                                                            <input
    type="text"
    placeholder="File title"
    className="form-input h-[45px]"
    value={label} // Make sure this is bound to the label state
    onChange={handleLabelChange} // Use the handleLabelChange function
/>



                                                        </div>
                                                        <div className="m-4">
                                                            <h2 className=" pb-2 text-sm font-normal">File*</h2>
                                                            <label htmlFor="file-upload" className="btn btn-primary mr-5 h-[40px] cursor-pointer text-base">
                                                                Upload File
                                                                <span className="text-xs">(Max file size 1MB)</span>
                                                            </label>
                                                            {/* <input
                                                                id="file-upload"
                                                                type="file"
                                                                className="hidden"
                                                                accept=".pdf, .doc, .docx, .xls, .xlsx, .ppt, .pptx, image/*"
                                                                onChange={(e) => setFile(e.target.files[0])}
                                                            /> */}

                                                            <input
                                                                id="file-upload"
                                                                type="file"
                                                                className="hidden"
                                                                accept=".pdf, .doc, .docx, .xls, .xlsx, .ppt, .pptx, image/*"
                                                                onChange={handleFileChange}
                                                            />
                                                            {filePath && <p>File uploaded successfully. Path: {SelectedSocialItem.file ? SelectedSocialItem.file.name : filePath}</p>}
                                                            {fileError && <p className="text-red-500">{fileError}</p>}
                                                            {/* {filePath && (
                                                                <div className="m-4">
                                                                    <h2 className="pb-2 text-sm font-normal">File*</h2>
                                                                    <p>{SelectedSocialItem.file.name}</p>
                                                                </div>
                                                            )} */}


                                                        </div>
                                                    </div>
                                                ) : (
                                                    <div>
                                                        <div className="m-4 space-y-2">
                                                            <h2 className="pb-2 text-sm font-normal sm:text-base">{socialplatformName}</h2>
                                                            <input
                                                                type="text"
                                                                placeholder="INPUT"
                                                                className="form-input h-[45px] w-full"
                                                                required
                                                                value={item} // Displaying the 'platform' property
                                                                onChange={(e) => setItem(e.target.value)}
                                                            />

                                                            <h2 className="pb-2 text-sm font-normal sm:text-base">Link</h2>
                                                            <input
                                                                type="text"
                                                                placeholder="Link"
                                                                className="form-input h-[45px] w-full"
                                                                required
                                                                value={linkTitle}
                                                                onChange={(e) => setLinkTitle(e.target.value)}
                                                            />
                                                        </div>
                                                    </div>
                                                )}

                                                <div className=" mt-16 flex justify-end gap-7">
                                                    <button type="button" className="underline underline-offset-4" onClick={() => onClose(false)}>
                                                        Cancel
                                                    </button>
                                                    <button type="button" className="btn btn-primary h-[40px] w-[130px] transition duration-300 ease-in-out" onClick={handleUpdate}>
                                                        Update
                                                    </button>
                                                </div>
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

export default EditSocial;
