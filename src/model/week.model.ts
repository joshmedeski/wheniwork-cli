import { Time } from "./wheniwork.types";
import { DayTotal, Day } from "./day.model";
import { startOfWeek, differenceInMinutes, addHours, getDay } from "date-fns";

/**
 * Converts a list of times from the API into structure data for the CLI.
 */
class Week {
  days: Day[];
  total: DayTotal;

  constructor(times: Time[]) {
    this.days = [];
    const timesThisWeek = times.filter(this.isDayThisWeek);
    const timesToDays: Day[] = [];

    timesThisWeek.forEach(time => {
      const newDay = new Day(time);
      timesToDays.push(newDay);
    });

    timesToDays.forEach(time => {
      const timeDay = getDay(time.date);
      const dayIndex = this.days.findIndex(day => {
        return timeDay === getDay(day.date);
      });
      dayIndex < 0 ? this.days.push(time) : this.mergeDays(dayIndex, time);
    });

    // thisWeek = thisWeek.map(this.calcTodaysHours);
    // thisWeek = thisWeek.map(this.estimateEndTime);
  }

  mergeDays(index: number, day: Day) {
    const mergedDay = this.days[index];
    this.days[index].slots.worked = day.slots.worked.concat(
      mergedDay.slots.worked
    );
    mergedDay.total.worked = mergedDay.total.worked + day.total.worked;
  }

  dayAlreadyExists(time: Time): boolean {
    return false;
  }

  /**
   * Determines if the day is in this week.
   *
   * @param time The time to check.
   * @returns true if the start time is greater than or equal to the start of this week.
   */
  isDayThisWeek(time: Time): boolean {
    let startOfThisWeek = startOfWeek(new Date());
    return time.start_time && new Date(time.start_time) >= startOfThisWeek;
  }
}

export default Week;
