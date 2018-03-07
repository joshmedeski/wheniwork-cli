/**
 * Allows you to provide data to iterate and use for a test.
 *
 * @param {object} values A key used as the description and an array of values.
 * @param {function} func The function.
 */
function using(values, func) {
  for (const key in values) {
    if (values.hasOwnProperty(key)) {
      values[key].unshift(key);
      func.apply(null, values[key]);
    }
  };
}

module.exports = using;