import moment from "moment";

function reverseDatetime(day: string, month: number, year: string, time: string): string {
    const years = parseInt(`25${year}`) - 543
    const [hour, minute] = time.split(':');
    const formattedDate = moment(`${years}-${month}-${day} ${hour}:${minute}`, 'YYYY-MM-DD HH:mm').format('YYYY-MM-DD HH:mm');
    return formattedDate;
}

function validateDay(day: string): boolean {
    const dateInt = parseInt(day)
    return Number.isInteger(dateInt) && dateInt > 0 && dateInt < 31
}

function validateYears(year: string): boolean {
    const yearInt = parseInt(year)
    return Number.isInteger(yearInt) && yearInt > 60 && yearInt < 3000
}

function validateTime(timeStr: string): boolean {
    const date = new Date(`1970-01-01T${timeStr}:00Z`); // Using a fixed date and UTC timezone
    // Format back to H:i to check against the input
    const formatted = date.getUTCHours().toString().padStart(2, '0') + ':' + date.getUTCMinutes().toString().padStart(2, '0');
    return formatted === timeStr;
}

export {
    reverseDatetime, validateDay, validateYears, validateTime
}