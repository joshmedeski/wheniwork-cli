#!/usr/bin/env node --harmony

const program = require('commander');

program
  .name('Day Job')
  .version('1.0.0')
  .option('-t, --today <today>', 'the amount of hours you\'ve worked today')
  .option('-w, --week <week>', 'the amount of hours you\'ve worked this week (previous to today)')
  .parse(process.argv)

console.log('today: %s this week: %s', program.today, program.week);
