import { Calendar } from "./calendar";
import * as Table from "cli-table";

export class Pace {
  table: Table;

  constructor() {
    this.table = new Table({
      head: ["Pace", "Hours"].chalkResetBold()
    });
  }
}
