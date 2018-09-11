import * as Table from "cli-table";
import chalk from "chalk";
import { DateRange } from "../dates/date-range";
import Formatter from "../formatter";

export class UnpaidBreaksTable {
  format = new Formatter();
  table: Table;

  constructor(dateRange: DateRange) {
    this.table = new Table({
      head: ["Unpaid Break", "Out", "In", "Length"].chalkResetBold()
    });

    dateRange.days.forEach(day => {
      day.slots.unpaidBreak.forEach(slot => {
        this.table.push([
          this.format.date(slot.clockIn),
          this.format.time(slot.clockIn),
          slot.clockOut ? this.format.time(slot.clockOut) : chalk.gray("-"),
          this.format.hours(slot.hours)
        ]);
      });
    });

    this.table.push(
      ["", "", "Total", dateRange.total.unpaidBreaks].chalkResetBold()
    );

    console.log(this.table.toString());
  }
}
