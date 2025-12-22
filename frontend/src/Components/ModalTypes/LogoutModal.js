import React, { useContext } from 'react';
import { Input, Header, CloseButton } from './ModalStyling';
import { IoCloseSharp } from 'react-icons/io5';
import { ModalContext } from '../context/ModalContext';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

export const LogoutModal = () => {
  const { closeModal, resetModal } = useContext(ModalContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    resetModal(); 
    toast.success("Logged out");
    navigate('/');
  };

  return (
    <>
      <Header>
        <h2>Logout</h2>
        <CloseButton onClick={closeModal}><IoCloseSharp /></CloseButton>
      </Header>
      <Input>
        <p>Are you sure you want to logout?</p>
      </Input>
      <Input>
        <button onClick={handleLogout}>Yes, Logout</button>
        <button onClick={closeModal}>Cancel</button>
      </Input>
    </>
  );
};
