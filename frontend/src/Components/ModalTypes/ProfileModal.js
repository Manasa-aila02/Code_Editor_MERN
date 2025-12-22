import React, { useState, useEffect, useContext } from 'react';
import { Input, Header, CloseButton } from './ModalStyling';
import { IoCloseSharp } from 'react-icons/io5';
import { ModalContext } from '../context/ModalContext';
import axios from 'axios';
import { BaseUrl } from '../BaseUrl';
import { toast } from 'react-toastify';

export const ProfileModal = () => {
  const { closeModal } = useContext(ModalContext);
  const [user, setUser] = useState({ name: '', email: '' });
  const [newName, setNewName] = useState('');
  const [newPassword, setNewPassword] = useState('');

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const token = localStorage.getItem('token');
        const res = await axios.get(`${BaseUrl}userRoutes`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setUser(res.data.data);
        setNewName(res.data.data.name);
      } catch (err) {
        toast.error("Failed to fetch profile");
      }
    };
    fetchUser();
  }, []);

  const handleUpdate = async () => {
    try {
      const token = localStorage.getItem('token');
      const updateData = {
        name: newName,
      };
      if (newPassword) updateData.password = newPassword;

      await axios.put(`${BaseUrl}userRoutes/${user._id}`, updateData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      toast.success("Profile updated");
      closeModal();
    } catch (err) {
      toast.error("Update failed");
    }
  };

  return (
    <>
      <Header>
        <h2>My Profile</h2>
        <CloseButton onClick={closeModal}>
          <IoCloseSharp />
        </CloseButton>
      </Header>
      <Input>
        <label>Name</label>
        <input value={newName} onChange={(e) => setNewName(e.target.value)} />
      </Input>
      <Input>
        <label>Email</label>
        <input value={user.email} disabled />
      </Input>
      <Input>
        <label>New Password</label>
        <input
          type="password"
          placeholder="Leave blank to keep current"
          onChange={(e) => setNewPassword(e.target.value)}
        />
      </Input>
      <Input>
        <button onClick={handleUpdate}>Save Changes</button>
      </Input>
    </>
  );
};
