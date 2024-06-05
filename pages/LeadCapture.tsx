import React from 'react';
import { useLeadCapture } from '../components/LeadCaptureContext';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
const LeadCapture = () => {
    const {
        showPhonenumberInput,
        showEmailInput,
        showCompanyInput,
        showWebsiteInput,
        showJobtitleInput,
        handlePhonenumberToggle,
        handleEmailToggle,
        handleCompanyToggle,
        handleWebsiteToggle,
        handleJobtitleToggle,
    }: any = useLeadCapture();
    const MySwal = withReactContent(Swal);

    const showToast = () => {
        MySwal.fire({
            title: 'Lead capture form updated successfully',
            toast: true,
            position: 'top',
            showConfirmButton: false,
            timer: 3000,
            background: '#4CAF50',
            showCloseButton: true,
        });
    };
    return (
        <div>
            <form className=" w-full rounded-md bg-white p-2  dark:border-[#191E3A] dark:bg-black">
                <div className=" ml-3 flex  w-full items-center justify-start ">
                    <h6 className=" mb-3 mt-3 text-lg font-bold">Lead Capture</h6>
                </div>
                <div className=" flex  flex-col items-start   ">
                    <div className="m-1 flex h-[60px] w-full items-center justify-between rounded-xl   bg-purple-BGCOLOR">
                        <span className=" ml-4 text-sm font-normal">Full name</span>
                        <div className=" flex gap-2">
                            <span className="text-slate-500">Mandotary</span>
                            <div className="relative mr-4 h-6 w-12 ">
                                <input type="checkbox" checked disabled className="custom_switch peer absolute  h-full w-full cursor-pointer opacity-0" id="custom_switch_checkbox1" />
                                <span className=" block h-full rounded-full bg-[#EBEDF2] opacity-50 before:absolute before:bottom-1 before:left-1 before:h-4 before:w-4 before:rounded-full before:bg-white before:transition-all before:duration-300 peer-checked:bg-primary peer-checked:before:left-7 dark:bg-dark dark:before:bg-white-dark dark:peer-checked:before:bg-white"></span>
                            </div>
                        </div>
                    </div>
                    <div className=" m-1 flex h-[60px] w-full items-center justify-between rounded-xl bg-purple-BGCOLOR   ">
                        <span className=" ml-4 text-sm font-normal">Email</span>
                        <span className="relative mr-4 h-6 w-12 ">
                            <input
                                type="checkbox"
                                className="custom_switch peer absolute  h-full w-full cursor-pointer opacity-0"
                                id="custom_switch_checkbox1"
                                checked={showEmailInput}
                                onChange={handleEmailToggle}
                            />
                            <span className="block h-full rounded-full bg-[#EBEDF2] before:absolute before:bottom-1 before:left-1 before:h-4 before:w-4 before:rounded-full before:bg-white before:transition-all before:duration-300 peer-checked:bg-primary peer-checked:before:left-7 dark:bg-dark dark:before:bg-white-dark dark:peer-checked:before:bg-white"></span>
                        </span>
                    </div>
                    <div className=" m-1 flex h-[60px] w-full items-center justify-between rounded-xl   bg-purple-BGCOLOR ">
                        <span className=" ml-4 text-sm font-normal">Mobile Number</span>
                        <span className="relative mr-4 h-6 w-12">
                            <input
                                type="checkbox"
                                className="custom_switch peer absolute  h-full w-full cursor-pointer opacity-0"
                                id="custom_switch_checkbox1"
                                checked={showPhonenumberInput}
                                onChange={handlePhonenumberToggle}
                            />
                            <span className="block h-full rounded-full bg-[#EBEDF2] before:absolute before:bottom-1 before:left-1 before:h-4 before:w-4 before:rounded-full before:bg-white before:transition-all before:duration-300 peer-checked:bg-primary peer-checked:before:left-7 dark:bg-dark dark:before:bg-white-dark dark:peer-checked:before:bg-white"></span>
                        </span>
                    </div>
                    <div className=" m-1 flex h-[60px] w-full items-center justify-between rounded-xl   bg-purple-BGCOLOR   ">
                        <span className=" ml-4 text-sm font-normal">Job Title/Position</span>
                        <span className="relative mr-4 h-6 w-12">
                            <input
                                type="checkbox"
                                className="custom_switch peer absolute  h-full w-full cursor-pointer opacity-0"
                                id="custom_switch_checkbox1"
                                checked={showJobtitleInput}
                                onChange={handleJobtitleToggle}
                            />
                            <span className="block h-full rounded-full bg-[#EBEDF2] before:absolute before:bottom-1 before:left-1 before:h-4 before:w-4 before:rounded-full before:bg-white before:transition-all before:duration-300 peer-checked:bg-primary peer-checked:before:left-7 dark:bg-dark dark:before:bg-white-dark dark:peer-checked:before:bg-white"></span>
                        </span>
                    </div>
                    <div className=" m-1 flex  h-[60px] w-full items-center  justify-between rounded-xl   bg-purple-BGCOLOR  ">
                        <span className=" ml-4 text-sm font-normal">Company name</span>
                        <span className="relative mr-4 h-6 w-12 ">
                            <input
                                type="checkbox"
                                className="custom_switch peer absolute  h-full w-full cursor-pointer opacity-0"
                                id="custom_switch_checkbox1"
                                checked={showCompanyInput}
                                onChange={handleCompanyToggle}
                            />
                            <span className="block h-full rounded-full bg-[#EBEDF2] before:absolute before:bottom-1 before:left-1 before:h-4 before:w-4 before:rounded-full before:bg-white before:transition-all before:duration-300 peer-checked:bg-primary peer-checked:before:left-7 dark:bg-dark dark:before:bg-white-dark dark:peer-checked:before:bg-white"></span>
                        </span>
                    </div>
                    <div className=" m-1 flex h-[60px] w-full items-center  justify-between rounded-xl   bg-purple-BGCOLOR  ">
                        <span className=" ml-4 text-sm font-normal">Website</span>
                        <span className="relative mr-4 h-6 w-12 ">
                            <input
                                type="checkbox"
                                className="custom_switch peer absolute  h-full w-full cursor-pointer opacity-0"
                                id="custom_switch_checkbox1"
                                checked={showWebsiteInput}
                                onChange={handleWebsiteToggle}
                            />
                            <span className="block h-full rounded-full bg-[#EBEDF2] before:absolute before:bottom-1 before:left-1 before:h-4 before:w-4 before:rounded-full before:bg-white before:transition-all before:duration-300 peer-checked:bg-primary peer-checked:before:left-7 dark:bg-dark dark:before:bg-white-dark dark:peer-checked:before:bg-white"></span>
                        </span>
                    </div>
                </div>
                <div className="mt-5  flex items-center justify-end gap-4 ">
                    <button type="button" className=" underline underline-offset-4">
                        Cancel
                    </button>
                    <button type="button" className="btn btn-primary  h-[40px] w-[130px] " onClick={showToast}>
                        Update
                    </button>
                </div>
            </form>
        </div>
    );
};
export default LeadCapture;
