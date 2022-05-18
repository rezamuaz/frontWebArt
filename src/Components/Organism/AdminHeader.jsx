import { Button } from "@Components/Atoms";
import { RiMenuLine } from "src/Assets/RemixIcon";

const AdminHeader = ({ handleShow }) => {
    return (
        <header className="layer-9 absolute top-0 left-0 z-30 inline-flex h-12 w-full items-center justify-end px-4 font-semibold shadow-md md:hidden">
            <Button onClick={handleShow}>
                <RiMenuLine className="h-8 w-8" />
            </Button>
        </header>
    );
};

export default AdminHeader;
