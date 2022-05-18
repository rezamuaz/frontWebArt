import React from "react";
import Authentication from "@Components/Molecules/Login/Authentication";

const Login = () => {
    return (
        <div className="inline-flex h-screen w-screen items-center justify-center  bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500">
            <Authentication />
        </div>
    );
};

export default Login;
