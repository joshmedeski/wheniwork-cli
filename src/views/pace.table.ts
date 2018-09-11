import Calculator from "../calculator";
import * as Table from "cli-table";
import { DateRange } from "../dates/date-range";
import Formatter from "../formatter";

export class PaceTable {
  calc = new Calculator();
  format = new Formatter();
  dateRange: DateRange;
  table: Table;

  constructor(dateRange: DateRange) {
    this.dateRange = dateRange;
    this.table = new Table({
      head: ["Pace", "Hours", "Diff", "Time"].chalkResetBold()
    });

    this.row("Minimum", 7);
    this.row("Standard", 8);
    this.row("Overtime", 9);

    this.table.push(
      [
        "Total",
        this.format.hours(dateRange.total.worked),
        "",
        ""
      ].chalkResetBold()
    );

    console.log(this.table.toString());
  }

  private row(title: string, targetHours: number) {
    const totalTargetHours = this.dateRange.days.length * targetHours;
    this.table.push([
      `${title} (${targetHours})`,
      `${this.dateRange.total.worked.toFixed(2)} of ${totalTargetHours}`,
      this.calc.difference(this.dateRange.total.worked, totalTargetHours),
      this.calc.estimateEndTime(this.dateRange.total.worked, totalTargetHours)
    ]);
  }
}
