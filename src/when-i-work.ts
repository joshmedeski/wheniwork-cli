import { Calendar } from "./calendar";
import * as Table from "cli-table";

export class WhenIWork {
  hours = [7.7167, 5.4501, 4.8334, 8.7167];
  private calendar: Calendar = new Calendar(this.hours);
  timeSheetTable: Table;
  paceTable: Table;

  constructor() {
    this.timeSheetTable = new Table({
      head: ["Date", "Worked"].chalkResetBold()
    });
    this.calendar.week.forEach(day => {
      this.timeSheetTable.push(day);
    });
    this.paceTable = new Table({
      head: ["Pace", "Hours"].chalkResetBold()
    });
    this.calendar.pace.forEach(row => {
      this.paceTable.push(row);
    });
  }
}
