const isTimeRangeValid = (start: string, end: string): boolean => {
    const [startHour, startMinute] = start.split(":").map(Number);
    const [endHour, endMinute] = end.split(":").map(Number);
    if(startHour > endHour) {
        return false;
    }
    if(startHour === endHour && startMinute >= endMinute) {
        return false;
    }
    return true;
}

export default isTimeRangeValid;