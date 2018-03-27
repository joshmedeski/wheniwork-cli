import { ApiService } from "./api.service";
import { StorageService } from "./storage.service";
import { startOfWeek, endOfWeek } from "date-fns";
import { DateRange } from "../dates/date-range";

export class TimesService {
  api: ApiService;
  storage: StorageService;

  constructor() {
    this.api = new ApiService();
    this.storage = new StorageService();
  }

  get thisWeek(): Promise<DateRange> {
    const mon = startOfWeek(new Date());
    const sat = endOfWeek(new Date());
    return this.api.times(this.storage.userId, mon, sat).then(times => {
      return new DateRange(times);
    });
  }
}
