import CategoryItem from "./AddCategoryItem";

const AddCategoryList = ({ data, handler }) => {
    return (
        <div className="flex h-full w-full flex-col overflow-y-scroll">
            {data &&
                data.allCategory.map((item) => (
                    <CategoryItem
                        key={item._id}
                        name={item.name}
                        id={item._id}
                        handler={handler}
                    />
                ))}
        </div>
    );
};

export default AddCategoryList;
