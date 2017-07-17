/*
 * Date Info
 * src/year.js
 *
 * Bartholomew Joyce -- bartholomew.michael.joyce@gmail.com
 * https://github.com/bartjoyce/
 */

const mod = require('./mod')
const VirtualizedArray = require('./VirtualizedArray')
const encode = require('./encode')
const day = require('./day')
const month = require('./month')
const week = require('./week')

const YEAR = 365
const LEAP_YEAR = 366

function year(year) {

  const isLeapYear = (mod(year, 4) === 0)
  const numberOfDays = isLeapYear ? LEAP_YEAR : YEAR

  const firstDay = day(encode({ year, day: 1 }))
  const firstMonday = firstDay.jumpDays(1 - firstDay.weekDay)
  const lastDay = day(encode({ year, day: numberOfDays }))
  const lastMonday = lastDay.jumpDays(1 - lastDay.weekDay)

  const numberOfWeeks = 0 | (lastMonday.id - firstMonday.id) / 7 + 1

  const getWeek = i => {
    const monday = firstMonday.jumpWeeks(i)
    const from = firstDay.id > monday.id ? firstDay : monday
    const to = lastDay.id < monday.id + 6 ? lastDay : monday.jumpDays(6)
    return week(year, from.week, from.month, from.day, to.day)
  }

  return {
    year,
    isLeapYear,
    months: new VirtualizedArray(12, i => month(year, i + 1)),
    weeks: new VirtualizedArray(numberOfWeeks, getWeek),
    days: new VirtualizedArray(numberOfDays, i => firstDay.jumpDays(i))
  }

}

module.exports = year
