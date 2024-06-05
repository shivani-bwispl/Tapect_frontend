/* eslint-disable @next/next/no-img-element */
// // // Import necessary modules and components
// // import React, { useState, useEffect } from 'react';
// // import PerfectScrollbar from 'react-perfect-scrollbar';
// // import { useTranslation } from 'react-i18next';
// // import { useDispatch, useSelector } from 'react-redux';
// // import Link from 'next/link';
// // import Image from 'next/image'; // Import Image component from next/image
// // import tapect_logo from '../../public/assets/images/tapect_logo.svg';
// // import UserProfile_logo from '../../public/assets/images/icons/UserProfile_logo.svg';
// // import More from '../../public/assets/images/icons/More.svg';
// // import { toggleSidebar } from '../../store/themeConfigSlice';
// // import { IRootState } from '../../store';
// // import { useRouter } from 'next/router';
// // import NavItem from './NavItem';
// // import axiosInstance from '@/services/api'; // Import axiosInstance from your API service

// // // Define navigation items
// // const navItems = [
// //     { name: 'Home', href: '/', isExternal: false },
// //     { name: 'Profile', href: '/profile', isExternal: false },
// //     { name: 'Analytics', href: '/analytics', isExternal: false },
// //     { name: 'Contact', href: '/contact', isExternal: false },
// //     { name: 'Activate Tag', href: '/activateTag', isExternal: false },
// //     { name: 'Buy tapect', href: 'https://www.tapect.com/product/', isExternal: true },
// //     { name: 'tapect For Business', href: 'https://www.tapect.com/for-team-business/', isExternal: true },
// //     { name: 'Device Compatibility', href: 'https://www.tapect.com/device-compatibility/', isExternal: true },
// // ];
// // const BottomNavItems = [
// //     { name: 'Help', href: 'https://www.tapect.com/help/', isExternal: true },
// //     { name: 'Setting', href: '/setting', isExternal: false },
// //     { name: 'Logout', href: '#', isExternal: true },
// // ];

// // // Define Sidebar component
// // const Sidebar = () => {
// //     // Initialize necessary hooks and variables
// //     const router = useRouter();
// //     const [showOptions, setshowOptions] = useState(false);
// //     const [userProfiles, setUserProfiles] = useState([]);
// //     const [activeItem, setActiveItem] = useState(null);
// //     const [isLoggedIn, setIsLoggedIn] = useState(false);

// //     const handleMoreClick = () => {
// //         setshowOptions(!showOptions);
// //     };

// //     useEffect(() => {
// //         const auth = localStorage.getItem('token');

// //         if (!auth || auth === "null") {
// //             // Display error message
// //             console.error('Token not found in localStorage');
// //             // Redirect to login page
// //             router.push('/Login');
// //         } else {
// //             const tokenData = parseJWT(auth); // Implement a function to parse JWT
// //             const now = Date.now() / 1000;
// //             const expiresIn = tokenData.exp - now;

// //             if (expiresIn <= 0) {
// //                 // Token has expired, remove it from localStorage
// //                 console.error('Token has expired');
// //                 localStorage.removeItem('token');
// //                 localStorage.removeItem('userId');
// //                 localStorage.removeItem('isLoggedIn');

// //                 // Redirect to logout or any other appropriate action
// //                 // Assuming you have a logout route '/Logout'
// //                 router.push('/Logout');
// //             } else {
// //                 // Token is still valid, set a timeout to remove it before expiration
// //                 const expirationTimeout = setTimeout(() => {
// //                     console.log('Token will expire soon');
// //                     // Optionally, you can remove the token here as well
// //                     localStorage.removeItem('token');
// //                     localStorage.removeItem('userId');
// //                     localStorage.removeItem('isLoggedIn');
// //                 }, expiresIn * 1000); // Convert expiresIn from seconds to milliseconds

// //                 // Clear the timeout when the component unmounts
// //                 return () => clearTimeout(expirationTimeout);
// //             }
// //         }

// //         function parseJWT(token) {
// //             const base64Url = token.split('.')[1];
// //             const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
// //             const jsonPayload = decodeURIComponent(atob(base64).split('').map(function(c) {
// //                 return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
// //             }).join(''));

// //             return JSON.parse(jsonPayload);
// //         }
// //     }, []);

// //     useEffect(() => {
// //         const fetchUserProfile = async () => {
// //             try {
// //                 const userId = localStorage.getItem('userId');
// //                 if (!userId) {
// //                     throw new Error('User ID not found in localStorage');
// //                 }
// //                 const auth = localStorage.getItem('token');


// //                 if (!auth || auth === "null") {
// //                     // Display error message
// //                     console.error('Token not found in localStorage');
// //                     // Redirect to login page
// //                     router.push('/Login');
// //                     return;
// //                 }

// //                 const config = {
// //                     headers: {
// //                         'Authorization': `Bearer ${auth}`, // Set the authorization header properly
// //                     },
// //                 };

// //                 const response = await axiosInstance.get(`/profileUpdate/${userId}`, config);
// //                 const userProfileData = response.data;
// //                 setUserProfiles([userProfileData]); // Assuming response.data is an object
// //             } catch (error) {
// //                 console.error('Error fetching user profile:', error.message);
// //                 setUserProfiles([]); // Reset user profile state to an empty array or set a default value
// //             }
// //         };
// //         fetchUserProfile(); // Call fetchUserProfile when the component mounts
// //     }, []);


// //     // Set active route when component mounts
// //     useEffect(() => {
// //         setActiveRoute();
// //     }, []);

// //     // Set active route based on router pathname
// //     const setActiveRoute = () => {
// //         const currentPath = router.pathname;
// //         setActiveItem(currentPath);
// //         const selector = document.querySelector('.sidebar ul a[href="' + window.location.pathname + '"]') as HTMLAnchorElement; // Assert type as HTMLAnchorElement
// //         if (selector) {
// //             selector.classList.add('active');
// //             const ul = selector.closest('ul.sub-menu');
// //             if (ul) {
// //                 let ele = ul.closest('li.menu').querySelectorAll('.nav-link')[0];
// //                 if (ele) {
// //                     setTimeout(() => {
// //                         (ele as HTMLAnchorElement).click();
// //                     });
// //                 }
// //             }
// //         }
// //     };


// //     // Logout handler
// //     const handleLogout = () => {
// //         localStorage.removeItem('token'); // Clear authentication state
// //         localStorage.removeItem('userId'); // Clear authentication state
// //         localStorage.removeItem('isLoggedIn'); // Clear authentication state
// //         router.push('/Login'); // Redirect to the login page after logout
// //     };

// //     // Navigation item click handler
// //     const handleNavItemClick = (itemName: any, href: any, isExternal: any, event: React.MouseEvent<HTMLAnchorElement>) => {
// //         if (event) {
// //             event.preventDefault();
// //             event.stopPropagation();
// //         }
// //         setActiveItem(itemName);
// //         if (!isExternal) {
// //             setActiveItem(href);
// //             router.push(href);
// //         } else {
// //             window.open(href, '_blank');
// //         }
// //     };

// //     // Render Sidebar component
// //     return (
// //         <div>
// //             {/* <nav className={`sidebar fixed bottom-0 top-0 z-50 h-full min-h-screen w-[260px] `}> */}
// //             <nav className="sidebar fixed bottom-0 top-0 z-50 h-full min-h-screen w-[260px] shadow-[5px_0_25px_0_rgba(94,92,154,0)] transition-all duration-300">
// //                 <div className="h-full bg-white dark:bg-black">
// //                     <div className="flex items-left justify-left  py-5  ">
// //                         <Link href="/" className="main-logo flex items-center justify-center">
// //                             <Image className="w-15 ml-[5px] w-[65%]" src={tapect_logo} alt="logo" height={65} width={54} />
// //                         </Link>
// //                     </div>
// //                     <PerfectScrollbar className="relative h-[calc(100vh-80px)]">
// //                         <div className="flex  h-full flex-col justify-between">
// //                             <div>
// //                                 <ul className="relative p-4 py-0 mb-5 font-semibold">
// //                                     {navItems.map((item) => (
// //                                         <NavItem 
// //                                             key={item.name}
// //                                             name={item.name}
// //                                             href={item.href}
// //                                             isExternal={item.isExternal}
// //                                             isActive={activeItem === item.href}
// //                                             onClick={(event) => item.name === 'Logout' ? handleLogout() : handleNavItemClick(item.name, item.href, item.isExternal, event)}
// //                                         />

// //                                     ))}
// //                                 </ul>
// //                             </div>
// //                             <div className="flex h-fit w-full cursor-pointer items-center justify-between border-t-2 px-2  py-3" onClick={handleMoreClick}>
// //                                 {userProfiles.map((userProfilesData) => (
// //                                     <React.Fragment key={userProfilesData}>
// //                                         <div className="flex items-center justify-center gap-2 ">
// //                                             <Image src={UserProfile_logo} width={40} height={40} alt="userprofile_logo"></Image>
// //                                             <span className="text-md font-semibold text-gray">{`${userProfilesData['first_name']} ${userProfilesData['last_name']}`}</span>
// //                                         </div>
// //                                     </React.Fragment>
// //                                 ))}
// //                                 <Image src={More} width={3} height={3} alt="more"></Image>
// //                                 {showOptions && (
// //                                     <div className=" absolute bottom-20  w-[90%]  rounded-lg border bg-white py-2">
// //                                         <ul className="relative   font-semibold">
// //                                             {BottomNavItems.map((item) => (
// //                                                 <NavItem
// //                                                     key={item.name}
// //                                                     name={item.name}
// //                                                     href={item.href}
// //                                                     isExternal={item.isExternal}
// //                                                     isActive={activeItem === item.href}
// //                                                     onClick={(event) => item.name === 'Logout' ? handleLogout() : handleNavItemClick(item.name, item.href, item.isExternal, event)}
// //                                                 />
// //                                             ))}
// //                                         </ul>
// //                                     </div>
// //                                 )}
// //                             </div>
// //                         </div>
// //                     </PerfectScrollbar>
// //                 </div>
// //             </nav>
// //         </div>
// //     );
// // };

// // export default Sidebar;

// // Import necessary modules and components
// import React, { useState, useEffect } from 'react';
// import PerfectScrollbar from 'react-perfect-scrollbar';
// import Link from 'next/link';
// import Image from 'next/image'; // Import Image component from next/image
// import tapect_logo from '../../public/assets/images/tapect_logo.svg';
// import UserProfile_logo from '../../public/assets/images/icons/UserProfile_logo.svg';
// import More from '../../public/assets/images/icons/More.svg';
// import { useRouter } from 'next/router';
// import NavItem from './NavItem';
// import axiosInstance from '@/services/api'; // Import axiosInstance from your API service
// import 'react-perfect-scrollbar/dist/css/styles.css';
// // Define navigation items
// const navItems = [
//     { name: 'Home', href: '/', isExternal: false },
//     { name: 'Profile', href: '/profile', isExternal: false },
//     { name: 'Analytics', href: '/analytics', isExternal: false },
//     { name: 'Contact', href: '/contact', isExternal: false },
//     { name: 'Activate Tag', href: '/activateTag', isExternal: false },
//     { name: 'Buy tapect', href: 'https://www.tapect.com/product/', isExternal: true },
//     { name: 'tapect For Business', href: 'https://www.tapect.com/for-team-business/', isExternal: true },
//     { name: 'Device Compatibility', href: 'https://www.tapect.com/device-compatibility/', isExternal: true },
// ];
// const BottomNavItems = [
//     { name: 'Help', href: 'https://www.tapect.com/help/', isExternal: true },
//     { name: 'Setting', href: '/setting', isExternal: false },
//     { name: 'Logout', href: '#', isExternal: true },
// ];

// // Define Sidebar component
// const Sidebar = () => {
//     const router = useRouter();
//     const [showOptions, setshowOptions] = useState(false);
//     const [userProfiles, setUserProfiles] = useState([]);
//     const [activeItem, setActiveItem] = useState(null);
//     const [isLoggedIn, setIsLoggedIn] = useState(false);
//     const [isSidebarOpen, setIsSidebarOpen] = useState(false);

//     const handleMoreClick = () => {
//         setshowOptions(!showOptions);
//     };

//     useEffect(() => {
//         const auth = localStorage.getItem('token');

//         if (!auth || auth === "null") {
//             console.error('Token not found in localStorage');
//             router.push('/Login');
//         } else {
//             const tokenData = parseJWT(auth);
//             const now = Date.now() / 1000;
//             const expiresIn = tokenData.exp - now;

//             if (expiresIn <= 0) {
//                 console.error('Token has expired');
//                 localStorage.removeItem('token');
//                 localStorage.removeItem('userId');
//                 localStorage.removeItem('isLoggedIn');
//                 router.push('/Logout');
//             } else {
//                 const expirationTimeout = setTimeout(() => {
//                     console.log('Token will expire soon');
//                     localStorage.removeItem('token');
//                     localStorage.removeItem('userId');
//                     localStorage.removeItem('isLoggedIn');
//                 }, expiresIn * 1000);

//                 return () => clearTimeout(expirationTimeout);
//             }
//         }

//         function parseJWT(token) {
//             const base64Url = token.split('.')[1];
//             const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
//             const jsonPayload = decodeURIComponent(atob(base64).split('').map(function(c) {
//                 return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
//             }).join(''));

//             return JSON.parse(jsonPayload);
//         }
//     }, []);

//     useEffect(() => {
//         const fetchUserProfile = async () => {
//             try {
//                 const userId = localStorage.getItem('userId');
//                 if (!userId) {
//                     throw new Error('User ID not found in localStorage');
//                 }
//                 const auth = localStorage.getItem('token');

//                 if (!auth || auth === "null") {
//                     console.error('Token not found in localStorage');
//                     router.push('/Login');
//                     return;
//                 }

//                 const config = {
//                     headers: {
//                         'Authorization': `Bearer ${auth}`,
//                     },
//                 };

//                 const response = await axiosInstance.get(`/profileUpdate/${userId}`, config);
//                 const userProfileData = response.data;
//                 setUserProfiles([userProfileData]);
//             } catch (error) {
//                 console.error('Error fetching user profile:', error.message);
//                 setUserProfiles([]);
//             }
//         };
//         fetchUserProfile();
//     }, []);

//     useEffect(() => {
//         setActiveRoute();
//     }, []);

//     const setActiveRoute = () => {
//         const currentPath = router.pathname;
//         setActiveItem(currentPath);
//         const selector = document.querySelector('.sidebar ul a[href="' + window.location.pathname + '"]') as HTMLAnchorElement;
//         if (selector) {
//             selector.classList.add('active');
//             const ul = selector.closest('ul.sub-menu');
//             if (ul) {
//                 let ele = ul.closest('li.menu').querySelectorAll('.nav-link')[0];
//                 if (ele) {
//                     setTimeout(() => {
//                         (ele as HTMLAnchorElement).click();
//                     });
//                 }
//             }
//         }
//     };

//     const handleLogout = () => {
//         localStorage.removeItem('token');
//         localStorage.removeItem('userId');
//         localStorage.removeItem('isLoggedIn');
//         router.push('/Login');
//     };

//     const handleNavItemClick = (itemName: any, href: any, isExternal: any, event: React.MouseEvent<HTMLAnchorElement>) => {
//         if (event) {
//             event.preventDefault();
//             event.stopPropagation();
//         }
//         setActiveItem(itemName);
//         if (!isExternal) {
//             setActiveItem(href);
//             router.push(href);
//             setIsSidebarOpen(false); // Close the sidebar on navigation
//         } else {
//             window.open(href, '_blank');
//         }
//     };

//     const toggleSidebar = () => {
//         setIsSidebarOpen(!isSidebarOpen);
//     };

//     return (
//         <div>
//             <div className="md:hidden  bg-white p-4" >
//             <button className="md:hidden text-2xl " onClick={toggleSidebar}>
//                 ☰
//             </button>
//             </div>

//             <div className={`sidebar ${isSidebarOpen ? 'open' : ''}`}>
//                 <div className="h-full bg-white dark:bg-black">
//                     <div className="flex items-left justify-left py-5">
//                         <Link href="/" className="main-logo flex items-center justify-center">
//                             <Image className="ml-[5px] w-[65%]" src={tapect_logo} alt="logo" height={65} width={54} />
//                         </Link>
//                     </div>
//                     <PerfectScrollbar className="relative h-[calc(100vh-80px)]">
//                         <div className="flex h-full flex-col justify-between">
//                             <div>
//                                 <ul className="relative p-4 py-0 mb-5 font-semibold">
//                                     {navItems.map((item) => (
//                                         <NavItem 
//                                             key={item.name}
//                                             name={item.name}
//                                             href={item.href}
//                                             isExternal={item.isExternal}
//                                             isActive={activeItem === item.href}
//                                             onClick={(event) => item.name === 'Logout' ? handleLogout() : handleNavItemClick(item.name, item.href, item.isExternal, event)}
//                                         />
//                                     ))}
//                                 </ul>
//                             </div>
//                             <div className="flex h-fit w-full cursor-pointer items-center justify-between border-t-2 px-2 py-3" onClick={handleMoreClick}>
//                                 {userProfiles.map((userProfilesData) => (
//                                     <React.Fragment key={userProfilesData}>
//                                         <div className="flex items-center justify-center gap-2">
//                                             <Image src={UserProfile_logo} width={40} height={40} alt="userprofile_logo"></Image>
//                                             <span className="text-md font-semibold md:hidden text-gray">{`${userProfilesData['first_name']} ${userProfilesData['last_name']}`}</span>
//                                         </div>
//                                     </React.Fragment>
//                                 ))}
//                                 <Image src={More} width={3} height={3} alt="more"></Image>
//                                 {showOptions && (
//                                     <div className="absolute bottom-20 w-[90%] rounded-lg border bg-white py-2">
//                                         <ul className="relative font-semibold">
//                                             {BottomNavItems.map((item) => (
//                                                 <NavItem
//                                                     key={item.name}
//                                                     name={item.name}
//                                                     href={item.href}
//                                                     isExternal={item.isExternal}
//                                                     isActive={activeItem === item.href}
//                                                     onClick={(event) => item.name === 'Logout' ? handleLogout() : handleNavItemClick(item.name, item.href, item.isExternal, event)}
//                                                 />
//                                             ))}
//                                         </ul>
//                                     </div>
//                                 )}
//                             </div>
//                         </div>
//                     </PerfectScrollbar>
//                 </div>
//             </div>
//             {isSidebarOpen && <div className="overlay open" onClick={toggleSidebar}></div>}
//         </div>
//     );
// };

// export default Sidebar;


// Import necessary modules and components
import React, { useState, useEffect } from 'react';
import PerfectScrollbar from 'react-perfect-scrollbar';
import Link from 'next/link';
import Image from 'next/image';
import tapect_logo from '../../public/assets/images/tapect_logo.svg';
import UserProfile_logo from '../../public/assets/images/icons/UserProfile_logo.svg';
import More from '../../public/assets/images/icons/More.svg';
import { useRouter } from 'next/router';
import NavItem from './NavItem';
import axiosInstance from '@/services/api';
import 'react-perfect-scrollbar/dist/css/styles.css';
import { imagepathURL } from '@/services/imgpthapi';

// Define navigation items
const navItems = [
    { name: 'Home', href: '/', isExternal: false },
    { name: 'Profile', href: '/profile', isExternal: false },
    { name: 'Analytics', href: '/analytics', isExternal: false },
    { name: 'Contact', href: '/contact', isExternal: false },
    { name: 'Activate Tag', href: '/activateTag', isExternal: false },
    { name: 'Buy tapect', href: 'https://www.tapect.com/product/', isExternal: true },
    { name: 'tapect For Business', href: 'https://www.tapect.com/for-team-business/', isExternal: true },
    { name: 'Device Compatibility', href: 'https://www.tapect.com/device-compatibility/', isExternal: true },
];

const BottomNavItems = [
    { name: 'Help', href: 'https://www.tapect.com/help/', isExternal: true },
    { name: 'Setting', href: '/setting', isExternal: false },
    { name: 'Logout', href: '#', isExternal: true },
];

// Define Sidebar component
const Sidebar = () => {
    const router = useRouter();
    const [showOptions, setshowOptions] = useState(false);
    const [userProfiles, setUserProfiles] = useState([]);
    const [activeItem, setActiveItem] = useState(null);
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    const handleMoreClick = () => {
        setshowOptions(!showOptions);
    };

    useEffect(() => {
        const auth = localStorage.getItem('token');

        if (!auth || auth === "null") {
            console.error('Token not found in localStorage');
            router.push('/Login');
        } else {
            const tokenData = parseJWT(auth);
            const now = Date.now() / 1000;
            const expiresIn = tokenData.exp - now;

            if (expiresIn <= 0) {
                console.error('Token has expired');
                localStorage.removeItem('token');
                localStorage.removeItem('userId');
                localStorage.removeItem('isLoggedIn');
                router.push('/Logout');
            } else {
                const expirationTimeout = setTimeout(() => {
                    console.log('Token will expire soon');
                    localStorage.removeItem('token');
                    localStorage.removeItem('userId');
                    localStorage.removeItem('isLoggedIn');
                }, expiresIn * 1000);

                return () => clearTimeout(expirationTimeout);
            }
        }

        function parseJWT(token) {
            const base64Url = token.split('.')[1];
            const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
            const jsonPayload = decodeURIComponent(atob(base64).split('').map(function (c) {
                return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
            }).join(''));

            return JSON.parse(jsonPayload);
        }
    }, []);

    useEffect(() => {
        const fetchUserProfile = async () => {
            try {
                const userId = localStorage.getItem('userId');
                if (!userId) {
                    throw new Error('User ID not found in localStorage');
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

                const response = await axiosInstance.get(`/profileUpdate/${userId}`, config);
                const userProfileData = response.data;
                setUserProfiles([userProfileData]);
            } catch (error) {
                console.error('Error fetching user profile:', error.message);
                setUserProfiles([]);
            }
        };
        fetchUserProfile();
    }, []);

    useEffect(() => {
        setActiveRoute();
    }, []);

    const setActiveRoute = () => {
        const currentPath = router.pathname;
        setActiveItem(currentPath);
        const selector = document.querySelector('.sidebar ul a[href="' + window.location.pathname + '"]') as HTMLAnchorElement;
        if (selector) {
            selector.classList.add('active');
            const ul = selector.closest('ul.sub-menu');
            if (ul) {
                let ele = ul.closest('li.menu').querySelectorAll('.nav-link')[0];
                if (ele) {
                    setTimeout(() => {
                        (ele as HTMLAnchorElement).click();
                    });
                }
            }
        }
    };

    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('userId');
        localStorage.removeItem('isLoggedIn');
        router.push('/Login');
    };

    const handleNavItemClick = (itemName: any, href: any, isExternal: any, event: React.MouseEvent<HTMLAnchorElement>) => {
        if (event) {
            event.preventDefault();
            event.stopPropagation();
        }
        setActiveItem(itemName);
        if (!isExternal) {
            setActiveItem(href);
            router.push(href);
            setIsSidebarOpen(false); // Close the sidebar on navigation
        } else {
            window.open(href, '_blank');
        }
    };

    const toggleSidebar = () => {
        setIsSidebarOpen(!isSidebarOpen);
    };

    return (
        <div>
            <div className="lg:hidden  bg-white p-4">
                <button className="text-2xl" onClick={toggleSidebar}>
                    ☰
                </button>
            </div>

            <div className={`sidebar ${isSidebarOpen ? 'open' : ''}`}>
                <div className="h-full bg-white dark:bg-black">
                    <div className="flex items-left justify-left py-5">
                        <Link href="/" className="main-logo flex items-center justify-center">
                            <Image className="ml-[5px] w-[65%]" src={tapect_logo} alt="logo" height={65} width={54} />
                        </Link>
                    </div>
                    <PerfectScrollbar className="relative h-[calc(100vh-80px)]">
                        <div className="flex h-full flex-col justify-between">
                            <div>
                                <ul className="relative p-4 py-0 mb-5 font-semibold">
                                    {navItems.map((item) => (
                                        <NavItem
                                            key={item.name}
                                            name={item.name}
                                            href={item.href}
                                            isExternal={item.isExternal}
                                            isActive={activeItem === item.href}
                                            onClick={(event) => item.name === 'Logout' ? handleLogout() : handleNavItemClick(item.name, item.href, item.isExternal, event)}
                                        />
                                    ))}
                                </ul>
                            </div>
                            <div className="flex w-full cursor-pointer items-center justify-between border-t-2 px-2 py-3 my-2" onClick={handleMoreClick}>
                                {userProfiles.map((userProfilesData) => (
                                    <React.Fragment key={userProfilesData}>
                                        <div className="flex items-center justify-center gap-2">

                                            <Image src={`${imagepathURL}/static/profileImages/${userProfilesData.profileImage}`} width={40} height={40} alt="userprofile_logo"  className="rounded-full h-[40px] object-cover"></Image>
                                            <span className="text-md font-semibold hidden lg:inline text-gray">{`${userProfilesData['first_name']} ${userProfilesData['last_name']}`}</span>
                                        </div>
                                    </React.Fragment>
                                ))}
                                <Image src={More} width={3} height={3} alt="more"></Image>
                                {showOptions && (
                                    <div className={`absolute bottom-20 ${isSidebarOpen ? 'w-[80%]' : 'w-[90%]'} rounded-lg border bg-white py-2`}>
                                        <ul className="relative font-semibold">
                                            {BottomNavItems.map((item) => (
                                                <NavItem
                                                    key={item.name}
                                                    name={item.name}
                                                    href={item.href}
                                                    isExternal={item.isExternal}
                                                    isActive={activeItem === item.href}
                                                    onClick={(event) => item.name === 'Logout' ? handleLogout() : handleNavItemClick(item.name, item.href, item.isExternal, event)}
                                                />
                                            ))}
                                        </ul>
                                    </div>
                                )}
                            </div>
                        </div>
                    </PerfectScrollbar>
                </div>
            </div>
            {isSidebarOpen && <div className="overlay open" onClick={toggleSidebar}></div>}
        </div>
    );
};

export default Sidebar;


