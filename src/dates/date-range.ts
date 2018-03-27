import { Time } from "../model/wheniwork.types";
import { DayTotal, Day } from "./day";
import { getDay } from "date-fns";

/**
 * Converts a list of times from the API into structure data for the CLI.
 */
export class DateRange {
  days: Day[];
  total: DayTotal;

  constructor(times: Time[]) {
    this.days = new Array();
    this.total = new DayTotal();

    const timesToDays: Day[] = [];

    times.forEach(time => {
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

    this.total.worked = this.days.reduce((accumulator, currentValue) => {
      const hours = currentValue.total.worked || 0;
      return accumulator + hours;
    }, 0);
  }

  mergeDays(index: number, day: Day) {
    const mergedDay = this.days[index];
    this.days[index].slots.worked = day.slots.worked.concat(
      mergedDay.slots.worked
    );
    mergedDay.total.worked = mergedDay.total.worked + day.total.worked;
  }
}
