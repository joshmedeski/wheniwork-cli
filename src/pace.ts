import { Calendar } from "./calendar";
import { Calculator } from "./calculator";
import * as Table from "cli-table";

export class Pace {
  calc = new Calculator();
  table: Table;
  totalHours: number;
  lastWorkDay: number;

  constructor(times: any[]) {
    this.table = new Table({
      head: ["Pace", "Hours"].chalkResetBold()
    });

    this.lastWorkDay = new Date(times[0].start_time).getDate();
    this.totalHours = times.reduce((accumulator, currentValue) => {
      const hours = currentValue.length || 0;
      return accumulator + hours;
    }, 0);

    this.row("Minimum", 7);
    this.row("Standard", 8);
    this.row("Overtime", 9);

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
