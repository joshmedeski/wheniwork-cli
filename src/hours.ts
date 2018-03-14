import * as Table from "cli-table";
import Week from "./week";

class Hours {
  table: Table;

  constructor(week: Week) {
    this.table = new Table({
      head: ["Day", "Hours"].chalkResetBold()
    });
    // 1. map dates to readable format, endtime and length
    week.days.map(time => {
      let simplifiedTime = [];
      simplifiedTime.push();
      return simplifiedTime;
    });
    // 2. merge duplicate days to single entries
    // 3. Create rows
  }
}

export default Hours;
