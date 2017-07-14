/*
 * Date Info
 * src/getYearWeekArray.js
 *
 * Bartholomew Joyce -- bartholomew.michael.joyce@gmail.com
 * https://github.com/bartjoyce/
 */

const getYearInfo = require('./getYearInfo')

function getYearWeekArray(year) {
  const { startWeek, firstDay, weekCount, dayCount } = getYearInfo(year)

  let out = []
  out.push([
    startWeek,
    1 - firstDay
  ])

  let week = (startWeek === 1) ? 2 : 1
  let offset = 8 - firstDay

  for (; week <= weekCount; week++) {
    out.push([
      week,
      offset
    ])
    offset += 7
  }

  if (offset < dayCount) {
    out.push([
      1,
      offset
    ])
  }

  return out
}

module.exports = getYearWeekArray