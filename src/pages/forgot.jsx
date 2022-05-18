import { useModal } from "@Components/Molecules/Modal";
import { LoadingScreen } from "@Components/Templates";
import { USER_REQUEST_RESET } from "@Shared/lib/GraphqlSchema";
import { GraphqlMutation, loadRequestReset } from "@Shared/lib/Request";
import Link from "next/link";
import Router, { useRouter } from "next/router";
import React, { useState } from "react";

const Forgot = () => {
    const { showModal } = useModal();
    const [isloading, setLoading] = useState(false);
    const [mail, setMail] = useState();
    const router = useRouter();

    const ModalContent = (props) => <div>{props.value}</div>;
    const HandleModal = (e) => {
        showModal(ModalContent, { value: e });
    };
    async function ResetHandler(e) {
        e.preventDefault();
        try {
            setLoading(true);
            const variables = {
                email: mail,
            };
            const data = await GraphqlMutation(USER_REQUEST_RESET, variables);
            setLoading(false);
            HandleModal(data.requestReset.message);
        } catch (error) {
            console.log(error);
            HandleModal(error.response.errors[0].message);
        } finally {
            setTimeout(() => {
                router.push("/login");
            }, 1000);
        }
    }
    return (
        <div className="normal-bg flex h-screen w-screen items-center justify-center">
            {isloading ? <LoadingScreen /> : null}
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
                    onSubmit={(e) => ResetHandler(e)}
                >
                    <div className="mt-4 flex flex-col">
                        <input
                            className="inputAuth"
                            placeholder="Email Address"
                            type="email"
                            id="email"
                            value={mail}
                            onChange={(e) => setMail(e.target.value)}
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

export default Forgot;
