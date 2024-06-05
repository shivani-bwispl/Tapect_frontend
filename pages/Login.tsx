import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import Image from 'next/image';
import tapect_logo from '/public/assets/images/tapect_logo.svg';
import { useDispatch, useSelector } from 'react-redux';
import { setPageTitle, toggleRTL } from '../store/themeConfigSlice';
import BlankLayout from '@/components/Layouts/BlankLayout';
import { useTranslation } from 'react-i18next';
import Loader from '../components/Loader';
import ErrorDisplay from '../components/ErrorDisplay';
import toastUtils from '../services/toastUtils'; // Import the toast utility service
import axiosInstance from '../services/api'; // Import axiosInstance from api.js
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';


function Login() {
    const router = useRouter();
    const dispatch = useDispatch();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [rememberMe, setRememberMe] = useState(false);

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const MySwal = withReactContent(Swal);

    // const showToast = () => {
    //     MySwal.fire({
    //         title: 'Signed in successfully',
    //         toast: true,
    //         position: 'top',
    //         showConfirmButton: false,
    //         timer: 3000,
    //         background: '#4CAF50',
    //         showCloseButton: true,
    //     });
    // };
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
    useEffect(() => {
        dispatch(setPageTitle('Login'));
    }, [dispatch]);

 

    const handleLogin = async (e: any) => {
        e.preventDefault();
        setLoading(true);
        try {
            const response = await axiosInstance.post('/login', {
                email,
                password,
            });
    
            if (response.status === 200) {
                const responseData = response.data;
                if (responseData.status === 200) {
                    localStorage.setItem('token', responseData.userDetails.token);
                    localStorage.setItem('userId', responseData.userDetails.userId);
                    localStorage.setItem('isLoggedIn', 'true');
                    router.push('/profile');
                    showToast('success', 'Login successful.');
                } else if (responseData.errors === 'Please verify your email') {
                    setError(responseData.errors);
                    showToast('error', responseData.errors);
                    setTimeout(() => {
                        router.push('/VerifyAccount');
                    }, 5000);
                }
            }
        } catch (error: any) {
            if (error.response) {
                const responseData = error.response.data;
                if (error.response.status === 401) {
                    setError('Invalid email or password');
                    showToast('error', 'Invalid email or password');
                } else if (error.response.status === 403) {
                    if (responseData.errors === 'Please verify your email') {
                        setError(responseData.errors);
                        showToast('error', responseData.errors);
                        setTimeout(() => {
                            router.push('/VerifyAccount');
                        }, 5000);
                    } else {
                        setError('Unauthorized. Please log in again');
                        showToast('error', 'Unauthorized. Please log in again');
                    }
                }
            } else if (error.request) {
                setError('No response received');
                console.error('No response received');
                showToast('error', 'An error occurred. Please try again later.');
            } else {
                setError('An error occurred. Please try again later.');
                console.error('Error message:', error.message);
                showToast('error', 'An error occurred. Please try again later.');
            }
        } finally {
            setLoading(false);
        }
    };
    
    // const themeConfig = useSelector((state) => state.themeConfig);
    // const setLocale = (flag) => {
    //     // Implement your setLocale function here
    // };

    // useEffect(() => {
    //     setLocale(localStorage.getItem('i18nextLng') || themeConfig.locale);
    // }, []);

    const { t, i18n } = useTranslation();

    return (
        <div>
            <div className="relative box-border flex h-screen  items-center  justify-center  ">
                <div className="relative w-full  rounded-md">
                    <div className="relative flex flex-col justify-center ">
                        <div className="min-w-screen/30 mx-auto mt-2 flex rounded-2xl pt-5 bg-white flex-col items-center justify-center">
                            <a href="#">
                                <Image src={tapect_logo} width={110} height={110} alt="logo  " />
                            </a>
                            <div className="w-30px mt-3 text-center">
                                <h1 className="font-lato  text-lg font-bold !leading-snug text-black">Log in to your Tapect account </h1>
                            </div>
                            <form className="w-full sm:w-90vw min-w-[25vw] space-y-3  b py-4 px-8  dark:text-white" onSubmit={handleLogin}>
                                {loading && <Loader />}
                                {error && <ErrorDisplay message={error} />}
                                <div className="p-0.5">
                                    <label htmlFor="Email " className=" font-medium text-dark">
                                        Email
                                    </label>
                                    <div className="relative  ">
                                        <input id="Email" type="email" className="form-input border-2  focus:border-primary" value={email} onChange={(e) => setEmail(e.target.value)} />
                                        <span className=" absolute start-4 top-1/2 -translate-y-1/2"></span>
                                    </div>
                                </div>
                                <div className="p-0.5">
                                    <label htmlFor="Password" className="font-poppins font-medium text-dark">
                                        Password
                                    </label>
                                    <div className="relative text-white-dark">
                                        <input id="Password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} className="form-input border-2  focus:border-primary" />

                                        <span className="absolute start-4 top-1/2 -translate-y-1/2"></span>
                                    </div>
                                </div>

                                <div className="flex items-center justify-between py-2 ">
                                    <div className="flex cursor-pointer items-center  ">
                                        <input type="checkbox" checked={rememberMe} onChange={() => setRememberMe(!rememberMe)} className="bg-dark-white form-checkbox dark:bg-black" />
                                        <span className=" font-bold text-dark ">Remember me</span>
                                    </div>
                                    <div className=" flex flex-col text-btnColor-myColor hover:underline ">
                                        <Link href="/ForgotPassword"> Forget your Password ?</Link>
                                        {/* <Link href="/ResetPassword"> Reset password ?</Link> */}
                                    </div>
                                </div>

                                <button type="submit" className="btn !mt-6 w-full border-0 bg-primary capitalize text-white ">
                                    sign in
                                </button>
                                <div className="relative my-7 text-center md:mb-4">
                                    <span className="absolute inset-x-0 top-1/2 h-px w-full -translate-y-1/2 bg-white-light dark:bg-white-dark"></span>
                                    <span className="relative bg-white px-2 font-semibold uppercase text-white-dark dark:bg-dark dark:text-white-light">or</span>
                                </div>

                                <div className="font-poppins w-full text-center text-gray  ">
                                    Do not have a tapect account ? 
                                    <Link href="/SignUp" className="  ml-1 capitalize text-primary underline hover:text-black dark:hover:text-white">
                                        Create One
                                    </Link>
                                </div>
                            </form>
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
}
Login.getLayout = (page: any) => {
    return <BlankLayout>{page}</BlankLayout>;
};
export default Login;
