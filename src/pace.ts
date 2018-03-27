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

    this.lastWorkDay = new Date(week.days[0].date).getDay();
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
