/*
 * Date Info
 * src/getYear.js
 *
 * Bartholomew Joyce -- bartholomew.michael.joyce@gmail.com
 * https://github.com/bartjoyce/
 */

const getYearInfo = require('./getYearInfo')
const getMonthArray = require('./getMonthArray')

let memoized = {}

function getYear(year) {
  if (memoized[year]) {
    return memoized[year]
  }

  const yearInfo = getYearInfo(year)

  let yearData = {
    year: year,
    date: {
      year: year
    },
    isLeapYear: yearInfo.leapYear,
    numberOfDays: yearInfo.dayCount,
    numberOfWeeks: yearInfo.weekCount,
    month: month => yearData.months[month - 1]
  }

  yearData.months = getMonthArray(yearData)

  memoized[year] = yearData
  return yearData
}

module.exports = getYear
