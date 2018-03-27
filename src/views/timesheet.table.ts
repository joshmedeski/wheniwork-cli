import * as Table from "cli-table";
import chalk from "chalk";
import Week from "../model/week.model";
import Formatter from "../formatter";

export class TimeSheetTable {
  format = new Formatter();
  table: Table;

  constructor(week: Week) {
    this.table = new Table({
      head: ["Time Slot", "In", "Out", "Worked"].chalkResetBold()
    });

    week.days.forEach(day => {
      day.slots.worked.forEach(slot => {
        this.table.push([
          this.format.date(slot.clockIn),
          this.format.time(slot.clockIn),
          slot.clockOut ? this.format.time(slot.clockOut) : chalk.gray("-"),
          this.format.hours(slot.hours)
        ]);
      });
      // let isFutureEndTime = time.end_time > new Date();
      // let formattedEndTime = format(time.end_time, "hh:mma");
      // if (isFutureEndTime) {
      //   formattedEndTime = chalk.blue.italic(`${formattedEndTime}`);
      // }
      // this.table.push(
      //   new Array(
      //     format(time.start_time, "ddd, MMM D"),
      //     format(time.start_time, "hh:mma"),
      //     formattedEndTime,
      //     `${time.length.toFixed(2)}hrs`
      //   )
      // );
    });
    console.log(this.table.toString());
  }
}
