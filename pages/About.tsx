
import router from 'next/router';
import React, { useState, useEffect } from 'react';
import { FieldError, useForm } from 'react-hook-form';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content'; // Import the toast utility service
import axiosInstance from '../services/api'; // Import axiosInstance from api.js
import { FieldErrors } from 'react-hook-form';

const MySwal = withReactContent(Swal);

const About = ({ formData, handleInputChange }) => {
    const { register, handleSubmit, formState: { errors }, setValue } = useForm();

    const showToast = () => {
        MySwal.fire({
            title: 'Profile updated successfully',
            toast: true,
            position: 'top',
            showConfirmButton: false,
            timer: 3000,
            background: '#4CAF50',
            showCloseButton: true,
        });
    };


    useEffect(() => {
        const fetchUserProfile = async () => {
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
                const response = await axiosInstance.get(`/profileUpdate/${userId}`, config);
                const userProfileData = response.data;
                Object.keys(userProfileData).forEach((key) => {
                    setValue(key, userProfileData[key]);
                });
            } catch (error) {
                console.error('Error fetching user profile:', error.message); // Fixed errors.message to error.message
            }
        };

        fetchUserProfile(); // Call fetchUserProfile when the component mounts
    }, []);

    
    const handleAboutFormUpdate = async (data: any) => {
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
            // Include userId in the data object
            data.userId = userId;

            const response = await axiosInstance.post('/profileUpdate/', data, config);
            // console.log(response.data); // Log the response from the server
            router.replace(router.asPath);

            // Display toast on successful form submission
            showToast();

        } catch (error) {
            console.error('Error updating user profile:', error.message);
        }
        console.log('Form Submitted!', data);
    };


    

    return (
        <>
            <div >
                <div id="forms_grid ">
                    <div className=" mt-5  px-3 ">
                        <span className=" text-lg font-bold">Profile Details</span>
                        <form className="my-2 space-y-5 py-2" onSubmit={handleSubmit(handleAboutFormUpdate)} noValidate>
                            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                                <div>
                                    <label htmlFor="first_name" className="text-[13px] ">
                                        First Name
                                    </label>
                                    <input
                                        id="first_name"
                                        type="text"
                                        name="first_name"
                                        className="form-input"
                                        {...register('first_name', {
                                            required: 'First name is required',
                                            maxLength: { value: 100, message: 'First name cannot exceed 100 characters' },
                                        })}
                                        onChange={handleInputChange}
                                        defaultValue={formData ? formData.first_name : ''}
                                        placeholder="Enter First name"
                                    />
                                    {errors.first_name && (
                                        <p className="text-red-500">
                                            {typeof errors.first_name === 'string'
                                                ? errors.first_name
                                                : (errors.first_name as FieldError)?.message}
                                        </p>
                                    )}
                                </div>
                                <div>
                                    <label htmlFor="last_name" className="text-[13px]">
                                        Last Name
                                    </label>
                                    <input
                                        id="last_name"
                                        type="text"
                                        name="last_name"
                                        className="form-input"
                                        {...register('last_name', {
                                            required: 'Last name is required',
                                            maxLength: { value: 100, message: 'Last name cannot exceed 100 characters' },
                                        })}
                                        onChange={handleInputChange}
                                        defaultValue={formData ? formData.last_name : ''}
                                        placeholder="Enter last name"
                                    />
                                    {errors.last_name && (
                                        <p className="text-red-500">
                                            {typeof errors.last_name === 'string'
                                                ? errors.last_name
                                                : (errors.last_name as FieldError)?.message}
                                        </p>
                                    )}
                                </div>
                                <div>
                                    <label htmlFor="job_title" className="text-[13px]">
                                        Job Title
                                    </label>
                                    <input
                                        id="job_title"
                                        type="text"
                                        name="job_title"
                                        className="form-input"
                                        {...register('job_title', {
                                            required: 'Job title is required',
                                            maxLength: { value: 100, message: 'Job title cannot exceed 100 characters' },
                                        })}
                                        onChange={handleInputChange}
                                        defaultValue={formData ? formData.job_title : ''}
                                        placeholder="Enter job title"
                                    />
                                    {errors.job_title && (
                                        <p className="text-red-500">
                                            {typeof errors.job_title === 'string'
                                                ? errors.job_title
                                                : (errors.job_title as FieldError)?.message}
                                        </p>
                                    )}
                                </div>
                                <div>
                                    <label htmlFor="organization_name" className="text-[13px]">
                                        Company
                                    </label>
                                    <input
                                        id="organization_name"
                                        type="text"
                                        name="organization_name"
                                        className="form-input"
                                        {...register('organization_name', {
                                            required: 'Company name is required',
                                            maxLength: { value: 100, message: 'Company name cannot exceed 100 characters' },
                                        })}
                                        onChange={handleInputChange}
                                        defaultValue={formData ? formData.organization_name : ''}
                                        placeholder="Enter organization name"
                                    />
                                    {errors.organization_name && (
                                        <p className="text-red-500">
                                            {typeof errors.organization_name === 'string'
                                                ? errors.organization_name
                                                : (errors.organization_name as FieldError)?.message}
                                        </p>
                                    )}
                                </div>
                                <div>
                                    <label htmlFor="profile_email" className="text-[13px]">
                                        Email
                                    </label>
                                    <input
                                        id="profile_email"
                                        type="email"
                                        className="form-input"
                                        name="profile_email"
                                        {...register('profile_email', {
                                            required: 'Email is required',
                                            pattern: {
                                                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
                                                message: 'Please enter a valid email address',
                                            },
                                        })}
                                        onChange={handleInputChange}
                                        defaultValue={formData ? formData.profile_email : ''}
                                        placeholder="Enter email address"
                                    />
                                    {errors.profile_email && (
                                        <p className="text-red-500">
                                            {typeof errors.profile_email === 'string'
                                                ? errors.profile_email
                                                : (errors.profile_email as FieldError)?.message}
                                        </p>
                                    )}
                                </div>
                                <div>
                                    <label htmlFor="phone_number" className="text-[13px]">
                                        Phone Number
                                    </label>
                                    <input
                                        id="phone_number"
                                        type="tel"
                                        className="form-input"
                                        name="phone_number"
                                        {...register('phone_number', {
                                            required: 'Phone number is required',
                                            pattern: {
                                                value: /^[0-9]{10}$/,
                                                message: 'Phone number must be 10 digits and contain only numbers',
                                            },
                                        })}
                                        onChange={handleInputChange}
                                        defaultValue={formData ? formData.phone_number : ''}
                                        placeholder="Enter phone number"
                                    />
                                    {errors.phone_number && (
                                        <p className="text-red-500">
                                            {typeof errors.phone_number === 'string'
                                                ? errors.phone_number
                                                : (errors.phone_number as FieldError)?.message}
                                        </p>
                                    )}
                                </div>
                            </div>

                            <div>
                                <label className="text-[13px]"> Bio</label>
                                <textarea 
                                    className=" h-[80px] rounded w-full resize-none whitespace-normal border  border-white-light p-2 focus:outline-0"
                                    name="note"
                                    {...register('note', { required: false, maxLength: 250 })}
                                    onChange={handleInputChange}
                                    defaultValue={formData ? formData.note : ''}
                                    placeholder="Note"
                                ></textarea>

                                <p className="text-right text-primary">{250 - (formData ? formData.note.length : 0)} characters remaining</p>
                            </div>

                            <div className="mt-4 flex justify-end">
                                <button type="button" className="mr-10 underline underline-offset-4">
                                    Cancel
                                </button>
                                <button type="submit" className="btn btn-primary mr-5 h-[40px] w-[130px]">
                                    Update
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </>
    );
};

export default About;

