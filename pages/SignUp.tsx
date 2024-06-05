'use client';
import Link from 'next/link';
import PerfectScrollbar from 'react-perfect-scrollbar';
import Image from 'next/image';
import tapect_logo from '/public/assets/images/tapect_logo.svg';
import { useDispatch, useSelector } from 'react-redux';
import { IRootState } from '../store';
import { setPageTitle, toggleLocale, toggleRTL } from '../store/themeConfigSlice';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import BlankLayout from '@/components/Layouts/BlankLayout';
import { useTranslation } from 'react-i18next';
import axios from 'axios';
import verifyotp from './verifyotp';
import Loader from '../components/Loader';
import ErrorDisplay from '../components/ErrorDisplay';
import sweetAService from '../services/sweetAlertService';
import React from 'react';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axiosInstance from '@/services/api';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';

const RegisterBoxed = () => {
    const dispatch = useDispatch();
    const router = useRouter();
    const MySwal = withReactContent(Swal);

    const showToast = () => {
        MySwal.fire({
            title: 'Account created successfully',
            toast: true,
            position: 'top',
            showConfirmButton: false,
            timer: 3000,
            background: '#4CAF50',
            showCloseButton: true,
        });
    };

    const [first_name, setFirstName] = useState<string>('');
    const [last_name, setLastName] = useState<string>('');
    const [job_title, setJobTitle] = useState<string>('');
    const [email, setEmail] = useState<string>('');

    const [password, setPassword] = useState<string>('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [isValid, setValid] = useState(false);

    const [organization_name, setOrganisation_name] = useState<string>('');
    const [isChecked, setChecked] = useState(false);

    const handleCheckboxChange = () => {
        setChecked(!isChecked);
    };

    const isValidEmail = (email: string) => {
        // Use a regex or any other validation method to check if the email is valid
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    };
    const validateForm = () => {
        if (first_name.trim() === '' || last_name.trim() === '' || job_title.trim() === '' || email.trim() === '' || password.trim() === '' || organization_name.trim() === '') {
            setError('All fields are required');
            setValid(false);
        } else if (!isValidEmail(email)) {
            setError('Enter a valid email address');
            setValid(false);
        } else if (password.length < 8) {
            setError('Password must be at least 8 characters');
            setValid(false);
        } else {
            setError('');
            setValid(true);
        }
    };
    useEffect(() => {
        dispatch(setPageTitle('Register Boxed'));
        localStorage.removeItem('isLoggedIn');
    }, [dispatch, router]);

    const submitForm = async (e: any) => {
        e.preventDefault();
        validateForm();

        if (isValid) {
            try {
                // Your registration logic here
                const response = await axiosInstance.post(
                    '/register/',
                    {
                        first_name,
                        last_name,
                        email,
                        job_title,
                        organization_name,
                        password,
                    },
                    { timeout: 5000 }
                );

                if (response.data.success) {
                    showToast();
                    toast.success('Success: ' + response.data.success);
                    console.log(response.data.success, response.data.randomOTP);
                    router.push('/verifyotp');
                    // router.push('/ForgotPassword');
                } else {
                    toast.error('Error: ' + response.data.error);
                }

                console.log(response.data);
                router.push('/verifyotp');
                //   router.push('/ForgotPassword');

                // const otp = response.data.otp;
                // console.log(response.data)
                // Display a success message and redirect to the login screen
                // navigation.navigate('Message', {
                //   message: 'User registered successfully',
                //   redirectScreen: 'OtpVerify',
                // });
                // console.error(response.data.message, response.data.randomOTP);
            } catch (error) {
                // showToast();
                // Handle registration error
                setError('Registration failed. Please try again.');
                console.error('Registration Error:', error);
            }
        }
    };
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
            <PerfectScrollbar className="relative">
                <div className=" relative flex  items-center justify-center mt-5 ">
                    <div className="relative  bg-white rounded-2xl   pt-5">
                        <div className="relative  flex flex-col justify-center  px-6  sm:py-2">
                            {/* <div className="absolute end-6 top-6">
                            <div className="dropdown">
                                {flag && (
                                    <Dropdown
                                        offset={[0, 8]}
                                        placement={`${isRtl ? 'bottom-start' : 'bottom-end'}`}
                                        btnClassName="flex items-center gap-2.5 rounded-lg border border-white-dark/30 bg-white px-2 py-1.5 text-white-dark hover:border-primary hover:text-primary dark:bg-black"
                                        button={
                                            <>
                                                <div>
                                                    <img src={`/assets/images/flags/${flag.toUpperCase()}.svg`} alt="image" className="h-5 w-5 rounded-full object-cover" />
                                                </div>
                                                <div className="text-base font-bold uppercase">{flag}</div>
                                                <span className="shrink-0">
                                                    <IconCaretDown />
                                                </span>
                                            </>
                                        }
                                    >
                                        <ul className="grid w-[280px] grid-cols-2 gap-2 !px-2 font-semibold text-dark dark:text-white-dark dark:text-white-light/90">
                                            {themeConfig.languageList.map((item: any) => {
                                                return (
                                                    <li key={item.code}>
                                                        <button
                                                            type="button"
                                                            className={`flex w-full rounded-lg hover:text-primary ${i18n.language === item.code ? 'bg-primary/10 text-primary' : ''}`}
                                                            onClick={() => {
                                                                dispatch(toggleLocale(item.code));
                                                                i18n.changeLanguage(item.code);
                                                                setLocale(item.code);
                                                            }}
                                                        >
                                                            <img src={`/assets/images/flags/${item.code.toUpperCase()}.svg`} alt="flag" className="h-5 w-5 rounded-full object-cover" />
                                                            <span className="ltr:ml-3 rtl:mr-3">{item.name}</span>
                                                        </button>
                                                    </li>
                                                );
                                            })}
                                        </ul>
                                    </Dropdown>
                                )}
                            </div>
                        </div> */}
                            <div className=" mx-auto  flex w-full flex-col items-center justify-center ">
                                <a href="#">
                                    <Image src={tapect_logo} width={110} height={110} alt="logo " />
                                </a>
                                <div className="w-30px m-5  ">
                                    <h1 className="font-nunito  text-lg font-bold tracking-wider text-dark ">Create your tapect account</h1>
                                </div>
                                <form className="w-full sm:w-90vw min-w-[25vw] space-y-3 rounded-2xl  px-2 pt-5  bg-white   " onSubmit={submitForm}>
                                    {loading && <Loader />}
                                    {error && <ErrorDisplay message={error} />}
                                    <div className="p-0.5 ">
                                        <label htmlFor="firstName" className=" font-medium">
                                            First Name
                                        </label>
                                        <div className="relative text-white-dark">
                                            <input
                                                id="firstName"
                                                type="text"
                                                value={first_name}
                                                onChange={(e) => setFirstName(e.target.value)}
                                                className="form-input border-2  placeholder:text-white-dark focus:border-btnColor-myColor"
                                            />
                                            {/* <span className="absolute start-4 top-1/2 -translate-y-1/2">
                                            <IconUser fill={true} />
                                        </span> */}
                                        </div>
                                    </div>
                                    <div className="p-0.5">
                                        <label htmlFor="lastName" className=" font-medium">
                                            {' '}
                                            Last Name
                                        </label>
                                        <div className="relative text-white-dark">
                                            <input
                                                id="lastName"
                                                type="text"
                                                value={last_name}
                                                onChange={(e) => setLastName(e.target.value)}
                                                className="form-input border-2  placeholder:text-white-dark focus:border-btnColor-myColor"
                                            />
                                            {/* <span className="absolute start-4 top-1/2 -translate-y-1/2">
                                            <IconUser fill={true} />
                                        </span> */}
                                        </div>
                                    </div>
                                    <div className="p-0.5">
                                        <label htmlFor="jobtitle" className=" font-medium">
                                            {' '}
                                            Job Title
                                        </label>
                                        <div className="relative text-white-dark">
                                            <input
                                                id="jobtitle"
                                                type="text"
                                                value={job_title}
                                                onChange={(e) => setJobTitle(e.target.value)}
                                                className="form-input border-2  placeholder:text-white-dark focus:border-btnColor-myColor"
                                            />
                                            {/* <span className="absolute start-4 top-1/2 -translate-y-1/2">
                                            <IconUser fill={true} />
                                        </span> */}
                                        </div>
                                    </div>
                                    <div className="p-0.5">
                                        <label htmlFor="Email" className=" font-medium">
                                            Email Address
                                        </label>
                                        <div className="relative text-white-dark">
                                            <input
                                                id="Email"
                                                type="email"
                                                value={email}
                                                onChange={(e) => setEmail(e.target.value)}
                                                className="form-input border-2  placeholder:text-white-dark focus:border-btnColor-myColor"
                                            />
                                            {/* <span className="absolute start-4 top-1/2 -translate-y-1/2">
                                            <IconMail fill={true} />
                                        </span> */}
                                        </div>
                                    </div>
                                    <div className="p-0.5">
                                        <label htmlFor="Organisation_name" className=" font-medium">
                                            Organisation name
                                        </label>
                                        <div className="relative text-white-dark">
                                            <input
                                                id="Organisation_name"
                                                value={organization_name}
                                                onChange={(e) => setOrganisation_name(e.target.value)}
                                                type="text"
                                                className="form-input border-2  placeholder:text-white-dark focus:border-btnColor-myColor"
                                            />
                                            {/* <span className="absolute start-4 top-1/2 -translate-y-1/2">
                                            <IconMail fill={true} />
                                        </span> */}
                                        </div>
                                    </div>
                                    <div className="p-0.5">
                                        <label htmlFor="Password" className=" font-medium">
                                            Password
                                        </label>
                                        <div className="relative text-white-dark">
                                            <input
                                                id="Password"
                                                type="password"
                                                value={password}
                                                onChange={(e) => setPassword(e.target.value)}
                                                className="form-input border-2  placeholder:text-white-dark focus:border-btnColor-myColor"
                                            />
                                            {/* <span className="absolute start-4 top-1/2 -translate-y-1/2">
                                            <IconLockDots fill={true} />
                                        </span> */}
                                        </div>
                                    </div>
                                    <div>
                                        <label className="flex cursor-pointer items-center">
                                            <input type="checkbox" onClick={handleCheckboxChange} checked={isChecked} className="border-3 form-checkbox h-3.5 w-3.5 bg-white" />
                                            <span className="text-black">
                                                I have read and accept the <span className="text-btnColor-myColor underline">Terms & conditions</span>.
                                            </span>
                                        </label>
                                    </div>

                                    <button type="submit" className=" btn !mt-6 w-full border-0 bg-btnColor-myColor font-bold capitalize text-white">
                                        sign up
                                    </button>
                                    <div className="relative my-7 text-center md:mb-9">
                                        <span className="absolute inset-x-0 top-1/2 h-px w-full -translate-y-1/2 bg-white-light dark:bg-white-dark"></span>
                                        <span className=" relative bg-white px-2  text-white-dark dark:bg-dark dark:text-white-light">Already have an account? </span>
                                    </div>

                                    <div className=" text-center text-gray">
                                        <Link href="/Login" className=" font-base text-primary  hover:text-btnColor-dark ">
                                            Log in to tapect
                                        </Link>
                                    </div>
                                </form>
                                {error && <p style={{ color: 'red' }}>{error}</p>}
                                <div className="  flex items-center justify-evenly space-x-10 p-6 text-sm">
                                    <span className="text-screen/1.5h text-gray">Help</span>
                                    <span className="text-screen/1.5h text-gray">Privacy Policy </span>
                                    <span className="text-screen/1.5h text-gray"> Terms </span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </PerfectScrollbar>
        </div>
    );
};
RegisterBoxed.getLayout = (page: any) => {
    return <BlankLayout>{page}</BlankLayout>;
};
export default RegisterBoxed;
