import React from 'react';
import Image from 'next/image';
import More from '../public/assets/images/icons/More.svg';

import ProfileIcon from '../public/assets/images/icons/ProfileIcon.svg';
import IconX from '@/components/Icon/IconX';

function contactEdit() {
    return (
        <>
            <div className="panel m-5 ">
                <div className="flex h-[80px] w-full items-center justify-between border-b-2 bg-white p-2">
                    <div className="  flex  items-center justify-center  ">
                        <Image src={ProfileIcon} width={50} height={50} alt="profileicon" className="ml-2"></Image>
                        <span className="ml-2 text-2xl font-medium">John Doe </span>
                    </div>
                    <div>
                        <Image src={More} width={5} height={5} alt="more"></Image>
                    </div>
                </div>
                <form className="mb-5 h-[550px] bg-white p-4 dark:border-[#191e3a] dark:bg-black">
                    <h6 className="mb-5 text-lg font-bold">Contact Information</h6>

                    <div className="flex flex-col sm:flex-row">
                        <div className="mb-5 w-full sm:w-2/12 ltr:sm:mr-4 rtl:sm:ml-4">
                            <Image src={ProfileIcon} width={160} height={160} alt="profileicon"></Image>
                        </div>
                        <div className="grid flex-1 grid-cols-1 gap-5 sm:grid-cols-2">
                            <div>
                                <label htmlFor="name">Full Name</label>
                                <input id="name" type="text" placeholder="Full Name" className="form-input" />
                            </div>
                            <div>
                                <label htmlFor="profession">Job Title</label>
                                <input id="Job Title" type="text" placeholder="Job Title" className="form-input" />
                            </div>
                            <div>
                                <label htmlFor="profession">Phone Number</label>
                                <input id="Phone Number" type="text" placeholder="Phone Number" className="form-input" />
                            </div>
                            {/* <div>
                                <label htmlFor="country">Country</label>
                                <select id="country" className="form-select text-white-dark" name="country" defaultValue="United States">
                                    <option value="All Countries">All Countries</option>
                                    <option value="United States">United States</option>
                                    <option value="India">India</option>
                                    <option value="Japan">Japan</option>
                                    <option value="China">China</option>
                                    <option value="Brazil">Brazil</option>
                                    <option value="Norway">Norway</option>
                                    <option value="Canada">Canada</option>
                                </select>
                            </div> */}
                            <div>
                                <label htmlFor="address">Email</label>
                                <input id="Email" type="text" placeholder="Email" className="form-input" />
                            </div>
                            <div>
                                <label htmlFor="location">Company</label>
                                <input id="Company" type="text" placeholder="Company" className="form-input" />
                            </div>
                            <div>
                                <label htmlFor="phone">Website</label>
                                <input id="Website" type="text" placeholder="Website" className="form-input" />
                            </div>
                            {/* <div>
                                <label htmlFor="email">Email</label>
                                <input id="email" type="email" placeholder="Jimmy@gmail.com" className="form-input" />
                            </div>
                            <div>
                                <label htmlFor="web">Website</label>
                                <input id="web" type="text" placeholder="Enter URL" className="form-input" />
                            </div> */}
                            {/* <div>
                                <label className="inline-flex cursor-pointer">
                                    <input type="checkbox" className="form-checkbox" />
                                    <span className="relative text-white-dark checked:bg-none">Make this my default address</span>
                                </label>
                            </div> */}
                        </div>
                    </div>
                    <div className="mt-7  flex items-center justify-end gap-5 ">
                        <button type="button" className=" underline underline-offset-4">
                            Cancel
                        </button>
                        <button type="button" className="btn btn-primary  h-[40px] w-[130px]">
                            Update
                        </button>
                    </div>
                </form>
            </div>
        </>
    );
}

export default contactEdit;
