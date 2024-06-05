import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';
import axiosInstance from '@/services/api';

export const ColorContext = createContext({
    backgroundColor: '#FFFFFF',
    textColor: '#000000',
    buttonColor: '#652dbf',
    buttontextColor: '#FFFFFF',
    sketchPickerColor: '#FFFFFF',
    sketchPickerLightColor: '',
    flag: 1
});

export const ColorProvider = ({ children }) => {
    const [backgroundColor, setBackgroundColor] = useState('#FFFFFF');
    const [textColor, setTextColor] = useState('#000000');
    const [buttonColor, setButtonColor] = useState('#652dbf');
    const [buttontextColor, setbuttontextColor] = useState('#FFFFFF');
    const [sketchPickerColor, setSketchPickerColor] = useState('#FFFFFF');
    const [flag, setFlag] = useState(1); // 0 for sketchPicker, 1 for backgroundColor
    const [sketchPickerLightColor, setSketchPickerLightColor] = useState('');

    useEffect(() => {
        const fetchData = async () => {
            try {
                const userId = localStorage.getItem('userId');
                if (!userId) {
                    throw new Error('User ID not found in localStorage');
                }
                const response = await axiosInstance.get(`/CustomizeProfile/${userId}`);
                const customizeThemeData = response.data;
                if (customizeThemeData) {
                    setBackgroundColor(customizeThemeData.backgroundColor || '#FFFFFF');
                    setTextColor(customizeThemeData.textColor || '#000000');
                    setButtonColor(customizeThemeData.buttonColor || '#652DBF');
                    setbuttontextColor(customizeThemeData.buttontextColor || '#FFFFFF');
                    setSketchPickerColor(customizeThemeData.sketchPickerColor || '#FFFFFF');
                    setSketchPickerLightColor(customizeThemeData.sketchPickerLightColor || '');
                    setFlag(customizeThemeData.flag || 1);
                } else {
                    // Set default colors if data is null
                    setBackgroundColor('#FFFFFF');
                    setTextColor('#000000');
                    setButtonColor('#652DBF');
                    setbuttontextColor('#FFFFFF');
                    setSketchPickerColor('#FFFFFF');
                    setSketchPickerLightColor('');
                    setFlag(1);
                }
            } catch (error) {
                console.error('Error fetching colors:', error.message);
                // Set default colors if there's an error
                setBackgroundColor('#FFFFFF');
                setTextColor('#000000');
                setButtonColor('#652DBF');
                setbuttontextColor('#FFFFFF');
                setSketchPickerColor('#FFFFFF');
                setSketchPickerLightColor('');
                setFlag(1);
            }
        };
        fetchData();
    }, []);

    const updateBackgroundColor = (color) => setBackgroundColor(color);
    const updateTextColor = (color) => setTextColor(color);
    const updateButtonColor = (color) => setButtonColor(color);
    const updateButtonTextColor = (color) => setbuttontextColor(color);
    const updateSketchPickerColor = (color) => setSketchPickerColor(color);
    const updateSketchPickerLightColor = (color) => setSketchPickerLightColor(color);
    const updateFlag = (value) => setFlag(value);

    const contextValue = {
        backgroundColor,
        textColor,
        buttonColor,
        buttontextColor,
        sketchPickerColor,
        sketchPickerLightColor,
        updateBackgroundColor,
        updateTextColor,
        updateButtonColor,
        updateButtonTextColor,
        updateSketchPickerColor,
        updateSketchPickerLightColor,
        flag,
        setFlag,
    };
    return <ColorContext.Provider value={contextValue}>{children}</ColorContext.Provider>;
};

export const useColorContext = () => useContext(ColorContext);
