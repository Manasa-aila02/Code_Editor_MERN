import styled from 'styled-components'

export const StyledFormComponent = styled.div`
    position: absolute;
    top: 0;
    right: 0;
    width: 60%;
    padding: 2rem;
    display: flex;
    align-items: center;
    justify-content: center;
    @media (max-width: 768px){
        position: relative;
        width: 100%;
        padding: 1rem 0.5rem;
    }
`

export const StyledRightComponent = styled.div`
    position: absolute;
    top: 0;
    right: 0;
    width: 60%;
    padding: 2rem;
    
    @media (max-width: 768px){
        position: relative;
        width: 100%;
        padding: 1rem 0.5rem;
    }
`

export const StyledLeftComponent = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    width: 40%;
    height: 100vh;
    background-color: #1e1e1e;

    display: flex;
    justify-content: center;
    align-items: center;

    @media (max-width: 768px){
        position: relative;
        width: 100%;
    }
`

export const SignInButton = styled.button`
  padding: 10px 20px;
  background-color: #009999;
  color: black;
  border-radius: 5px;
  border: 1px solid lightgrey;
  cursor: pointer;
  font-size: 14px;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #006666;
    color: white;
  }
`;