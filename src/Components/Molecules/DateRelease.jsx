import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

export default function DateRelease({ set, date }) {
    return (
        <div className="my-2 w-full rounded-[3px] border-2 p-2 text-zinc-100 dark:border-zinc-100 dark:text-slate-100">
            <DatePicker
                selected={date}
                onChange={(date) => set("date", date)}
                showTimeSelect
                timeFormat="HH:mm"
                timeIntervals={15}
                timeCaption="time"
                dateFormat="MMMM d, yyyy h:mm aa"
                isClearable
                placeholderText="Select Date"
            />
        </div>
    );
}
