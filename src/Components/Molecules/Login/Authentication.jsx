import React, { useState, useContext } from "react";
import { Context } from "@Context/GlobalProvider";
import LoginBox from "./LoginBox";
import RegisterBox from "./RegisterBox";
import { useRouter } from "next/router";
import { useAuthDispatch } from "@Context/AuthContext";
import { useModal } from "../Modal";
import { GraphqlMutation, GraphqlQueryAuth } from "@Shared/lib/Request";
import { USER_REGISTER, USER_TOKEN } from "@Shared/lib/GraphqlSchema";

const Auth = () => {
    const { showModal } = useModal();
    const dispatch = useAuthDispatch();
    const [isLogin, setLogin] = useState(true);
    const router = useRouter();
    const { userData } = useContext(Context);

    const switchMode = () => {
        setLogin(!isLogin);
    };

    const ModalContent = (props) => <div>{props.value}</div>;
    const handleModal = (e) => {
        showModal(ModalContent, { value: e });
    };

    const LoginHandler = async (e) => {
        e.preventDefault();
        try {
            const variables = {
                email: userData?.email,
                password: userData?.password,
            };

            // validation for email and password must not empty
            if (
                variables.email.trim().length === 0 ||
                variables.password.trim().length === 0
            ) {
                return;
            }
            const data = await GraphqlQueryAuth(USER_TOKEN, variables);
            dispatch("LOGIN", data.loginUser.user);
            localStorage.setItem("token", data.loginUser.token);
            router.push("/manage/dashboard");
        } catch (error) {
            console.log(error);
            handleModal(error.response.errors[0].message);
        }
    };

    const RegisterHandler = async (e) => {
        e.preventDefault();
        try {
            const variables = {
                newUser: {
                    email: userData.email.toLowerCase(),
                    username: userData.username.toLowerCase(),
                    firstName: userData.firstName.toLowerCase(),
                    lastName: userData.lastName.toLowerCase(),
                    password: userData.password,
                    role: userData.role,
                },
            };

            const Register = await GraphqlMutation(USER_REGISTER, variables);
            if (Register) {
                handleModal("Register Success");
            }
            router.push("/login");
        } catch (error) {
            handleModal(error.response.errors[0].message);
        }
    };

    return (
        <div className="mx-auto h-fit w-80 rounded-lg bg-white p-6 text-base">
            <h1 className="text-center text-2xl font-semibold">
                {isLogin ? "Login Form" : "Register Form"}
            </h1>
            <button
                className="mt-5 h-min w-full bg-gradient-to-r from-indigo-500 to-purple-500 py-1 font-semibold text-white "
                type="button"
                onClick={switchMode}
            >
                Switch to {isLogin ? "Register" : "Login"}
            </button>
            {isLogin ? (
                <LoginBox submitHandler={LoginHandler} />
            ) : (
                <RegisterBox submitHandler={RegisterHandler} />
            )}
        </div>
    );
};

export default Auth;
