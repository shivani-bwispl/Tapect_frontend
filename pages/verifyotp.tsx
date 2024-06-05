/* eslint-disable react/no-unescaped-entities */
import Image from 'next/image';
import { useDispatch, useSelector } from 'react-redux';

import { IRootState } from '../store';
import { setPageTitle, toggleRTL } from '../store/themeConfigSlice';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import tapect_logo from '/public/assets/images/tapect_logo.svg';
import BlankLayout from '@/components/Layouts/BlankLayout';
import { useTranslation } from 'react-i18next';
import toastUtils from '../services/toastUtils'; // Import the toast utility service
import axiosInstance from '@/services/api';

const VerifyOTP = () => {
    const [countdown, setCountdown] = useState(0);
    const [resendClicked, setResendClicked] = useState(false);
    const [resent, setResent] = useState(false);

    const handleResend = () => {
        // Reset the countdown and set the flag that resend is clicked
        setCountdown(14);
        setResendClicked(true);
        setResent(true); // Set the flag that OTP has been resent

        // Your logic to resend OTP goes here
    };

    useEffect(() => {
        let timer;
        if (resendClicked && countdown > 0) {
            // Start the countdown timer
            timer = setInterval(() => {
                setCountdown((prevCount) => prevCount - 1);
            }, 1000);
        } else if (countdown === 0) {
            // Reset the resend flag
            setResendClicked(false);
            setResent(false); // Reset the resent flag
        }

        return () => clearInterval(timer); // Cleanup the interval on unmount or changes
    }, [countdown, resendClicked]);

    const dispatch = useDispatch();
    const router = useRouter();
    const [otp, setOtp] = useState('');

    useEffect(() => {
        dispatch(setPageTitle('Verify OTP'));
        localStorage.removeItem('isLoggedIn');
    }, [dispatch, router]);

    const handleSubmit = async (e: any) => {
        e.preventDefault();

        try {
            const response = await axiosInstance.post('/otpVerify', { otp });

            if (response.status === 200 && response.data.success) {
                console.log('OTP verification successful.');
                toastUtils.success('OTP verification successful.');

                // Redirect to login page after a delay
                setTimeout(() => {
                    router.push('/Login');
                }, 2000);
            } else {
                console.error('OTP verification failed:', response.data.message);
                toastUtils.error('OTP verification failed. Please try again.');
            }
        } catch (error) {
            console.error('Error verifying OTP:', error);
        }
    };

    return (
        <div>
            <div className="relative box-border flex h-screen min-w-max items-center justify-center bg-white px-6 py-4 sm:px-10">
                <div className="relative w-full max-w-[900px] rounded-md">
                    <div className="relative flex flex-col justify-center bg-white">
                        <div className="min-w-screen/30 mx-auto flex flex-col items-center justify-center">
                            <Image src={tapect_logo} width={110} height={110} alt="logo " />
                            <div className="w-30px m-5 text-center">
                                <h1 className="text-lg font-bold !leading-snug text-dark">Reset your Tapect password</h1>
                            </div>
                            <form className="min-w-screen/50 w-[400px] space-y-3 rounded-lg border-2 border-solid border-white-light p-9 shadow-3xl dark:text-white" onSubmit={handleSubmit}>
                                <div className="mb-7">
                                    {resent ? (
                                        <span>We have resended a verification on (User’s mail here), Please verify the code </span>
                                    ) : (
                                        <span>We have sent a verification on (User's mail here), please verify the code </span>
                                    )}
                                </div>
                                <div>
                                    <label htmlFor="OTP" className="font-poppins font-medium text-dark">
                                        Verification Code
                                    </label>
                                    <input type="text" value={otp} onChange={(e) => setOtp(e.target.value)} className="form-input border-2 ps-10 focus:border-btnColor-myColor" />
                                    <div className="mt-2">
                                        <span>Didn’t receive any code? </span>
                                        {countdown > 0 ? (
                                            <span>Resend code in {countdown}s</span>
                                        ) : (
                                            <button type="button" onClick={handleResend} className="text-primary underline">
                                                Resend now
                                            </button>
                                        )}
                                    </div>
                                </div>

                                <button type="submit" className="btn !mt-6 w-full border-0 bg-primary uppercase text-white hover:bg-btnColor-myColor">
                                    Verify OTP
                                </button>
                            </form>
                            <div className="w-inherit flex items-center justify-evenly space-x-10 p-8 text-sm">
                                <span className="text-screen/1h text-gray">Help</span>
                                <span className="text-screen/1h text-gray">Privacy Policy</span>
                                <span className="text-screen/1h text-gray">Terms</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

VerifyOTP.getLayout = (page: any) => {
    return <BlankLayout>{page}</BlankLayout>;
};

export default VerifyOTP;
