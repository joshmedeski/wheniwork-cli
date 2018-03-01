#!/usr/bin/env node

const program = require('commander');

program
  .name('Day Job')
  .version('1.0.0')
  .option('-t, --today', 'the amount of hours you\'ve worked today')
  .option('-w --week', 'the amount of hours you\'ve worked this week (previous to today)')
  .parse(process.argv);