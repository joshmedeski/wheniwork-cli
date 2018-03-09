import { format, differenceInHours, addHours } from "date-fns";
import chalk from "chalk";

export class Calculator {
  constructor() {}

  calcHoursWorked(clockedIn: string): number {
    const now = new Date();
    const clockedInDate = this.convertTimeToDate(clockedIn);
    return differenceInHours(now, clockedInDate);
  }

  calcWorkLeft(clockedIn): number {
    const hoursWorked = this.calcHoursWorked(clockedIn);
    return 8 - hoursWorked;
  }

  calcTimeToClockOut(clockedIn): string {
    const dateToClockOut = addHours(new Date(), this.calcWorkLeft(clockedIn));
    return format(dateToClockOut, "h:mma");
  }

  /**
   * Determines if a given date is in the future.
   *
   * @param date The date to determine if is in the future.
   * @returns true if the given date is in the future.
   */
  isFutureDate(date): boolean {
    return date > new Date();
  }

  /**
   * Converts a simple time string to JavaScript date.
   *
   * @param {string} time A simple time layout.
   * @returns {Date} A converted date.
   */
  convertTimeToDate(time): Date {
    const splitTime = time.split("").filter(i => !isNaN(i));
    if (splitTime.length === 3) splitTime.unshift("0");
    const hour = Number(`${splitTime[0]}${splitTime[1]}`);
    const minutes = Number(`${splitTime[2]}${splitTime[3]}`);
    let date = new Date();
    date.setHours(hour, minutes);
    return date;
  }

  difference(hours: number, comparison: number): string {
    let difference: number = Number((hours - comparison).toFixed(2));
    let differenceOut: string = "";
    switch (true) {
      case difference > 0:
        differenceOut = chalk.green(String(difference));
        break;
      case difference == 0:
        differenceOut = chalk.yellow(String(0));
        break;
      case difference < 0:
        differenceOut = chalk.red(String(difference));
      default:
        difference;
    }
    return differenceOut;
  }
}
