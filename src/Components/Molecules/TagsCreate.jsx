import React, { useCallback, useContext, useState } from "react";

import CreatableSelect from "react-select/creatable";
import { Context } from "@Context/GlobalProvider";
import urlSlug from "url-slug";

const TagsCreate = ({ tags, set }) => {
    const [editingValue, setEditingValue] = useState();
    const { content, setContent } = useContext(Context);

    const handleChange = useCallback(
        (newValue) => {
            let array = newValue.map(({ label, value }) => ({
                label,
                value: urlSlug(value.toLowerCase()),
            }));
            set("tags", array);
        },
        [set]
    );

    const handleEditChange = useCallback(
        (inputValue, data) => {
            const idx = tags.findIndex((v) => v.value === data.value);
            const newValue = [...tags];

            if (inputValue.length === 0) {
                newValue.splice(idx, 1);
            } else {
                newValue[idx] = {
                    label: inputValue,
                    value: inputValue,
                };
            }

            set("tags", newValue);

            setEditingValue(undefined);
        },
        [tags, set]
    );

    const MultiValueLabel = useCallback(
        ({ data }) => {
            if (editingValue && editingValue === data.value) {
                return (
                    <input
                        type="text"
                        defaultValue={data.value}
                        onKeyDown={(ev) => {
                            ev.stopPropagation();
                            if (ev.key === "Enter") {
                                handleEditChange(ev.currentTarget.value, data);
                            }
                        }}
                        onBlur={(ev) => {
                            handleEditChange(ev.currentTarget.value, data);
                        }}
                        autoFocus
                    />
                );
            }
            return (
                <button
                    onClick={() => {
                        setEditingValue(data.value);
                    }}
                >
                    {data.value}
                </button>
            );
        },
        [handleEditChange, editingValue]
    );

    return (
        <div className="normal-text-color my-2 w-full">
            <CreatableSelect
                id="long-value-select"
                instanceId="long-value-select"
                isMulti={true}
                placeholder="Add Tags"
                value={tags}
                onChange={handleChange}
                defaultValue={tags}
                components={{
                    MultiValueLabel,
                }}
            />
        </div>
    );
};

export default TagsCreate;
