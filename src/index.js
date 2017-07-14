/*
 * Date Info
 * src/index.js
 *
 * Bartholomew Joyce -- bartholomew.michael.joyce@gmail.com
 * https://github.com/bartjoyce/
 */

const getYear = require('./getYear')

let years = {}

const dateinfo = {
  year: year => years[year] || (years[year] = getYear(year))
}

module.exports = dateinfo
