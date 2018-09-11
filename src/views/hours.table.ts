import * as Table from "cli-table";
import { DateRange } from "../dates/date-range";
import Formatter from "../formatter";

export class HoursTable {
  format = new Formatter();
  table: Table;

  constructor(dateRange: DateRange) {
    this.table = new Table({
      head: ["Day", "Worked"].chalkResetBold()
    });

    dateRange.days.forEach(day => {
      this.table.push([
        this.format.date(day.date),
        this.format.hours(day.total.worked)
      ]);
    });

    this.table.push(
      ["Total", this.format.hours(dateRange.total.worked)].chalkResetBold()
    );

    console.log(this.table.toString());
  }
}
