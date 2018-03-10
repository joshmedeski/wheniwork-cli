import fetch from "node-fetch";

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
      });
  }

  getUserTimes() {
    return fetch(`${this.url}/times/user/${this.userID}`, {
      headers: {
        "content-type": "application/json",
        "W-Token": this.token
      },
      method: "GET" // *GET, POST, PUT, DELETE, etc.
    })
      .then(response => response.json())
      .then(json => json.times);
  }
}
