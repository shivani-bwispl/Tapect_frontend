/* eslint-disable react/jsx-no-undef */
import { useRouter } from 'next/router';
import { Fragment, SetStateAction, useEffect, useState } from 'react';
import Image from 'next/image';
import ProfileIcon from '../../public/assets/images/icons/UserProfile_logo.svg';
import Delete from '../../public/assets/images/icons/Delete.svg';
import Download from '../../public/assets/images/icons/DOWNLOAD.svg';
import Email from '../../public/assets/images/icons/mail.svg';


import EditLink from '../../public/assets/images/icons/EditLink.svg';
import Export from '../../public/assets/images/icons/Export.svg';
import More from '../../public/assets/images/icons/More.svg';
import axiosInstance from '@/services/api';

const ContactDetailsPage = () => {
    const router = useRouter();
    const { contactId } = router.query;
    console.log(contactId, 'ediidcontactId');

    const [contactDetails, setContactDetails] = useState(null);
    const [loading, setLoading] = useState(true);


    // useEffect(() => {
    //     const fetchContactDetails = async () => {
    //         try {
    //             const response = await axiosInstance.get(`/contact_details/contactuser/${contactId}`);
    //             const ContactuserDetails = response.data.contact;
    //             setContactDetails(ContactuserDetails);
    //         } catch (error) {
    //             console.error('Error fetching contact details:', error);
    //         } finally {
    //             setLoading(false); // Update loading state regardless of success or failure
    //         }
    //     };

    //     // Fetch data only if contactId exists
    //     if (contactId) {
    //         fetchContactDetails();
    //     }
    // }, [contactId]);


    useEffect(() => {
        const fetchContactDetails = async () => {
            try {
                const response = await axiosInstance.get(`/contact_details/contactuser/${contactId}`);
                const ContactuserDetails = response.data.contact;
                setContactDetails(ContactuserDetails);
            } catch (error) {
                console.error('Error fetching contact details:', error);
                setContactDetails(null); // Set contactDetails to null on error
            } finally {
                setLoading(false); // Update loading state regardless of success or failure
            }
        };

        // Fetch data only if contactId exists
        if (contactId) {
            fetchContactDetails();
        }
    }, [contactId]);

    const handleExportAsVCF = () => {
        if (selectedRows.length === 0) {
            // Display error message when no checkboxes are selected
            alert('Please select contacts to export as VCF.');
        } else {
            try {
                selectedRows.forEach((row) => {
                    const contact = row.original;
                    const vcfString = generateVCF(contact); // Generate VCF string for each selected contact
                    saveAsContact(contact); // Save VCF file with contact details
                });
                console.log('Exporting selected contacts as VCF:', selectedRows);

                // Console log the checked values
                selectedRows.forEach(row => {
                    console.log('Checked value:', row.isSelected);
                });

                // Implement export logic here
            } catch (error) {
                console.error('Error exporting contacts as VCF:', error);
                // Handle the error here, such as displaying a notification to the user
            }
        }
    };
    const removeContact = async (contactId) => {
        try {
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
            const response = await axiosInstance.delete(`/contact_details/${contactId}`, config);

            console.log(response.data, 'response.data');
            showToast('success', `Contact info Delete Suceesfully`);
            router.push('/contact');


            return response.data; // Return the response data
        } catch (error) {
            showToast('error', 'Error removing contact');

            throw new Error(`Error removing contact: ${error.message}`);
        }
    };

    return (

        <>
            <div className="flex h-fit w-full cursor-pointer items-center justify-between  px-5 my-4 py-3">
                {contactDetails && (
                    <>
                        <div className="flex flex-col items-start justify-center gap-0">
                            <div className="flex items-center gap-2">
                                <Image src={ProfileIcon} width={60} height={60} alt="profileicon" className="ml-2" />
                                <div className='pl-2'>
                                    <span className="text-2xl font-bold">
                                        {`${contactDetails.fullname} `}
                                    </span><br></br>
                                    <span className="text-md">{contactDetails.contact_email}</span>
                                </div>
                            </div>
                        </div>
                        <div className="ml-auto"> {/* Align content to the right */}
                            {/* Your export button */}
                            <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full flex items-center" style={{ backgroundColor: 'black' }}>
                                <Image
                                    src={Export}
                                    alt="Export"
                                    width={15}
                                    height={15}
                                    onClick={() => handleSaveAsContact(contactDetails.id)} // Call handleSaveAsContact with the contactId
                                    className="mr-2" // Add margin-right for spacing between icon and text
                                    style={{ cursor: 'pointer', filter: 'invert(1)' }} // Add hand pointer cursor
                                />
                                <span>Export Contact</span>
                            </button>


                        </div>
                    </>
                )}
            </div>


            <div className='bg-white mt-10 p-4 mx-5 min-h-[80vh] rounded-2xl' style={{ display: 'grid', gridTemplateColumns: '75% 25%', maxHeight: 'calc(100vh - 2rem)' }}>
                {/* First column with 75% width */}
                <div style={{ width: '100%' }}>
                    {loading ? ( // Check loading state
                        <p>Loading...</p> // Render a loading message while data is being fetched
                    ) : contactDetails ? ( // Check if contactDetails is available
                        <div>

                            <div className=" w-full border-red-500 px-6 py-8">
                                <div className="grid w-full grid-cols-2 gap-0">
                                    <div className=" max-w-full rounded-md  px-4 py-5 sm:px-3 sm:py-5">
                                        <div className="flex flex-col space-y-1 px-2 ">
                                            <span>FullName</span>
                                            <span className="font-semibold pt-1">{contactDetails.fullname}</span>
                                        </div>
                                    </div>

                                    <div className=" max-w-full rounded-md  px-4 py-5 sm:px-3 sm:py-5">
                                        <div className="flex flex-col space-y-1  px-2  ">
                                            <span>Job Title</span>
                                            <span className="font-semibold pt-1">{contactDetails.contact_jobtitle}</span>
                                        </div>
                                    </div>

                                    <div className=" max-w-full rounded-md  px-4 py-5 sm:px-3 sm:py-5">
                                        <div className="flex flex-col space-y-1  px-2  ">
                                            <span> Company Name </span>
                                            <span className="font-semibold pt-1"> {contactDetails.company}</span>
                                        </div>
                                    </div>

                                    <div className=" max-w-full rounded-md  px-4 py-5 sm:px-3 sm:py-5">
                                        <div className="flex flex-col space-y-1  px-2  ">
                                            <span> Email </span>
                                            <span className="font-semibold pt-1"> {contactDetails.contact_email}</span>
                                        </div>
                                    </div>
                                    <div className=" max-w-full rounded-md  px-4 py-5 sm:px-3 sm:py-5">
                                        <div className="flex flex-col space-y-1  px-2  ">
                                            <span> Phone Number </span>
                                            <span className="font-semibold pt-1"> {contactDetails.contact_phonenumber}</span>
                                        </div>
                                    </div>
                                    <div className=" max-w-full rounded-md  px-4 py-5 sm:px-3 sm:py-5">
                                        <div className="flex flex-col space-y-1  px-2  ">
                                            <span> Website </span>
                                            <span className="font-semibold pt-1"> {contactDetails.website}</span>
                                        </div>
                                    </div>
                                    {/* Include similar blocks for other contact details */}
                                </div>
                            </div>
                        </div>
                    ) : (
                        <p>Contact details not found.</p> // Render a message if contactDetails is null
                    )}
                </div>

                {/* Second column with 25% width */}
                <div className="flex mt-10 w-full h-full">
  <div className="card-container absolute rounded-[25px] p-8 border border-[#f1f2f3] z-30 mb-5 w-fit min-w-[12vw] bg-white" style={{ height: '50vh', width: '300px'}}>
    <div className="flex flex-col items-center justify-center gap-0">
      {contactDetails && (
        <>
          <div className="flex flex-col items-center justify-center gap-0">
            <div className="gap-2">
              <Image src={ProfileIcon} width={180} height={180} alt="profileicon" className="ml-2 mb-6" />
              <div className='pl-2 text-center '>
                <span className="text-2xl font-bold">
                  {`${contactDetails.fullname} `}
                </span><br />
              </div>
            </div>
          </div>
        </>
      )}
    </div>
    <div className="flex flex-col mt-3 rounded-md font-semibold dark:border-[#1B2E4B]">
      {/* <div className='border-b border-gray'>
        <button
          className="px-4 py-2.5 w-full  hover:bg-[#F5EFFF] dark:border-[#1B2E4B] dark:hover:bg-[#eee]/10 flex items-center"
          onClick={(e) => handleContactClick(e, row.original)}
        >
                                  <Image src={Email} width={20} height={20} alt="Edit" className="mr-2" /> {/* Add margin-right for spacing between image and text *
Send Email
         
        </button>
      </div> */}
      <div className=''>
        <button className="px-4 py-2.5 w-full hover:text-primary flex items-center" onClick={() => openModal(row.original._id)}>
          <Image src={EditLink} width={20} height={20} alt="Edit" className="mr-2" /> {/* Add margin-right for spacing between image and text */}
          Edit Connection
        </button>
      </div>
      <div className='mt-2'>
        <button
        
          className="px-4 py-2.5 w-full hover:text-primary flex items-center"
          onClick={() => handleSaveAsContact(row.original._id)}
        >
                      <Image src={Download} width={20} height={20} alt="Edit" className="mr-2" /> {/* Add margin-right for spacing between image and text */}

          Save as Contact
        </button>
      </div>
      <div className='mt-2'>
        <button
          className="px-4 py-2.5 w-full hover:text-primary flex items-center"
          onClick={() => removeContact(contactId)}
        >
          <Image src={Delete} width={20} height={20} alt="Delete" className="mr-2" />
          Remove
        </button>
      </div>
    </div>
  </div>
</div>

            </div>



            {/* ------------------------------------------------------------------------------ */}
            {/* <div className="bg-white flex mx-4 mt-10  flex-col " style={{ maxHeight: 'calc(90vh - 2rem)', overflowY: 'scroll' }}>
                {loading ? ( // Check loading state
                    <p>Loading...</p> // Render a loading message while data is being fetched
                ) : contactDetails ? ( // Check if contactDetails is available
                    <div>
                        <div className="flex h-[80px] w-full items-center justify-between border-b-2 bg-white p-2">
                            <div className="  flex  items-center justify-center  ">
                                <Image src={ProfileIcon} width={50} height={50} alt="profileicon" className="ml-2" />
                                <span className="ml-2 text-2xl font-medium">{contactDetails.fullname}</span>
                            </div>
                            <div>
                                <Image src={More} width={4} height={4} alt="more" />
                            </div>
                        </div>
                        <div className=" w-full border-red-500 px-6 py-8">
                            <div className="grid w-full grid-cols-3 gap-8">
                                <div className="h-28 max-w-full rounded-md bg-[#f1f2f3] px-4 py-9 sm:px-3 sm:py-5">
                                    <div className="flex flex-col space-y-5 px-2 py-2">
                                        <span>FullName</span>
                                        <span className="font-semibold">{contactDetails.fullname}</span>
                                    </div>
                                </div>

                                <div className="h-28 max-w-full rounded-md bg-[#f1f2f3] px-4 py-9 sm:px-3 sm:py-5">
                                    <div className="flex flex-col space-y-5  px-2 py-2 ">
                                        <span>Job Title</span>
                                        <span className="font-semibold">{contactDetails.contact_jobtitle}</span>
                                    </div>
                                </div>

                                <div className="h-28 max-w-full rounded-md bg-[#f1f2f3] px-4 py-9 sm:px-3 sm:py-5">
                                    <div className="flex flex-col space-y-5  px-2 py-2 ">
                                        <span> Company Name </span>
                                        <span className="font-semibold"> {contactDetails.company}</span>
                                    </div>
                                </div>

                                <div className="h-28 max-w-full rounded-md bg-[#f1f2f3] px-4 py-9 sm:px-3 sm:py-5">
                                    <div className="flex flex-col space-y-5  px-2 py-2 ">
                                        <span> Email </span>
                                        <span className="font-semibold"> {contactDetails.contact_email}</span>
                                    </div>
                                </div>
                                <div className="h-28 max-w-full rounded-md bg-[#f1f2f3] px-4 py-9 sm:px-3 sm:py-5">
                                    <div className="flex flex-col space-y-5  px-2 py-2 ">
                                        <span> Phone Number </span>
                                        <span className="font-semibold"> {contactDetails.contact_phonenumber}</span>
                                    </div>
                                </div>
                                <div className="h-28 max-w-full rounded-md bg-[#f1f2f3] px-4 py-9 sm:px-3 sm:py-5">
                                    <div className="flex flex-col space-y-5  px-2 py-2 ">
                                        <span> Website </span>
                                        <span className="font-semibold"> {contactDetails.website}</span>
                                    </div>
                                </div>
                                {/* Include similar blocks for other contact details *
                            </div>
                        </div>
                    </div>
                ) : (
                    <p>Contact details not found.</p> // Render a message if contactDetails is null
                )}
            </div> */}
            </>
    );
};

export default ContactDetailsPage;

// // pages/contact/[id].js
// import { useRouter } from 'next/router';

// import Image from 'next/image';
// import ProfileIcon from '../../public/assets/images/icons/ProfileIcon.svg';
// import More from '../../public/assets/images/icons/More.svg';

// const ContactDetailsPage = () => {
//     // const router = useRouter();
//     // let { id,data, ...contactDetails } = router.query;

//     // console.log(contactDetails);

//     const router = useRouter();
//     const { contactId } = router.query; // Get the user ID from the router query parameter
//     const [contactDetails, setUserData] = useState(null);

//     useEffect(() => {
//         const fetchUserData = async () => {
//             try {
//                 // Fetch user data based on the provided user ID
//                 const response = await axios.get(`http://localhost:3001/api/contact_details/contactuser/${contactId}`);
//                 setUserData(response.data); // Set the fetched user data to state
//             } catch (error) {
//                 console.error('Error fetching user data:', error);
//             }
//         };

//         if (contactId) {
//             fetchUserData(); // Fetch user data when the user ID is available
//         }
//     }, [contactId]);

//     return (
//         <div className="panel flex min-h-screen w-full flex-col ">
//             {/* <h1>Contact Details</h1>
//             <p>Contact ID: {id}</p> */}
//             <div className="flex h-[80px] w-full items-center justify-between border-b-2 bg-white p-2">
//                 <div className="  flex  items-center justify-center  ">
//                     <Image src={ProfileIcon} width={50} height={50} alt="profileicon" className="ml-2"></Image>
//                     <span className="ml-2 text-2xl font-medium">{contactDetails.fullname} </span>
//                 </div>
//                 <div>
//                     <Image src={More} width={4} height={4} alt="more"></Image>
//                 </div>
//             </div>
//             <div className=" w-full border-red-500   px-6 py-8">
//                 <div className="grid w-full grid-cols-3 gap-8  ">
//                     <div className="h-28 max-w-full rounded-md bg-[#f1f2f3] px-4 py-9 sm:px-3 sm:py-5">
//                         <div className="flex flex-col space-y-5  px-2 py-2 ">
//                             <span> Name </span>
//                             <span> {contactDetails.fullname}</span>
//                         </div>
//                     </div>
//                     <div className="h-28 max-w-full rounded-md bg-[#f1f2f3] px-4 py-9 sm:px-3 sm:py-5">
//                         <div className="flex flex-col space-y-5  px-2 py-2 ">
//                             <span> Job title </span>
//                             <span> {contactDetails.contact_jobtitle}</span>
//                         </div>
//                     </div>
//                     <div className="h-28 max-w-full rounded-md bg-[#f1f2f3] px-4 py-9 sm:px-3 sm:py-5">
//                         <div className="flex flex-col space-y-5  px-2 py-2 ">
//                             <span> Company Name </span>
//                             <span> {contactDetails.company}</span>
//                         </div>
//                     </div>
//                     <div className="h-28 max-w-full rounded-md bg-[#f1f2f3] px-4 py-9 sm:px-3 sm:py-5">
//                         <div className="flex flex-col space-y-5  px-2 py-2 ">
//                             <span> Email </span>
//                             <span> {contactDetails.contact_email}</span>
//                         </div>
//                     </div>
//                     <div className="h-28 max-w-full rounded-md bg-[#f1f2f3] px-4 py-9 sm:px-3 sm:py-5">
//                         <div className="flex flex-col space-y-5  px-2 py-2 ">
//                             <span> Phone Number </span>
//                             <span> {contactDetails.contact_phonenumber}</span>
//                         </div>
//                     </div>
//                     <div className="h-28 max-w-full rounded-md bg-[#f1f2f3] px-4 py-9 sm:px-3 sm:py-5">
//                         <div className="flex flex-col space-y-5  px-2 py-2 ">
//                             <span> Website </span>
//                             <span> {contactDetails.website}</span>
//                         </div>
//                     </div>
//                 </div>
//             </div>
//         </div>
//     );
// };

// export default ContactDetailsPage;
