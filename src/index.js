/*
 * Date Info
 * src/index.js
 *
 * Bartholomew Joyce -- bartholomew.michael.joyce@gmail.com
 * https://github.com/bartjoyce/
 */

const weekFn = require('./week')
const dayFn = require('./day')
const encode = require('./encode')

const DateInfo = {
  year: require('./year'),
  month: require('./month'),
  week: (year, month, week) => {
    const yearInfo = DateInfo.year(year)
    const weekNum = week || month
    const yearWeek = yearInfo.weeks.get((yearInfo.weeks.get(0).week !== 1) ? weekNum : weekNum - 1)

    if (week === undefined) {
      return yearWeek
    }

    let firstDay = yearWeek.days.get(0)
    let lastDay = yearWeek.days.get(yearWeek.days.length - 1)

    if (firstDay.month < month) {
      firstDay = DateInfo.date(year, month, 1)
    }
    if (lastDay.month > month) {
      lastDay = lastDay.jumpDays(-lastDay.date)
    }

    return weekFn(year, week, month, firstDay.day, lastDay.day)
  },
  date: (year, month, date) => dayFn(encode({ year, month, date })),
  day: (year, day) => dayFn(encode({ year, day })),
  weekDay: (year, week, weekDay) => {
    const weekInfo = DateInfo.week(year, week)
    return weekInfo.days.get(weekDay - weekInfo.days.get(0).weekDay)
  },

  fromId: id => day(id),

  MON: 1,
  TUE: 2,
  WED: 3,
  THU: 4,
  FRI: 5,
  SAT: 6,
  SUN: 7,

  JAN: 1,
  FEB: 2,
  MAR: 3,
  APR: 4,
  MAY: 5,
  JUN: 6,
  JUL: 7,
  AUG: 8,
  SEP: 9,
  OCT: 10,
  NOV: 11,
  DEC: 12
}

module.exports = DateInfo
