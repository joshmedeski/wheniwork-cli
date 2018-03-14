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
      head: ["Pace", "Worked"].chalkResetBold()
    });

    this.lastWorkDay = new Date(week.days[0].date).getDay();
    this.totalHours = week.days.reduce((accumulator, currentValue) => {
      const hours = currentValue.total.worked || 0;
      return accumulator + hours;
    }, 0);

    this.row("Minimum (35)", 7);
    this.row("Standard (40)", 8);
    this.row("Overtime (45)", 9);

    console.log(this.table.toString());
  }

  private row(title: string, pace: number) {
    this.table.push([
      title,
      `${this.totalHours.toFixed(2)}/${pace *
        this.lastWorkDay}hrs (${this.calc.difference(
        this.totalHours,
        pace * this.lastWorkDay
      )})`
    ]);
  }
}
