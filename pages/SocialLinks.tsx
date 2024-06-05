import React, { useState } from 'react';
import Modal from './Modal';
import SocialLinkLists from './SocialLinkLists';

const SocialLinks = ({ 
    selectedSocial, 
    showContent, 
    setShowContent,
    showModal, 
    setShowModal, 
    handleNewItem,
    SocialItems,
    DeleteEle, 
    formData,
    setSelectedSocial,
    updateSocialItem,
    handleEdit
}) => {
    const [SelectedSocialItem, setSelectedSocialItem] = useState([]);
    const [SelectedSocialId, setSelectedSocialId] = useState(null);

    const handleButtonClick = () => {
        setShowModal(true);
    };

    const handleCloseModal = () => {
        setShowModal(false);
    };

    return (
        <div className="flex  flex-col justify-between  bg-contentPage ">
            <div>
                <div className="flex items-center justify-center">
                    <div className="flex w-full items-center justify-end mt-8 ">
                        {/* <h3 className="text-2xl font-bold">Social Links</h3> */}
                        <button type="button" className="btn btn-primary xl:w-55 sm:w-24 md:w-32 lg:w-44" onClick={handleButtonClick}>
                            +Add Social Links
                        </button>
                    </div>
                </div>
                <SocialLinkLists
                    setShowContent={setShowContent}
                    setShowModal={setShowModal}
                    SocialItems={SocialItems}
                    DeleteEle={DeleteEle}
                    SelectedSocialItem={SelectedSocialItem}
                    setSelectedSocialItem={setSelectedSocialItem}
                    setSelectedSocialId={setSelectedSocialId}
                    SelectedSocialId={SelectedSocialId}
                    selectedSocial={undefined}
                />
            </div>
            <Modal
                isOpen={showModal}
                onClose={setShowModal}
                onNewItem={handleNewItem}
                onUpdateItem={updateSocialItem}
                formData={formData}
                DeleteEle={DeleteEle}
                SelectedSocialItem={SelectedSocialItem}
                selectedSocial={selectedSocial}
                showContent={showContent}
                setShowContent={setShowContent}
                setSelectedSocial={setSelectedSocial}
            />
        </div>
    );
};

export default SocialLinks;
