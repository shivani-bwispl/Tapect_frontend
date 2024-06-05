/* eslint-disable react-hooks/rules-of-hooks */
// /* eslint-disable react/jsx-key */
// // /* eslint-disable react/jsx-key */
// import React, { useEffect, useState } from 'react';
// import { useTable, useSortBy, usePagination, useRowSelect, useGlobalFilter } from 'react-table';
// import More from '../public/assets/images/icons/More.svg';
// import Export from '../public/assets/images/icons/Export.svg';
// import Image from 'next/image';
// import { FaSearch } from 'react-icons/fa'; // Assuming you're using React Icons

// import Dropdown from '../components/Dropdown';
// import EditContact from './EditContact';
// import axiosInstance from '@/services/api';
// import { useRouter } from 'next/dist/client/router';

// const Contact = () => {
//     const router = useRouter();
//     const [contactData, setContactData] = useState([]);
//     const [selectedOption, setSelectedOption] = useState([]);
//     const [activeRow, setActiveRow] = useState(null); // Track the active row
//     const [ModalOpen, setModalOpen] = useState(false);
//     const [selectedContactId, setSelectedContactId] = useState(null);
//     const [selectedRows, setSelectedRows] = useState([]);

//     const openModal = (contactId) => {
//         setSelectedContactId(contactId === activeRow ? null : contactId);
//         setModalOpen(true);
//     };

//     const closeModal = () => {
//         setModalOpen(false);
//     };

//     useEffect(() => {
//         const fetchContactData = async () => {
//             try {
//                 const userId = localStorage.getItem('userId');
//                 if (!userId) {
//                     throw new Error('User ID not found in localStorage');
//                 }
//                 const auth = localStorage.getItem('token');

//                 if (!auth || auth === "null") {
//                     // Display error message
//                     console.error('Token not found in localStorage');
//                     // Redirect to login page
//                     router.push('/Login');
//                     return;
//                 }

//                 const config = {
//                     headers: {
//                         'Authorization': `Bearer ${auth}`, // Set the authorization header properly
//                     },
//                 };
//                 const response = await axiosInstance.get(`/contact_details/${userId}`, config);
//                 // Format the date before setting the state
//                 const formattedContactData = response.data.userContact.map((contact) => ({
//                     ...contact,
//                     created_at: new Date(contact.created_at).toISOString().slice(0, 10), // Format to yyyy-mm-dd
//                 }));
//                 // console.log(formattedContactData, 'contactId');

//                 setContactData(formattedContactData);
//             } catch (error) {
//                 console.error('Error fetching contact data:', error);
//             }
//         };
//         fetchContactData();
//     }, []);

//     const handleContactClick = (event, contact) => {
//         // Check if the target element is the checkbox
//         if (event.target.type !== 'checkbox') {
//             const encodedContact = btoa(JSON.stringify(contact)); // Encode contact details
//             router.push({
//                 pathname: `/contact/${contact._id}`,
//                 query: { data: encodedContact }, // Pass encoded contact data in the query
//             });
//         }
//     };

//     const handleMoreClick = (event, contactId) => {
//         event.stopPropagation(); // Prevent the row click event from triggering
//         // Set the active row
//         setActiveRow(contactId === activeRow ? null : contactId);
//         // Pass the contact ID to open the modal with the corresponding contact data
//         // openModal(contactId);
//     };

//     const removeContact = async (contactId) => {
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
//             const response = await axiosInstance.delete(`/contact_details/${contactId}`, config);
//             console.log(response.data, 'response.data');
//             return response.data; // Return the response data
//         } catch (error) {
//             throw new Error(`Error removing contact: ${error.message}`);
//         }
//     };

//     const handleRemoveContact = async (contactId) => {
//         try {
//             // Call removeContact function with contactId
//             await removeContact(contactId);
//             // Remove the contact from the state after successful deletion
//             setContactData(contactData.filter((contact) => contact._id !== contactId));
//         } catch (error) {
//             console.error('Error removing contact:', error);
//         }
//     };

//     // --------------------generate vcf file-----------------------

//     const generateVCF = (contact) => {
//         const vcard = `BEGIN:VCARD
// VERSION:3.0
// FN:${contact.fullname}
// ORG:${contact.company}
// TEL;TYPE=WORK,VOICE:${contact.contact_phonenumber}
// EMAIL;TYPE=PREF,INTERNET:${contact.contact_email}
// URL:${contact.website}
// END:VCARD`;

//         return vcard;
//     };

//     const saveAsContact = (contactData) => {
//         // Convert contact data to VCF format string
//         const vcfString = generateVCF(contactData);

//         // Create a blob with the VCF content
//         const blob = new Blob([vcfString], { type: 'text/vcard' });

//         // Create a URL for the blob
//         const url = URL.createObjectURL(blob);

//         // Create a link element
//         const link = document.createElement('a');
//         link.href = url;
//         link.setAttribute('download', 'contacts.vcf'); // Set filename

//         // Simulate click on the link to trigger download
//         document.body.appendChild(link);
//         link.click();

//         // Clean up
//         URL.revokeObjectURL(url);
//         document.body.removeChild(link);
//     };

//     const handleSaveAsContact = async (contactId) => {
//         try {
//             // Find the contact by ID in the contactData array
//             const contact = contactData.find((contact) => contact._id === contactId);
//             if (!contact) {
//                 throw new Error('Contact not found');
//             }
//             // If the contact is found, proceed with saving it as a VCF
//             saveAsContact(contact);
//         } catch (error) {
//             console.error('Error saving contact as VCF:', error);
//             // Handle the error here, such as displaying a notification to the user
//         }
//     };
    

//     const handleExportAsVCF = () => {
//         if (selectedRows.length === 0) {
//             // Display error message when no checkboxes are selected
//             alert('Please select contacts to export as VCF.');
//         } else {
//             try {
//                 selectedRows.forEach((row) => {
//                     const contact = row.original;
//                     const vcfString = generateVCF(contact); // Generate VCF string for each selected contact
//                     saveAsContact(contact); // Save VCF file with contact details
//                 });
//                 console.log('Exporting selected contacts as VCF:', selectedRows);

//                 // Console log the checked values
//                 selectedRows.forEach(row => {
//                     console.log('Checked value:', row.isSelected);
//                 });

//                 // Implement export logic here
//             } catch (error) {
//                 console.error('Error exporting contacts as VCF:', error);
//                 // Handle the error here, such as displaying a notification to the user
//             }
//         }
//     };

//     const columns = React.useMemo(
//         () => [
//             {
//                 id: 'selection',
//                 Header: ({ getToggleAllRowsSelectedProps }) => (
//                     <div style={{ display: 'flex', alignItems: 'center' }}>
//                         <input type="checkbox" {...getToggleAllRowsSelectedProps()} style={{ marginRight: '8px', verticalAlign: 'middle' }} />
//                     </div>
//                 ),
//                 Cell: ({ row }) => (
//                     <div style={{ display: 'flex', alignItems: 'center' }}>
//                         <input type="checkbox" {...row.getToggleRowSelectedProps()} style={{ marginRight: '8px', verticalAlign: 'middle' }} />
//                         {row.original.profileImageUrl ? ( // Check if profile image URL is available
//                             <img src={row.original.profileImageUrl} alt="profile" className="mx-auto h-10 w-10 rounded-full" /> // Display profile image
//                         ) : (
//                             <div className="ml-4 h-10 w-10 rounded-full flex items-center justify-center bg-gray-300 text-lightpurple">
//                                 {/* Display initials if profile image URL is not available */}
//                                 {`${row.original.fullname.charAt(0).toUpperCase()}${row.original.fullname.split(' ')[1] ? row.original.fullname.split(' ')[1].charAt(0).toUpperCase() : ''}`}
//                             </div>
//                         )}
//                     </div>
//                 ),
                
//                 // Cell: ({ row }) => (
//                 //     <div style={{ display: 'flex', alignItems: 'center' }}>
//                 //         <input type="checkbox" {...row.getToggleRowSelectedProps()} style={{ marginRight: '8px', verticalAlign: 'middle' }} />
//                 //         <Image src="../assets/images/icons/ProfileIcon.svg" alt="profile" className="mx-auto h-10 w-10 rounded-full" width={40} height={40} /> {/* Adjust width and height as needed */}
//                 //     </div>
//                 // ),
//             },

//             {
//                 Header: 'Full Name',
//                 accessor: 'fullname',
//             },
//             {
//                 Header: 'Connected with',
//                 accessor: 'connected_with',
//                 Cell: ({ row }) => <Image src="../assets/images/icons/ProfileIcon.svg" alt="connectedWith" className="mx-auto h-10 w-10 rounded-full" width={40} height={40} />
//             },
//             {
//                 Header: 'Date',
//                 accessor: 'created_at',
//             },
//             {
//                 Header: 'Export',
//                 accessor: 'Export',
//                 disableFilters: true,
//                 disableSortBy: true,
//                 Cell: ({ row }) => (
//                     <div className="flex items-center justify-center">
//                         <Image
//                             src={Export}
//                             alt="Export"
//                             width={15}
//                             height={15}
//                             onClick={() => handleSaveAsContact(row.original._id)}// Call handleSaveAsContact with the contactId
//                             style={{ cursor: 'pointer' }} // Add hand pointer cursor
//                         />
//                     </div>
//                 ),
//             },

//             {
//                 Header: '',
//                 accessor: 'more',
//                 disableFilters: true,
//                 disableSortBy: true,
//                 Cell: ({ row }) => (
//                     <div className="options-cell flex items-center justify-center" style={{ position: 'relative' }}>
//                         <button onClick={(e) => handleMoreClick(e, row.original.id)}>
//                             <Image src={More} alt="more" width={3} height={3}  className="cursor-pointer" />
//                         </button>
//                     {activeRow === row.original.id && (
                     
//                             <div className="absolute z-30 mb-5 w-fit min-w-[12vw] bg-white" style={{ position: 'absolute', top: '100%', right: '50%' }}>
//                                 <div className="flex flex-col rounded-md border border-white-light font-semibold dark:border-[#1B2E4B]">
//                                     <button
//                                         className="border-b border-white-light px-4 py-2.5 hover:bg-[#F5EFFF] dark:border-[#1B2E4B] dark:hover:bg-[#eee]/10"
//                                         onClick={(e) => handleContactClick(e, row.original)}
//                                     >
//                                         View Connection
//                                     </button>
//                                     <button
//                                         className="border-b border-white-light px-4 py-2.5 hover:bg-[#F5EFFF] dark:border-[#1B2E4B] dark:hover:bg-[#eee]/10"
//                                         onClick={() => openModal(row.original._id)}
//                                     >
//                                         Edit Connection
//                                     </button>
//                                     <button
//                                         className="border-b border-white-light px-4 py-2.5 hover:bg-[#F5EFFF] dark:border-[#1B2E4B] dark:hover:bg-[#eee]/10"
//                                         onClick={() => handleSaveAsContact(row.original._id)}
//                                     >
//                                         Save as Contact
//                                     </button>
//                                     <div>
//                                         <button
//                                             className="border-b border-white-light px-4 py-2.5 hover:bg-[#F5EFFF] dark:border-[#1B2E4B] dark:hover:bg-[#eee]/10"
//                                             onClick={() => handleRemoveContact(row.original._id)}
//                                         >
//                                             Remove
//                                         </button>
//                                     </div>
//                                 </div>
//                             </div>
//                         )}
//                     </div>
//                 ),
//             },
//         ],
//         [activeRow] // Update dependency array
//     );

//     const tableInstance = useTable(
//         {
//             columns,
//             data: contactData,
//             initialState: { pageSize: 10 },
//         },
//         useGlobalFilter, // Add useGlobalFilter hook
//         useSortBy,
//         usePagination,
//         useRowSelect // Add useRowSelect hook
//     );

//     const {
//         getTableProps,
//         getTableBodyProps,
//         headerGroups,
//         page,
//         prepareRow,
//         nextPage,
//         previousPage,
//         canPreviousPage,
//         canNextPage,
//         state: { pageIndex, globalFilter }, // Destructure globalFilter from state
//         pageCount,
//         gotoPage,
//         pageOptions,
//         pageSize,
//         setPageSize,
//         setGlobalFilter, // Destructure setGlobalFilter from tableInstance
//         selectedFlatRows, // Destructure selectedFlatRows from tableInstance
//     } = tableInstance;

//     useEffect(() => {
//         setSelectedRows(selectedFlatRows);
//     }, [selectedFlatRows]); // Update selectedRows when selectedFlatRows changes

//     return (
// <div className="overflow-y-auto mx-5 mt-5 py-3 " style={{  maxHeight: 'calc(100vh - 5rem)',padding:'0', borderRadius: '0.5rem' }}>
//            <div className="flex items-center mb-5 justify-end"> {/* Add justify-end to align items to the right */}
//            <button className="btn !mt-6 border-0 bg-primary capitalize text-white" onClick={handleExportAsVCF}>Export Selected as VCF</button>

//     <div className="relative ml-4 mt-5 "> {/* Add ml-4 margin-left for spacing */}
//         <input
//             type="text"
//             className="p-2 pl-10 border border-gray-300 rounded-md" // Add padding-left for icon
//             value={globalFilter || ''}
//             onChange={(e) => setGlobalFilter(e.target.value)} // Set global filter value
//             placeholder="Search Contacts..."
//         />
//         <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" /> {/* Search icon */}
//     </div>
// </div>

// <table {...getTableProps()} className="min-w-full border-separate" style={{ borderSpacing: '0 10px' }}>
//                 <thead className="">
//                     {headerGroups.map(headerGroup => (
//                         <tr {...headerGroup.getHeaderGroupProps()}>
//                             {headerGroup.headers.map((column, index) => (
//                                 // eslint-disable-next-line react/jsx-key
//                                 <th {...column.getHeaderProps(column.getSortByToggleProps())}>
//                                     {column.render('Header')}
//                                     {(index !== 0 && index !== 4 && index !== headerGroup.headers.length - 1) && (
//                                         <>
//                                             {column.isSorted ? (
//                                                 column.isSortedDesc ? (
//                                                     <span style={{ fontSize: '20px', fontWeight: 'bold', marginLeft: '4px' }}>↓</span>
//                                                 ) : (
//                                                     <span style={{ fontSize: '20px', fontWeight: 'bold', marginLeft: '4px' }}>↑</span>
//                                                 )
//                                             ) : (
//                                                 <span style={{ fontSize: '20px', fontWeight: 'bold', marginLeft: '4px', color: 'gray' }}>↑</span>
//                                             )}
//                                         </>
//                                     )}
//                                 </th>
//                             ))}
//                         </tr>
//                     ))}
//                 </thead>

//                 <tbody {...getTableBodyProps()}>
//                     {page.map((row, index) => {
//                         prepareRow(row);
//                         return (
//                             <tr {...row.getRowProps()} className="">
//                             {row.cells.map((cell, index) => (
//                               <><td
//                                     {...cell.getCellProps(index)}
//                                     className={`px-6 py-4 
//                                 ${index === 0 ? 'rounded-tl-lg rounded-bl-lg' : ''} 
//     ${index === row.cells.length - 1 ? 'rounded-tr-lg rounded-br-lg' : ''}`}
//                                 >
//                                     {cell.render('Cell')}
                                    

//                                 </td></>
//                             ))}
//                           </tr>
//                         );
//                     })}


                    
//                 </tbody>

//                 {/* <tbody {...getTableBodyProps()}>
//                         {page.map((row, i) => {
//                             prepareRow(row);
//                             return (
//                                 <tr
//                                 {...row.getRowProps()}
//                                 onClick={(event) => handleContactClick(event, row.original)}
//                               >
//                                 {/* {row.cells.map((cell) => (
//                                   <><td {...cell.getCellProps()} className="px-6 py-4 border-b-2">
//                                         {cell.render('Cell')}
//                                     </td></>
//                                 ))} 
                                
//                                 {row.cells.map((cell) => (
//                                     <td {...cell.getCellProps()} className="px-6 py-4 border-b-2 border-gray-200">
//                                         {cell.render('Cell')}
//                                     </td>
//                                 ))}
//                               </tr>
                            
                            
                            
//                             );
//                         })}
//                     </tbody> */}
//             </table>
//             <div className="btn-container px-5">
//                 <button disabled={pageIndex === 0} onClick={() => gotoPage(0)}>
//                     First
//                 </button>
//                 <button disabled={!canPreviousPage} onClick={previousPage}>
//                     Prev
//                 </button>
//                 <span>
//                     {pageIndex + 1} of {pageCount}
//                 </span>
//                 <button disabled={!canNextPage} onClick={nextPage}>
//                     Next
//                 </button>
//                 <button disabled={pageIndex >= pageCount - 1} onClick={() => gotoPage(pageCount - 1)}>
//                     {' '}
//                     last
//                 </button>
//             </div>
//             <EditContact isOpen={ModalOpen} onClose={closeModal} contactId={selectedContactId}></EditContact>
//         </div>

        
//     );
// };

// export default Contact;

/* eslint-disable react/jsx-key */
// /* eslint-disable react/jsx-key */
import React, { useEffect, useState } from 'react';
import { useTable, useSortBy, usePagination, useRowSelect, useGlobalFilter } from 'react-table';
import More from '../public/assets/images/icons/More.svg';
import Export from '../public/assets/images/icons/Export.svg';
import Image from 'next/image';
import { FaSearch } from 'react-icons/fa'; // Assuming you're using React Icons

import Dropdown from '../components/Dropdown';
import EditContact from './EditContact';
import axiosInstance from '@/services/api';
import { useRouter } from 'next/dist/client/router';

const Contact = () => {
    const router = useRouter();
    const [contactData, setContactData] = useState([]);
    const [selectedOption, setSelectedOption] = useState([]);
    const [activeRow, setActiveRow] = useState(null); // Track the active row
    const [ModalOpen, setModalOpen] = useState(false);
    const [selectedContactId, setSelectedContactId] = useState(null);
    const [selectedRows, setSelectedRows] = useState([]);

   
    const fetchContactData = async () => {
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
            const response = await axiosInstance.get(`/contact_details/${userId}`, config);
            // Format the date before setting the state
            const formattedContactData = response.data.userContact.map((contact) => ({
                ...contact,
                created_at: new Date(contact.created_at).toISOString().slice(0, 10), // Format to yyyy-mm-dd
            }));
            // console.log(formattedContactData, 'contactId');

            setContactData(formattedContactData);
        } catch (error) {
            console.error('Error fetching contact data:', error);
        }
    };
    useEffect(() => {
     
        fetchContactData();
    }, []);

    if (!contactData) {
        return <div>Loading...</div>;
    }


    const openModal = (contactId) => {
        setSelectedContactId(contactId);
        setModalOpen(true);
    };
    
    // const openModal = (contactId) => {
    //     setSelectedContactId(contactId === activeRow ? null : contactId);
    //     setModalOpen(true);
    // };

    const closeModal = () => {
        setModalOpen(false);
        fetchContactData(); // Fetch the contact data after closing the modal

    };
    const handleContactClick = (event, contact) => {
        // Check if the target element is the checkbox
        if (event.target.type !== 'checkbox') {
            const encodedContact = btoa(JSON.stringify(contact)); // Encode contact details
            router.push({
                pathname: `/contact/${contact._id}`,
                query: { data: encodedContact }, // Pass encoded contact data in the query
            });
        }
    };


    const handleMoreClick = (event, contactId) => {
        event.stopPropagation(); // Prevent the row click event from triggering
        // Set the active row
        setActiveRow(contactId === activeRow ? null : contactId);
        // Pass the contact ID to open the modal with the corresponding contact data
        // openModal(contactId);
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
            return response.data; // Return the response data
        } catch (error) {
            throw new Error(`Error removing contact: ${error.message}`);
        }
    };

    const handleRemoveContact = async (contactId) => {
        try {
            // Call removeContact function with contactId
            await removeContact(contactId);
            // Remove the contact from the state after successful deletion
            setContactData(contactData.filter((contact) => contact._id !== contactId));
        } catch (error) {
            console.error('Error removing contact:', error);
        }
    };

    // --------------------generate vcf file-----------------------

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
        // Convert contact data to VCF format string
        const vcfString = generateVCF(contactData);

        // Create a blob with the VCF content
        const blob = new Blob([vcfString], { type: 'text/vcard' });

        // Create a URL for the blob
        const url = URL.createObjectURL(blob);

        // Create a link element
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', 'contacts.vcf'); // Set filename

        // Simulate click on the link to trigger download
        document.body.appendChild(link);
        link.click();

        // Clean up
        URL.revokeObjectURL(url);
        document.body.removeChild(link);
    };

    const handleSaveAsContact = async (contactId) => {
        try {
            // Find the contact by ID in the contactData array
            const contact = contactData.find((contact) => contact._id === contactId);
            if (!contact) {
                throw new Error('Contact not found');
            }
            // If the contact is found, proceed with saving it as a VCF
            saveAsContact(contact);
        } catch (error) {
            console.error('Error saving contact as VCF:', error);
            // Handle the error here, such as displaying a notification to the user
        }
    };


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

    const getInitials = (fullname) => {
        const nameParts = fullname.split(' ');
        const initials = nameParts.map(part => part.charAt(0).toUpperCase()).join('');
        return initials;
      };
    
    const columns = React.useMemo(
        () => [
            {
                id: 'selection',
                Header: ({ getToggleAllRowsSelectedProps }) => (
                    <div style={{ display: 'flex', alignItems: 'center' }}>
                        <input type="checkbox" {...getToggleAllRowsSelectedProps()} style={{ marginRight: '8px', verticalAlign: 'middle' }} />
                    </div>
                ),
                Cell: ({ row }) => (
                    <><div style={{ display: 'flex', alignItems: 'center' }}>
                            <input type="checkbox" {...row.getToggleRowSelectedProps()} style={{ marginRight: '8px', verticalAlign: 'middle' }} />
                            {row.original.profileImageUrl ? (
                                <img src={row.original.profileImageUrl} alt="profile" className="mx-auto h-12 w-12 rounded-full" />
                            ) : (
                                <div className="ml-4 h-10 w-10 rounded-full flex items-center justify-center bg-gray-300 text-lightpurple">
                                    {getInitials(row.original.fullname)}
                                </div>
                            )}
                        </div></>
                ),

               
            },

            {
                Header: 'Full Name',
                accessor: 'fullname',
               // Customize sorting logic to consider only the first letter
            sortType: (a, b) => {
                const nameA = a.original.fullname.charAt(0).toUpperCase();
                const nameB = b.original.fullname.charAt(0).toUpperCase();
                if (nameA < nameB) {
                    return -1;
                }
                if (nameA > nameB) {
                    return 1;
                }
                return 0;
            },
            },
            {
                Header: 'Connected with',
                accessor: 'connected_with',
                Cell: ({ row }) => <Image src="../assets/images/icons/ProfileIcon.svg" alt="connectedWith" className="mx-auto h-10 w-10 rounded-full" width={40} height={40} />
            },
            {
                Header: 'Date',
                accessor: 'created_at',
            },
            {
                Header: 'Export',
                accessor: 'Export',
                disableFilters: true,
                disableSortBy: true,
                Cell: ({ row }) => (
                    <div className="flex items-center justify-center">
                        <Image
                            src={Export}
                            alt="Export"
                            width={15}
                            height={15}
                            onClick={() => handleSaveAsContact(row.original._id)}// Call handleSaveAsContact with the contactId
                            style={{ cursor: 'pointer' }} // Add hand pointer cursor
                        />
                    </div>
                ),
            },

            {
                Header: '',
                accessor: 'more',
                disableFilters: true,
                disableSortBy: true,
                Cell: ({ row }) => (
                    <div className="options-cell flex items-center justify-center" style={{ position: 'relative' }}>
                        <button onClick={(e) => handleMoreClick(e, row.original._id)}>
                            <Image src={More} alt="more" width={3} height={3} className="cursor-pointer" />
                        </button>
                        {activeRow === row.original._id && (

                            <div className="absolute z-30 mb-5 w-fit min-w-[12vw] bg-white" style={{ position: 'absolute', top: '100%', right: '50%' }}>
                                <div className="flex flex-col rounded-md border border-white-light font-semibold dark:border-[#1B2E4B]">
                                    <button
                                        className="border-b border-white-light px-4 py-2.5 hover:bg-[#F5EFFF] dark:border-[#1B2E4B] dark:hover:bg-[#eee]/10"
                                        onClick={(e) => handleContactClick(e, row.original)}
                                    >
                                        View Connection
                                    </button>
                                    <button
                                        className="border-b border-white-light px-4 py-2.5 hover:bg-[#F5EFFF] dark:border-[#1B2E4B] dark:hover:bg-[#eee]/10"
                                        onClick={() => openModal(row.original._id)}
                                    >
                                        Edit Connection
                                    </button>
                                    <button
                                        className="border-b border-white-light px-4 py-2.5 hover:bg-[#F5EFFF] dark:border-[#1B2E4B] dark:hover:bg-[#eee]/10"
                                        onClick={() => handleSaveAsContact(row.original._id)}
                                    >
                                        Save as Contact
                                    </button>
                                    <div>
                                        <button
                                            className="border-b border-white-light px-4 py-2.5 hover:bg-[#F5EFFF] dark:border-[#1B2E4B] dark:hover:bg-[#eee]/10"
                                            onClick={() => handleRemoveContact(row.original._id)}
                                        >
                                            Remove
                                        </button>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                ),
            },
        ],
        [activeRow] // Update dependency array
    );

    const tableInstance = useTable(
        {
            columns,
            data: contactData,
            initialState: { pageSize: 10 },
        },
        useGlobalFilter, // Add useGlobalFilter hook
        useSortBy,
        usePagination,
        useRowSelect // Add useRowSelect hook
    );

    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        page,
        prepareRow,
        nextPage,
        previousPage,
        canPreviousPage,
        canNextPage,
        state: { pageIndex, globalFilter }, // Destructure globalFilter from state
        pageCount,
        gotoPage,
        pageOptions,
        pageSize,
        setPageSize,
        setGlobalFilter, // Destructure setGlobalFilter from tableInstance
        selectedFlatRows, // Destructure selectedFlatRows from tableInstance
    } = tableInstance;

    useEffect(() => {
        setSelectedRows(selectedFlatRows);
    }, [selectedFlatRows]); // Update selectedRows when selectedFlatRows changes

    useEffect(() => {
        const handleOutsideClick = (event) => {
            if (event.target.closest('.options-cell')) {
                return;
            }
            setActiveRow(null);
        };

        document.addEventListener('click', handleOutsideClick);

        return () => {
            document.removeEventListener('click', handleOutsideClick);
        };
    }, []);

    return (
        <div className="overflow-y-auto mx-5 mt-5 py-3 " style={{ maxHeight: 'calc(100vh - 3rem)', padding: '0', borderRadius: '0.5rem' }}>
            <div className="flex items-center mb-5 justify-end"> {/* Add justify-end to align items to the right */}
                <button className="btn !mt-6 border-0 bg-primary capitalize text-white" onClick={handleExportAsVCF}>Export Selected as VCF</button>

                <div className="relative ml-4 mt-5 "> {/* Add ml-4 margin-left for spacing */}
                    <input
                        type="text"
                        className="p-2 pl-10 border border-gray-300 rounded-md" // Add padding-left for icon
                        value={globalFilter || ''}
                        onChange={(e) => setGlobalFilter(e.target.value)} // Set global filter value
                        placeholder="Search Contacts..."
                    />
                    <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" /> {/* Search icon */}
                </div>
            </div>

            <table {...getTableProps()} className="min-w-full border-separate" style={{ borderSpacing: '0 10px' }}>
                <thead className="">
                    {headerGroups.map(headerGroup => (
                        <tr {...headerGroup.getHeaderGroupProps()}>
                            {headerGroup.headers.map((column, index) => (
                                // eslint-disable-next-line react/jsx-key
                                <th {...column.getHeaderProps(column.getSortByToggleProps())}>
                                    {column.render('Header')}
                                    {(index !== 0 && index !== 4 && index !== headerGroup.headers.length - 1) && (
                                        <>
                                            {column.isSorted ? (
                                                column.isSortedDesc ? (
                                                    <span style={{ fontSize: '20px', fontWeight: 'bold', marginLeft: '4px' }}>↓</span>
                                                ) : (
                                                    <span style={{ fontSize: '20px', fontWeight: 'bold', marginLeft: '4px' }}>↑</span>
                                                )
                                            ) : (
                                                <span style={{ fontSize: '20px', fontWeight: 'bold', marginLeft: '4px', color: 'gray' }}>↑</span>
                                            )}
                                        </>
                                    )}
                                </th>
                            ))}
                        </tr>
                    ))}
                </thead>

                <tbody {...getTableBodyProps()}>
                    {page.map((row, index) => {
                        prepareRow(row);
                        return (
                            <tr {...row.getRowProps()} className="">
                                {row.cells.map((cell, index) => (
                                    <><td
                                        {...cell.getCellProps(index)}
                                        className={`px-6 py-4 
                                ${index === 0 ? 'rounded-tl-lg rounded-bl-lg' : ''} 
    ${index === row.cells.length - 1 ? 'rounded-tr-lg rounded-br-lg' : ''}`}
                                    >
                                        {cell.render('Cell')}


                                    </td></>
                                ))}
                            </tr>
                        );
                    })}



                </tbody>

                {/* <tbody {...getTableBodyProps()}>
                        {page.map((row, i) => {
                            prepareRow(row);
                            return (
                                <tr
                                {...row.getRowProps()}
                                onClick={(event) => handleContactClick(event, row.original)}
                              >
                                {/* {row.cells.map((cell) => (
                                  <><td {...cell.getCellProps()} className="px-6 py-4 border-b-2">
                                        {cell.render('Cell')}
                                    </td></>
                                ))} 
                                
                                {row.cells.map((cell) => (
                                    <td {...cell.getCellProps()} className="px-6 py-4 border-b-2 border-gray-200">
                                        {cell.render('Cell')}
                                    </td>
                                ))}
                              </tr>
                            
                            
                            
                            );
                        })}
                    </tbody> */}
            </table>
            <div className="btn-container px-5">
            <button disabled={pageIndex === 0} onClick={() => gotoPage(0)}>
                First
            </button>
            <button disabled={!canPreviousPage} onClick={previousPage}>
                Prev
            </button>
            <span>
                {pageIndex + 1} of {pageCount}
            </span>
            <button disabled={!canNextPage} onClick={nextPage}>
                Next
            </button>
            <button disabled={pageIndex >= pageCount - 1} onClick={() => gotoPage(pageCount - 1)}>
                Last
            </button>
        </div>
            <EditContact isOpen={ModalOpen} onClose={closeModal} contactId={selectedContactId}></EditContact>
        </div>


    );
};

export default Contact;




