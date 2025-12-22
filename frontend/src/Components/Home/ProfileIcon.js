import React, { useState, useContext } from "react";
import styled from "styled-components";
import { ModalContext } from "../context/ModalContext";
import { FaUserCircle } from "react-icons/fa";

// Styled Components
const ProfileContainer = styled.div`
  position: relative;
`;

const ProfileIcon = styled(FaUserCircle)`
  font-size: 2rem;
  cursor: pointer;
  color: #333;
`;

const DropdownMenu = styled.div`
  position: absolute;
  top: 10px;
  right: 0;
  background-color: white;
  box-shadow: 0px 0px 8px rgba(0, 0, 0, 0.1);
  padding: 0.5rem;
  border-radius: 5px;
  z-index: 999;
`;

const DropdownItem = styled.div`
  padding: 8px 8px;
  cursor: pointer;
  font-size: 14px;

  &:hover {
    background-color: #f2f2f2;
  }
`;

const ProfileIconDropdown = () => {
  const [open, setOpen] = useState(false);
  const { openModal } = useContext(ModalContext);

  const handleProfile = () => {
    openModal({ show: true, modalType: 6 }); // View/Edit profile modal
    setOpen(false);
  };

  const handleLogout = () => {
    openModal({ show: true, modalType: 7 }); // Logout confirmation modal
    setOpen(false);
  };

  const handleDeleteAccount = () => {
    openModal({ show: true, modalType: 8 }); // Delete account confirmation modal
    setOpen(false);
  };

  return (
    <ProfileContainer>
      <ProfileIcon onClick={() => setOpen(!open)} />
      {open && (
        <DropdownMenu>
          <DropdownItem onClick={handleProfile}>View Profile</DropdownItem>
          <DropdownItem onClick={handleLogout}>Delete Account</DropdownItem>
          <DropdownItem onClick={handleDeleteAccount}>Logout</DropdownItem>
        </DropdownMenu>
      )}
    </ProfileContainer>
  );
};

export default ProfileIconDropdown;
