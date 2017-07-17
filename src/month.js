/*
 * Date Info
 * src/month.js
 *
 * Bartholomew Joyce -- bartholomew.michael.joyce@gmail.com
 * https://github.com/bartjoyce/
 */

const mod = require('./mod')
const VirtualizedArray = require('./VirtualizedArray')
const encode = require('./encode')
const day = require('./day')
const week = require('./week')

const MONTH_CODES = '020101001010'

function month(year, month) {

  const isLeapYear = (mod(year, 4) === 0)
  const numberOfDays = [31, 30, isLeapYear ? 29 : 28][MONTH_CODES[month - 1]]

  const firstDay = day(encode({ year, month, date: 1 }))
  const firstMonday = firstDay.jumpDays(1 - firstDay.weekDay)
  const lastDay = day(encode({ year, month, date: numberOfDays }))
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
    month,
    weeks: new VirtualizedArray(numberOfWeeks, getWeek),
    days: new VirtualizedArray(numberOfDays, i => firstDay.jumpDays(i))
  }

}

module.exports = month
