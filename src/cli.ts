#!/usr/bin/env node --harmony

// TODO: Publish to NPM

import * as program from "commander";
import * as Table from "cli-table";
import chalk from "chalk";
import { TimeSheet } from "./timesheet";
import { ApiService } from "./model/api.service";
import { Pace } from "./pace";
import Formatter from "./formatter";
import Hours from "./hours";

const api = new ApiService();

// TODO: Move array prototypes to separate file

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

// TODO: Store the api token for future requests
// TODO: Check if token is valid before
// TODO: Check

api.week.then(week => {
  const timesheet = new TimeSheet(week);
  const hours = new Hours(week);
  const pace = new Pace(week);
});

//   // TODO: Add flag for showing time sheets (-t)
//   const timeSheet = new TimeSheet(times);
//   // TODO: Add flat for adding pace (-p)
//   const pace = new Pace(times);

program
  .name("When I Work")
  .version("1.0.0")
  .parse(process.argv);

const format = new Formatter();
