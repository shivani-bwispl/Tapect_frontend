import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { useColorContext } from '../components/ColorContext';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import axiosInstance from '@/services/api';

const ColorPicker = ({ category, label }: any) => {
    const { backgroundColor, textColor, buttonColor, buttontextColor, updateBackgroundColor, updateTextColor, updateButtonColor, updateButtonTextColor, setFlag }: any = useColorContext();
    const [pickedColor, setPickedColor] = useState('');
    const [pickedColorFormat, setPickedColorFormat] = useState('hexa');
    const router = useRouter();

    const RGBAToRGB = (color: string) => {
        // Convert RGBA color to RGB
        const rgbaValues = color.match(/\d+(\.\d+)?/g);
        if (rgbaValues && rgbaValues.length === 4) {
            // Ensure we have RGBA values
            const r = parseInt(rgbaValues[0]);
            const g = parseInt(rgbaValues[1]);
            const b = parseInt(rgbaValues[2]);
            return `rgb(${r}, ${g}, ${b})`;
        } else {
            return 'Invalid input color';
        }
    };
    const MySwal = withReactContent(Swal);

    const showToast = () => {
        MySwal.fire({
            title: 'Your Theme  updated successfully',
            toast: true,
            position: 'top',
            showConfirmButton: false,
            timer: 3000,
            background: '#4CAF50',
            showCloseButton: true,
        });
    };

    const RGBToHex = (color: string) => {
        // Convert RGB color to hexadecimal
        const rgbValues = color.match(/\d+/g);
        if (rgbValues && rgbValues.length === 3) {
            // Ensure we have RGB values
            const r = parseInt(rgbValues[0]);
            const g = parseInt(rgbValues[1]);
            const b = parseInt(rgbValues[2]);
            return `#${r.toString(16).padStart(2, '0')}${g.toString(16).padStart(2, '0')}${b.toString(16).padStart(2, '0')}`;
        } else {
            return 'Invalid input color';
        }
    };

    useEffect(() => {
        setPickedColor(getCategoryColor());
    }, [category, backgroundColor, textColor, buttonColor, buttontextColor]);

    const updateColorFunctions = {
        backgroundColor: updateBackgroundColor,
        textColor: updateTextColor,
        buttonColor: updateButtonColor,
        buttontextColor: updateButtonTextColor,
    };

    const handleColorChange = async (newColor: string) => {
        let color = newColor;
        let format = 'hexa'; // Default format

        // Determine the format of the new color
        if (newColor.startsWith('rgb')) {
            color = RGBToHex(RGBAToRGB(newColor));
            format = 'rgb';
        } else if (newColor.startsWith('#')) {
            format = 'hex';
        } else {
            console.error('Invalid color format:', newColor);
            return;
        }

        setPickedColor(color);
        setPickedColorFormat(format);
        setFlag(1);

        const updateColorFunction = updateColorFunctions[category];
        if (updateColorFunction) {
            updateColorFunction(color);
        }

        // Set a new timeout to call the API after 2000 milliseconds (2 seconds)
        const timeoutId = setTimeout(async () => {
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
                const response = await axiosInstance.post('/CustomizeProfile', {
                    userId: userId,
                    backgroundColor: category === 'backgroundColor' ? color : backgroundColor,
                    textColor: category === 'textColor' ? color : textColor,
                    buttonColor: category === 'buttonColor' ? color : buttonColor,
                    buttontextColor: category === 'buttontextColor' ? color : buttontextColor,}
                    , {
                        headers: {
                            ...config.headers, // Include headers from the config object
                            'Authorization': `Bearer ${auth}`, // Set the authorization header properly
                            'UserId': userId, // Set userId in the header
                        },
                });

                if (response.status === 201 || response.status === 200) {
                    router.replace(router.asPath);
                    console.log(response.data.message);
                    showToast();
                } else {
                    console.error('Failed to customize theme:', response.statusText);
                }
            } catch (error) {
                console.error('Error occurred while customizing theme:', error);
            }
        }, 2000); // 2000 milliseconds timeout
    };

    const getCategoryColor = () => {
        const categoryMap: any = {
            backgroundColor: backgroundColor,
            textColor: textColor,
            buttonColor: buttonColor,
            buttontextColor: buttontextColor,
        };

        const categoryColor = categoryMap[category];

        // Convert the color to HEX if it's in RGBA format
        if (categoryColor && categoryColor.startsWith('rgba')) {
            const rgbColor = RGBAToRGB(categoryColor);
            const hexcolor = RGBToHex(rgbColor);
            return hexcolor;
        }

        return categoryColor || '';
    };

    return (
        
        <div className="flex flex-col items-start justify-evenly">

            <h2 className="font-md p-2 text-left font-medium">{label}</h2>
            <div className="">
                <div className="flex items-center rounded-md">
                    <input type="color" value={pickedColor.substring(0, 7)} onChange={(e) => handleColorChange(e.target.value)} className="h-[50px] w-[50px] bg-transparent" />
                    <input
                        type="text"
                        value={pickedColor.substring(0, 7)}
                        onChange={(e) => setPickedColor(e.target.value)}
                        className="form-input h-[42px] w-50 text-base ltr:rounded-l-none rtl:rounded-r-none"
                    />
                </div>
            </div>
{/* 
            <div className="rounded-md border p-2 ">
                <div className="flex items-center">
                    <input type="color" value={pickedColor.substring(0, 7)} onChange={(e) => handleColorChange(e.target.value)} className="h-[50px] w-[50px] bg-transparent" />
                    <input
                        type="text"
                        value={pickedColor.substring(0, 7)}
                        onChange={(e) => setPickedColor(e.target.value)}
                        className="form-input h-[42px] w-56 text-base border-none"
                    />
                </div>
            </div> */}
        </div>
    );
};

export default ColorPicker;
