import fetch from "node-fetch";
import Week from "../week";
import { startOfWeek, endOfWeek } from "date-fns";

export interface WhenIWorkApiTime {
  account_id: number;
  alert_type: number;
  break_hours: number;
  created_at: Date;
  creator_id: number;
  end_time: Date;
  hourly_rate: number;
  id: number;
  is_alerted: boolean;
  is_approved: true;
  length: number;
  location_id: number;
  modified_by: number;
  notes: string;
  position_id: number;
  shift_id: number;
  site_id: number;
  split_time: Date;
  start_time: Date;
  sync_hash: string;
  sync_id: string;
  time_id: string;
  updated_at: Date;
  user_id: number;
}

export class ApiService {
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

  // TODO: Write token and user id to wheniwork file
  //   const fs = require('fs');
  // fs.appendFile('message.txt', 'data to append', function (err) {
  //   if (err) throw err;
  //   console.log('Saved!');
  // });

  get times(): Promise<WhenIWorkApiTime[]> {
    const mon = startOfWeek(new Date());
    const sat = endOfWeek(new Date());
    return this.login(
      process.env.WHENIWORK_USERNAME,
      process.env.WHENIWORK_PASSWORD
    ).then(() => {
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
