import fetch from "node-fetch";
import Week from "../week";
import { startOfWeek, endOfWeek } from "date-fns";
import { StorageService } from "./storage.service";
import { Time } from "./wheniwork.types";

export class ApiService {
  storage = new StorageService();
  url: string = "https://api.wheniwork.com/2";

  constructor() {}

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
      .catch(error => {
        console.error(error);
      });
  }

  // TODO: Write token and user id to wheniwork file
  //   const fs = require('fs');
  // fs.appendFile('message.txt', 'data to append', function (err) {
  //   if (err) throw err;
  //   console.log('Saved!');
  // });

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
      .then(json => {
        return json.times;
      })
      .catch(error => {
        console.error(error);
      });
  }

  // TODO: Move getting this week to controller
  get week(): Promise<Week> {
    const mon = startOfWeek(new Date());
    const sat = endOfWeek(new Date());
    return this.times(this.storage.userId, mon, sat).then(times => {
      const newWeek = new Week(times);
      return newWeek;
    });
  }
}
