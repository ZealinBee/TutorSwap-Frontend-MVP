import { AvailableTime } from "@/types/schedule/AvailableTime";

const isTimeOverlapping = (
  availableTimes: AvailableTime[],
  startTime: string,
  endTime: string,
  timeOfTheWeek: string
) => {
  let isOverlapping = false;
  availableTimes.forEach((time) => {
    if (timeOfTheWeek === time.dayOfTheWeek) {
      const [startTimeHour, startTimeMinute] = startTime.split(":").map(Number);
      const [endTimeHour, endTimeMinute] = endTime.split(":").map(Number);
      const [timeStartHour, timeStartMinute] = time.startTime
        .split(":")
        .map(Number);
      const [timeEndHour, timeEndMinute] = time.endTime.split(":").map(Number);

      // 9:00 - 10:00   9:00-10:100
      // TIME 9-17  START 17-17:30

      if (startTimeHour >= timeStartHour && timeEndHour > startTimeHour) {
        isOverlapping = true;
      }
      if (timeStartHour > startTimeHour && endTimeHour > timeStartHour) {
        isOverlapping = true;
      }
    }
  });

  return isOverlapping;
};

export default isTimeOverlapping;
