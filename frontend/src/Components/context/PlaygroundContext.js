import {createContext, useState, useEffect } from 'react'
import axios from "axios";
import { BaseUrl} from '../BaseUrl'
export const PlaygroundContext = createContext();

export const languageMap = {
    "cpp" : {
        id: 54,
        defaultCode:
        "#include <iostream>\n"
        + "using namespace std;\n\n"
        +"int main() {\n"
        + "\tcout << 'Hello World!';\n"
        + "\treturn 0;\n"
        + "}",
    },
    "java": {
        id: 62,
        defaultCode: `public class Main {
            public static void main(String[] args) {
                System.out.println("Hello World!");
            }
    }`,
    },
    "python": {
        id: 71,
        defaultCode: `print("Hello World!")`,
    },
    "javascript": {
        id: 63,
        defaultCode: `console.log("Hello World!");`,
    }
}

const PlaygroundProvider = ({ children }) => {
    const userId = localStorage.getItem("userId");
    const [folders, setFolders] = useState([]);
    const [playgrounds, setPlaygrounds] = useState([]);

    const fetchFolders = async () => {
        try {
          // console.log("Fetching folders for user:", userId);
          
          if (!userId) {
            console.error("No userId provided");
            return;
          }
    
          const response = await axios.get(`${BaseUrl}folders?userId=${userId}`);
          setFolders(response.data);
          
          // console.log("Folders Fetched:", response.data);
        } catch (error) {
          console.error("Error fetching folders:", error.response?.data || error.message);
        }
      };
    
      useEffect(() => {
        if (userId) fetchFolders();
      }, [userId]);
    

    const addFolder = async (title) => {
        try {
          const response = await axios.post(`${BaseUrl}folders/`, {
            title,
            userId,
          });
          fetchFolders();
          // console.log("Folder Created:", response.data);
        } catch (error) {
          console.error("Error creating folder:", error.response?.data || error.message);
        }
      };

      const addPlayground = async ({ folderId, title, language, code }) => {
        try {
            
            // console.log("Navigating to playground route...");
            // console.log("Payload being sent:", { folderId, userId, title, language, code });
    
            const response = await axios.post(`${BaseUrl}playgrounds/`, {
                folderId,
                userId,
                title,
                language,
                code,
            });
    
            const newPlayground = response.data;
            setPlaygrounds((prevPlaygrounds) => [...prevPlaygrounds, newPlayground]);
            fetchFolders();
            return newPlayground;
        } catch (error) {
            console.error("Error adding playground:", error.response?.data || error);
            throw error; // Propagate the error
        }
    };
    

      
      const editFolderTitle = async (folderId, newTitle) => {
        try {
          
          if (!userId) {
            console.error("User ID not found.");
            return;
          }
      
          const response = await axios.put(`${BaseUrl}folders/${folderId}`, {
            title: newTitle,
            userId,
          });
      
          // console.log("Folder Edited Successfully:", response.data);
          
          fetchFolders(); // Refresh folders after updating
        } catch (error) {
          console.error("Error editing folder:", error.response?.data || error.message);
        }
      };

      const editPlaygroundTitle = async (playgroundId, newTitle) => {
        try {
          const response = await axios.put(`${BaseUrl}playgrounds/${playgroundId}`, {
            title: newTitle,
          });
          fetchFolders();
        } catch (error) {
          console.error("Error updating playground title:", error);
        }
      };
      
      

      const deleteFolder = async (folderId) => {
        try {
            if (!userId) {
                console.error("No userId found");
                return;
            }
    
            const response = await axios.delete(`${BaseUrl}folders/${folderId}`, {
                data: { userId } // Pass userId in the request body
            });
    
            // console.log("Folder Deleted:", response.data);
            fetchFolders(); // Refresh folders list after deletion
        } catch (error) {
            console.error("Error deleting folder:", error.response?.data || error.message);
        }
    };


const deleteCard = async (folderId, playgroundId) => {
  try {
    const response = await axios.delete(`${BaseUrl}playgrounds/${playgroundId}/${folderId}`);
    fetchFolders();
  } catch (error) {
    console.error("Error deleting playground:", error.response?.data || error.message);
  }
};

const savePlayground = async (folderId, playgroundId, newCode, newLanguage) => {
  try {
      console.log("Saving playground changes...", { folderId, playgroundId, newCode, newLanguage });

      const response = await axios.put(`${BaseUrl}playgrounds/${playgroundId}/${folderId}`, {
          folderId,
          code: newCode,
          language: newLanguage,
      });

      // console.log("Playground updated successfully:", response.data);
      fetchFolders(); // Refresh folders to get updated playgrounds
  } catch (error) {
      console.error("Error updating playground:", error.response?.data || error.message);
  }
};

      const PlaygroundFeatures = {
        folders: folders,
        playgrounds : playgrounds,
        addFolder: addFolder,
        addPlayground : addPlayground,
        fetchFolders: fetchFolders,
        editFolderTitle: editFolderTitle,
        deleteFolder: deleteFolder,
        editPlaygroundTitle: editPlaygroundTitle,
        deleteCard: deleteCard,
        savePlayground: savePlayground,
      }

      return (
        <PlaygroundContext.Provider value={PlaygroundFeatures}>
            {children}
        </PlaygroundContext.Provider>
      )
    
}

export default PlaygroundProvider;
