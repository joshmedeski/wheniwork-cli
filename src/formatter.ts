import { format } from "date-fns";

class Formatter {
  /**
   * Formats a date to an easy-to-read string.
   *
   * @param date The date to format.
   * @returns A date (ex: "Mon, Mar 1")
   */
  date(date: Date): string {
    return format(date, "ddd, MMM D");
  }

  /**
   * Formats a date to an simple time.
   *
   * @param date The date to format.
   * @returns An time (ex: "12:00pm")
   */
  time(date: Date): string {
    return format(date, "hh:mma");
  }

  /**
   * Formats hours to the time format.
   *
   * @param hours The number of hours.
   * @returns Hours in the time format (ex: '8:00')
   */
  hours(hours: number): string {
    const isNegative = hours < 0 ? true : false;
    const h: number = Math.floor(hours);
    let m: string = String(((hours % 1) * 60).toFixed(0));
    if (m === "0") m = "00";
    if (Number(m) < 10 && Number(m) > 0) m = `${m}0`;
    return `${h}:${m}`;
  }
}

export default Formatter;
