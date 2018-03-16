import { WhenIWorkApiTime } from "./api";
import Calculator from "./calculator";

export class Day {
  calc = new Calculator();
  date: Date;
  slots: DaySlots;
  total: DayTotal;

  constructor(time: WhenIWorkApiTime) {
    this.slots = new DaySlots();
    this.total = new DayTotal();

    this.total.worked =
      time.length > 0 ? time.length : this.calc.workedSoFar(time.start_time);

    this.date = time.start_time;
    this.slots.worked.push({
      clockIn: time.start_time,
      clockOut: time.end_time,
      hours: time.length
    });
  }
}

class DaySlots {
  worked: DayTime[];
  unpaidBreak: DayTime[];

  constructor() {
    this.worked = [];
    this.unpaidBreak = [];
  }
}

class DayTime {
  clockIn: Date;
  clockOut: Date;
  hours: number;
}

export class DayTotal {
  worked: number;
  unpaidBreaks: number;

  constructor() {
    this.worked = 0;
    this.unpaidBreaks = 0;
  }
}
