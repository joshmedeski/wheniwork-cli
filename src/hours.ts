import * as Table from "cli-table";
import Week from "./week";
import Formatter from "./formatter";

class Hours {
  format = new Formatter();
  table: Table;

  constructor(week: Week) {
    this.table = new Table({
      head: ["Day", "Total"].chalkResetBold()
    });
    week.days.forEach(day => {
      this.table.push([
        this.format.date(day.date),
        this.format.hours(day.total.worked)
      ]);
    });
    console.log(this.table.toString());
  }
}

export default Hours;
