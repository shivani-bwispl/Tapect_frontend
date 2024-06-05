// /* eslint-disable @next/next/no-img-element */
// import React, { useState } from 'react';
// import axiosInstance from '../services/api';
// import router from 'next/dist/client/router';


// const SocialContent = ({ socialName, image, onClose, onNewItem, handleBackClick, isCustom ,onUpdateItem,Social,formData,DeleteEle,SelectedSocialItem}) => {
//     let displayName = socialName;
//     if (image) {
//         displayName += ' username';
//     }
    
//     const [item, setItem] = useState('');
//     const [link, setLink] = useState('');
//     const [label, setLabel] = useState('');
//     const [error, setError] = useState('');
//     const [file, setFile] = useState(null);
//     const [fileError, setFileError] = useState('');
//     const [filePath, setFilePath] = useState('');

//     // const handleUpload = async (e) => {

//     //     const selectedFile = e.target.files[0];
    
//     //     if (!selectedFile) {
//     //         setFileError('Please select a file');
//     //         return;
//     //     }
    
//     //     try {
//     //         // Save file to local storage
//     //       const test=  localStorage.setItem('uploadedFile', JSON.stringify(selectedFile));
//     //       console.log(test,"hanuplo")
    
//     //         // Save file path in variable
//     //         setFilePath(selectedFile.name);
//     //         setFileError('');
    
//     //         // Call handleAction to process the uploaded file
//     //         await handleAction();
//     //     } catch (error) {
//     //         console.error('Error handling upload:', error);
//     //         setFileError('Error handling upload. Please try again.');
//     //     }
//     // };
    
   
//     const handleAction = async () => {


//         try {

//             // // Retrieve file from local storage
//             // const uploadedFile = localStorage.getItem('uploadedFile');
//             // if (!uploadedFile) {
//             //     throw new Error('Uploaded file not found in localStorage');
//             // }
//             // console.log(uploadedFile,"uploadedFile")
//             // if (!item || !link) {
//             //     setError('Both fields are required');
//             //     return;
//             // }


//             const userId = localStorage.getItem('userId');
//             if (!userId) {
//                 throw new Error('User ID not found in localStorage');
//             }

//             const requestData = {
//                 userId,
//                 linktitle: link,
//                 platform: socialName,
//                 username: '',
//                 wechat_number: '',
//                 profile_link: '',
//                 channel_link: '',
//                 server_link: '',
//                 telegram_link: '',
//                 socialMediaId: '',
//                 phone_number: '',
//                 contact_number: '',
//                 whatsapp_number: '',
//                 email_address: '',
//                 business_address: '',
//                 facetime: '',
//                 paypal_link: '',
//                 payment_username: '',
//                 spotify_link: '',
//                 apple_link: '',
//                 music_username: '',
//                 image: '',
//                 svg: '',
//                 url: '',
//                 custom_url: '',
//                 label: label,
//                 file:filePath,
//                 poshmark_username: '',
//                 mediakits_user: '',
//                 opensea_user: '',
//                 hoobe_user: '',
//                 linktree_user: '',
//                 icon: '',
//                 businessId: '',
//                 contactId: '',
//                 paymentId: '',
//                 musicId: '',
//                 MoreSocialId:'',
//                 customlinkId: '',
//             };

//             const platformFields = {
//                 // Add mappings for all supported platforms
//                 instagram: ['username'],
//                 linkedin: ['profile_link'],
//                 facebook: ['profile_link'],
//                 message: ['username'],
//                 email: ['username'],
//                 website: ['url'],
//                 paypal: ['paypal_link'],
//                 googlemap: ['url'],
//                 facetime: ['facetime'],
//                 whatsapp: ['whatsapp_number'],
//                 googlepay: ['payment_username'],
//                 youtube: ['channel_link'],
//                 twitter: ['username'],
//                 wechat: ['wechat_number'],
//                 threads: ['profile_link'],
//                 twitch: ['channel_link'],
//                 tiktok: ['username'],
//                 snapchat: ['username'],
//                 pinterest: ['username'],
//                 discord: ['server_link'],
//                 telegram: ['telegram_link'],
//                 clubhouse: ['username'],
//                 calendly: ['url'],
//                 reviews: ['contact_number'],
//                 etsy: ['url'],
//                 applestore: ['username'],
//                 chilipiper: ['url'],
//                 microsoftbooking: ['url'],
//                 booksy: ['url'],
//                 square: ['url'],
//                 zillow: ['username'],
//                 cashapp: ['payment_username'],
//                 venmo: ['payment_username'],
//                 zelle: ['payment_username'],
//                 spotify: ['spotify_link'],
//                 applemusic: ['apple_link'],
//                 soundcloud: ['music_username'],
//                 podcasts: ['music_username'],
//                 poshmark: ['poshmark_username'],
//                 mediakits: ['mediakits_user'],
//                 opensea: ['opensea_user'],
//                 hoobe: ['hoobe_user'],
//                 linktree: ['linktree_user'],
//                 file: ['label'],
//                 customlink: ['custom_url'],
//                 // Add mappings for other platforms as needed
//             };



//             if (platformFields.hasOwnProperty(socialName.toLowerCase())) {
//                 const fields = platformFields[socialName.toLowerCase()];
//                 fields.forEach((field) => {
//                     requestData[field] = item;
//                 });
//             }

//               // Log the file object
//              console.log('File Object:', filePath);
//              const auth = localStorage.getItem('token');


//              if (!auth || auth === "null") {
//                  // Display error message
//                  console.error('Token not found in localStorage');
//                  // Redirect to login page
//                  router.push('/Login');
//                  return;
//              }
 
//              const config = {
//                  headers: {
//                      'Authorization': `Bearer ${auth}`, // Set the authorization header properly
//                  },
//              };

//             const response = await axiosInstance.post('/SocialLinks/', requestData,config);
//             // console.log(filePath,"filepath")

//             // console.log(response, 'response');
//             // router.reload();

//             // Clear form state
//             setItem('');
//             setLink('');
//             setLabel('');
//             setError('');
//             setFileError('');
//             setFilePath('');

//             // Close modal or navigate back
//             onClose();
//             handleBackClick();
//         } catch (error) {
//             console.error('Error:', error.message);
//         }finally {
//             // Clear uploaded file data from local storage
//             localStorage.removeItem('uploadedFile');
//         }
//     };

//     return (
//         <div className="p-6">
//             <span className="text-[24px] tracking-wide"> Social Link</span>
//             <div className="m-4 flex items-center">
//                 <div className="flex items-center space-x-2">
//                 {/* // Use optional chaining to safely access image properties */}
// <img src={image?.path} alt={displayName} className="h-12 w-12" />

//                     {/* <img src={image.path} alt={displayName} className="h-12 w-12" /> */}
//                     <h1 className="text-lg font-medium capitalize">{image?.platform}</h1>
//                 </div>
//             </div>

//             {socialName === 'file' ? (
//                 <div>
//                     <div className="m-4">
//                         <h2 className="pb-2 text-sm font-normal">File Title*</h2>
//                         <input
//                             type="text"
//                             placeholder="File title"
//                             className="form-input h-[45px]"
//                             value={label}
//                             onChange={(event) => setLabel(event.target.value)}
//                         />
//                     </div>
//                     <div className="m-4">
//                         <h2 className="pb-2 text-sm font-normal">File*</h2>
//                         <label className="btn btn-primary mr-5 h-[40px] cursor-pointer text-base w-full">
//                             Upload File
//                             <span className="text-xs">(Max file size 1MB)</span>
//                              <input
//                                 id="file-upload"
//                                 type="file"
//                                 className="hidden"
//                                 accept=".pdf, .doc, .docx, .xls, .xlsx, .ppt, .pptx, image/*"
//                                 // onChange={handleUpload}
//                                 onChange={(event) => setItem(event.target.value)}

//                             />
//                         </label>
//                         {fileError && <p className="text-red-500">{fileError}</p>}
//                         {filePath && <p>File uploaded successfully. Path: {filePath}</p>}

//                     </div>
                   

//                 </div>
//             ) : (
//                 <div>
//                     <div className="m-4 space-y-2">
//                         {/* <h2 className="pb-2 text-sm font-normal sm:text-base">{displayName}</h2> */}
//                         <input
//                             type="text"
//                             placeholder={displayName}
//                             onChange={(event) => setItem(event.target.value)}
//                             value={item}
//                             className="form-input h-[45px] w-full"
//                             required
//                         />
//                         <h2 className="pb-2 text-sm font-normal sm:text-base">Link</h2>
//                         <input
//                             type="text"
//                             placeholder="Link"
//                             className="form-input h-[45px] w-full"
//                             required
//                             value={link}
//                             onChange={(e) => setLink(e.target.value)}
//                         />
//                     </div>
//                     {error && <p className="text-red-500">{error}</p>}
//                 </div>
//             )}

//             <div className="flex justify-end">
//                 <button type="button" className="mr-10 underline underline-offset-4" onClick={() => onClose(false)}>
//                     Cancel
//                 </button>
//                 <button type="button" className="btn btn-primary mx-4 h-[40px] w-[130px] transition duration-300 ease-in-out" onClick={handleAction}>
//                     Add Link
//                 </button>
//             </div>
//         </div>
//     );
// };

// export default SocialContent;

import React, { useState, useEffect } from 'react';
import axiosInstance from '../services/api';
import router from 'next/dist/client/router';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';

const MySwal = withReactContent(Swal);

const SocialContent = ({
  socialName,
  image,
  onClose,
  onNewItem,
  handleBackClick,
  isCustom,
  onUpdateItem,
  Social,
  formData,
  DeleteEle,
  SelectedSocialItem
}) => {
  let displayName = socialName;
  if (image) {
    displayName += ' username';
  }

  const [item, setItem] = useState('');
  const [link, setLink] = useState('');
  const [label, setLabel] = useState('');
  const [error, setError] = useState('');
  const [file, setFile] = useState(null);
  const [fileError, setFileError] = useState('');
  const [filePath, setFilePath] = useState('');
  const [inputType, setInputType] = useState('text');
  const [inputPlaceholder, setInputPlaceholder] = useState('');


  const showToast = () => {
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


  // useEffect(() => {
  //   // Function to set the input type and placeholder based on the platform name
  //   const setValidationAndInputType = () => {
  //     const phonePlatforms = ['wechat', 'whatsapp', 'reviews','facetime'];
      
  //     switch (socialName.toLowerCase()) {
  //       case 'email':
  //         setInputType('email');
  //         setInputPlaceholder('Enter your email');
  //         break;
  //       case 'url':
  //       case 'website':
  //         setInputType('url');
  //         setInputPlaceholder('Enter your website URL');
  //         break;
  //       case 'file':
  //         setInputType('file');
  //         setInputPlaceholder('Upload your file');
  //         break;
  //       default:
  //         if (phonePlatforms.includes(socialName.toLowerCase())) {
  //           setInputType('tel');
  //           setInputPlaceholder('Enter your phone number');
  //         } else {
  //           setInputType('text');
  //           setInputPlaceholder(`Enter your ${socialName} username`);
  //         }
  //         break;
  //     }
  //   };

  //   setValidationAndInputType();
  // }, [socialName]);

  useEffect(() => {
    // Load existing item data if updating
    if (SelectedSocialItem) {
      setItem(SelectedSocialItem.item);
      setLink(SelectedSocialItem.link);
      setLabel(SelectedSocialItem.label);
      setFile(SelectedSocialItem.file);
      setFilePath(SelectedSocialItem.file);

    }
  }, [SelectedSocialItem]);

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

    setFile(selectedFile); // Set the file object itself
    setFilePath(selectedFile.name); // Set the file name in filePath state
    setFileError('');
  };

  const handleAction = async (e) => {
    e.preventDefault(); // Prevent default form submission behavior

    try {
      const userId = localStorage.getItem('userId');
      if (!userId) {
        throw new Error('User ID not found in localStorage');
      }

      const requestData = {
        userId,
        linktitle: link,
        platform: socialName,
        username: '',
        wechat_number: '',
        profile_link: '',
        channel_link: '',
        server_link: '',
        telegram_link: '',
        socialMediaId: '',
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
        file: '',
        poshmark_username: '',
        mediakits_user: '',
        opensea_user: '',
        hoobe_user: '',
        linktree_user: '',
        icon: '',
        businessId: '',
        contactId: '',
        paymentId: '',
        musicId: '',
        MoreSocialId: '',
        customlinkId: '',
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

      if (socialName.toLowerCase() === 'file') {
        requestData['file'] = file || SelectedSocialItem.file;
      } else if (platformFields.hasOwnProperty(socialName.toLowerCase())) {
        const fields = platformFields[socialName.toLowerCase()];
        fields.forEach((field) => {
          requestData[field] = item;
        });
      }

      const auth = localStorage.getItem('token');

      if (!auth || auth === "null") {
        console.error('Token not found in localStorage');
        router.push('/Login');
        return;
      }

      const config = {
        headers: {
          'Authorization': `Bearer ${auth}`,
        },
      };

      const formData = new FormData();
      for (const key in requestData) {
        formData.append(key, requestData[key]);
      }
      const response = await axiosInstance.post('/SocialLinks/', formData, config);
      // console.log(response.data.file, "response"); // Log the file path in the response
      showToast();

      setItem('');
      setLink('');
      setLabel('');
      setError('');
      setFileError('');
      setFile('');
      setFilePath('');

      onClose();
      handleBackClick();
    } catch (error) {
      console.error('Error:', error.message);
    } finally {
      localStorage.removeItem('uploadedFile');
    }
  };

  return (
    <div className="p-6">
      <span className="text-[24px] tracking-wide"> Social Link</span>
      <div className="m-4 flex items-center">
        <div className="flex items-center space-x-2">
          <img src={image?.path} alt={displayName} className="h-12 w-12" />
          <h1 className="text-lg font-medium capitalize">{image?.platform}</h1>
        </div>
      </div>

      {socialName === 'file' ? (
        <div>
          <div className="m-4">
            <h2 className="pb-2 text-sm font-normal">File Title*</h2>
            <input
              type="text"
              placeholder="File title"
              className="form-input h-[45px]"
              value={label}
              onChange={(event) => setLabel(event.target.value)}
            />
          </div>
          <div className="m-4">
            <h2 className="pb-2 text-sm font-normal">File*</h2>
            <label className="btn btn-primary mr-5 h-[40px] cursor-pointer text-base w-full">
              Upload File
              <span className="text-xs">(Max file size 1MB)</span>
              <input
                id="file-upload"
                type="file"
                className="hidden"
                accept=".pdf, .doc, .docx, .xls, .xlsx, .ppt, .pptx, image/*"
                onChange={handleFileChange}
              />
            </label>
            {fileError && <p className="text-red-500">{fileError}</p>}
            {filePath && <p>File uploaded successfully. Path: {filePath}</p>}
          </div>
        </div>
      ) : (
        <div>
          <div className="m-4 space-y-2">
            <input
              type={inputType}
              placeholder={displayName}
              onChange={(event) => setItem(event.target.value)}
              value={item}
              className="form-input h-[45px] w-full"
              required
            />
            <h2 className="pb-2 text-sm font-normal sm:text-base">Link</h2>
            <input
              type="text"
              placeholder="Link"
              className="form-input h-[45px] w-full"
              required
              value={link}
              onChange={(e) => setLink(e.target.value)}
            />
          </div>
          {error && <p className="text-red-500">{error}</p>}
        </div>
      )}

      <div className="flex justify-end">
        <button type="button" className="mr-10 underline underline-offset-4" onClick={() => onClose(false)}>
          Cancel
        </button>
        <button type="button" className="btn btn-primary mx-4 h-[40px] w-[130px] transition duration-300 ease-in-out" onClick={handleAction}>
          Add Link
        </button>
      </div>
    </div>
  );
};

export default SocialContent;