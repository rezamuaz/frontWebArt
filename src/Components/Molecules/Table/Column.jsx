import { TimePostedDateOnly } from "@Shared/lib/helper";
import { classNames } from "@Shared/utils/Utils";
import { RiDeleteBin2Fill, RiUserLine } from "src/Assets/RemixIcon";

export function StatusPill({ value }) {
    const status = value ? value.toLowerCase() : "unknown";

    return (
        <span
            className={classNames(
                "leading-wide rounded-full px-3 py-1 text-xs font-bold uppercase shadow-sm",
                status.startsWith("publish")
                    ? "bg-green-100 text-green-800 dark:bg-green-800 dark:text-white"
                    : null,
                status.startsWith("draf")
                    ? "bg-yellow-100 text-yellow-800 dark:bg-yellow-800 dark:text-white"
                    : null,
                status.startsWith("pending")
                    ? "bg-red-100 text-red-800 dark:bg-red-800 dark:text-white"
                    : null
            )}
        >
            {status}
        </span>
    );
}

export function UserStatus({ value }) {
    const status = value ? value.toLowerCase() : "unknown";

    return (
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
    );
}

export function ShortTitle({ value }) {
    return (
        <div className="h-fit w-[200px] overflow-hidden text-ellipsis text-sm">
            {value}
        </div>
    );
}

export function ShowDate({ value }) {
    return (
        <div className="h-fit w-fit overflow-hidden text-ellipsis text-sm">
            {TimePostedDateOnly(value)}
        </div>
    );
}

export function DeleteUser({ value, column, row }) {
    return (
        <div className="h-full w-full cursor-pointer text-center">
            <div
                className="inline-flex w-full justify-center"
                id={row.original._id}
                onClick={(e) => value.handleDelete(e.currentTarget.id)}
            >
                <RiDeleteBin2Fill className="h-6 w-6 text-red-600" />
            </div>
        </div>
    );
}

export function OptionRole({ row, column, value }) {
    return (
        <div>
            <select
                className="light-text block w-28 rounded-md bg-gray-500 py-1 text-xs shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                id={row.original._id}
                value={row.original[column.roleAccessor]}
                onChange={(e) => {
                    value.handleRole(e.target.id, e.target.value);
                }}
            >
                {["SUPERADMIN", "ADMIN", "AUTHOR", "GUEST"].map((userRole) => (
                    <option key={userRole} value={userRole}>
                        {userRole}
                    </option>
                ))}
            </select>
        </div>
    );
}

export function NameCell({ value, column, row }) {
    return (
        <div className="flex items-center">
            <div className="ml-4">
                <div className="invert-text text-sm font-medium">{value}</div>
                <div className="text-sm text-gray-500">
                    {row.original[column.lastAccessor]}
                </div>
            </div>
        </div>
    );
}
export function AvatarCell({ value, column, row }) {
    return (
        <div className="flex items-center">
            <div className="h-10 w-10 flex-shrink-0">
                {row.original[column.imgAccessor] ? (
                    <img
                        className="h-10 w-10 rounded-full"
                        src={row.original[column.imgAccessor]}
                        alt=""
                    />
                ) : (
                    <RiUserLine className="invert-text layer-8 h-10 w-10 rounded-full p-1" />
                )}
            </div>
            <div className="ml-4">
                <div className="invert-text text-sm font-medium">{value}</div>
                <div className="text-sm text-gray-500">
                    {row.original[column.emailAccessor]}
                </div>
            </div>
        </div>
    );
}
