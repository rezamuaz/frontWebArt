import { useRouter } from "next/router";
import LoadingScreen from "@Components/Templates/LoadingScreen";
import { Button } from "@Components/Atoms";
import { useModal } from "@Components/Molecules/Modal";
import { RiUserLine } from "src/Assets/RemixIcon";
import { useAuthDispatch } from "@Context/AuthContext";
import { useEffect, useState } from "react";
import { classNames } from "@Shared/utils/Utils";
import { GraphqlMutation, GraphqlQueryAuth } from "@Shared/lib/Request";
import {
    USER_GET_AUTH,
    USER_IMAGE,
    USER_UPDATE_EMAIl,
    USER_UPDATE_NAME,
} from "@Shared/lib/GraphqlSchema";
import LayoutPanel from "@Components/Templates/LayoutPanel";
import { FileUpload } from "@Components/Molecules";

const Profile = () => {
    const [userData, setUserData] = useState({});
    const [editName, setEditName] = useState(false);
    const [editEmail, setEditEmail] = useState(false);
    const [loading, setLoading] = useState(false);
    const [image, setImage] = useState("");
    const dispatch = useAuthDispatch();
    const { showModal } = useModal();

    const router = useRouter();
    if (router.isFallback) {
        return <LoadingScreen />;
    }

    async function handleImage(e) {
        setLoading(true);
        setImage(e);
        const variables = {
            userId: userData._id,
            imageUrl: e,
        };
        const data = await GraphqlMutation(USER_IMAGE, variables);
        setLoading(false);
    }

    useEffect(() => {
        async function getData() {
            const res = await GraphqlQueryAuth(USER_GET_AUTH);
            const { authUser } = res;
            setUserData(authUser);
        }
        getData().catch(console.error);
    }, [loading]);

    function handleEditName(e) {
        e.preventDefault();
        setEditName(true);
    }
    function handleEditEmail(e) {
        e.preventDefault();
        setEditEmail(true);
    }
    function handleChange(name) {
        return ({ target: { value } }) => {
            setUserData((oldValues) => ({ ...oldValues, [name]: value }));
        };
    }
    const ModalContent = (props) => <div>{props.value}</div>;
    function handleModal(e) {
        showModal(ModalContent, {
            value: e,
        });
    }

    async function handleSubmitName(e) {
        e.preventDefault();
        const variables = {
            userId: userData._id,
            firstName: userData.firstName,
            lastName: userData.lastName,
        };
        if (
            variables.firstName.trim().length === 0 ||
            variables.lastName.trim().length === 0
        ) {
            return handleModal("name must not empty");
        }
        let data = await GraphqlMutation(USER_UPDATE_NAME, variables).catch(
            (error) => handleModal(error.response.errors[0].message)
        );
        setTimeout(() => {
            setEditName(false);
        }, 2000);
        if (data) {
            handleModal("Update Name Success");
            setTimeout(() => {
                setEditName(false);
            }, 2000);
        }
    }
    async function handleSubmitEmail(e) {
        e.preventDefault();
        const variables = {
            userId: userData._id,
            email: userData.email,
        };
        let regEmail =
            /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        if (
            variables.email.trim().length === 0 ||
            !regEmail.test(variables.email)
        ) {
            return handleModal("email epmty or not valid email address");
        }
        let data = await GraphqlMutation(USER_UPDATE_EMAIl, variables).catch(
            (error) => handleModal(error.response.errors[0].message)
        );
        setTimeout(() => {
            setEditEmail(false);
        }, 2000);

        if (data) {
            handleModal("Update Email Success");
            dispatch("LOGOUT");
        }
    }

    function handleUpload() {
        handleModal(<FileUpload set={handleImage} />);
    }

    const status = userData.role ? userData.role.toLowerCase() : "unknown";
    return (
        <LayoutPanel>
            <div className="layer-8 flex h-full w-full pt-14 md:px-8 ">
                {userData && (
                    <div className="layer-9 mx-auto flex h-fit w-full flex-col gap-x-3 rounded p-8 sm:w-fit md:mx-0 md:flex-row">
                        <div onClick={handleUpload}>
                            {userData.image ? (
                                <img
                                    className="mx-auto h-[150px] w-[150px] rounded-full"
                                    src={userData.image}
                                    width="150"
                                    height="150"
                                    objectfit="cover"
                                ></img>
                            ) : (
                                <RiUserLine className="normal-bg h-[150px] w-[150px] rounded-full p-2" />
                            )}
                        </div>

                        <div className="mt-8 flex flex-col gap-y-2 md:mt-0">
                            <div>
                                {status && (
                                    <span
                                        className={classNames(
                                            "leading-wide rounded-full px-3 py-1 text-xs font-bold uppercase shadow-sm",
                                            status.startsWith("author")
                                                ? "bg-green-200 text-green-800 dark:bg-green-800 dark:text-white"
                                                : null,
                                            status.startsWith("guest")
                                                ? "bg-yellow-200 text-yellow-800 dark:bg-yellow-800 dark:text-white"
                                                : null,
                                            status.startsWith("admin")
                                                ? "bg-violet-200 text-violet-800 dark:bg-violet-800 dark:text-white"
                                                : null,
                                            status.startsWith("superadmin")
                                                ? "bg-red-200 text-red-800 dark:bg-red-800 dark:text-white"
                                                : null
                                        )}
                                    >
                                        {status}
                                    </span>
                                )}
                            </div>
                            <div className="flex flex-col gap-y-1">
                                <div className="inline-flex w-full gap-x-1">
                                    <span>{"username :"}</span>

                                    <span className="mx-2 flex-auto border-none">
                                        {userData.username}
                                    </span>
                                </div>
                                <div className="inline-flex w-full gap-x-1">
                                    <span>{"firstname :"}</span>

                                    {editName ? (
                                        <input
                                            className="flex-auto border-none px-1 underline underline-offset-4 focus:outline-none"
                                            value={userData.firstName}
                                            onChange={handleChange("firstName")}
                                        ></input>
                                    ) : (
                                        <span className="mx-2 h-fit flex-auto border-none">
                                            {userData.firstName}
                                        </span>
                                    )}
                                    {editName ? (
                                        <Button
                                            type="button"
                                            title="Save"
                                            className="btn-green ml-2 rounded text-sm"
                                            onClick={(e) => handleSubmitName(e)}
                                        />
                                    ) : (
                                        <Button
                                            disable={editName}
                                            type="button"
                                            title="Edit"
                                            className="btn-green ml-2 rounded text-sm"
                                            onClick={(e) => handleEditName(e)}
                                        />
                                    )}
                                </div>
                                <div className="inline-flex w-full gap-x-1">
                                    <span>{"lastname :"}</span>
                                    {editName ? (
                                        <input
                                            className=" flex-auto border-none px-1 underline underline-offset-4 focus:outline-none"
                                            value={userData.lastName}
                                            onChange={handleChange("lastName")}
                                        ></input>
                                    ) : (
                                        <span className="mx-2 h-fit flex-auto overflow-hidden border-none">
                                            {userData.lastName}
                                        </span>
                                    )}
                                </div>
                                <div className="inline-flex w-full whitespace-nowrap">
                                    <span>{"email :"}</span>
                                    {editEmail ? (
                                        <input
                                            className="flex-auto border-none px-1 underline underline-offset-4 focus:outline-none"
                                            value={userData.email}
                                            onChange={handleChange("email")}
                                        ></input>
                                    ) : (
                                        <span className="mx-2 h-fit flex-auto overflow-hidden border-none">
                                            {userData.email}
                                        </span>
                                    )}

                                    {editEmail ? (
                                        <Button
                                            type="button"
                                            title="Save"
                                            className="btn-green ml-2 rounded p-0 text-sm"
                                            onClick={(e) =>
                                                handleSubmitEmail(e)
                                            }
                                        />
                                    ) : (
                                        <Button
                                            disable={editEmail}
                                            type="button"
                                            title="Edit"
                                            className="btn-green ml-2 rounded p-0 text-sm"
                                            onClick={(e) => handleEditEmail(e)}
                                        />
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </LayoutPanel>
    );
};
export default Profile;
