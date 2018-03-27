import Calculator from "../calculator";
import * as Table from "cli-table";
import { DateRange } from "../dates/date-range";
import Formatter from "../formatter";

export class PaceTable {
  calc = new Calculator();
  format = new Formatter();
  table: Table;
  totalHours: number;
  lastWorkDay: number;

  constructor(dateRange: DateRange) {
    this.table = new Table({
      head: ["Pace", "Hours", "Difference"].chalkResetBold()
    });

    // TODO: Move last work day determination into higher level model
    this.lastWorkDay = new Date(
      dateRange.days[dateRange.days.length - 1].date
    ).getDay();
    // TODO: Move total hours to higher level in the model
    this.totalHours = dateRange.days.reduce((accumulator, currentValue) => {
      const hours = currentValue.total.worked || 0;
      return accumulator + hours;
    }, 0);

    this.row("Minimum", 35);
    this.row("Standard", 40);
    this.row("Overtime", 45);

    console.log(this.table.toString());
  }

  private row(title: string, pace: number) {
    const dailyPace = pace / 5;
    const currentPace = pace * this.lastWorkDay / 5;
    const displayPace = currentPace === pace ? pace : `${currentPace}/${pace}`;
    this.table.push([
      title,
      `${this.totalHours.toFixed(2)} of ${displayPace}`,
      this.calc.difference(this.totalHours, dailyPace * this.lastWorkDay)
    ]);
  }
}
