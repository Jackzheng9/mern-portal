import React, { createContext, useContext } from 'react';

const EditItemContext = createContext();

export const useEditItem = () => {
    return useContext(EditItemContext);
};

export const EditItemProvider = ({ children, editItemHandler }) => {
    return (
        <EditItemContext.Provider value={editItemHandler}>
            {children}
        </EditItemContext.Provider>
    );
};