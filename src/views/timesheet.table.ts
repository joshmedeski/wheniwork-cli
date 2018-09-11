import * as Table from "cli-table";
import chalk from "chalk";
import { DateRange } from "../dates/date-range";
import { Day } from "../dates/day";
import Formatter from "../formatter";

export class TimeSheetTable {
  format = new Formatter();
  table: Table;

  constructor(dateRange: DateRange) {
    this.table = new Table({
      head: ["Time Slot", "In", "Out", "Worked"].chalkResetBold()
    });

    dateRange.days.forEach(day => {
      day.slots.worked.forEach(slot => {
        this.table.push([
          this.format.date(slot.clockIn),
          this.format.time(slot.clockIn),
          slot.clockOut ? this.format.time(slot.clockOut) : chalk.gray("-"),
          this.format.hours(slot.hours)
        ]);
      });
    });

    this.table.push(
      [
        "",
        "",
        "Total",
        this.format.hours(this.totalTimeSlotHours(dateRange.days))
      ].chalkResetBold()
    );

    console.log(this.table.toString());
  }

  /**
   * Determines the total number of hours worked from all given time slots.
   *
   * @param days The days to add together.
   * @returns total number of hours worked for all the time slots.
   */
  totalTimeSlotHours(days: Day[]): number {
    let totalTimeSlotHoursWorked = 0;
    days.forEach(day => {
      day.slots.worked.forEach(slot => {
        totalTimeSlotHoursWorked += slot.hours;
      });
    });
    return totalTimeSlotHoursWorked;
  }
}
