// import React, { useState } from 'react';
// import Link from 'next/link';
// import Image from 'next/image';
// const NavItem = ({ name, href, isExternal, isActive, onClick }) => {
//     const [isHovered, setIsHovered] = useState(false);
//     const handleMouseEnter = () => {
//         setIsHovered(true);
//     };
//     const handleMouseLeave = () => {
//         setIsHovered(false);
//     };
//     return (
//         <li className={`nav-item ${isActive ? 'active' : ''}, mb-3`}>
//             {isExternal ? (
//                 <Link href={href} passHref className="group" onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave} onClick={onClick}>
//                     <div className="flex items-center">
//                         <Image src={`../../assets/images/icons/${name}-${isActive || isHovered ? 'hover' : 'default'}.svg`} width={16} height={16} alt="PROFILE" />
//                         <span
//                             className={`text-[#717171] hover:text-primary dark:text-[#506690] dark:group-hover:text-white-dark ltr:pl-3 rtl:pr-3 ${isActive ? 'text-primary' : ''} ${
//                                 isHovered ? 'hovered-text' : ''
//                             }`}
//                         >
//                             {name}
//                         </span>
//                     </div>
//                 </Link>
//             ) : (
//                 <Link href={href} className="group" onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave} onClick={onClick}>
//                     <div className="flex items-center">
//                         <Image src={`../../assets/images/icons/${name}-${isActive || isHovered ? 'hover' : 'default'}.svg`} width={20} height={20} alt={name} />
//                         <span className={`text-[#717171] dark:text-[#506690] dark:group-hover:text-white-dark ltr:pl-3 rtl:pr-3 ${isActive ? 'text-primary' : ''} ${isHovered ? 'hovered-text' : ''}`}>
//                             {name}
//                         </span>
//                     </div>
//                 </Link>
//             )}
//         </li>
//     );
// };
// export default NavItem;

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';

const NavItem = ({ name, href, isExternal, isActive, onClick }) => {
    const [isHovered, setIsHovered] = useState(false);

    const handleMouseEnter = () => {
        setIsHovered(true);
    };

    const handleMouseLeave = () => {
        setIsHovered(false);
    };

    return (
        <li className={`nav-item ${isActive ? 'active bg-[#F4EDFF]' : ''}, mb-3 `}>
            {isExternal ? (
                <Link href={href} passHref className="group" onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave} onClick={onClick}>
                    <div className="flex items-center">
                        <Image src={`../../assets/images/icons/${name}-${isActive || isHovered ? 'hover' : 'default'}.svg`} width={16} height={16} alt="PROFILE" />
                        <span
                            className={`hidden lg:inline text-[#717171] hover:text-primary dark:text-[#506690] dark:group-hover:text-white-dark ltr:pl-3 rtl:pr-3 ${isActive ? 'text-primary' : ''} ${
                                isHovered ? 'hovered-text' : ''
                            }`}
                        >
                            {name}
                        </span>
                    </div>
                </Link>
            ) : (
                <Link href={href} className="group" onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave} onClick={onClick}>
                    <div className="flex items-center">
                        <Image src={`../../assets/images/icons/${name}-${isActive || isHovered ? 'hover' : 'default'}.svg`} width={20} height={20} alt={name} />
                        <span className={`hidden lg:inline text-[#717171] dark:text-[#506690] dark:group-hover:text-white-dark ltr:pl-3 rtl:pr-3 ${isActive ? 'text-primary' : ''} ${isHovered ? 'hovered-text' : ''}`}>
                            {name}
                        </span>
                    </div>
                </Link>
            )}
        </li>
    );
};

export default NavItem;
