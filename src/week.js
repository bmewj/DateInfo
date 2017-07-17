/*
 * Date Info
 * src/week.js
 *
 * Bartholomew Joyce -- bartholomew.michael.joyce@gmail.com
 * https://github.com/bartjoyce/
 */

const VirtualizedArray = require('./VirtualizedArray')
const encode = require('./encode')
const decode = require('./decode')
const day = require('./day')

function week(year, week, month, startDay, endDay) {

  const firstDayId = encode({ year, day: startDay })
  const getDay = i => day(firstDayId + i)

  if (month === undefined) {
    month = decode(firstDayId).month
  }

  return {
    year,
    week,
    month,
    days: new VirtualizedArray(endDay - startDay + 1, getDay)
  }

}

module.exports = week
