import * as os from "os";

require("dotenv").config({ path: `${os.homedir()}/.wheniwork` });

export class StorageService {
  constructor() {}

  hasAll(): boolean {
    return this.userId && this.token && this.userId ? true : false;
  }

  get key(): string {
    return process.env.WHENIWORK_KEY;
  }

  get username(): string {
    return process.env.WHENIWORK_USERNAME;
  }

  get password(): string {
    return process.env.WHENIWORK_PASSWORD;
  }

  get token(): string {
    return process.env.WHENIWORK_TOKEN;
  }

  get userId(): string {
    return process.env.WHENIWORK_USERID;
  }
}
