const BurgerButton = ({ slide }) => {
    return (
        <>
            <div className="btn-head"></div>
            <span
                aria-hidden="true"
                className={`btn-line ${
                    slide ? "rotate-45" : "-translate-y-1.5"
                } `}
            ></span>
            <span
                aria-hidden="true"
                className={`btn-line ${slide ? "opacity-0" : ""}`}
            ></span>
            <span
                aria-hidden="true"
                className={`btn-line ${
                    slide ? "-rotate-45" : "translate-y-1.5"
                }`}
            ></span>
        </>
    );
};

export default BurgerButton;
