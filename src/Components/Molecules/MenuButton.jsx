import { BurgerBtn } from "@Components/Atoms";
import useOutsideClick from "@Shared/utils/useOutsideClick";

const MenuButton = ({ slide, Handle, setSlide }) => {
    return (
        <>
            <button className="menu-btn" onClick={Handle}>
                <BurgerBtn slide={slide} />
            </button>
        </>
    );
};

export default MenuButton;
