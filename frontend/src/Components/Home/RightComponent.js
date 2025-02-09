import React, { useContext } from 'react'
import styled from 'styled-components'
import { useEffect } from 'react'
import {ModalContext} from '../context/ModalContext'
import { IoTrashOutline } from 'react-icons/io5'
import { BiEditAlt } from 'react-icons/bi'
import { FcOpenedFolder } from 'react-icons/fc'
import logo from '../../assets/icon.jpg'
import { useNavigate } from 'react-router-dom'
import {StyledRightComponent} from './StyleComponent'
import { PlaygroundContext } from '../context/PlaygroundContext'



const Header = styled.div`
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  justify-content: space-between;
  padding: 0.75rem 0;
  border-bottom: 1px solid #989898;
  margin-bottom: 1rem;
`

const Heading = styled.h3`
  font-size: ${props => props.size === 'small' ? "1.25rem" : "1.75rem"};
  font-weight: 400;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  span{
    font-weight: 700;
  }
`

const AddButton = styled.div`
    font-size: 1rem;
    border-radius: 30px;
    color: black;
    display: flex;
    align-items: center;
    gap: 0.25rem;
    span{
        font-size: 1.5rem;
        font-weight: 700;
    }

    &:hover{
        cursor: pointer;
    }
`

const FolderCard = styled.div`
    margin-bottom: 1rem;
`

const FolderIcons = styled.div`
    display: flex;
    align-items: center;
    gap: 0.7rem;
    cursor: pointer;
`

const PlayGroundCards = styled.div`
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 2rem;

    @media (max-width: 428px){
        grid-template-columns: 1fr;
    }    
`

const Card = styled.div`
    padding: 0.5rem;
    display: flex;
    align-items: center;
    justify-content: space-between;
    border-radius: 8px;
    box-shadow: 0 0 4px 0px #989898;
    cursor: pointer;
    transition: all 0.2s ease-in-out;

    &:hover{
      scale: 1.05;
      box-shadow: 0 0 8px 0px #989898;
    }
`

const CardContainer = styled.div`
  display: flex;
  align-items: center;
`

const CardContent = styled.div`
`

const Logo = styled.img`
    width: 70px;
    margin-right: 1rem;

    @media (max-width: 425px){
        width: 50px;
        margin-right: 0.5rem;
    }
`
const RightComponent = () =>{
    const { openModal } = useContext(ModalContext);
    const { folders, fetchFolders, deleteFolder , deleteCard} = useContext(PlaygroundContext);
    const navigate = useNavigate();


    useEffect(() => {
        fetchFolders(); // Fetch folders when component mounts
      }, []);

return (
    <StyledRightComponent> 
        <Header>
            <Heading size="large">
                My <span>Playground</span>
            </Heading>
            <AddButton onClick={() => openModal({
                show: true,
                modalType: 1,
                identifiers: {
                    folderid: "",
                    cardId: "",
                }
            })}> <span>+</span> New Folder </AddButton>
        </Header>
        {Object.keys(folders).length > 0 ? (
        Object.entries(folders).map(([folderId, folder]) => (
          <FolderCard key={folderId}>
            <Header>
              <Heading size="small">
                <FcOpenedFolder /> {folder.title}
              </Heading>
              <FolderIcons>
                <IoTrashOutline onClick={() => deleteFolder(folder._id)} />
                <BiEditAlt onClick={() => {
                const selectedFolder = folders.find(f => f._id === folder._id);

                if (!selectedFolder) {
                  console.error("Folder ID not found in folders array:", folder._id);
                  return;
                }
                console.log("Opening modal for folder:", selectedFolder._id);
                openModal({
                  show: true,
                  modalType: 3,
                  identifiers: { folderId: selectedFolder._id, cardId: "" },
                })} 
            }/>
                <AddButton onClick={() =>{ 
                const selectedFolder = folders.find(f => f._id === folder._id);
                openModal({
                  show: true,
                  modalType: 2,
                  identifiers: { folderId: selectedFolder._id, cardId: "" },
                })}}>
                  <span>+</span> New Playground
                </AddButton>
              </FolderIcons>
            </Header>

            <PlayGroundCards>
              {Object.entries(folder.playgrounds || {}).map(([playgroundId, playground]) => (
                <Card key={playground._id} onClick={() => navigate(`/playground/${folder._id}/${playground._id}`)}>
                  <CardContainer>
                    <Logo src={logo} />
                    <CardContent>
                      <p>{playground.title}</p>
                      <p>Language: {playground.language}</p>
                    </CardContent>
                  </CardContainer>
                  <FolderIcons>
                    <IoTrashOutline onClick={(e) => {
                      e.stopPropagation();
                      deleteCard(folder._id, playground._id);
                    }} />
                    <BiEditAlt onClick={(e) => {
                      const selectedFolder = folders.find(f => f._id === folder._id);
                      e.stopPropagation();
                      openModal({
                        show: true,
                        modalType: 4,
                        identifiers: { folderId: selectedFolder._id, cardId: playground._id },
                      });
                    }} />
                  </FolderIcons>
                </Card>
              ))}
            </PlayGroundCards>
          </FolderCard>
        ))
      ) 
      : (<p></p>
      )}

    </StyledRightComponent>
);
}
export default RightComponent;