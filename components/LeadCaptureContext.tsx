import React, { createContext, useContext, useState, useEffect } from 'react';

const LeadCaptureContext = createContext({
    showPhonenumberInput: true,
    showEmailInput: true,
    showCompanyInput: true,
    showWebsiteInput: true,
    showJobtitleInput: true,
    handlePhonenumberToggle: () => {},
    handleEmailToggle: () => {},
    handleCompanyToggle: () => {},
    handleWebsiteToggle: () => {},
    handleJobtitleToggle: () => {},
});

export const LeadCaptureProvider = ({ children }) => {
    const [showPhonenumberInput, setShowPhonenumberInput] = useState(true);
    const [showEmailInput, setShowEmailInput] = useState(true);
    const [showCompanyInput, setShowCompanyInput] = useState(true);
    const [showWebsiteInput, setShowWebsiteInput] = useState(true);
    const [showJobtitleInput, setShowJobtitleInput] = useState(true);

    useEffect(() => {
        // Load toggles from localStorage when component mounts
        const localStorageStateString = localStorage.getItem('leadCaptureState');
        if (localStorageStateString) {
            const localStorageState = JSON.parse(localStorageStateString);
            setShowEmailInput(localStorageState.showEmailInput);
            setShowPhonenumberInput(localStorageState.showPhonenumberInput);
            setShowCompanyInput(localStorageState.showCompanyInput);
            setShowWebsiteInput(localStorageState.showWebsiteInput);
            setShowJobtitleInput(localStorageState.showJobtitleInput);
        }
    }, []);

    const handleEmailToggle = () => {
        const newValue = !showEmailInput;
        setShowEmailInput(newValue);
        updateLocalStorage('showEmailInput', newValue);
    };

    const handlePhonenumberToggle = () => {
        const newValue = !showPhonenumberInput;
        setShowPhonenumberInput(newValue);
        updateLocalStorage('showPhonenumberInput', newValue);
    };

    const handleJobtitleToggle = () => {
        const newValue = !showJobtitleInput;
        setShowJobtitleInput(newValue);
        updateLocalStorage('showJobtitleInput', newValue);
    };

    const handleCompanyToggle = () => {
        const newValue = !showCompanyInput;
        setShowCompanyInput(newValue);
        updateLocalStorage('showCompanyInput', newValue);
    };

    const handleWebsiteToggle = () => {
        const newValue = !showWebsiteInput;
        setShowWebsiteInput(newValue);
        updateLocalStorage('showWebsiteInput', newValue);
    };

    const updateLocalStorage = (key, value) => {
        // Update localStorage with the new toggle value
        const localStorageStateString = localStorage.getItem('leadCaptureState');
        const localStorageState = localStorageStateString ? JSON.parse(localStorageStateString) : {};
        const newLocalStorageState = { ...localStorageState, [key]: value };
        localStorage.setItem('leadCaptureState', JSON.stringify(newLocalStorageState));
    };

    return (
        <LeadCaptureContext.Provider
            value={{
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
            }}
        >
            {children}
        </LeadCaptureContext.Provider>
    );
};

export const useLeadCapture = () => {
    return useContext(LeadCaptureContext);
};
