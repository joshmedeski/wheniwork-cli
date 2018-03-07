const using = require('./using');
const whenIWork = require('./index');

describe('futureDate()', () => {
  const today = new Date();
  using({
    'today is false': [today, false],
    'yesterday is false': [today.setDate(today.getDate() - 1), false],
    'tomorrow is true': [today.setDate(today.getDate() + 1), false]
  }, (desc, input, expectation) => {
    test(desc, () => {
      expect(whenIWork.isFutureDate(input)).toBe(expectation);
    });
  });
});

describe('convertTimeToDate()', () => {
  using({
    'midnight to date': ['12:00am', 12, 0],
    'evening time to date': ['8:20pm', 8, 20]
  }, (desc, input, expectedHour, expectedMinute) => {
    test(desc, () => {
      const convertedDate = whenIWork.convertTimeToDate(input)
      const convertedHour = convertedDate.getHours();
      const convertedMinutes = convertedDate.getMinutes();
      expect(convertedHour).toBe(expectedHour);
      expect(convertedMinutes).toBe(expectedMinute);
    });
  });
});

