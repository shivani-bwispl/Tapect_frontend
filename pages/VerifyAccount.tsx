/* eslint-disable react/no-unescaped-entities */
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useRouter } from 'next/router';
import Image from 'next/image';
import BlankLayout from '@/components/Layouts/BlankLayout';
import tapect_logo from '/public/assets/images/tapect_logo.svg';
import { setPageTitle } from '@/store/themeConfigSlice';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import axiosInstance from '@/services/api';

const VerifyAccount = () => {
    const [email, setEmail] = useState('');
    const [otpSentSuccessfully, setOtpSentSuccessfully] = useState(false);
    const dispatch = useDispatch();
    const router = useRouter();
    const MySwal = withReactContent(Swal);

    const showToast = () => {
        MySwal.fire({
            title: 'Account verified successfully',
            toast: true,
            position: 'top',
            showConfirmButton: false,
            timer: 3000,
            background: '#4CAF50',
            showCloseButton: true,
        });
    };

    useEffect(() => {
        dispatch(setPageTitle('Verify OTP'));
        localStorage.removeItem('isLoggedIn');
    }, [dispatch]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await axiosInstance.post('/otpVerify/VerifyAccount', { email });

            if (response.status === 200 && response.data && response.data.message === 'OTP sent successfully') {
                console.log('OTP sent successfully.');
                setOtpSentSuccessfully(true);
            } else {
                console.error('Error sending OTP:', response.data && response.data.message);
            }
        } catch (error) {
            showToast();
            console.error('Error sending OTP:', error);
        }
    };

    if (otpSentSuccessfully) {
        return <RedirectToOTPVerification />;
    }

    return (
        <div>
            <div className="relative box-border flex h-screen min-w-max items-center justify-center bg-white px-6 py-4 sm:px-10">
                <div className="relative w-full max-w-[900px] rounded-md">
                    <div className="relative flex flex-col justify-center bg-white">
                        <div className="min-w-screen/30 mx-auto flex flex-col items-center justify-center">
                            <Image src={tapect_logo} width={110} height={110} alt="logo " />
                            <div className="w-30px m-5 text-center">
                                <h1 className="text-lg font-bold !leading-snug text-dark">Verify Account</h1>
                            </div>
                            <form className="min-w-screen/50 w-[400px] space-y-3 rounded-lg border-2 border-solid border-white-light p-9 shadow-3xl dark:text-white" onSubmit={handleSubmit}>
                                <div className="mb-8">
                                    <span className=" text-xs">Your account is not verified. Please verify your account.</span>
                                </div>
                                <div>
                                    <label htmlFor="email" className="font-poppins font-medium text-dark">
                                        Enter your email
                                    </label>
                                    <input type="email" id="email" value={email} onChange={(e) => setEmail(e.target.value)} className="form-input mb-12 border-2 ps-10 focus:border-btnColor-myColor" />
                                </div>
                                <div>
                                    <button type="submit" className="btn !mt-6 w-full border-0 bg-primary uppercase text-white hover:bg-btnColor-myColor" onClick={showToast}>
                                        Continue
                                    </button>
                                </div>
                                <div>
                                    <span className="mt-3">Already have a tapect account?</span>
                                </div>
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

VerifyAccount.getLayout = (page) => {
    return <BlankLayout>{page}</BlankLayout>;
};

const RedirectToOTPVerification = () => {
    const [countdown, setCountdown] = useState(0);
    const [resendClicked, setResendClicked] = useState(false);
    const [resent, setResent] = useState(false);
    const dispatch = useDispatch();
    const router = useRouter();
    const [otp, setOtp] = useState('');

    useEffect(() => {
        dispatch(setPageTitle('Verify OTP'));
        localStorage.removeItem('isLoggedIn');
    }, [dispatch, router]);

    const handleResend = () => {
        setCountdown(14);
        setResendClicked(true);
        setResent(true);
    };

    useEffect(() => {
        let timer;
        if (resendClicked && countdown > 0) {
            timer = setInterval(() => {
                setCountdown((prevCount) => prevCount - 1);
            }, 1000);
        } else if (countdown === 0) {
            setResendClicked(false);
            setResent(false);
        }

        return () => clearInterval(timer);
    }, [countdown, resendClicked]);

    const handleSubmitotp = async (e) => {
        e.preventDefault();

        try {
            const response = await axiosInstance.post('/otpVerify', { otp });

            if (response.status === 200 && response.data.success) {
                console.log('OTP verification successful.');
                setTimeout(() => {
                    router.push('/profile');
                }, 2000);
            } else {
                console.error('OTP verification failed:', response.data.message);
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
                            <form className="min-w-screen/50 w-[400px] space-y-3 rounded-lg border-2 border-solid border-white-light p-9 shadow-3xl dark:text-white" onSubmit={handleSubmitotp}>
                                <div className="mb-7">
                                    {resent ? (
                                        <span>We have resended a verification on (User's mail here), Please verify the code </span>
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
                                        <span>Didn't receive any code? </span>
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

export default VerifyAccount;
