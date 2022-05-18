import React, { useContext } from "react";

const ModalContext = React.createContext();

export default ModalContext;

export const ModalConsumer = ModalContext.Consumer;

export const useModal = () => {
    const context = useContext(ModalContext);

    if (context === undefined) {
        throw new Error("ModalContext cannot be used outside of ModalProvider");
    }
    return context;
};
