import React from 'react';
import styled from 'styled-components';
import ProfileIconDropdown from '../Home/ProfileIcon';
import logo from '../../assets/logo.png';
import { useNavigate } from 'react-router-dom';

const NavbarContainer = styled.div`
  height: 4.5rem;
  background: #1e1e1e;
  display: flex;
  align-items: center;
  justify-content: space-between; /* 👈 This makes left and right items go to corners */
  padding: 0 2rem;
`;

const LeftSection = styled.button`
  background: transparent;
  border: none;
  display: flex;
  align-items: center;
  gap: 1rem;
  cursor: pointer;
`;

const Logo = styled.img`
  width: 60px;
`;

const MainHeading = styled.h1`
  font-size: 2rem;
  font-weight: 400;
  color: #fff;

  span {
    font-weight: 700;
  }
`;

const Navbar = () => {
  const navigate = useNavigate();

  return (
    <NavbarContainer>
      <LeftSection onClick={() => navigate('/')}>
        <Logo src={logo} />
        <MainHeading>
          <span>Code</span> Desk
        </MainHeading>
      </LeftSection>

      {/* 👇 This will now appear at right corner */}
      <ProfileIconDropdown />
    </NavbarContainer>
  );
};

export default Navbar;



// import React from 'react'
// import styled from 'styled-components'
// import ProfileIconDropdown from '../Home/ProfileIcon';
// import logo from '../../assets/logo.png'
// import { useNavigate } from 'react-router-dom'
// const NavbarContainer = styled.div`
//   height: '4.5rem';
//   background: #1e1e1e;
//   display: flex;
//   align-items: center;
//   justify-content: center;
// `

// const NavbarContent = styled.button`
//   background: transparent;
//   border: 0;

//   display: flex;
//   align-items: center;
//   gap: 1rem;
//   cursor: pointer;
// `

// const Logo = styled.img`
//   width: 60px;
// `

// const MainHeading = styled.h1`
//   font-size: 2rem;
//   font-weight: 400;
//   color: #fff;

//   span{
//     font-weight: 700;
//   }
// `

//   const Navbar = () => {
//   const navigate = useNavigate()
//   return (
//     <NavbarContainer>
//       <NavbarContent onClick={() => {
//         navigate('/')
//       }}>
//         <Logo src={logo} />
//         <MainHeading>
//           <span>Code</span> Desk
//           {/* <ProfileIconDropdown /> */}
//         </MainHeading>
//       </NavbarContent>
//     </NavbarContainer>
//   )
// }

// export default Navbar