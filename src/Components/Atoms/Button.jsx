const Button = ({ children, title, ...props }) => {
    return (
        <button {...props}>
            {title}
            {children}
        </button>
    );
};

export default Button;
