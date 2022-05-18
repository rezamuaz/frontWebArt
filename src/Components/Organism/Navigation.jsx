import React from "react";
import NavMenuList from "../Molecules/Navigation/NavMenuList";

const Navigation = ({ menu }) => {
    return (
        <nav className="navigation">
            <div className="align-center">
                <NavMenuList menu={menu} />
            </div>
        </nav>
    );
};
export default Navigation;
