import * as Table from "cli-table";
import { format } from "date-fns";
import chalk from "chalk";

export class TimeSheet {
  table: Table;

  constructor(times: any[]) {
    this.table = new Table({
      head: ["Day", "In", "Out", "Total"].chalkResetBold()
    });

    times.reverse();

    times.forEach(time => {
      let isFutureEndTime = time.end_time > new Date();
      let formattedEndTime = format(time.end_time, "hh:mma");
      if (isFutureEndTime) {
        formattedEndTime = chalk.blue.italic(`${formattedEndTime}`);
      }
      this.table.push(
        new Array(
          format(time.start_time, "ddd, MMM D"),
          format(time.start_time, "hh:mma"),
          formattedEndTime,
          `${time.length.toFixed(2)}hrs`
        )
      );
    });
    console.log(this.table.toString());
  }
}
