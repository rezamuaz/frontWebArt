import { useContext } from "react";
import { Context } from "@Context/GlobalProvider";
import { lowercase } from "@Shared/lib/helper";
import Link from "next/link";

const LoginBox = ({ submitHandler }) => {
    const { userData, setUserData } = useContext(Context);
    return (
        <form
            className="mx-auto h-fit w-full rounded-lg bg-white text-base"
            onSubmit={(e) => submitHandler(e)}
        >
            <div className="mt-4 flex flex-col">
                <input
                    className="inputAuth"
                    placeholder="Email Address"
                    type="email"
                    id="email"
                    value={userData.email}
                    onChange={(event) =>
                        setUserData({
                            ...userData,
                            email: lowercase(event.target.value),
                        })
                    }
                />
            </div>
            <div className="mt-4 flex flex-col">
                <input
                    className="inputAuth"
                    placeholder="Password"
                    type="password"
                    id="password"
                    value={userData.password}
                    onChange={(event) =>
                        setUserData({
                            ...userData,
                            password: event.target.value,
                        })
                    }
                />
                <label className="mt-1 text-sm text-slate-600 hover:underline">
                    <Link href="/forgot" passHref>
                        <a>Forgot Password?</a>
                    </Link>
                </label>
            </div>
            <div className="mt-4 flex flex-col">
                <button
                    className="h-min w-full bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 py-2 font-semibold text-white"
                    type="submit"
                >
                    Login
                </button>
            </div>
        </form>
    );
};

export default LoginBox;
