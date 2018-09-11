import * as Table from "cli-table";
import { DateRange } from "../dates/date-range";
import { Day } from "../dates/day";
import Formatter from "../formatter";

export class HoursTable {
  format = new Formatter();
  table: Table;

  constructor(dateRange: DateRange) {
    this.table = new Table({
      head: ["Day", "Hours"].chalkResetBold()
    });

    dateRange.days.forEach(day => {
      this.table.push([
        this.format.date(day.date),
        this.format.hours(day.total.worked)
      ]);
    });

    const reduceTotalHoursWorked = (
      accumulator: Day,
      currentValue: Day
    ): number => accumulator.total.worked + currentValue.total.worked;

    this.table.push(
      [
        "Total",
        this.format.hours(this.totalHours(dateRange.days))
      ].chalkResetBold()
    );

    console.log(this.table.toString());
  }

  /**
   * Determines the total number of hours worked from all given days.
   *
   * @param days The days to add together
   * @returns total number of hours worked for all the days.
   */
  totalHours(days: Day[]): number {
    let totalHoursWorked = 0;
    days.forEach(day => (totalHoursWorked += day.total.worked));
    return totalHoursWorked;
  }
}
