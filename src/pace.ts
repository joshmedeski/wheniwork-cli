import Calculator from "./calculator";
import * as Table from "cli-table";
import Week from "./week";
import Formatter from "./formatter";

export class Pace {
  calc = new Calculator();
  format = new Formatter();
  table: Table;
  totalHours: number;
  lastWorkDay: number;

  constructor(week: Week) {
    this.table = new Table({
      head: ["Pace", "Hours", "Difference"].chalkResetBold()
    });

    this.lastWorkDay = new Date(week.days[week.days.length - 1].date).getDay();
    this.totalHours = week.days.reduce((accumulator, currentValue) => {
      const hours = currentValue.total.worked || 0;
      return accumulator + hours;
    }, 0);

    this.row("Minimum", 35);
    this.row("Standard", 40);
    this.row("Overtime", 45);

    console.log(this.table.toString());
  }

  private row(title: string, pace: number) {
    const dayPace = pace / 5;
    this.table.push([
      title,
      `${this.totalHours.toFixed(2)} of ${pace * this.lastWorkDay / 5}/${pace}`,
      this.calc.difference(this.totalHours, dayPace * this.lastWorkDay)
    ]);
  }
}
