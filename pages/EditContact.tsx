// import React, { useEffect, useState } from 'react';
// import { Dialog, Transition } from '@headlessui/react';
// import { Fragment } from 'react';
// import IconX from '@/components/Icon/IconX';
// import Image from 'next/image';
// import More from '../public/assets/images/icons/More.svg';
// import ProfileIcon from '../public/assets/images/icons/ProfileIcon.svg';
// import i18n from 'i18next';
// import { initReactI18next } from 'react-i18next';
// import axiosInstance from '../services/api'; // Import axiosInstance from api.js
// import router from 'next/dist/client/router';


// const EditContact = ({ isOpen, onClose, contactId }) => {
//     const [contactData, setContactData] = useState(null);
//     const [formData, setFormData] = useState({
//         fullname: '',
//         contact_jobtitle: '',
//         contact_phonenumber: '',
//         contact_email: '',
//         company: '',
//         website: '',
//     });

//     const handleChange = (e) => {
//         const { name, value } = e.target;
//         setFormData({
//             ...formData,
//             [name]: value,
//         });
//     };

//     const handleSubmit = async (e) => {
//         e.preventDefault();
//         try {
//             const auth = localStorage.getItem('token');


//             if (!auth || auth === "null") {
//                 // Display error message
//                 console.error('Token not found in localStorage');
//                 // Redirect to login page
//                 router.push('/Login');
//                 return;
//             }

//             const config = {
//                 headers: {
//                     'Authorization': `Bearer ${auth}`, // Set the authorization header properly
//                 },
//             };
//             const response = await axiosInstance.put(`/contact_details/${contactId}`, formData,config);
//             console.log('Contact updated:', response.data);
//             onClose();
//         } catch (error) {
//             console.error('Error updating contact:', error);
//         }
//     };

//     useEffect(() => {
//         const fetchContactData = async () => {
//             try {
//                 const auth = localStorage.getItem('token');


//             if (!auth || auth === "null") {
//                 // Display error message
//                 console.error('Token not found in localStorage');
//                 // Redirect to login page
//                 router.push('/Login');
//                 return;
//             }

//             const config = {
//                 headers: {
//                     'Authorization': `Bearer ${auth}`, // Set the authorization header properly
//                 },
//             };
//                 const response = await axiosInstance.get(`/contact_details/contactuser/${contactId}`,config);
//                 const ContactuserDetail = response.data.contact;

//                 console.log(ContactuserDetail);
//                 setContactData(ContactuserDetail);
//                 setFormData({
//                     fullname: ContactuserDetail.fullname,
//                     contact_jobtitle: ContactuserDetail.contact_jobtitle,
//                     contact_phonenumber: ContactuserDetail.contact_phonenumber,
//                     contact_email: ContactuserDetail.contact_email,
//                     company: ContactuserDetail.company,
//                     website: ContactuserDetail.website,
//                 });
//             } catch (error) {
//                 console.error('Error fetching contact data:', error);
//             }
//         };

//         if (isOpen && contactId) {
//             fetchContactData();
//         }
//     }, [isOpen, contactId]);

//     return (
//         <>
//           {isOpen && (
//             <div style={{ display: isOpen ? 'block' : 'none' }}>
//                 <Transition appear show={isOpen} as={Fragment}>
//                     <Dialog as="div" open={isOpen} onClose={onClose}>
//                         <Transition.Child
//                             as={Fragment}
//                             enter="ease-out duration-300"
//                             enterFrom="opacity-0"
//                             enterTo="opacity-100"
//                             leave="ease-in duration-200"
//                             leaveFrom="opacity-100"
//                             leaveTo="opacity-0"
//                         >
//                             <div className="fixed inset-0" />
//                         </Transition.Child>
//                         <div className="fixed inset-0 z-[999] bg-[black]/60">
//                             <div className="flex min-h-screen items-start justify-center px-4">
//                                 <Transition.Child
//                                     as={Fragment}
//                                     enter="ease-out duration-300"
//                                     enterFrom="opacity-0 scale-95"
//                                     enterTo="opacity-100 scale-100"
//                                     leave="ease-in duration-200"
//                                     leaveFrom="opacity-100 scale-100"
//                                     leaveTo="opacity-0 scale-95"
//                                 >
//                                     <Dialog.Panel className="panel mx-auto my-auto  w-full overflow-x-hidden overflow-y-scroll rounded-[20px] border-0 bg-white px-6 py-6 text-black dark:text-white-dark sm:w-[500px] md:w-[890px]">
//                                         <div className="flex  items-center justify-end  dark:bg-[#121c2c]">
//                                             <button
//                                                 onClick={() => {
//                                                     onClose(false);
//                                                 }}
//                                                 type="button"
//                                                 className="text-white-dark hover:text-dark"
//                                             >
//                                                 <IconX className="w-12" />
//                                             </button>
//                                         </div>
//                                         <div className="panel m-5 ">
//                                             <div className="flex  w-full items-center justify-between border-b-2 bg-white p-2">
//                                                 <div className="  flex  items-center justify-center  ">
//                                                     <Image src={ProfileIcon} width={50} height={50} alt="profileicon" className="ml-2"></Image>
//                                                     <span className="ml-2 text-2xl font-medium">{formData.fullname}</span>
//                                                 </div>
//                                                 <div>
//                                                     <Image src={More} width={5} height={5} alt="more"></Image>
//                                                 </div>
//                                             </div>
//                                             {formData && ( // Check if formData is not null
//                                                 <form onSubmit={handleSubmit} className="mb-5 bg-white p-4 dark:border-[#191e3a] dark:bg-black">
//                                                     <h6 className="mb-5 text-lg font-bold">Contact Information</h6>

//                                                     <div className="flex flex-col sm:flex-row">
//                                                         <div className="mb-5 w-full sm:w-2/12 ltr:sm:mr-4 rtl:sm:ml-4">
//                                                             <Image src={ProfileIcon} width={160} height={160} alt="profileicon" />
//                                                         </div>
//                                                         <div className="grid flex-1 grid-cols-1 gap-5 sm:grid-cols-2">
//                                                             <div>
//                                                                 <label htmlFor="name">Full Name</label>
//                                                                 <input
//                                                                     id="name"
//                                                                     name="fullname"
//                                                                     type="text"
//                                                                     placeholder="Full Name"
//                                                                     className="form-input"
//                                                                     value={formData.fullname}
//                                                                     onChange={handleChange}
//                                                                 />
//                                                             </div>
//                                                             <div>
//                                                                 <label htmlFor="jobTitle">Job Title</label>
//                                                                 <input
//                                                                     id="jobTitle"
//                                                                     name="contact_jobtitle"
//                                                                     type="text"
//                                                                     placeholder="Job Title"
//                                                                     className="form-input"
//                                                                     value={formData.contact_jobtitle}
//                                                                     onChange={handleChange}
//                                                                 />
//                                                             </div>
//                                                             <div>
//                                                                 <label htmlFor="phoneNumber">Phone Number</label>
//                                                                 <input
//                                                                     id="phoneNumber"
//                                                                     name="contact_phonenumber"
//                                                                     type="text"
//                                                                     placeholder="Phone Number"
//                                                                     className="form-input"
//                                                                     value={formData.contact_phonenumber}
//                                                                     onChange={handleChange}
//                                                                 />
//                                                             </div>
//                                                             <div>
//                                                                 <label htmlFor="email">Email</label>
//                                                                 <input
//                                                                     id="contact_email"
//                                                                     name="contact_email"
//                                                                     type="email"
//                                                                     placeholder="Email"
//                                                                     className="form-input"
//                                                                     value={formData.contact_email}
//                                                                     onChange={handleChange}
//                                                                 />
//                                                             </div>
//                                                             <div>
//                                                                 <label htmlFor="company">Company</label>
//                                                                 <input
//                                                                     id="company"
//                                                                     name="company"
//                                                                     type="text"
//                                                                     placeholder="Company"
//                                                                     className="form-input"
//                                                                     value={formData.company}
//                                                                     onChange={handleChange}
//                                                                 />
//                                                             </div>
//                                                             <div>
//                                                                 <label htmlFor="website">Website</label>
//                                                                 <input
//                                                                     id="website"
//                                                                     name="website"
//                                                                     type="text"
//                                                                     placeholder="Website"
//                                                                     className="form-input"
//                                                                     value={formData.website}
//                                                                     onChange={handleChange}
//                                                                 />
//                                                             </div>
//                                                         </div>
//                                                     </div>
//                                                     <div className="mt-7 flex items-center justify-end gap-5">
//                                                         <button type="button" className="underline underline-offset-4" onClick={() => onClose(false)}>
//                                                             Cancel
//                                                         </button>
//                                                         <button type="submit" className="btn btn-primary h-[40px] w-[130px]">
//                                                             Update
//                                                         </button>
//                                                     </div>
//                                                 </form>
//                                             )}
//                                         </div>
//                                     </Dialog.Panel>
//                                 </Transition.Child>
//                             </div>
//                         </div>
//                     </Dialog>
//                 </Transition>
//             </div>
//                         )}

//         </>
//     );
// };

// export default EditContact;


import React, { useEffect, useState, Fragment } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import Image from 'next/image';
import IconX from '@/components/Icon/IconX';
import More from '../public/assets/images/icons/More.svg';
import ProfileIcon from '../public/assets/images/icons/UserProfile_logo.svg';
import Export from '../public/assets/images/icons/Export.svg';
import axiosInstance from '../services/api';
import router from 'next/router';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';

const EditContact = ({ isOpen, onClose, contactId }) => {
    const [contactData, setContactData] = useState(null);
    const [error, setError] = useState(null);
    const MySwal = withReactContent(Swal);
    const [formData, setFormData] = useState({
        fullname: '',
        contact_jobtitle: '',
        contact_phonenumber: '',
        contact_email: '',
        company: '',
        website: '',
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };
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

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const auth = localStorage.getItem('token');
    
            if (!auth || auth === 'null') {
                console.error('Token not found in localStorage');
                router.push('/Login');
                return;
            }
    
            const config = {
                headers: {
                    Authorization: `Bearer ${auth}`,
                },
            };
    
            const response = await axiosInstance.put(`/contact_details/${contactId}`, formData, config);
            // console.log('Contact updated:', response.data);

            // onClose();
    
            // Log formData to see which fields are being updated
            // console.log('Updated fields:', formData);
             // Create a string with updated fields
        const updatedFields = Object.keys(formData).map(field => `${field}: ${formData[field]}`).join(', ');

        // Show toast with the updated fields
        showToast('success', `Contact info Update Suceesfully`);
    
        } catch (error) {
            console.error('Error updating contact:', error);
            showToast('error', 'Error updating contact');

        }
    };
    
    useEffect(() => {
        const fetchContactData = async () => {
            try {
                const auth = localStorage.getItem('token');

                if (!auth || auth === 'null') {
                    console.error('Token not found in localStorage');
                    router.push('/Login');
                    return;
                }

                const config = {
                    headers: {
                        Authorization: `Bearer ${auth}`,
                    },
                };

                const response = await axiosInstance.get(`/contact_details/contactuser/${contactId}`, config);
                const ContactuserDetail = response.data.contact;

                console.log(ContactuserDetail);
                setContactData(ContactuserDetail);
                setFormData({
                    fullname: ContactuserDetail.fullname,
                    contact_jobtitle: ContactuserDetail.contact_jobtitle,
                    contact_phonenumber: ContactuserDetail.contact_phonenumber,
                    contact_email: ContactuserDetail.contact_email,
                    company: ContactuserDetail.company,
                    website: ContactuserDetail.website,
                });
            } catch (error) {
                console.error('Error fetching contact data:', error);
            }
        };

        if (isOpen && contactId) {
            fetchContactData();
        }
    }, [isOpen, contactId]);

    const generateVCF = (contact) => {
        const vcard = `BEGIN:VCARD
VERSION:3.0
FN:${contact.fullname}
ORG:${contact.company}
TEL;TYPE=WORK,VOICE:${contact.contact_phonenumber}
EMAIL;TYPE=PREF,INTERNET:${contact.contact_email}
URL:${contact.website}
END:VCARD`;

        return vcard;
    };

    const saveAsContact = (contactData) => {
        const vcfString = generateVCF(contactData);
        const blob = new Blob([vcfString], { type: 'text/vcard' });
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', 'contacts.vcf');
        document.body.appendChild(link);
        link.click();
        URL.revokeObjectURL(url);
        document.body.removeChild(link);
    };

    const handleSaveAsContact = (contactData) => {
        try {
            saveAsContact(contactData);
        } catch (error) {
            console.error('Error saving contact as VCF:', error);
        }
    };

    return (
        <>
            {isOpen && (
                <div style={{ display: isOpen ? 'block' : 'none' }}>
                    <Transition appear show={isOpen} as={Fragment}>
                        <Dialog as="div" open={isOpen} onClose={onClose}>
                            <Transition.Child
                                as="div" // Ensure it renders a div instead of a Fragment
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
                                <div className="flex min-h-screen items-center justify-center px-4">
                                    <Transition.Child
                                        as="div" // Ensure it renders a div instead of a Fragment
                                        enter="ease-out duration-300"
                                        enterFrom="opacity-0 scale-95"
                                        enterTo="opacity-100 scale-100"
                                        leave="ease-in duration-200"
                                        leaveFrom="opacity-100 scale-100"
                                        leaveTo="opacity-0 scale-95"
                                    >
                                        

                                        <Dialog.Panel className="bg-white mx-auto my-auto h-[calc(80vh)] w-full overflow-x-hidden overflow-y-scroll rounded-[20px] border-0 bg-white px-6 py-6 text-black dark:text-white-dark sm:w-[500px] md:w-[70vw]"style={{ maxHeight: 'calc(100vh - 2rem)'}}>
                                        
                                      
                                        <div className="flex h-fit w-full cursor-pointer items-center justify-between px-5 my-4 py-3 ">
                                      
                                            {formData && (
                                                <>
                                                    <div className="flex flex-col items-start justify-center gap-0">
                                                  
                                                        <div className="flex items-center gap-2 ">
                                                            <Image src={ProfileIcon} width={60} height={60} alt="profileicon" className="ml-2" />
                                                            <div className="pl-2">
                                                                <span className="text-2xl font-bold">
                                                                    {`${formData.fullname} `}
                                                                </span>
                                                                <br />
                                                                <span className="text-md">{formData.contact_email}</span>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="flex items-center justify-end dark:bg-[#121c2c]">
                                                <button
                                                    onClick={() => {
                                                        onClose(false);
                                                    }}
                                                    type="button"
                                                    className="text-white-dark hover:text-dark "
                                                >
                                                    <IconX className="w-15" />
                                                </button>
                                            </div>
                                                    {/* <div className="ml-auto">
                                                        <button
                                                            className="bg-blue-500 hover:bg-blue-700 mr-4 text-white font-bold py-2 px-4 rounded-full flex items-center"
                                                            style={{ backgroundColor: 'black' }}
                                                            onClick={() => handleSaveAsContact(formData)}
                                                        >
                                                            <Image
                                                                src={Export}
                                                                alt="Export"
                                                                width={15}
                                                                height={15}
                                                                className="mr-2"
                                                                style={{ cursor: 'pointer', filter: 'invert(1)' }}
                                                            />
                                                            <span>Export Contact</span>
                                                        </button>
                                                    </div>
                                                    <div>
                                                        <Image src={More} width={5} height={5} alt="more" />
                                                    </div> */}
                                                   
                                                </>
                                            )}
                                        </div>
                                            
                                            
                                           
                                            <div className=" m-5">
                                                {/* <div className="flex w-full items-center justify-between border-b-2 bg-white p-2">
                                                    <div className="flex items-center justify-center">
                                                        <Image src={ProfileIcon} width={50} height={50} alt="profileicon" className="ml-2" />
                                                        <span className="ml-2 text-2xl font-medium">{formData.fullname}</span>
                                                    </div>
                                                    <div>
                                                        <Image src={More} width={5} height={5} alt="more" />
                                                    </div>
                                                </div> */}
                                                {formData && (
                                                    <form onSubmit={handleSubmit} className="mb-5 bg-white p-4 dark:border-[#191e3a] dark:bg-black">
                                                        <h6 className="mb-10 text-lg  font-bold">Edit Contact Information</h6>

                                                        <div className="flex flex-col sm:flex-row">
                                                            
                                                        <div className="mb-5 w-full sm:w-3/12 ltr:sm:mr-4 rtl:sm:ml-4">
                                                            <div className=''>
                                                            <h6 className="mb-5 text-base font-bold">Profile</h6>

<Image src={ProfileIcon} width={200} height={200} alt="profileicon" />
                                                            </div>
                                                        
                                                            </div>
                                                        <div className="grid flex-1 grid-cols-1 gap-8 sm:grid-cols-2">
                                                                <div>
                                                                    <label htmlFor="name">Full Name</label>
                                                                    <input
                                                                        id="name"
                                                                        name="fullname"
                                                                        type="text"
                                                                        placeholder="Full Name"
                                                                        className="form-input"
                                                                        value={formData.fullname}
                                                                        onChange={handleChange}
                                                                    />
                                                                </div>
                                                                <div>
                                                                    <label htmlFor="jobTitle">Job Title</label>
                                                                    <input
                                                                        id="jobTitle"
                                                                        name="contact_jobtitle"
                                                                        type="text"
                                                                        placeholder="Job Title"
                                                                        className="form-input"
                                                                        value={formData.contact_jobtitle}
                                                                        onChange={handleChange}
                                                                    />
                                                                </div>
                                                                <div>
                                                                    <label htmlFor="phoneNumber">Phone Number</label>
                                                                    <input
                                                                        id="phoneNumber"
                                                                        name="contact_phonenumber"
                                                                        type="text"
                                                                        placeholder="Phone Number"
                                                                        className="form-input"
                                                                        value={formData.contact_phonenumber}
                                                                        onChange={handleChange}
                                                                    />
                                                                </div>
                                                                <div>
                                                                    <label htmlFor="email">Email</label>
                                                                    <input
                                                                        id="contact_email"
                                                                        name="contact_email"
                                                                        type="email"
                                                                        placeholder="Email"
                                                                        className="form-input"
                                                                        value={formData.contact_email}
                                                                        onChange={handleChange}
                                                                    />
                                                                </div>
                                                                <div>
                                                                    <label htmlFor="company">Company</label>
                                                                    <input
                                                                        id="company"
                                                                        name="company"
                                                                        type="text"
                                                                        placeholder="Company"
                                                                        className="form-input"
                                                                        value={formData.company}
                                                                        onChange={handleChange}
                                                                    />
                                                                </div>
                                                                <div>
                                                                    <label htmlFor="website">Website</label>
                                                                    <input
                                                                        id="website"
                                                                        name="website"
                                                                        type="text"
                                                                        placeholder="Website"
                                                                        className="form-input"
                                                                        value={formData.website}
                                                                        onChange={handleChange}
                                                                    />
                                                                </div>
                                                            </div>
                                                           
                                                            
                                                        </div>
                                                        <div className="mt-10 flex items-center justify-end gap-14">
                                                            <button type="button" className="underline underline-offset-4" onClick={() => onClose(false)}>
                                                                Cancel
                                                            </button>
                                                            <button type="submit" className="btn btn-primary h-[40px] w-[130px]">
                                                                Update
                                                            </button>
                                                        </div>
                                                    </form>
                                                )}
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

export default EditContact;
