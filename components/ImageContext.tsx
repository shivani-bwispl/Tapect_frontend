// ImageContext.jsx
import React, { createContext, useContext, useState } from 'react';

const ImageContext = createContext(null);

export const useImageContext = () => useContext(ImageContext);

export const ImageProvider = ({ children }) => {
    const defaultCoverImage = '/assets/images/icons/cover_default.png';
    const defaultProfileImage = '/assets/images/icons/profileImg_default.png';
    const defaultLogoImage = '/assets/images/icons/logo_default.png';

    const [coverImage, setCoverImage] = useState(defaultCoverImage);
    const [profileImage, setProfileImage] = useState(defaultProfileImage);
    const [logoImage, setLogoImage] = useState(defaultLogoImage);

    return <ImageContext.Provider value={{ coverImage, setCoverImage, profileImage, setProfileImage, logoImage, setLogoImage }}>{children}</ImageContext.Provider>;
};
