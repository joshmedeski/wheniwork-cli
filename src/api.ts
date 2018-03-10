import fetch from 'node-fetch';

export class Api {
  url: string = 'https://api.wheniwork.com/2';
  token: string;
  userID: string;

  login(username: string, password: string) {
    // Default options are marked with *
    return fetch(`${this.url}/login`, {
      body: JSON.stringify({
        username: username,
        password: password
      }), // must match 'Content-Type' header
      headers: {
        'content-type': 'application/json',
        'W-Key': '' // API key goes here
      },
      method: 'POST', // *GET, POST, PUT, DELETE, etc.
    })
      .then(response => response.json())
      .then(response => {
        this.token = response.token;
        this.userID = response.user.id;
        return response;
      })
  }

  getUserTimes() {
    return fetch(`${this.url}/times/user/${this.userID}`, {
      headers: {
        'content-type': 'application/json',
        'W-Token': this.token
      },
      method: 'GET', // *GET, POST, PUT, DELETE, etc.
    }).then(response => response.json()).then(json => json.times);
  }

}
