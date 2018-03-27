import fetch from "node-fetch";
import Week from "../week";
import { startOfWeek, endOfWeek } from "date-fns";
import { StorageService } from "./storage.service";
import { Time } from "./wheniwork.types";

export class ApiService {
  storage = new StorageService();
  url: string = "https://api.wheniwork.com/2";
  token: string;
  userID: string;

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
      .then(response => {
        this.token = response.token;
        this.userID = response.user.id;
        return response;
      })
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

  get times(): Promise<Time[]> {
    const mon = startOfWeek(new Date());
    const sat = endOfWeek(new Date());
    return this.login(this.storage.username, this.storage.password).then(() => {
      return fetch(
        `${this.url}/times/?user_id=${this.userID}&start=${mon}&end=${sat}`,
        {
          headers: {
            "content-type": "application/json",
            "W-Token": this.token
          },
          method: "GET"
        }
      )
        .then(response => response.json())
        .then(json => {
          const times = json.times;
          return times;
        })
        .catch(error => {
          console.error(error);
        });
    });
  }

  get week(): Promise<Week> {
    return this.times.then(times => {
      const newWeek = new Week(times);
      return newWeek;
    });
  }
}
