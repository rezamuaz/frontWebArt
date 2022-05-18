import { useModal } from "@Components/Molecules/Modal";
import { LoadingScreen } from "@Components/Templates";
import { USER_RESET } from "@Shared/lib/GraphqlSchema";
import { GraphqlMutation } from "@Shared/lib/Request";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";

const reset = () => {
    const router = useRouter();
    const { showModal, hideModal } = useModal();
    const [data, setData] = useState({
        token: "",
        email: "",
        password: "",
        confirm: "",
    });
    if (router.isFallback) {
        <LoadingScreen />;
    }
    console.log(data);
    function handleChange(name, value) {
        return setData((oldValues) => ({ ...oldValues, [name]: value }));
    }
    useEffect(() => {
        if (!router.isReady) return;
        let isSubscribed = true;
        async function userData() {
            const token = router.query.q;
            console.log(token);
            if (isSubscribed) {
                setData({ ...data, token: token });
            }
        }
        userData().catch(console.error);
        return () => (isSubscribed = false);
    }, [router.isReady]);

    async function handleReset(e) {
        e.preventDefault();
        try {
            const variables = {
                email: data.email,
                password: data.password,
                confirmPassword: data.confirm,
                resetToken: data.token,
            };
            console.log("variable", variables);
            const userReset = await GraphqlMutation(USER_RESET, variables);
            handleModal("change password success, please login again!");
            setTimeout(() => {
                hideModal();
                router.push("/login");
            }, 1000);
        } catch (error) {
            console.log(error.response.errors[0].message);
            handleModal(error.response.errors[0].message);
        }
    }

    const ModalContent = (props) => <div>{props.value}</div>;
    const handleModal = (e) => {
        showModal(ModalContent, { value: e });
    };

    return (
        <div className="normal-bg flex h-screen w-screen items-center justify-center">
            <div className="layer-9 h-fit w-80 rounded-lg p-6 text-base">
                <h1 className="text-center text-2xl font-semibold">
                    Reset Password
                </h1>
                <Link href="/login" passHref>
                    <div
                        className="mt-5 h-min w-full cursor-pointer bg-gradient-to-r from-indigo-500 to-purple-500 py-1 text-center font-semibold text-white "
                        type="button"
                    >
                        Back to Login
                    </div>
                </Link>

                <form
                    className="mx-auto h-fit w-full rounded-lg text-base"
                    onSubmit={(e) => handleReset(e)}
                >
                    <div className="mt-4 flex flex-col">
                        <input
                            className="inputAuth"
                            placeholder="Email"
                            type="email"
                            id="email"
                            value={data.email}
                            onChange={(e) =>
                                handleChange("email", e.target.value)
                            }
                        />
                        <input
                            className="inputAuth"
                            placeholder="New Password"
                            type="password"
                            id="password"
                            value={data.password}
                            onChange={(e) =>
                                handleChange("password", e.target.value)
                            }
                        />
                        <input
                            className="inputAuth"
                            placeholder="Confirm Password"
                            type="password"
                            id="confirm"
                            value={data.confirm}
                            onChange={(e) =>
                                handleChange("confirm", e.target.value)
                            }
                        />
                    </div>
                    <div className="mt-4 flex flex-col">
                        <button
                            className="h-min w-full bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 py-2 font-semibold text-white"
                            type="submit"
                        >
                            Reset
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default reset;
