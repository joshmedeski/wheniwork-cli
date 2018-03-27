import * as os from "os";

require("dotenv").config({ path: `${os.homedir()}/.wheniwork` });

export class StorageService {
  constructor() {}

  get key(): string {
    return process.env.WHENIWORK_KEY;
  }

  get username(): string {
    return process.env.WHENIWORK_USERNAME;
  }

  get password(): string {
    return process.env.WHENIWORK_PASSWORD;
  }
}
