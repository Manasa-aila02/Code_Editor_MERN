import {createContext, useState } from "react";

export const ModalContext = createContext();

function ModalProvider({children}){
    const initialModalFields = {
        show : false,
        modalType : "",
        identifiers : {
            folderId : "",
            cardId : "",
        }
    }
    const [isOpenModal, setIsOpenModal] = useState({...initialModalFields});

    const openModal = (value) => {
        setIsOpenModal(value)
    }

    const closeModal = () => {
        setIsOpenModal({ ...initialModalFields})
    }

    const resetModal = () => {
    setIsOpenModal({ show: false, modalType: null, identifiers: {} });
  };

    const ModalFeatures = {
        isOpenModal : isOpenModal,
        openModal: openModal,
        closeModal: closeModal,
        resetModal: resetModal,
    }

    return(
        <ModalContext.Provider value={ModalFeatures}>
            {children}
        </ModalContext.Provider>
    )
}

export default ModalProvider;
