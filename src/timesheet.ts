import * as Table from "cli-table";
import { format } from "date-fns";

export class TimeSheet {
  table: Table;

  constructor(times: any[]) {
    this.table = new Table({
      head: ["Day", "In", "Out", "Total"].chalkResetBold()
    });

    times.reverse();

    times.forEach(time => {
      const endTime = time.end_time ? format(time.end_time, "hh:mma") : "-";
      this.table.push(
        new Array(
          format(time.start_time, "ddd, MMM D"),
          format(time.start_time, "hh:mma"),
          endTime,
          `${time.length.toFixed(2)}hrs`
        )
      );
    });
    console.log(this.table.toString());
  }
}
