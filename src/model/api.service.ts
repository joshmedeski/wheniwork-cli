import fetch from "node-fetch";
import { DateRange } from "../dates/date-range";
import { startOfWeek, endOfWeek } from "date-fns";
import { StorageService } from "./storage.service";
import { Time } from "./wheniwork.types";

export class ApiService {
  storage = new StorageService();
  url: string = "https://api.wheniwork.com/2";

  constructor() {}

  /**
   * Makes a login request to the api.
   *
   * `POST /login`
   *
   * @param username The account username
   * @param password The account password
   * @returns The login response data
   */
  login(username: string, password: string) {
    return fetch(`${this.url}/login`, {
      body: JSON.stringify({
        username: username,
        password: password
      }),
      headers: {
        "content-type": "application/json",
        "W-Key": this.storage.key
      },
      method: "POST"
    })
      .then(response => response.json())
      .catch(error => console.error(error));
  }

  times(userId: string, start: Date, end: Date): Promise<Time[]> {
    return fetch(
      `${this.url}/times/?user_id=${userId}&start=${start}&end=${end}`,
      {
        headers: {
          "content-type": "application/json",
          "W-Token": this.storage.token
        },
        method: "GET"
      }
    )
      .then(response => response.json())
      .then(json => json.times)
      .catch(error => console.error(error));
  }

  // TODO: Move getting this week to controller
  get week(): Promise<DateRange> {
    const mon = startOfWeek(new Date());
    const sat = endOfWeek(new Date());
    return this.times(this.storage.userId, mon, sat).then(times => {
      const newWeek = new DateRange(times);
      return newWeek;
    });
  }
}
