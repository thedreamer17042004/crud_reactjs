import React, {createContext, useContext, useEffect, useState} from "react";
import data from '../TodoList/Data';


const MyContext = createContext();

const MyContextProvider = ({ children }) => {
    // State to hold the data
    const [contextData, setContextData] = useState(data);
    const [filteredData, setFilteredData] = useState(contextData);
  
    // Function to update the context data
    const updateContextData = newData => {
        setFilteredData(newData);
    };

    const appendData = (newData) => {
      setContextData([...contextData, newData]);
    };

    // const changeStatus = (obj) => {
    //   deleteItem(obj);
     
    // }
    // //cách làm đảo lộn chật tự mảng
    // const deleteItem = (obj) => {
    //   console.log(obj.id)
    //   const newDataList = contextData.filter((item, index) => item.id !== obj.id);
    //   setContextData([...newDataList, obj]);
      
    // }
    useEffect(()=> {
        setFilteredData(contextData)
        // console.log(contextData);
    },[contextData])
   
   
    const handleUpdateItem = (idToUpdate, isCompleted) => {
      // Use map to create a new array with the updated object
      const newDataArray = contextData.map(item =>
        item.id === idToUpdate ? { ...item, completed: isCompleted } : item
      );
  
      // Update the state with the new array
      setContextData(newDataArray);
    };

    // Expose the context data and the update function to the components
    const contextValue = { contextData, updateContextData,filteredData,appendData ,handleUpdateItem};
  
    return (
      <MyContext.Provider value={contextValue}>
        {children}
      </MyContext.Provider>
    );
  };
  // Custom hook to simplify using the context
const useMyContext = () => {
    return useContext(MyContext);
};
export  {MyContextProvider, useMyContext};
