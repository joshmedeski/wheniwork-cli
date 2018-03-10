#!/usr/bin/env node --harmony

import * as program from "commander";
import * as Table from "cli-table";
import chalk from "chalk";
import { WhenIWork } from "./when-i-work";

declare global {
  interface Array<T> {
    chalkGray(): Array<T>;
    chalkResetBold(): Array<T>;
  }
}

if (!Array.prototype.chalkGray) {
  Array.prototype.chalkGray = function (): string[] {
    return this.map(i => chalk.gray(i));
  };
}

if (!Array.prototype.chalkResetBold) {
  Array.prototype.chalkResetBold = function (): string[] {
    return this.map(i => chalk.reset.bold(i));
  };
}

const whenIWork = new WhenIWork();
const timeSheet = [];

program
  .name("When I Work")
  .version("1.0.0")
  .parse(process.argv);

console.log(whenIWork.timeSheetTable.toString());
console.log(whenIWork.paceTable.toString());
