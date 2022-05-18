import { useModal } from "./ModalContext";
import tw from "tailwind-styled-components";
import {
    RiCloseCircleLine,
    RiTextWrap,
    RiThumbUpLine,
} from "src/Assets/RemixIcon";

const ModalFooter = tw.div`
    w-full
    h-fit
    flex
    justify-end
    mt-6
    p-2
  `;

const ModalBody = tw.div`
    h-fit
    max-w-md
    normal-bg
    rounded
    shadow-md
    border-2
    p-4
    
 `;

const Modal = ({ children }) => {
    const { hideModal } = useModal();
    return (
        <ModalBody>
            {children}
            <ModalFooter>
                <button
                    className="inline-flex gap-x-2 rounded bg-green-600 px-2 py-1 text-white"
                    onClick={hideModal}
                >
                    OK
                    <RiThumbUpLine />
                </button>
            </ModalFooter>
        </ModalBody>
    );
};

export default Modal;
