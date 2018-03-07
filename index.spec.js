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
