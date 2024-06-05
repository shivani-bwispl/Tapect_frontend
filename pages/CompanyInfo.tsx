import React, { useEffect, useState } from 'react';
import { FieldError, useForm } from 'react-hook-form';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content'; // Import the toast utility service
import axiosInstance from '@/services/api';
import { FieldErrors } from 'react-hook-form';
import router from 'next/dist/client/router';

interface FormData {
    company_name: string;
    company_contact: string;
    street_address: string;
    city: string;
    state: string;
    country: string;
    post_code: string;
    website: string;
}

const CompanyInfo = ({ formData, handleInputChange }) => {
    const {
        register,
        handleSubmit,
        setValue,
        formState: { errors },
    } = useForm();
    const MySwal = withReactContent(Swal);

    const showToast = () => {
        MySwal.fire({
            title: 'Company details updated successfully',
            toast: true,
            position: 'top',
            showConfirmButton: false,
            timer: 3000,
            background: '#4CAF50',
            showCloseButton: true,
        });
    };

    const [companyProfiles, setCompanyProfile] = useState(null);
    useEffect(() => {
        const fetchCompanyProfile = async () => {
            try {
                const userId = localStorage.getItem('userId');
                if (!userId) {
                    throw new Error('User ID not found in localStorage');
                }
                const auth = localStorage.getItem('token');
    
            if (!auth || auth === "null") {
                throw new Error('Token not found in localStorage');
            }
    
            const config = {
                headers: {
                    'Authorization': `Bearer ${auth}`, // Set the authorization header properly
                },
            };
                const response = await axiosInstance.get(`/CompanyProfile/${userId}`,config);
                const profileData = response.data;

                // Set initial form values using setValue
                Object.keys(profileData).forEach((key) => {
                    setValue(key, profileData[key]);
                });

                setCompanyProfile(profileData);
            } catch (error) {
                console.error('Error fetching company profile:', error.message);
            }
        };

        fetchCompanyProfile();
    }, [setValue]); // Include setValue in the dependency array

    const handleCompanyUpdate = async (data) => {
        try {
            const userId = localStorage.getItem('userId');
            if (!userId) {
                throw new Error('User ID not found in localStorage');
            }

            // Include userId in the data object
            data.userId = userId;
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
            const response = await axiosInstance.post('/CompanyProfile/', data,config);
            console.log(response.data); // Log the response from the server
            // Display toast on successful form submission
            showToast();
            // Optionally, perform any additional actions after successful update
        } catch (error) {
            console.error('Error updating company profile:', error.message);
            // Optionally, handle the error and display an error message to the user
        }
    };

    return (
        <>
            <div className=" mt-3  h-[calc(90vh-5rem)] p-3">
                <span className="  text-lg font-bold">Company info</span>

                <form className="space-y-5 py-2" onSubmit={handleSubmit(handleCompanyUpdate)} noValidate>
                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                        <div>
                            <label htmlFor="company_Name" className="text-[13px]">
                                Company Name
                            </label>
                            <input
                                id="company_name"
                                type="text"
                                name="company_name"
                                className="form-input"
                                {...register('company_name', {
                                    required: " Enter your company's name",
                                    minLength: { value: 2, message: 'Company name must be at least 2 characters' },
                                })}
                                onChange={handleInputChange}
                                defaultValue={companyProfiles ? companyProfiles.company_name : ''}
                                placeholder=" Enter Company name"
                            />
                            {errors.company_name && (
                                <p className="text-red-500">
                                    {typeof errors.company_name === 'string'
                                        ? errors.company_name
                                        : (errors.company_name as FieldError)?.message}
                                </p>
                            )}



                            {/* {errors.company_name && <p className="text-red-500">{errors.company_name.message}</p>} */}
                        </div>
                        <div>
                            <label htmlFor="company_contact" className="text-[13px]">
                                Contact
                            </label>
                            <input
                                id="company_contact"
                                type="text"
                                name="company_contact"
                                className="form-input"
                                {...register('company_contact', {
                                    required: {
                                        value: true,
                                        message: 'Contact is required.',
                                    },
                                    pattern: {
                                        value: /^\+[0-9]{1,3}[0-9]{9}$/,
                                        message: 'Invalid phone number format (Example +79876543210)',
                                    },
                                })}
                                onChange={handleInputChange}
                                defaultValue={companyProfiles ? companyProfiles.company_contact : ''}
                                placeholder=" Enter Company Contact"
                            />
                            {errors.company_contact && (
                                <p className="text-red-500">
                                    {typeof errors.company_contact === 'number'
                                        ? errors.company_contact
                                        : (errors.company_contact as FieldError)?.message}
                                </p>
                            )}
                            {/* {errors.company_contact && <p className="text-red-500">{errors.company_contact.message}</p>} */}
                        </div>
                        <div>
                            <label htmlFor="street_address" className="text-[13px]">
                                Street Address
                            </label>
                            <input
                                id="street_address"
                                type="text"
                                name="street_address"
                                className="form-input"
                                {...register('street_address', {
                                    required: 'Address is required',
                                    maxLength: { value: 100, message: 'Address cannot exceed 100 characters' },
                                })}
                                onChange={handleInputChange}
                                defaultValue={companyProfiles ? companyProfiles.street_address : ''}
                                placeholder=" Enter Street Address"
                            />
                            {errors.street_address && (
                                <p className="text-red-500">
                                    {typeof errors.street_address === 'string'
                                        ? errors.street_address
                                        : (errors.street_address as FieldError)?.message}
                                </p>
                            )}
                            {/* {errors.street_address && <p className="text-red-500">{errors.street_address.message}</p>} */}
                        </div>
                        <div>
                            <label htmlFor="city" className="text-[13px]">
                                City
                            </label>
                            <input
                                id="city"
                                type="text"
                                name="city"
                                className="form-input"
                                {...register('city', {
                                    required: 'City is required',
                                    maxLength: { value: 100, message: 'City name cannot exceed 100 characters' },
                                    pattern: {
                                        value: /^[a-zA-Z0-9\s,]*$/,
                                        message: 'City can only contain alphanumeric characters, spaces, and commas',
                                    },
                                })}
                                onChange={handleInputChange}
                                defaultValue={companyProfiles ? companyProfiles.city : ''}
                                placeholder=" Enter City Name"
                            />
                            {errors.city && (
                                <p className="text-red-500">
                                    {typeof errors.city === 'string'
                                        ? errors.city
                                        : (errors.city as FieldError)?.message}
                                </p>
                            )}
                            {/* {errors.city && <p className="text-red-500">{errors.city.message}</p>} */}
                        </div>
                        <div>
                            <label htmlFor="state" className="text-[13px]">
                                State
                            </label>
                            <input
                                id="state"
                                type="text"
                                name="state"
                                className="form-input"
                                {...register('state', {
                                    required: 'State is required',
                                    maxLength: { value: 100, message: 'State cannot exceed 100 characters' },
                                    pattern: {
                                        value: /^[a-zA-Z0-9\s,]*$/,
                                        message: 'State can only contain alphanumeric characters, spaces, and commas',
                                    },
                                })}
                                onChange={handleInputChange}
                                defaultValue={companyProfiles ? companyProfiles.state : ''}
                                placeholder=" Enter State Name"
                            />
                            {errors.state && (
                                <p className="text-red-500">
                                    {typeof errors.state === 'string'
                                        ? errors.state
                                        : (errors.state as FieldError)?.message}
                                </p>
                            )}
                            {/* {errors.state && <p className="text-red-500">{errors.state.message}</p>} */}
                        </div>
                        <div>
                            <label htmlFor="country" className="text-[13px]">
                                Country
                            </label>
                            <input
                                id="country"
                                type="text"
                                name="country"
                                className="form-input"
                                {...register('country', {
                                    required: 'Country is required',
                                    maxLength: { value: 100, message: 'Country cannot exceed 100 characters' },
                                    pattern: {
                                        value: /^[a-zA-Z0-9\s,]*$/,
                                        message: 'Country can only contain alphanumeric characters, spaces, and commas',
                                    },
                                })}
                                onChange={handleInputChange}
                                defaultValue={companyProfiles ? companyProfiles.country : ''}
                                placeholder=" Enter Country Name"
                            />
                            {errors.country && (
                                <p className="text-red-500">
                                    {typeof errors.country === 'string'
                                        ? errors.country
                                        : (errors.country as FieldError)?.message}
                                </p>
                            )}
                            {/* {errors.country && <p className="text-red-500">{errors.country.message}</p>} */}
                        </div>

                        <div>
                            <label htmlFor="post_code" className="text-[13px]">
                                PostalCode
                            </label>
                            <input
                                id="post_code"
                                type="text"
                                name="post_code"
                                className="form-input"
                                {...register('post_code', {
                                    required: 'Postal Code is required',
                                })}
                                onChange={handleInputChange}
                                defaultValue={companyProfiles ? companyProfiles.post_code : ''}
                                placeholder=" Enter Postal Code"
                            />
                            {errors.post_code && (
                                <p className="text-red-500">
                                    {typeof errors.post_code === 'string'
                                        ? errors.post_code
                                        : (errors.post_code as FieldError)?.message}
                                </p>
                            )}
                            {/* {errors.post_code && <p className="text-red-500">{errors.post_code.message}</p>} */}
                        </div>

                        <div>
                            <label htmlFor="website" className="text-[13px]">
                                Website
                            </label>
                            <input
                                id="website"
                                type="text"
                                name="website"
                                className="form-input"
                                {...register('website', {
                                    required: 'Website is required',
                                    maxLength: { value: 100, message: 'Website cannot exceed 100 characters' },
                                    pattern: {
                                        value: /^(https?:\/\/)/i,
                                        message: 'Website must start with http:// or https://',
                                    },
                                })}
                                onChange={handleInputChange}
                                defaultValue={companyProfiles ? companyProfiles.website : ''}
                                placeholder=" Enter Website URL"
                            />
                            {errors.website && (
                                <p className="text-red-500">
                                    {typeof errors.website === 'string'
                                        ? errors.website
                                        : (errors.website as FieldError)?.message}
                                </p>
                            )}
                            {/* {errors.website && <p className="text-red-500">{errors.website.message}</p>} */}
                        </div>
                        {/* </React.Fragment>
                        ))} */}
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
        </>
    );
};

export default CompanyInfo;
