#!/usr/bin/env node --harmony

const hours = [ 7.65, 7.65, 7.65, 7.65 ];

const program = require('commander');

const format = require('date-fns/format');
const differenceInHours = require('date-fns/difference_in_hours');
const addHours = require('date-fns/add_hours');

const Table = require('cli-table');
const chalk = require('chalk');

program
  .name('When I Work')
  .version('1.0.0')
  .parse(process.argv)

class WhenIWork {
  /**
   * Determines if a given date is in the future.
   *
   * @param {Date} date The date to determine if is in the future.
   * @returns {boolean} true if the given date is in the future.
   */
  isFutureDate(date) {
    return date > new Date();
  }

  /**
   * Converts a simple time string to JavaScript date.
   *
   * @param {string} time A simple time layout.
   * @returns {Date} A converted date.
   */
  convertTimeToDate(time) {
    const splitTime = time.split('').filter(i => !isNaN(i));
    if (splitTime.length === 3) splitTime.unshift('0');
    const hour = Number(`${splitTime[0]}${splitTime[1]}`);
    const minutes = Number(`${splitTime[2]}${splitTime[3]}`);
    let date = new Date();
    date.setHours(hour, minutes)
    return date;
  }
}

module.exports = new WhenIWork();

const whenIWork = new WhenIWork();

const today = new Date();
const monday = today.getDate() - today.getDay();
let week = [];
let totalHours = 0;
let paceHours = 0;

let whenIWorkTable = new Table({
  head: ['Date', 'Worked'].map(i => chalk.reset.bold(i))
});

for (let day = 0; day <= 4; day++) {
  let dayDate = new Date(today.setDate((day + 1) + monday));
  let formattedDate = format(dayDate, 'ddd, MMM D');
  if (whenIWork.isFutureDate(dayDate)) {
    whenIWorkTable.push(
      [formattedDate, '-'].map(i => chalk.gray(i))
    );
  } else {
    paceHours += 8;
    totalHours += hours[day];
    whenIWorkTable.push([
      formattedDate,
      `${hours[day]}hrs (${difference(hours[day], 8)})`,
    ]);
  }
}

whenIWorkTable.push([
  'Total',
  `${totalHours}/${paceHours} (${difference(totalHours, paceHours)})`
]);

console.log(whenIWorkTable.toString());

function difference(hours, comparison) {
  let difference = (hours - comparison).toFixed(2);
  switch(true) {
    case (difference > 0):
      difference = chalk.green(difference);
      break;
    case (difference == 0):
      difference = chalk.yellow(0);
      break;
    case (difference < 0):
      difference = chalk.red(difference);
    default:
      difference;
}
  return difference;
}

if (program.clockedIn) {
  console.log(genWorkLeftMsg(program.clockedIn));
}

function calcHoursWorked(clockedIn) {
  const now = new Date();
  const clockedInDate = convertTimeToDate(clockedIn);
  return differenceInHours(now, clockedInDate);
}

function calcWorkLeft(clockedIn) {
  const hoursWorked = calcHoursWorked(clockedIn);
  return 8 - hoursWorked;
}

function calcTimeToClockOut(clockedIn) {
  const dateToClockOut = addHours(new Date(), calcWorkLeft(clockedIn));
  return format(dateToClockOut, 'h:mma');
}

function genWorkLeftMsg(clockedIn) {
  const workLeft = calcWorkLeft(clockedIn);

  if (workLeft > 0 && workLeft < 8) {
    return `You have ${workLeft} hours left of work. You can clock out at ${calcTimeToClockOut(clockedIn)}`;
  }

  return 'You\'ve worked more than 8 hours today, go home or enjoy the overtime 😄️';
}