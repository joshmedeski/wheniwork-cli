import {
  format,
  differenceInHours,
  addHours,
  differenceInMinutes
} from "date-fns";
import chalk from "chalk";
import Formatter from "./formatter";

class Calculator {
  format = new Formatter();
  constructor() {}

  workedSoFar(startTime: Date): number {
    const minutesWorked = differenceInMinutes(new Date(), startTime);
    return minutesWorked / 60;
  }

  estimateEndTime(time) {
    const hoursToAdd = 8 - time.length;
    time.end_time = addHours(new Date(), hoursToAdd);
    return time;
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
        differenceOut = chalk.green(`+${this.format.hours(difference)}`);
        break;
      case difference == 0:
        differenceOut = chalk.yellow(this.format.hours(0));
        break;
      case difference < 0:
        differenceOut = chalk.red(
          `-${this.format.hours(Math.abs(difference))}`
        );
      default:
        difference;
    }
    return differenceOut;
  }
}

export default Calculator;
