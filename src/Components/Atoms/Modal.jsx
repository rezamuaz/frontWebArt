const Modal = ({ handleShow }) => {
    return (
        <div className="rounded-md px-16 py-14 text-center">
            <h1 className="mb-4 text-xl font-bold text-slate-500">{text}</h1>
            {/* <button className="bg-indigo-500 px-4 py-2 rounded-md text-md text-white"><CloseBtn className="w-3 h-3"/></button> */}
            <button
                className="text-md ml-2 rounded-md bg-green-500 px-7 py-2 font-semibold"
                onClick={handleShow}
            >
                Ok
            </button>
        </div>
    );
};

export default Modal;
