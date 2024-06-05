// import React, { useState, useEffect } from 'react';
// import Link from 'next/link';
// import { useRouter } from 'next/router';
// import Image from 'next/image';
// import tapect_logo from '/public/assets/images/tapect_logo.svg';
// import { useDispatch, useSelector } from 'react-redux';
// import { setPageTitle, toggleRTL } from '../store/themeConfigSlice';
// import BlankLayout from '@/components/Layouts/BlankLayout';
// import { useTranslation } from 'react-i18next';
// import axios from 'axios';
// import ErrorDisplay from '../components/ErrorDisplay';
// import Swal from 'sweetalert2';
// import withReactContent from 'sweetalert2-react-content';
// import { IRootState } from '@/store';

// const ResetPassword = () => {
//     const [password, setPassword] = useState('');
//     const [confirmPassword, setConfirmPassword] = useState('');
//     const [isPasswordReset, setIsPasswordReset] = useState(false);
//     const [error, setError] = useState('');
//     const dispatch = useDispatch();
//     const router = useRouter();
//     const MySwal = withReactContent(Swal);

//     const showToast = () => {
//         MySwal.fire({
//             title: 'Reset password successfully',
//             toast: true,
//             position: 'top',
//             showConfirmButton: false,
//             timer: 3000,
//             background: '#4CAF50',
//             showCloseButton: true,
//         });
//     };

//     useEffect(() => {
//         dispatch(setPageTitle('Reset '));
//         localStorage.removeItem('isLoggedIn');
//     }, [dispatch, router]);

//     const handleSubmit = async (e: any) => {
//         e.preventDefault();

//         if (password !== confirmPassword) {
//             setError('Passwords do not match');
//             return;
//         }

//         try {
//             // Make API call to reset password
//             const response = await axios.post('http://localhost:3001/api/resetPassword/', {
//                 email: 'email', // Replace with user's email
//                 resetToken: 'user.resetToken', // Replace with reset token received from email
//                 newPassword: password,
//             });

//             // If the request is successful, show success message
//             if (response.status === 200) {
//                 setIsPasswordReset(true);
//             }
//         } catch (error: any) {
//             if (error.response) {
//                 setError(error.response.data.message);
//             } else {
//                 showToast();
//                 setError('Failed to reset password. Please try again later.');
//             }
//             console.error('Error resetting password:', error);
//         }
//     };

//     const isRtl = useSelector((state: IRootState) => state.themeConfig.rtlClass) === 'rtl' ? true : false;

//     const themeConfig = useSelector((state: IRootState) => state.themeConfig);
//     const setLocale = (flag: string) => {
//         setFlag(flag);
//         if (flag.toLowerCase() === 'ae') {
//             dispatch(toggleRTL('rtl'));
//         } else {
//             dispatch(toggleRTL('ltr'));
//         }
//     };
//     const [flag, setFlag] = useState('');
//     useEffect(() => {
//         setLocale(localStorage.getItem('i18nextLng') || themeConfig.locale);
//     }, []);

//     return (
//         <div>
//             <div className="relative box-border flex h-screen min-w-max items-center  justify-center bg-white px-6 py-4 sm:px-10">
//                 <div className="relative w-full max-w-[900px] rounded-md">
//                     <div className="relative flex flex-col justify-center bg-white ">
//                         <div className="min-w-screen/30 mx-auto mt-10 flex  flex-col items-center justify-center">
//                             <a href="#">
//                                 <Image src={tapect_logo} width={110} height={110} alt="logo  " />
//                             </a>
//                             <div className="w-30px m-5 mb-10 text-center">
//                                 <h1 className="font-nunito  text-lg font-bold !leading-snug text-black">Reset Password </h1>
//                             </div>
//                             {isPasswordReset ? (
//                                 <div className="relative rounded border border-green-400 bg-green-100 px-4 py-3 text-green-700" role="alert">
//                                     <strong className="font-bold">Password Reset!</strong>
//                                     <span className="block sm:inline"> Your password has been successfully reset.</span>
//                                 </div>
//                             ) : (
//                                 <form className="min-w-screen/50 w-[400px]  space-y-3 rounded-lg border-2 border-solid border-white-light p-8 shadow-3xl dark:text-white" onSubmit={handleSubmit}>
//                                     {error && <ErrorDisplay message={error} />}
//                                     <div className="p-0.5">
//                                         <label htmlFor="Password" className="font-poppins font-medium text-dark">
//                                             New Password
//                                         </label>
//                                         <div className="relative text-white-dark">
//                                             <input id="Password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} className="form-input border-2  focus:border-primary" />

//                                             <span className="absolute start-4 top-1/2 -translate-y-1/2"></span>
//                                         </div>
//                                     </div>
//                                     <div className="p-0.5">
//                                         <label htmlFor="Password" className="font-poppins font-medium text-dark">
//                                             Confirm Password
//                                         </label>
//                                         <div className="relative text-white-dark">
//                                             <input
//                                                 id="Password"
//                                                 type="password"
//                                                 value={confirmPassword}
//                                                 onChange={(e) => setConfirmPassword(e.target.value)}
//                                                 className="form-input border-2  focus:border-primary"
//                                             />

//                                             <span className="absolute start-4 top-1/2 -translate-y-1/2"></span>
//                                         </div>
//                                     </div>

//                                     <button type="submit" className="btn !mt-6 w-full  bg-primary capitalize text-white " onClick={showToast}>
//                                         Reset Password
//                                     </button>

//                                     <div className="font-poppins  text-center text-gray  ">
//                                         Do not have a tapect account ?
//                                         <Link href="/SignUp" className=" ml-2   capitalize text-primary underline hover:text-black dark:hover:text-white">
//                                             Create Now
//                                         </Link>
//                                     </div>
//                                 </form>
//                             )}
//                             <div className=" w-inherit flex items-center justify-evenly space-x-10 p-6 text-sm">
//                                 <span className=" text-screen/1h text-gray">Help</span>
//                                 <span className=" text-screen/1h text-gray">Privacy Policy </span>
//                                 <span className=" text-screen/1h text-gray"> Terms </span>
//                             </div>
//                         </div>
//                     </div>
//                 </div>
//             </div>
//         </div>
//     );
// };
// ResetPassword.getLayout = (page: any) => {
//     return <BlankLayout>{page}</BlankLayout>;
// };
// export default ResetPassword;

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import tapect_logo from '/public/assets/images/tapect_logo.svg';
import axios from 'axios';
import ErrorDisplay from '../components/ErrorDisplay';
import BlankLayout from '@/components/Layouts/BlankLayout';
import { useRouter } from 'next/dist/client/router';

const ResetPassword = () => {
    const router = useRouter();
    const { token } = router.query; // Extract the token from the URL

    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [isPasswordReset, setIsPasswordReset] = useState(false);
    const [error, setError] = useState('');

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (password !== confirmPassword) {
            setError('Passwords do not match');
            return;
        }

        try {
            // Make API call to reset password
            const response = await axios.post(`http://localhost:3001/api/forgotPassword/${token}`, {
                email: 'email', // Replace with user's email
                // resetToken: 'user.resetToken', // Replace with reset token received from email
                newPassword: password,
            });
            console.log(response); // Log the response to the console

            // If the request is successful, set isPasswordReset to true
            if (response.status === 200) {
                setIsPasswordReset(true);
            }
        } catch (error) {
            if (error.response) {
                setError(error.response.data.message);
            } else {
                setError('Failed to reset password. Please try again later.');
            }
            console.error('Error resetting password:', error);
        }
    };

    return (
        <div>
            <div className="relative box-border flex h-screen min-w-max items-center justify-center bg-white px-6 py-4 sm:px-10">
                <div className="relative w-full max-w-[900px] rounded-md">
                    <div className="relative flex flex-col justify-center bg-white ">
                        <div className="min-w-screen/30 mx-auto mt-10 flex  flex-col items-center justify-center">
                            <a href="#">
                                <Image src={tapect_logo} width={110} height={110} alt="logo  " />
                            </a>
                            <div className="w-30px m-5 mb-10 text-center">
                                <h1 className="font-nunito  text-lg font-bold !leading-snug text-black">Reset Password </h1>
                            </div>
                            {isPasswordReset ? (
                                <div className="relative rounded border border-green-400 bg-green-100 px-4 py-3 text-green-700" role="alert">
                                    <strong className="font-bold">Password Reset!</strong>
                                    <span className="block sm:inline"> Your password has been successfully reset.</span>
                                </div>
                            ) : (
                                <form className="min-w-screen/50 w-[400px]  space-y-3 rounded-lg border-2 border-solid border-white-light p-8 shadow-3xl dark:text-white" onSubmit={handleSubmit}>
                                    {error && <ErrorDisplay message={error} />}
                                    <div className="p-0.5">
                                        <label htmlFor="Password" className="font-poppins font-medium text-dark">
                                            New Password
                                        </label>
                                        <div className="relative text-white-dark">
                                            <input id="Password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} className="form-input border-2  focus:border-primary" />
                                            <span className="absolute start-4 top-1/2 -translate-y-1/2"></span>
                                        </div>
                                    </div>
                                    <div className="p-0.5">
                                        <label htmlFor="Password" className="font-poppins font-medium text-dark">
                                            Confirm Password
                                        </label>
                                        <div className="relative text-white-dark">
                                            <input
                                                id="Password"
                                                type="password"
                                                value={confirmPassword}
                                                onChange={(e) => setConfirmPassword(e.target.value)}
                                                className="form-input border-2  focus:border-primary"
                                            />
                                            <span className="absolute start-4 top-1/2 -translate-y-1/2"></span>
                                        </div>
                                    </div>
                                    <button type="submit" className="btn !mt-6 w-full  bg-primary capitalize text-white ">
                                        Reset Password
                                    </button>
                                    <div className="font-poppins  text-center text-gray  ">
                                        Do not have a tapect account ?
                                        <Link href="/SignUp" className=" ml-2   capitalize text-primary underline hover:text-black dark:hover:text-white">
                                            Create Now
                                        </Link>
                                    </div>
                                </form>
                            )}
                            <div className=" w-inherit flex items-center justify-evenly space-x-10 p-6 text-sm">
                                <span className=" text-screen/1h text-gray">Help</span>
                                <span className=" text-screen/1h text-gray">Privacy Policy </span>
                                <span className=" text-screen/1h text-gray"> Terms </span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

ResetPassword.getLayout = (page: any) => {
    return <BlankLayout>{page}</BlankLayout>;
};

export default ResetPassword;
