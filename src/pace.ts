import Calculator from "./calculator";
import * as Table from "cli-table";
import Week from "./week";

export class Pace {
  calc = new Calculator();
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

    this.row("Minimum (35hrs)", 7);
    this.row("Standard (40hrs)", 8);
    this.row("Overtime (45hrs)", 9);

    console.log(this.table.toString());
  }

  private row(title: string, pace: number) {
    this.table.push([
      title,
      `${this.totalHours.toFixed(2)}/${pace * this.lastWorkDay}hrs`,
      this.calc.difference(this.totalHours, pace * this.lastWorkDay)
    ]);
  }
}
