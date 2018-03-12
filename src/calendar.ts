import { format } from "date-fns";
import Calculator from "./calculator";

export class Calendar {
  private calc: Calculator = new Calculator();
  today: Date;
  monday: number;
  week: any[] = [];
  pace: any[] = [];
  totalHours: number = 0;
  minimumPaceHours: number = 0;
  standardPaceHours: number = 0;
  overtimePaceHours: number = 0;

  constructor(hours: number[]) {
    this.today = new Date();
    this.monday = this.today.getDate() - this.today.getDay();
    this.week = [];
    this.pace = [];

    for (let day = 0; day <= 4; day++) {
      let dayDate = new Date(this.today.setDate(day + 1 + this.monday));
      let formattedDate = format(dayDate, "ddd, MMM D");
      if (this.calc.isFutureDate(dayDate)) {
        this.week.push([formattedDate, "-"].chalkGray());
      } else {
        this.minimumPaceHours += 7;
        this.standardPaceHours += 8;
        this.overtimePaceHours += 9;
        this.totalHours += hours[day];
        this.week.push([
          formattedDate,
          `${hours[day]}hrs (${this.calc.difference(hours[day], 8)})`
        ]);
      }
    }

    this.pace.push(this.buildPaceRow("Minimum", this.minimumPaceHours));
    this.pace.push(this.buildPaceRow("Standard", this.standardPaceHours));
    this.pace.push(this.buildPaceRow("Overtime", this.overtimePaceHours));
  }

  buildPaceRow(title: string, paceHours: number): any[] {
    return [
      title,
      `${this.totalHours}/${paceHours}hrs (${this.calc.difference(
        this.totalHours,
        paceHours
      )})`
    ];
  }
}
