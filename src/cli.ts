#!/usr/bin/env node --harmony

// TODO: Publish to NPM

import * as program from "commander";
import * as Table from "cli-table";
import { TimeSheet } from "./timesheet";
import { ApiService } from "./model/api.service";
import { Pace } from "./pace";
import Formatter from "./formatter";
import Hours from "./hours";
import "./helpers/array.helpers";
import { StorageService } from "./model/storage.service";

program
  .name("When I Work")
  .option("-l, --login", "make a login request")
  .option("-p, --pace", "show Pace Table")
  .option("-t, --timesheet", "show Time Sheet Table")
  .version("1.0.0")
  .parse(process.argv);

(function() {
  const api = new ApiService();
  const storage = new StorageService();

  if (program.login) return api.login(storage.username, storage.password);

  if (!storage.hasAll()) {
    console.error("Run `wheniwork -l` to login before continuing");
  }

  api.week.then(week => {
    new Hours(week); // default
    if (program.timesheet) new TimeSheet(week);
    if (program.pace) new Pace(week);
  });
})();
