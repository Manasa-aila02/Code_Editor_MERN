import React, { useContext } from 'react';
import styled from 'styled-components';
import logo from '../../assets/logo.png';
import {StyledLeftComponent} from './StyleComponent'; 

const ContentContainer = styled.div`
    text-align: center;
`

const Logo = styled.img`
    width: 165px;
    margin-bottom: 1rem;
`

const MainHeading = styled.h1`
    font-size: 2.5rem;
    font-weight: 400;
    color: #fff;
    margin-bottom: 0.75rem;

    span{
        font-weight: 700;
    }
`
const SubHeading = styled.div`
    font-size: 1.5rem;
    color: #fff;
    opacity: 0.7;
    margin-bottom: 1.5rem;
`

const LeftComponent = () =>{
    return (
        <StyledLeftComponent>
            <ContentContainer>
                <Logo src={logo} alt=""/>
                <MainHeading> <span>Code </span>Desk</MainHeading>
                <SubHeading>Code. Compile. Debug.</SubHeading>
            </ContentContainer>
        </StyledLeftComponent>
    )
}

export default LeftComponent;