import { Calendar } from "./calendar";
import * as Table from "cli-table";
import { Api } from "./api";

export class WhenIWork {
  private api = new Api();
  hours = [7.7167, 5.4501, 4.8334, 8.7167, 8.2668];
  private calendar: Calendar = new Calendar(this.hours);
  timeSheetTable: Table;
  paceTable: Table;

  constructor() {
    const whenIWorkTimes = this.getTimesheet();

    this.timeSheetTable = new Table({
      head: ["Date", "Worked"].chalkResetBold()
    });
    this.calendar.week.forEach(day => {
      this.timeSheetTable.push(day);
    });

    whenIWorkTimes.then(times => {
    });

    this.paceTable = new Table({
      head: ["Pace", "Hours"].chalkResetBold()
    });
    this.calendar.pace.forEach(row => {
      this.paceTable.push(row);
    });
  }

  async getTimesheet() {
    // const login = await this.api.login();
    const userTimes = await this.api.getUserTimes();
    userTimes.map(time => {
      this.generateTimeTableRow(time);
    });
    return userTimes;
  }

  generateTimeTableRow(time: any): any[] {
    let row = [];
    let endTime = time.end_time || '-';
    // has end time
    row.push(time.start_time, endTime, time.length);
    return row;
  }
}
