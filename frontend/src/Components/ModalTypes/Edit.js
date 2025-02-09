import React, { useContext, useState } from 'react'
import { Header, CloseButton, Input } from './ModalStyling'
import { IoCloseSharp } from 'react-icons/io5'
import { ModalContext } from '../context/ModalContext'
import { PlaygroundContext } from '../context/PlaygroundContext'



export const EditFolder = () => {
    const { closeModal, isOpenModal } = useContext(ModalContext);
    const { editFolderTitle , folders } = useContext(PlaygroundContext);
    const folderId = isOpenModal?.identifiers?.folderId;
    const folder = folders.find(f => f._id === folderId);
    const [folderTitle, setFolderTitle] = useState(folder ? folder.title : "");
    return (
        <>
            <Header>
                <h2>Edit Folder Title</h2>
                <CloseButton onClick={() => closeModal()}>
                    <IoCloseSharp />
                </CloseButton>
            </Header>
            <Input>
            <input type="text" onChange={(e) => setFolderTitle(e.target.value)} />
            <button onClick={() => {
                editFolderTitle(folderId, folderTitle)
                closeModal()
            }}> Update Title </button>
            </Input>
        </>
    )
}


export const EditPlaygroundTitle = () => {
  const { isOpenModal, closeModal } = useContext(ModalContext);
  const { editPlaygroundTitle, folders } = useContext(PlaygroundContext);

  const { folderId, cardId } = isOpenModal.identifiers;
  console.log("folderId in edittitle:",folderId, " ","plaground Id ",cardId)
    const folder = folders.find(f => f._id === folderId);
    const [playgroundTitle, setPlaygroundTitle] = useState(folder?.playgrounds?.find(p => p._id === cardId)?.title || '');
    console.log("folder: ",folder," playground ",playgroundTitle)

  return (
    <>
      <Header>
        <h2>Edit Card Title</h2>
        <CloseButton onClick={() => closeModal()}>
          <IoCloseSharp />
        </CloseButton>
      </Header>
      <Input>
        <input type="text" onChange={(e) => setPlaygroundTitle(e.target.value)} />
        <button onClick={() => {
          editPlaygroundTitle(cardId, playgroundTitle)
          closeModal()
        }}>Update Title</button>
      </Input>
    </>
  )
}
