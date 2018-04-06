#!/usr/bin/env node --harmony

const pkg = require("../package.json");
import * as program from "commander";
import * as Table from "cli-table";
import { ApiService } from "./model/api.service";
import Formatter from "./formatter";
import "./helpers/array.helpers";
import { StorageService } from "./model/storage.service";
import { UpdateNotifier } from "./update-notifier";
import { startOfWeek, endOfWeek } from "date-fns";

import { PaceTable } from "./views/pace.table";
import { HoursTable } from "./views/hours.table";
import { TimeSheetTable } from "./views/timesheet.table";

program
  .name("When I Work")
  .option("-l, --login", "make a login request")
  .option("-p, --pace", "show pace table")
  .option("-t, --timesheet", "show time sheet table")
  .version(pkg.version)
  .parse(process.argv);

(function() {
  new UpdateNotifier(pkg);

  const api = new ApiService();
  const storage = new StorageService();

  if (program.login) {
    return api
      .login(storage.username, storage.password)
      .then(response => {
        console.log("Save the following lines to your ~/.wheniwork file:");
        console.log(`WHENIWORK_USERID=${response.user.id}`);
        console.log(`WHENIWORK_TOKEN=${response.token}`);
      })
      .catch(error => {
        console.error(
          "Whoops, login failed. Make sure your credentials are correct and try again."
        );
      });
  }

  if (!storage.hasAll()) {
    console.error("Run `wheniwork -l` to login before continuing");
  }

  const start = startOfWeek(new Date());
  const end = endOfWeek(new Date());

  api
    .dateRange(start, end)
    .then(dateRange => {
      new HoursTable(dateRange); // default
      if (program.timesheet) new TimeSheetTable(dateRange);
      if (program.pace) new PaceTable(dateRange);
    })
    .catch(error => {
      console.error(
        "The date range request failed, please check your config file and try again"
      );
    });
})();
