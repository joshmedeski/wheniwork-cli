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
      this.table.push(
        new Array(
          format(time.start_time, "ddd, MMM D"),
          format(time.start_time, "hh:mma"),
          format(time.end_time, "hh:mma"),
          time.length
        )
      );
    });
    console.log(this.table.toString());
  }

  async getTimesheet() {}
}
