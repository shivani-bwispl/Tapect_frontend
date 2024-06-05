/* eslint-disable react/no-unescaped-entities */
'use client';
import Image from 'next/image';
import tapect_logo from '/public/assets/images/tapect_logo.svg';
import { useDispatch, useSelector } from 'react-redux';
import { IRootState } from '../store';
import { setPageTitle, toggleLocale, toggleRTL } from '../store/themeConfigSlice';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import BlankLayout from '@/components/Layouts/BlankLayout';
import { useTranslation } from 'react-i18next';
import Swal from 'sweetalert2';

import axiosInstance from '@/services/api';
import withReactContent from 'sweetalert2-react-content';
const MySwal = withReactContent(Swal);

// const LoginBoxed = () => {
const ForgotPassword = () => {
    const dispatch = useDispatch();
    const router = useRouter();

    const [email, setEmail] = useState('');
    console.log(email);

    useEffect(() => {
        dispatch(setPageTitle('Forgot Boxed'));
        localStorage.removeItem('isLoggedIn');
    }, [dispatch, router]);
    const [successMessage, setSuccessMessage] = useState('');


    
    const showToast = () => {
        MySwal.fire({
            title: 'Email send  successfully',
            toast: true,
            position: 'top',
            showConfirmButton: false,
            timer: 3000,
            background: '#4CAF50',
            showCloseButton: true,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        
            try {
                const response = await axiosInstance.post('/forgotpassword', { email });
                console.log('API response:', response); // Log the API response for debugging
                if (response.status === 200 && response.data.success && response.data.message) {
                    console.log('Password reset email sent successfully.');
                    setSuccessMessage('Password reset email sent successfully.');
                    // Clear email field after successful submission
                    setEmail('');
                } else {
                    console.log('Response indicates failure:', response);
                }
            } catch (error) {
                console.error('Error sending password reset email:', error);
                // Handle error
            }
    
        
        
    };
    console.log('successMessage:', successMessage);


    const isRtl = useSelector((state: IRootState) => state.themeConfig.rtlClass) === 'rtl' ? true : false;

    const themeConfig = useSelector((state: IRootState) => state.themeConfig);
    const setLocale = (flag: string) => {
        setFlag(flag);
        if (flag.toLowerCase() === 'ae') {
            dispatch(toggleRTL('rtl'));
        } else {
            dispatch(toggleRTL('ltr'));
        }
    };
    const [flag, setFlag] = useState('');
    useEffect(() => {
        setLocale(localStorage.getItem('i18nextLng') || themeConfig.locale);
    }, []);

    const { t, i18n } = useTranslation();

    return (
        <div>
            <div className="relative box-border flex h-screen min-w-max items-center  justify-center bg-white px-6 py-4 sm:px-10">
                <div className="relative w-full max-w-[900px] rounded-md">
                    <div className="relative flex flex-col justify-center bg-white ">
                        <div className="min-w-screen/30 mx-auto flex  flex-col items-center justify-center">
                            <div className="min-w-screen/30 mx-auto my-10 flex  flex-col items-center justify-center">
                                <Image src={tapect_logo} width={110} height={110} alt="logo  " />
                                <div className="w-30px m-5  text-center">
                                    <h1 className="text-lg  font-bold !leading-snug text-dark">Reset your Tapect password </h1>
                                </div>
                                <p className=" font-poppins text-screen/3h mb-3 h-[20px]   w-[30rem] text-center !leading-snug text-dark">
                                    Enter your email and we'll send you instructions on how to reset your password{' '}
                                </p>
                            </div>
                            {successMessage && (
                <div className="success-message">{successMessage}</div>
            )}
                            <form className="min-w-screen/50 w-[400px]  space-y-3 rounded-lg border-2 border-solid border-white-light p-9 shadow-3xl dark:text-white" onSubmit={handleSubmit}>
                                <div className="p-0.5">
                                    <label htmlFor="Email " className="font-poppins font-medium text-dark">
                                        Email address
                                    </label>
                                    <div className="relative  ">
                                        <input id="Email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} className="form-input border-2 ps-10 focus:border-btnColor-myColor" />
                                        <span className=" absolute start-4 top-1/2 -translate-y-1/2"></span>
                                    </div>
                                </div>
                                <button type="submit" className="btn !mt-6 w-full border-0 bg-primary uppercase text-white hover:bg-btnColor-myColor ">
                                    Continue
                                </button>
                                <div className="relative my-7 text-center md:mb-9"></div>
                            </form>

                            <div className=" w-inherit flex items-center justify-evenly space-x-10 p-8 text-sm">
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
ForgotPassword.getLayout = (page: any) => {
    return <BlankLayout>{page}</BlankLayout>;
};
export default ForgotPassword;
