import { createContext, useState, useEffect } from 'react';
import axios from "axios";
import { BaseUrl } from '../BaseUrl';

export const PlaygroundContext = createContext();

export const languageMap = {
  "cpp": {
    id: 54,
    defaultCode:
      "#include <iostream>\n"
      + "using namespace std;\n\n"
      + "int main() {\n"
      + "\tcout << \"Hello World!\";\n"
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
};

const PlaygroundProvider = ({ children }) => {
  const token = localStorage.getItem("token");

  // const [folders, setFolders] = useState([]);
  const [folders, setFolders] = useState({});
  const [playgrounds, setPlaygrounds] = useState([]);

  // Axios config with Authorization header
  const authHeaders = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const fetchFolders = async () => {
    try {
      const response = await axios.get(`${BaseUrl}folders`, authHeaders);
      setFolders(response.data);
    } catch (error) {
      console.error("Error fetching folders:", error.response?.data || error.message);
    }
  };

  useEffect(() => {
    if (token) fetchFolders();
  }, [token]);

  const addFolder = async (title) => {
    try {
      await axios.post(`${BaseUrl}folders/`, { title }, authHeaders);
      fetchFolders();
    } catch (error) {
      console.error("Error creating folder:", error.response?.data || error.message);
    }
  };

  const addPlayground = async ({ folderId, title, language, code }) => {
    try {
      const response = await axios.post(`${BaseUrl}playgrounds/${folderId}`, {
        // folderId,
        title,
        language,
        code,
      }, authHeaders);

      const newPlayground = response.data;
      setPlaygrounds((prev) => [...prev, newPlayground]);
      fetchFolders();
      return newPlayground;
    } catch (error) {
      console.error("Error adding playground:", error.response?.data || error);
      throw error;
    }
  };

  const editFolderTitle = async (folderId, newTitle) => {
    try {
      await axios.put(`${BaseUrl}folders/${folderId}`, { title: newTitle }, authHeaders);
      fetchFolders();
    } catch (error) {
      console.error("Error editing folder:", error.response?.data || error.message);
    }
  };

  const editPlaygroundTitle = async (playgroundId, newTitle) => {
    try {
      await axios.put(`${BaseUrl}playgrounds/${playgroundId}`, {
        title: newTitle,
      }, authHeaders);
      fetchFolders();
    } catch (error) {
      console.error("Error updating playground title:", error.response?.data || error.message);
    }
  };

  const deleteFolder = async (folderId) => {
    try {
      await axios.delete(`${BaseUrl}folders/${folderId}`, authHeaders);
      fetchFolders();
    } catch (error) {
      console.error("Error deleting folder:", error.response?.data || error.message);
    }
  };

  const deleteCard = async (folderId, playgroundId) => {
    try {
      await axios.delete(`${BaseUrl}playgrounds/${playgroundId}/${folderId}`, authHeaders);
      fetchFolders();
    } catch (error) {
      console.error("Error deleting playground:", error.response?.data || error.message);
    }
  };

  const savePlayground = async (folderId, playgroundId, newCode, newLanguage) => {
    try {
      await axios.put(`${BaseUrl}playgrounds/${playgroundId}/${folderId}`, {
        folderId,
        code: newCode,
        language: newLanguage,
      }, authHeaders);
      fetchFolders();
    } catch (error) {
      console.error("Error updating playground:", error.response?.data || error.message);
    }
  };

  const PlaygroundFeatures = {
    folders,
    playgrounds,
    addFolder,
    addPlayground,
    fetchFolders,
    editFolderTitle,
    deleteFolder,
    editPlaygroundTitle,
    deleteCard,
    savePlayground,
  };

  return (
    <PlaygroundContext.Provider value={PlaygroundFeatures}>
      {children}
    </PlaygroundContext.Provider>
  );
};

export default PlaygroundProvider;

