import { format, differenceInHours, addHours } from "date-fns";
import chalk from "chalk";

class Calculator {
  constructor() {}

  estimateEndTime(time) {
    if (time.end_time) {
      return time;
    }
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
        differenceOut = chalk.green(String(`+${difference}`));
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

export default Calculator;
