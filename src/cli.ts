#!/usr/bin/env node --harmony

// TODO: Publish to NPM

import * as program from "commander";
import * as Table from "cli-table";
import { ApiService } from "./model/api.service";
import Formatter from "./formatter";
import "./helpers/array.helpers";
import { StorageService } from "./model/storage.service";

import { PaceTable } from "./views/pace.table";
import { HoursTable } from "./views/hours.table";
import { TimeSheetTable } from "./views/timesheet.table";
import { TimesService } from "./model/times.service";

program
  .name("When I Work")
  .option("-l, --login", "make a login request")
  .option("-p, --pace", "show Pace Table")
  .option("-t, --timesheet", "show Time Sheet Table")
  .version("1.0.0")
  .parse(process.argv);

(function() {
  const api = new ApiService();
  const times = new TimesService();
  const storage = new StorageService();

  if (program.login) {
    return api.login(storage.username, storage.password).then(response => {
      console.log("Save the following lines to your .wheniwork file:");
      console.log(`WHENIWORK_USERID=${response.user.id}`);
      console.log(`WHENIWORK_TOKEN=${response.token}`);
    });
  }

  if (!storage.hasAll()) {
    console.error("Run `wheniwork -l` to login before continuing");
  }

  times.thisWeek.then(thisWeek => {
    new HoursTable(thisWeek); // default
    if (program.timesheet) new TimeSheetTable(thisWeek);
    if (program.pace) new PaceTable(thisWeek);
  });
})();
