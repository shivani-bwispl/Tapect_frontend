import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import Delete from '../public/assets/images/icons/Delete.svg';
import EditLink from '../public/assets/images/icons/EditLink.svg';
import { useRouter } from 'next/dist/client/router';
import EditSocial from '../pages/EditSocial';
import axiosInstance from '../services/api';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import { imagepathURL } from '@/services/imgpthapi';


const MySwal = withReactContent(Swal);

const SocialLinkLists = ({ selectedSocial, SocialItems, DeleteEle, setShowModal, setShowContent, setSelectedSocialItem, SelectedSocialItem, setSelectedSocialId, SelectedSocialId }) => {
    const router = useRouter();

    const [socialLinks, setSocialLinks] = useState({
        Social_Media: [],
        Business: [],
        Contact: [],
        Payment: [],
        Music: [],
        Custom_link: [],
        More_social: []
    });
    // console.log(socialLinks,"sociallinklist");

    // console.log('Image path URL:', imagepathURL+'/fileuploads/');

    const [error, setError] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [successMessage, setSuccessMessage] = useState(null); // State variable for success message

    const updateSelectedSocialItem = (updatedItem) => {
        setSelectedSocialItem(updatedItem);
    };

    const showToast = () => {
        MySwal.fire({
            title: 'Data  Deleted successfully',
            toast: true,
            position: 'top',
            showConfirmButton: false,
            timer: 3000,
            background: '#4CAF50',
            showCloseButton: true,
        });
    };
    const closeModal = () => {
        setIsModalOpen(false);
    };
    const openModal = () => {
        setIsModalOpen(true);
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
                // console.log(responseData, 'responseData');
                if (responseData.existingSocialLink) {
                    setSocialLinks(responseData.existingSocialLink);
                } else {
                    setError('Social links not found for this user');
                }
            } catch (error) {
                console.error('Error fetching user social links:', error.message);
                // setSocialLinks([]); // Reset social links state to an empty array
                setSocialLinks({
                    Social_Media: [],
                    Business: [],
                    Contact: [],
                    Payment: [],
                    Music: [],
                    More_social: [],
                    Custom_link: []
                });


            }
        };

        fetchUserSocialLinks(); // Call fetchUserSocialLinks when the component mounts
    }, []);


    const handleEditItem = async (id, type, itemData) => {
        // const ele = socialLinks.find((socialLink) => socialLink.id === id);
        // console.log(ele);
        // setSelectedSocialItem(ele);
        try {
            // Use itemData to prefill the modal or perform any other operations

            // setShowModal(true);
            // setShowContent(true);
            setIsModalOpen(true);
            setSelectedSocialId(id);

            setSelectedSocialItem(itemData);
            // Open the modal or perform any other action
            console.log('Edit button clicked for item:', itemData);
            console.log('Edit button clicked for item:', id);
            console.log('Edit button clicked for item:', type);
        } catch (error) {
            console.error('Error editing item:', error.message);
        }
    };

    const handleDeleteItem = async (id, type) => {

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
            const response = await axiosInstance.delete(`/SocialLinks/`, {
                data: {
                    userId: userId,
                    [`${type}Id`]: id,
                },
                headers: {
                    ...config.headers, // Include headers from the config object
                },
            });

            showToast();

            // setTimeout(() => {
            //     //   window.location.reload(); // Refresh the page without loading
            //     router.reload();
            // }, 2000);

            // setSuccessMessage('Social link deleted successfully');

            // setTimeout(() => {
            //     setSuccessMessage(null); // Remove success message after 10 seconds
            // }, 10000); // 10 seconds in milliseconds

            // DeleteEle(id);
            // router.reload();
        } catch (error) {
            console.error('Error deleting social link:', error.message);
        }
    };


    return (
        <div className="container mx-auto">
            {error && <p className="text-red-500">Error: {error}</p>}
            {successMessage && <p className="text-green-500">{successMessage}</p>}

            <div>
                {/* <h2 className="text-2xl font-bold">User Social Links</h2> */}
                {socialLinks && (
                    <div className='px-3'>
                        <h3 className="text-lg font-bold">Social Media</h3>
                        <ul className="list-disc">
                            {socialLinks.Social_Media &&
                                socialLinks.Social_Media.map((media) => (
                                    <li key={media._id} className=" mt-2 flex h-[55px] w-full items-center justify-between rounded-lg bg-purple-Light px-3">
                                        <div className="flex items-center justify-center">
                                            {media.image && <Image src={media.image} width={25} height={25} alt={media} />}
                                            {/* <span className="ml-2 font-normal">{media.linktitle}</span> */}
                                            <br></br>
                                            {media.username && <span className="ml-2 font-normal">{media.username}</span>}
                                            {media.profile_link && <span className="ml-2 font-normal">{media.profile_link}</span>}
                                            {media.wechat_number && <span className="ml-2 font-normal">{media.wechat_number}</span>}
                                            {media.channel_link && <span className="ml-2 font-normal">{media.channel_link}</span>}
                                            {media.server_link && <span className="ml-2 font-normal">{media.server_link}</span>}
                                            {media.telegram_link && <span className="ml-2 font-normal">{media.telegram_link}</span>}

                                            {/* <span className="ml-2 font-normal">{media.username && `${media.username}`}</span>
                                            <span className="ml-2 font-normal">{media.profile_link && `${media.profile_link}`}</span>
                                            <span className="ml-2 font-normal">{media.wechat_number && `${media.wechat_number}`}</span>
                                            <span className="ml-2 font-normal">{media.channel_link && `${media.channel_link}`}</span>
                                            <span className="ml-2 font-normal">{media.server_link && ` ${media.server_link}`}</span>
                                            <span className="ml-2 font-normal">{media.telegram_link && `${media.telegram_link}`}</span> */}
                                        </div>
                                        <div className="flex items-center gap-4">
                                            <button className="focus:outline-none" type="button" onClick={() => handleEditItem(media._id, 'socialMedia', media)}>
                                                <Image src={EditLink} width={20} height={20} alt="Edit" />
                                            </button>
                                            <button className="focus:outline-none" type="button" onClick={() => handleDeleteItem(media._id, 'socialMedia')}>
                                                <Image src={Delete} width={15} height={15} alt="Delete" />
                                            </button>
                                        </div>
                                    </li>
                                ))}
                        </ul>

                        <h3 className="ml-2 mt-4  text-lg font-bold">Business Info</h3>
                        <ul className="ml-2 list-disc">
                            {socialLinks.Business &&
                                socialLinks.Business.map((business) => (
                                    <li key={business._id} className=" mt-2 flex h-[55px] w-full items-center justify-between rounded-lg bg-purple-Light  px-3">
                                        <div className="flex items-center justify-center">
                                            {business.image && <Image src={business.image} width={25} height={25} alt={business} />}
                                            {/* <span className="ml-2 font-normal">{business.linktitle}</span> */}

                                            {business.contact_number && <span className="ml-2 font-normal">{business.contact_number}</span>}
                                            {business.url && <span className="ml-2 font-normal">{business.url}</span>}

                                        </div>
                                        <div className="flex items-center gap-4">
                                            <button className="focus:outline-none" type="button" onClick={() => handleEditItem(business._id, 'business', business)}>
                                                <Image src={EditLink} width={20} height={20} alt="Edit" />
                                            </button>
                                            <button className="focus:outline-none" type="button" onClick={() => handleDeleteItem(business._id, 'business')}>
                                                <Image src={Delete} width={15} height={15} alt="Delete" />
                                            </button>
                                        </div>
                                    </li>
                                ))}
                        </ul>

                        <h3 className="ml-2 mt-4  text-lg font-bold">Contact Info</h3>

                        <ul className="ml-2 list-disc">
                            {socialLinks.Contact &&
                                socialLinks.Contact.map((contact) => (
                                    <li key={contact._id} className="mt-2 flex h-[55px] w-full items-center justify-between rounded-lg bg-purple-Light  px-3">
                                        <div className="flex items-center justify-center">
                                            {contact.image && <Image src={contact.image} width={25} height={25} alt={contact} />}
                                            {/* <span className="ml-2 font-normal">{contact.linktitle}</span> */}
                                            {contact.phone_number && <span className="ml-2 font-normal">{contact.phone_number}</span>}
                                            {contact.whatsapp_number && <span className="ml-2 font-normal">{contact.whatsapp_number}</span>}
                                            {contact.email_address && <span className="ml-2 font-normal">{contact.email_address}</span>}
                                            {contact.business_address && <span className="ml-2 font-normal">{contact.business_address}</span>}
                                            {contact.facetime && <span className="ml-2 font-normal">{contact.facetime}</span>}





                                        </div>
                                        <div className="flex items-center gap-4">
                                            <button className="focus:outline-none" type="button" onClick={() => handleEditItem(contact._id, 'contact', contact)}>
                                                <Image src={EditLink} width={20} height={20} alt="Edit" />
                                            </button>
                                            <button className="focus:outline-none" type="button" onClick={() => handleDeleteItem(contact._id, 'contact')}>
                                                <Image src={Delete} width={15} height={15} alt="Delete" />
                                            </button>
                                        </div>
                                    </li>
                                ))}
                        </ul>

                        <h3 className="ml-2 mt-4  text-lg font-bold">Payment Info</h3>

                        <ul className="ml-2 list-disc">
                            {socialLinks.Payment &&
                                socialLinks.Payment.map((payment) => (
                                    <li key={payment._id} className="mt-2 flex h-[55px] w-full items-center justify-between rounded-lg bg-purple-Light  px-3">
                                        <div className="flex items-center justify-center">
                                            {payment.image && <Image src={payment.image} width={25} height={25} alt={payment} />}
                                            {/* <span className="ml-2 font-normal">{payment.linktitle}</span> */}
                                            {payment.paypal_link && <span className="ml-2 font-normal">{payment.paypal_link}</span>}
                                            {payment.payment_username && <span className="ml-2 font-normal">{payment.payment_username}</span>}
                                        </div>
                                        <div className="flex items-center gap-4">
                                            <button className="focus:outline-none" type="button" onClick={() => handleEditItem(payment._id, 'payment', payment)}>
                                                <Image src={EditLink} width={20} height={20} alt="Edit" />
                                            </button>
                                            <button className="focus:outline-none" type="button" onClick={() => handleDeleteItem(payment._id, 'payment')}>
                                                <Image src={Delete} width={15} height={15} alt="Delete" />
                                            </button>
                                        </div>
                                    </li>
                                ))}
                        </ul>

                        <h3 className="ml-2 mt-4  text-lg font-bold">Music Info</h3>

                        <ul className="ml-2 list-disc">
                            {socialLinks.Music &&
                                socialLinks.Music.map((music) => (
                                    <li key={music._id} className="mt-2 flex h-[55px] w-full items-center justify-between rounded-lg bg-purple-Light  px-3">
                                        <div className="flex items-center justify-center">
                                            {music.image && <Image src={music.image} width={25} height={25} alt={music} />}
                                            <span className="ml-2 font-normal">{music.linktitle}</span>

                                            {music.spotify_link && <span className="ml-2 font-normal">{music.spotify_link}</span>}
                                            {music.apple_link && <span className="ml-2 font-normal">{music.apple_link}</span>}
                                            {music.music_username && <span className="ml-2 font-normal">{music.music_username}</span>}

                                        </div>
                                        <div className="flex items-center gap-4">
                                            <button className="focus:outline-none" type="button" onClick={() => handleEditItem(music._id, 'music', music)}>
                                                <Image src={EditLink} width={20} height={20} alt="Edit" />
                                            </button>
                                            <button className="focus:outline-none" type="button" onClick={() => handleDeleteItem(music._id, 'music')}>
                                                <Image src={Delete} width={15} height={15} alt="Delete" />
                                            </button>
                                        </div>
                                    </li>
                                ))}
                        </ul>

                        <h3 className="ml-2 mt-4  text-lg font-bold">Custom Info</h3>

                        <ul className="ml-2 list-disc">
                            {socialLinks.Custom_link &&
                                socialLinks.Custom_link.map((customlink) => (
                                    <li key={customlink._id} className=" mt-2 flex h-[55px] w-full items-center justify-between rounded-lg bg-purple-Light  px-3">
                                        <div className="flex items-center justify-center">
                                            {customlink.image && <Image src={customlink.image} width={25} height={25} alt={customlink} />}
                                            {/* <span className="ml-2 font-normal">{customlink.linktitle}</span> */}

                                            {customlink.file && <span className="ml-2 font-normal">{customlink.file}</span>}
                                            {customlink.custom_url && <span className="ml-2 font-normal">{customlink.custom_url}</span>}
                                            {customlink.label && <span className="ml-2 font-normal">{customlink.label}</span>}

                                        </div>
                                        <div className="flex items-center gap-4">
                                            <button className="focus:outline-none" type="button" onClick={() => handleEditItem(customlink._id, 'customlink', customlink)}>
                                                <Image src={EditLink} width={20} height={20} alt="Edit" />
                                            </button>
                                            <button className="focus:outline-none" type="button" onClick={() => handleDeleteItem(customlink._id, 'customlink')}>
                                                <Image src={Delete} width={15} height={15} alt="Delete" />
                                            </button>
                                        </div>
                                    </li>
                                ))}
                        </ul>

                        <ul className="ml-2 list-disc">
                            {socialLinks.More_social && socialLinks.More_social.length > 0 && (
                                <>
                                    <h3 className="ml-2 mt-4  text-lg font-bold">More</h3>
                                    {socialLinks.More_social.map((More) => (
                                        <li key={More._id} className=" mt-2 flex h-[55px] w-full items-center justify-between rounded-lg bg-purple-Light px-3">
                                            <div className="flex items-center justify-center">
                                                {More.image && <Image src={More.image} width={20} height={20} alt={More} />}
                                                {/* <span className="ml-2 font-normal">{More.linktitle}</span> */}
                                                <br></br>
                                                {More.poshmark_username && <span className="ml-2 font-normal">{More.poshmark_username}</span>}
                                                {More.mediakits_user && <span className="ml-2 font-normal">{More.mediakits_user}</span>}
                                                {More.opensea_user && <span className="ml-2 font-normal">{More.opensea_user}</span>}
                                                {More.hoobe_user && <span className="ml-2 font-normal">{More.hoobe_user}</span>}
                                                {More.linktree_user && <span className="ml-2 font-normal">{More.linktree_user}</span>}
                                            </div>
                                            <div className="flex items-center gap-4">
                                                <button className="focus:outline-none" type="button" onClick={() => handleEditItem(More._id, 'MoreSocial', More)}>
                                                    <Image src={EditLink} width={20} height={20} alt="Edit" />
                                                </button>
                                                <button className="focus:outline-none" type="button" onClick={() => handleDeleteItem(More._id, 'MoreSocial')}>
                                                    <Image src={Delete} width={15} height={15} alt="Delete" />
                                                </button>
                                            </div>
                                        </li>
                                    ))}
                                </>
                            )}
                        </ul>




                        {/* Render other sections similarly */}
                    </div>
                )}
                <WelcomeMsg socialLinks={socialLinks} />
                <EditSocial
                    isOpen={isModalOpen}
                    onClose={closeModal}
                    SelectedSocialItem={SelectedSocialItem}
                    selectedSocial={selectedSocial}
                    SelectedSocialId={SelectedSocialId}
                    socialName={selectedSocial}
                    updateSelectedSocialItem={updateSelectedSocialItem} // Pass the function as a prop

                ></EditSocial>

                {/* {!socialLinks && (
                    <div className="flex  flex-col items-center justify-center px-6 py-6 sm:px-12 sm:py-12">
                        <h2 className="text-xl font-bold sm:text-2xl">This profile doesn’t have any linked content</h2>
                        <p className="text-lightText mt-2 text-center text-black-themeBlack sm:mt-4">Add links to contact information, websites, payment methods, social networks and more.</p>
                    </div>
                )} */}
            </div>


        </div>
    );
};

export default SocialLinkLists;
export function WelcomeMsg({ socialLinks }) {
    return (
        <>
            {socialLinks.length === 0 ? (
                <div className="flex  flex-col items-center justify-center px-6 py-6 sm:px-12 sm:py-12">
                    <h2 className="text-xl font-bold sm:text-2xl">This profile doesn’t have any linked content</h2>
                    <p className="text-lightText mt-2 text-center text-black-themeBlack sm:mt-4">Add links to contact information, websites, payment methods, social networks and more.</p>
                </div>
            ) : null}
        </>
    );
}
