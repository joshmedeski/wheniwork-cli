import fetch from "node-fetch";
import { startOfWeek, differenceInMinutes } from "date-fns";

export class Api {
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
        "W-Key": process.env.WHENIWORK_KEY
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

  getUserTimes() {
    const today = new Date();
    return fetch(`${this.url}/times/user/${this.userID}`, {
      headers: {
        "content-type": "application/json",
        "W-Token": this.token
      },
      method: "GET" // *GET, POST, PUT, DELETE, etc.
    })
      .then(response => response.json())
      .then(json => {
        let thisWeek = json.times.filter(this.isThisWeek);
        thisWeek = thisWeek.map(time => {
          return this.calcTodaysHours(time);
        });
        return thisWeek;
      })
      .catch(error => {
        console.error(error);
      });
  }

  isThisWeek(time: any): boolean {
    let startOfThisWeek = startOfWeek(new Date());
    return time.start_time && new Date(time.start_time) >= startOfThisWeek;
  }

  calcTodaysHours(time) {
    if (time.end_time) {
      return time;
    }
    time.length =
      differenceInMinutes(new Date(), new Date(time.start_time)) / 60;
    return time;
  }
}
