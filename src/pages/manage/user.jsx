import { useModal } from "@Components/Molecules/Modal";
import LayoutPanel from "@Components/Templates/LayoutPanel";
import {
    USER_DELETE,
    USER_GET_ALL,
    USER_SET_ROLE,
} from "@Shared/lib/GraphqlSchema";
import { GraphqlMutation, GraphqlQueryAuth } from "@Shared/lib/Request";
import React, { useEffect, useMemo, useState } from "react";
import Table from "@Components/Molecules/Table/Table";
import {
    AvatarCell,
    DeleteUser,
    NameCell,
    OptionRole,
    UserStatus,
} from "@Components/Molecules/Table/Column";

const User = () => {
    const [userData, setUserData] = useState();
    const { showModal } = useModal();
    const [loading, setLoading] = useState(false);

    const ModalContent = (props) => <div>{props.value}</div>;
    function handleModal(e) {
        showModal(ModalContent, {
            value: e,
        });
    }

    async function handleRole(id, role) {
        try {
            setLoading(true);
            const variables = {
                userId: id,
                setRole: role,
            };
            const update = await GraphqlMutation(
                USER_SET_ROLE,
                variables
            ).catch((error) => handleModal(error.response.errors[0].message));
            if (update) {
                handleModal("update role success");
            }
        } catch {
            console.error;
        } finally {
            setLoading(false);
        }
    }

    async function handleDelete(id) {
        try {
            setLoading(true);
            const variables = {
                userId: id,
            };
            const deleteUser = await GraphqlMutation(USER_DELETE, variables);
            handleModal("delete user success");
        } catch (error) {
            handleModal(error.response.errors[0].message);
        } finally {
            setLoading(false);
        }
    }
    useEffect(() => {
        const fetchData = async () => {
            const data = await GraphqlQueryAuth(USER_GET_ALL);
            const { getAllUser } = data;
            setUserData(getAllUser);
        };
        fetchData().catch((error) =>
            handleModal(error.response.errors[0].message)
        );
    }, [loading]);

    const columns = useMemo(
        () => [
            {
                Header: "Username",
                accessor: "username",
                Cell: AvatarCell,
                imgAccessor: "image",
                emailAccessor: "email",
            },
            {
                Header: "Name",
                accessor: "firstName",
                Cell: NameCell,
                lastAccessor: "lastName",
            },

            {
                Header: "Role",
                accessor: "role",
                Cell: UserStatus,
            },
            {
                Header: "Change Role",
                Cell: ({ row, column, value = { handleRole } }) =>
                    OptionRole({ row, column, value }),
                roleAccessor: "role",
            },
            {
                Header: "Delete User",
                Cell: ({ row, column, value = { handleDelete } }) =>
                    DeleteUser({ value, row, column }),
            },
        ],
        []
    );
    return (
        <LayoutPanel>
            <div className="layer-8 flex h-screen w-full flex-auto flex-col items-center justify-center pt-14">
                <div className="form-color mx-auto h-full max-w-5xl overflow-y-scroll px-4 scrollbar-hide sm:px-6 lg:px-8">
                    <Table columns={columns} data={userData || []} />
                </div>
            </div>
        </LayoutPanel>
    );
};

export default User;
