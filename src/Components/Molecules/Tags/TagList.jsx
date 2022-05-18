import TagItem from "./TagItem";

const TagList = ({ props }) => {
    return (
        <div className="mt-5 flex h-fit flex-auto flex-row flex-wrap items-center text-sm font-semibold">
            <strong>Tag: </strong>
            {props.tags &&
                props.tags.map((item, index) => {
                    return (
                        <TagItem
                            key={index}
                            index={item.index}
                            label={item.label}
                            value={item.value}
                        />
                    );
                })}
        </div>
    );
};

export default TagList;
