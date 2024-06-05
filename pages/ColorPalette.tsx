/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { SketchPicker } from 'react-color';
import { useColorContext } from '../components/ColorContext';
import colorDropper from '../public/assets/images/icons/colorDropper.png';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import axiosInstance from '../services/api'; // Import axiosInstance from api.js
import { useRouter } from 'next/dist/client/router';

const ColorPalette = () => {
    const { sketchPickerColor, updateSketchPickerColor, sketchPickerLightColor, updateSketchPickerLightColor, setFlag }: any = useColorContext();
    const router = useRouter();

    const [showDropper, setshowDropper] = useState(false);
    const [color, setcolor] = useState(sketchPickerColor);
    const [lightColor, setLightColor] = useState('');

    const handleColorChange = (color) => {
        const { r, g, b } = color.rgb;
        const newColor = `rgba(${r}, ${g}, ${b}, 1)`; // Full opacity color
        const lightColor = `rgba(${r}, ${g}, ${b}, 0.28)`; // Light color with 0.28 opacity
        // console.log('New Color:', newColor);
        // console.log('Light Color:', lightColor);
        setcolor(newColor);
        updateSketchPickerColor(newColor);
        setLightColor(lightColor); // Set the light Color
        updateSketchPickerLightColor(lightColor); // Update the light color in the context
        setFlag(0); // Set the flag
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

    const handlePredefinedColorClick = (color) => {
        let updatedTextColor = sketchPickerColor; // Default textColor value

        const lightColor = `rgba(${parseInt(color.slice(1, 3), 16)}, ${parseInt(color.slice(3, 5), 16)}, ${parseInt(color.slice(5, 7), 16)}, 0.28)`;

        if (lightColor === 'rgba(0, 0, 0, 0.28)') {
            // Check if the background color is rgba(0, 0, 0, 0.28)
            updatedTextColor = '#ffffff'; // Set textColor to #ffffff
        }

        updateSketchPickerColor(color);
        setLightColor(lightColor); // Set the light Color
        updateSketchPickerLightColor(lightColor); // Update the light color in the context
        setFlag(0); // Set the flag
    };

    const handleImageClick = () => {
        setshowDropper(!showDropper);
    };

    const saveCustomizedTheme = async () => {
        const userId = localStorage.getItem('userId');
        if (!userId) {
            console.error('User ID not found in localStorage');
            return;
        }

        try {
            let updatedTextColor = sketchPickerColor; // Default textColor value

            if (sketchPickerColor === '#000000') {
                // Check if the background color is rgba(0, 0, 0, 0.28)
                updatedTextColor = '#ffffff'; // Set textColor to #ffffff
            }

            console.log(updatedTextColor, 'updatedTextColor');
            const response = await axiosInstance.post('/CustomizeProfile', {
                userId: userId,
                backgroundColor: sketchPickerLightColor,
                textColor: updatedTextColor, // Use the updatedTextColor value here

                buttontextColor: '', // Add the buttontextColor value here if needed
                buttonColor: sketchPickerColor, // Add the buttonColor value here if needed
            });

            if (response.status === 200 || response.status === 201) {
                console.log(response.data.message);

                // await router.replace(router.asPath); // Replace the current route with itself

                window.location.reload(); // Refresh the page without loading
            } else {
                console.error('Failed to customize theme:', response.statusText);
            }
            showToast();
            // Optionally, perform any additional actions after successful update
        } catch (error) {
            console.error('Error occurred while customizing theme:', error);
        }
    };

    useEffect(() => {
        const timer = setTimeout(() => {
            saveCustomizedTheme();
        }, 1000);
        return () => clearTimeout(timer);
    }, [sketchPickerColor, sketchPickerLightColor]);

    useEffect(() => {
        console.log('SketchPickerColor:', sketchPickerColor);
        console.log('SketchPickerLightColor:', sketchPickerLightColor);
        setcolor(sketchPickerColor);
        setLightColor(sketchPickerLightColor);
    }, [sketchPickerColor, sketchPickerLightColor]);

    const predefinedColors = ['#FF1616', '#FF914D', '#FFDE59', '#7ED957', '#5271FF', '#7F00FF', '#bd10e0','#000000'];

    return (
        <>
            <div className='mt-6'>
                <h1 className="my-4  font-bold text-left text-lg">Profile Theme</h1>
                <div className=" w-full  p-3 bg-white rounded-2xl border border-white-light  pb-8  dark:border-[#1b2e4b]">
                    <h2 className="text-base p-3 text-left font-semibold">Select Theme Color</h2>
                    <div className='flex items-left justify-start'>
                        <ul className="flex items-center justify-evenly flex-wrap">
                            <li className="relative h-12 w-12 mx-2 my-2 rounded-[50%] border border-zinc-400">
                                <Image src={colorDropper} alt="color dropper" id="dropper" onClick={handleImageClick} />
                                {showDropper && <SketchPicker color={color} onChange={handleColorChange} className="absolute top-[40px]" />}
                            </li>
                            {predefinedColors.map((color, index) => (
                                <li key={index} style={{ backgroundColor: color, margin: '10px 20px' }} className="h-12 w-12 rounded-[50%] border my-2" onClick={() => handlePredefinedColorClick(color)}></li>
                            ))}
                        </ul>
                    </div>


                    {/* <h2 className="font-md mx-3  my-5 text-left font-semibold ">Customize Theme </h2> */}
                </div>
            </div>
        </>
    );
};

export default ColorPalette;
