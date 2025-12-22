import React, { useContext, useEffect, useState } from 'react';
import { Input, Header, CloseButton } from './ModalStyling';
import { IoCloseSharp } from 'react-icons/io5';
import { ModalContext } from '../context/ModalContext';
import axios from 'axios';
import { BaseUrl } from '../BaseUrl';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

export const DeleteAccountModal = () => {
  const { closeModal } = useContext(ModalContext);
  const [userId, setUserId] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const token = localStorage.getItem('token');
        const res = await axios.get(`${BaseUrl}userRoutes`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setUserId(res.data.data._id);
      } catch (err) {
        toast.error("Could not fetch user info");
        closeModal();
      }
    };
    fetchUser();
  }, [closeModal]);

  const handleDelete = async () => {
    try {
      const token = localStorage.getItem('token');
      await axios.delete(`${BaseUrl}userRoutes/${userId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      toast.success("Account deleted");
      localStorage.removeItem('token');
      closeModal();  
      navigate('/');
    } catch (err) {
      toast.error("Failed to delete account");
    }
  };

  return (
    <>
      <Header>
        <h2>Delete Account</h2>
        <CloseButton onClick={closeModal}><IoCloseSharp /></CloseButton>
      </Header>
      <Input>
        <p>Are you sure you want to delete your account? This action cannot be undone.</p>
      </Input>
      <Input>
        <button onClick={handleDelete}>Yes, Delete</button>
        <button onClick={closeModal}>Cancel</button>
      </Input>
    </>
  );
};
