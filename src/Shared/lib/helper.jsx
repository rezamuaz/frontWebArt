import moment from "moment";
import "moment/locale/id";
export function TimeAgo(createAt) {
    return moment(parseInt(createAt)).locale("id").fromNow();
}

export function TimePosted(time) {
    return moment(parseInt(time)).format("DD MMMM YYYY, h:mm");
}
export function TimePostedDateOnly(time) {
    return moment(parseInt(time)).format("DD MMMM YYYY");
}

export function lowercase(String) {
    return String.toLowerCase();
}

export function moveItemIndex(arr, old_index, new_index) {
    if (new_index >= arr.length) {
        var k = new_index - arr.length + 1;
        while (k--) {
            arr.push(undefined);
        }
    }
    arr.splice(new_index, 0, arr.splice(old_index, 1)[0]);
    return arr;
}
