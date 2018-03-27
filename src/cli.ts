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

program
  .name("When I Work")
  .option("-p, --pace", "show Pace Table")
  .option("-t, --timesheet", "show Time Sheet Table")
  .version("1.0.0")
  .parse(process.argv);

const api = new ApiService();

// TODO: Store the api token for future requests
// TODO: Check if token is valid before

api.week.then(week => {
  new Hours(week);
  if (program.timesheet) new TimeSheet(week);
  if (program.pace) new Pace(week);
});
