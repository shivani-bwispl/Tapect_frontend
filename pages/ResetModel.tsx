import React, { useState } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { Fragment } from 'react';
import { FieldError, useForm } from 'react-hook-form';
import axios from 'axios'; // Import Axios for making HTTP requests
import { ToastContainer, toast } from 'react-toastify'; // Import ToastContainer and toast from react-toastify
import 'react-toastify/dist/ReactToastify.css'; // Import default CSS for react-toastify
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';

import IconX from '@/components/Icon/IconX';
import axiosInstance from '@/services/api';
import { FieldErrors } from 'react-hook-form';
import router from 'next/dist/client/router';


const ResetModel = ({ isOpen, onClose, modalContentId }) => {
    const {
        register,
        handleSubmit,
        formState: { errors },
        watch,
        reset,
    } = useForm();

    const newPassword = watch('newPassword');
    const currentPassword = watch('currentPassword');
    const MySwal = withReactContent(Swal);

    const showToast = () => {
        MySwal.fire({
            title: 'Reset successfully',
            toast: true,
            position: 'top',
            showConfirmButton: false,
            timer: 3000,
            background: '#4CAF50',
            showCloseButton: true,
        });
    };
    const showAlert = async (type: number) => {
        if (type === 10) {
            Swal.fire({
                icon: 'warning',
                title: 'Are you sure?',
                text: "You won't be able to revert this!",
                showCancelButton: true,
                confirmButtonText: 'Delete',
                padding: '2em',
                customClass: 'sweet-alerts',
            }).then((result) => {
                if (result.value) {
                    Swal.fire({ title: 'Deleted!', text: 'Your file has been deleted.', icon: 'success', customClass: 'sweet-alerts' });
                }
            });
        }
    };

    const onSubmitContent1 = async (data) => {
        try {
            const userId = localStorage.getItem('userId');
            if (!userId) {
                throw new Error('User ID not found in localStorage');
            }
            const auth = localStorage.getItem('token');


            if (!auth || auth === "null") {
                // Display error message
                console.error('Token not found in localStorage');
                // Redirect to login page
                router.push('/Login');
                return;
            }

            const config = {
                headers: {
                    'Authorization': `Bearer ${auth}`, // Set the authorization header properly
                },
            };
            const response = await axiosInstance.post('/changePassword/', {
                userId: userId,
                currentPassword: data.currentPassword,
                newPassword: data.newPassword,
                
            },config);

            console.log(response.data);
            reset();

            // Show success toast message
            toast.success('Password updated successfully!');

            // Redirect to the login page after successful password change
            setTimeout(() => {
                localStorage.removeItem('userId');
                window.location.href = '/Login';
            }, 2000); // Redirect after 2 seconds
        } catch (error) {
            console.error(error);
            // Handle errors here (e.g., show error message to the user)
        }
    };

    const onSubmitContent2 = async (data) => {
        // Handle submission logic for content2 here
        console.log('Submitting content2 form...');
    };

    const handleSubmitForm = (data) => {
        if (modalContentId === 'content1') {
            onSubmitContent1(data);
        } else if (modalContentId === 'content2') {
            onSubmitContent2(data);
        }
    };

    return (
        <>
        {isOpen && (
            <div style={{ display: isOpen ? 'block' : 'none' }}>
                <Transition appear show={isOpen} as={Fragment}>
                    <Dialog as="div" open={isOpen} onClose={onClose}>
                        <Transition.Child
                            as={Fragment}
                            enter="ease-out duration-300"
                            enterFrom="opacity-0"
                            enterTo="opacity-100"
                            leave="ease-in duration-200"
                            leaveFrom="opacity-100"
                            leaveTo="opacity-0"
                        >
                            <div className="fixed inset-0" />
                        </Transition.Child>
                        <div className="fixed inset-0 z-[999] bg-[black]/60">
                            <div className="flex min-h-screen items-start justify-center px-4">
                                <Transition.Child
                                    as={Fragment}
                                    enter="ease-out duration-300"
                                    enterFrom="opacity-0 scale-95"
                                    enterTo="opacity-100 scale-100"
                                    leave="ease-in duration-200"
                                    leaveFrom="opacity-100 scale-100"
                                    leaveTo="opacity-0 scale-95"
                                >
                                    <Dialog.Panel className="panel my-8 w-[40vw] max-w-5xl overflow-x-hidden overflow-y-scroll rounded-[20px] border-0 bg-white p-0 px-5 py-5 text-black dark:text-white-dark">
                                        <div className="flex items-center justify-end dark:bg-[#121c2c]">
                                            <button
                                                onClick={() => {
                                                    onClose(false);
                                                }}
                                                type="button"
                                                className="text-white-dark hover:text-dark"
                                            >
                                                <IconX className="mt-2 w-12 pl-4" />
                                            </button>
                                        </div>
                                        <div className="modal-content">
                                            {modalContentId === 'content1' && (
                                                <form onSubmit={handleSubmit(handleSubmitForm)}>
                                                    <div>
                                                        <h2 className="mb-3 text-lg font-bold">Login Forms Code</h2>
                                                        <div className="my-2">
                                                            <h2 className="pb-2 text-sm font-normal">
                                                                Current password
                                                                {errors.currentPassword && <span className="text-red-500">*</span>}
                                                            </h2>
                                                            <input type="password" {...register('currentPassword', { required: true })} className="form-input h-[45px]" />
                                                        </div>
                                                        <div className="my-2">
                                                            <h2 className="pb-2 text-sm font-normal">
                                                                New password
                                                                {errors.newPassword && <span className="text-red-500">*</span>}
                                                            </h2>
                                                            <input
                                                                type="password"
                                                                {...register('newPassword', {
                                                                    required: true,
                                                                    validate: (value) => value !== currentPassword || 'New password cannot be same as the Current Password',
                                                                })}
                                                                className="form-input h-[45px]"
                                                            />
                                                            {errors.newPassword && (
                                                                <p className="text-red-500">
                                                                    {typeof errors.newPassword === 'string'
                                                                        ? errors.newPassword
                                                                        : (errors.newPassword as FieldError)?.message}
                                                                </p>
                                                            )}
                                                        </div>
                                                        <div className="my-2">
                                                            <h2 className="pb-2 text-sm font-normal">
                                                                Confirm password
                                                                {errors.confirmPassword && <span className="text-red-500">*</span>}
                                                            </h2>
                                                            <input
                                                                type="password"
                                                                {...register('confirmPassword', { required: true, validate: (value) => value === newPassword || 'Passwords do not match' })}
                                                                className="form-input h-[45px]"
                                                            />
                                                            {errors.confirmPassword && (
                                                                <p className="text-red-500">
                                                                    {typeof errors.confirmPassword === 'string'
                                                                        ? errors.confirmPassword
                                                                        : (errors.confirmPassword as FieldError)?.message}
                                                                </p>
                                                            )}
                                                        </div>
    
                                                        <div className="flex justify-end">
                                                            <button type="button" className="mr-10 underline underline-offset-4" onClick={() => onClose(false)}>
                                                                Cancel
                                                            </button>
    
                                                            <button type="submit" className="btn btn-primary mr-5 h-[40px] w-[130px]">
                                                                Update
                                                            </button>
                                                        </div>
                                                    </div>
                                                </form>
                                            )}
                                            {modalContentId === 'content2' && (
                                                <div>
                                                    <div>
                                                        <h2 className="mb-5 text-2xl font-semibold">Delete Account</h2>
                                                        <span className="font-md mt-5">Are you sure, You want to delete your account?</span>
                                                    </div>
                                                    <div className="mt-4 flex items-center justify-end gap-5">
                                                        <button type="button" className="underline underline-offset-4" onClick={() => onClose(false)}>
                                                            Cancel
                                                        </button>
    
                                                        <button type="button" className="btn btn-primary h-[40px] w-[130px] bg-[#E7515A]" onClick={() => showAlert(10)}>
                                                            Delete
                                                        </button>
                                                    </div>
                                                </div>
                                            )}
                                        </div>
                                    </Dialog.Panel>
                                </Transition.Child>
                            </div>
                        </div>
                    </Dialog>
                </Transition>
            </div>
        )}
        <ToastContainer /> {/* Toast container for displaying toast messages */}
    </>
    
    );
};

export default ResetModel;
