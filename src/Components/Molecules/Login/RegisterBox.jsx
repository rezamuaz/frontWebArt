import React, { useContext } from "react";
import { Context } from "@Context/GlobalProvider";

const RegisterBox = ({ submitHandler }) => {
    const { userData, setUserData } = useContext(Context);

    return (
        <form
            className="mx-auto h-fit w-full rounded-lg bg-white text-base"
            onSubmit={(e) => submitHandler(e)}
        >
            <div className="mt-8 flex flex-col">
                <input
                    className="inputAuth"
                    placeholder="Email Address"
                    type="text"
                    id="email"
                    value={userData.email}
                    onChange={(event) =>
                        setUserData({ ...userData, email: event.target.value })
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
            </div>
            <div className="mt-4 flex flex-col">
                <input
                    className="inputAuth"
                    placeholder="Username"
                    type="text"
                    id="username"
                    value={userData.username}
                    onChange={(event) =>
                        setUserData({
                            ...userData,
                            username: event.target.value,
                        })
                    }
                />
            </div>
            <div className="mt-4 flex flex-col">
                <input
                    className="inputAuth"
                    placeholder="Firstname"
                    type="text"
                    id="firstname"
                    value={userData.firstName}
                    onChange={(event) =>
                        setUserData({
                            ...userData,
                            firstName: event.target.value,
                        })
                    }
                />
            </div>
            <div className="mt-4 flex flex-col">
                <input
                    className="inputAuth"
                    placeholder="LastName"
                    type="text"
                    id="lastname"
                    value={userData.lastName}
                    onChange={(event) =>
                        setUserData({
                            ...userData,
                            lastName: event.target.value,
                        })
                    }
                />
            </div>
            <div className="mt-4 flex flex-col">
                <input
                    className="inputAuth"
                    placeholder="Role"
                    type="hidden"
                    id="role"
                    value={userData.role}
                    onChange={(event) =>
                        setUserData({ ...userData, role: event.target.value })
                    }
                />
            </div>
            <div className="mt-4 flex flex-col">
                <button
                    className="h-min w-full bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 py-2 font-semibold text-white"
                    type="submit"
                >
                    Register
                </button>
            </div>
        </form>
    );
};

export default RegisterBox;

// import React, { useContext } from "react";
// import { Context } from "@Context/GlobalProvider";
// import { useForm } from "./Validation";

// const RegisterBox = ({ onSignup}) => {
//     const { userData, setUserData } = useContext(Context);
//     const initialState = {email: '', password: '', repeatPassword: ''};
//     const validations = [
//     ({email}) => isRequired(email) || {email: 'E-mail is required'},
//     ({password}) => isRequired(password) || {password: 'Password is required'},
//     ({password, repeatPassword}) => isSame(password, repeatPassword) || {repeatPassword: 'Passwords do not match'}
//   ];
//   const {values, isValid, errors, changeHandler, submitHandler} = useForm(initialState, validations, onSignup);

//     return (
//         <form
//             className="mx-auto h-fit w-full rounded-lg bg-white text-base"
//             onSubmit={submitHandler}
//         >
//             <div className="mt-8 flex flex-col">
//                 <input
//                     className="inputAuth"
//                     name="email"
//                     placeholder="Email"
//                     required
//                     type="email"
//                     value={values.email}
//                     onChange={changeHandler}
//                 />
//             </div>
//             <div className="mt-4 flex flex-col">
//                 <input
//                     className="inputAuth"
//                     name="username"
//                     placeholder="username"
//                     type="text"
//                     value={values.username}
//                     onChange={changeHandler
//                     }
//                 />
//             </div>
//             <div className="mt-4 flex flex-col">
//                 <input
//                     className="inputAuth"
//                     placeholder="Firstname"
//                     type="text"
//                     id="firstname"
//                     value={userData.firstName}
//                     onChange={(event) =>
//                         setUserData({
//                             ...userData,
//                             firstName: event.target.value,
//                         })
//                     }
//                 />
//             </div>
//             <div className="mt-4 flex flex-col">
//                 <input
//                     className="inputAuth"
//                     placeholder="LastName"
//                     type="text"
//                     id="lastname"
//                     value={userData.lastName}
//                     onChange={(event) =>
//                         setUserData({
//                             ...userData,
//                             lastName: event.target.value,
//                         })
//                     }
//                 />
//             </div>
//             <div className="mt-4 flex flex-col">
//                 <input
//                     className="inputAuth"
//                     name="password"
//                     placeholder="Password"
//                     type="password"
//                     value={values.password}
//                     onChange={changeHandler}
//                 />
//             </div>
//             <div className="mt-4 flex flex-col">
//                 <input
//                     className="inputAuth"
//                     name="repeatPassword"
//                     placeholder="repeatPassword"
//                     type="password"
//                     value={values.repeatPassword}
//                     onChange={changeHandler}
//                 />
//             </div>
//             <div className="mt-4 flex flex-col">
//                 <input
//                     className="inputAuth"
//                     placeholder="Role"
//                     type="hidden"
//                     id="role"
//                     value={userData.role}
//                     onChange={(event) =>
//                         setUserData({ ...userData, role: event.target.value })
//                     }
//                 />
//             </div>
//             <div className="mt-4 flex flex-col">
//                 <button
//                     className="h-min w-full bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 py-2 font-semibold text-white"
//                     type="submit"
//                 >
//                     Register
//                 </button>
//             </div>
//         </form>
//     );
// };

// export default RegisterBox;
