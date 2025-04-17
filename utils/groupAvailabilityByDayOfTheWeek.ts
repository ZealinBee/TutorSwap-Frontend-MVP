import { AvailableTime } from "@/types/schedule/AvailableTime";

const groupAvailabilityByDayOfTheWeek = (availableTimes: AvailableTime[]) => {
    const grouped = [
        { day: "Sunday", availableTimes: [] as AvailableTime[] },
        { day: "Monday", availableTimes: [] as AvailableTime[] },
        { day: "Tuesday", availableTimes: [] as AvailableTime[] },
        { day: "Wednesday", availableTimes: [] as AvailableTime[] },
        { day: "Thursday", availableTimes: [] as AvailableTime[] },
        { day: "Friday", availableTimes: [] as AvailableTime[] },
        { day: "Saturday", availableTimes: [] as AvailableTime[] },
      ];

      availableTimes.forEach((availableTime) => {
        const index = grouped.findIndex(
          (group) => group.day === availableTime.dayOfTheWeek
        );
        if (index !== -1) {
          grouped[index].availableTimes.push(availableTime);
        }
      });
      return grouped;
};

export default groupAvailabilityByDayOfTheWeek;