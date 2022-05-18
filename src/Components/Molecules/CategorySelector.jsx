import useSWR from "swr";
import Select from "react-select";
import { All_CATEGORY } from "@Shared/lib/GraphqlSchema";
import { SWRfetcher } from "@Shared/lib/Request";

const CategorySelector = ({ set, category }) => {
    const { data, error } = useSWR(All_CATEGORY, SWRfetcher);

    return (
        <>
            <div className="normal-text-color my-2 w-full">
                {category && (
                    <Select
                        id="long-value-select"
                        isMulti={true}
                        defaultValue={category}
                        onChange={(e) => set("category", e)}
                        getOptionLabel={(options) => options.name}
                        getOptionValue={(options) => options._id}
                        options={data?.allCategory}
                        placeholder="Choose Category"
                        value={category}
                    />
                )}
            </div>
        </>
    );
};

export default CategorySelector;
