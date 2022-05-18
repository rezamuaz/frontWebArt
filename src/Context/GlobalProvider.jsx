import { createContext, useState } from "react";

const Context = createContext(null);

const GlobalProvider = ({ children }) => {
    const initialValidate = {
        email: "",
        username: "",
        firstName: "",
        lastName: "",
        password: "",
        role: "GUEST",
    };
    const [userData, setUserData] = useState(initialValidate);
    const [edit, setEdit] = useState(false);
    const [imageProps, setImageProps] = useState(null);
    const ctx = {
        userData,
        setUserData,
        imageProps,
        setImageProps,
        edit,
        setEdit,
    };
    return <Context.Provider value={ctx}>{children}</Context.Provider>;
};

export { Context, GlobalProvider };
