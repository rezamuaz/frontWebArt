import Select from "react-select";

const options = [
    { status: "DRAF", label: "Draf" },
    { status: "PUBLISH", label: "Publish" },
    { status: "PENDING", label: "Pending" },
];

const StatusPost = ({ set, status }) => {
    return (
        <>
            <div className="normal-text-color my-2 w-full">
                {options && (
                    <Select
                        id="long-value-select"
                        instanceId="long-value-select"
                        onChange={(e) => set("status", e.status)}
                        getOptionValue={(options) => options.status}
                        getOptionLabel={(options) => options.status}
                        options={options}
                        placeholder={`STATUS : ${status}`}
                        value={status}
                    />
                )}
            </div>
        </>
    );
};

export default StatusPost;
