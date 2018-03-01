#!/usr/bin/env node --harmony

const program = require('commander');

const format = require('date-fns/format');
const differenceInHours = require('date-fns/difference_in_hours');
const addHours = require('date-fns/add_hours');

program
  .name('Day Job')
  .version('1.0.0')
  .option('-w, --week <week>', 'the amount of hours you\'ve worked this week (previous to today)')
  .option('-t, --today <today>', 'the amount of hours you\'ve worked today')
  .option('-c, --clocked-in <clockedIn>', 'when you clocked in today')
  .parse(process.argv)

// console.log('today: %s this week: %s', program.today, program.week);

if (program.clockedIn) {
  console.log(genWorkLeftMsg(program.clockedIn));
}

function convertTimeToDate(time) {
  const splitTime = time.split('').filter(i => !isNaN(i));
  if (splitTime.length === 3) splitTime.unshift('0');
  const hour = Number(`${splitTime[0]}${splitTime[1]}`);
  const minutes = Number(`${splitTime[2]}${splitTime[3]}`);
  let date = new Date();
  date.setHours(hour, minutes)
  return date;
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
