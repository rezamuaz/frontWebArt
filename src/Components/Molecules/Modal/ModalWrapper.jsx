import ModalConsumer from "./ModalContext";
import Modal from "./Modal";
import tw from "tailwind-styled-components";

const Background = tw.div`
absolute top-0 right-0 bottom-0 left-0 flex items-center justify-center bg-zinc-600 bg-opacity-80 inset-0,
`;

const ModalWrapper = () => {
    return (
        <ModalConsumer.Consumer>
            {({ component: Component, props, hideModal }) =>
                Component && (
                    <Background>
                        <Modal>
                            <Component {...props} onRequestClose={hideModal} />
                        </Modal>
                    </Background>
                )
            }
        </ModalConsumer.Consumer>
    );
};

export default ModalWrapper;
