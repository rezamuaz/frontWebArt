import { RiCloseCircleFill } from "src/Assets/RemixIcon";

const AddCategoryItem = ({ id, name, handler }) => {
    return (
        <li key={id} className="my-1 inline-flex h-8 items-center text-center ">
            <span className="text-center">{name}</span>
            <button className="ml-2 h-5 w-5" onClick={(e) => handler(e, id)}>
                <RiCloseCircleFill className="h-full w-full text-red-600 " />
            </button>
        </li>
    );
};

export default AddCategoryItem;
