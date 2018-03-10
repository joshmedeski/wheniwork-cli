#!/usr/bin/env node --harmony

require("dotenv").config();

import * as program from "commander";
import * as Table from "cli-table";
import chalk from "chalk";
import { TimeSheet } from "./timesheet";
import { Api } from "./api";

const api = new Api();

declare global {
  interface Array<T> {
    chalkGray(): Array<T>;
    chalkResetBold(): Array<T>;
  }
}

if (!Array.prototype.chalkGray) {
  Array.prototype.chalkGray = function(): string[] {
    return this.map(i => chalk.gray(i));
  };
}

if (!Array.prototype.chalkResetBold) {
  Array.prototype.chalkResetBold = function(): string[] {
    return this.map(i => chalk.reset.bold(i));
  };
}

api
  .login(process.env.WHENIWORK_USERNAME, process.env.WHENIWORK_PASSWORD)
  .then(response => {
    api.getUserTimes().then(times => {
      const timeSheet = new TimeSheet(times);
    });
  });

program
  .name("When I Work")
  .version("1.0.0")
  .parse(process.argv);
