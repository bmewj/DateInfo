/*
 * Date Info
 * src/getYear.js
 *
 * Bartholomew Joyce -- bartholomew.michael.joyce@gmail.com
 * https://github.com/bartjoyce/
 */

const getMonthArray = require('./getMonthArray')

function getYear(year) {
  let yearData = {
    year: year,
    date: {
      year: year
    },
    month: month => yearData.months[month - 1]
  }
  yearData.months = getMonthArray(yearData)
  return yearData
}

module.exports = getYear
