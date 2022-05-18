import NavMenuItem from "./NavMenuItem";
const NavMenuList = ({ menu }) => {
    return (
        <ul className=" ml-0 inline-flex h-fit w-full items-center overflow-x-scroll rounded scrollbar-hide ">
            {menu?.map((items, index) => (
                <NavMenuItem key={index} index={index} name={items.name} />
            ))}
        </ul>
    );
};

export default NavMenuList;
