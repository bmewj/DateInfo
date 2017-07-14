/*
 * Date Info
 * src/getWeekArray.js
 *
 * Bartholomew Joyce -- bartholomew.michael.joyce@gmail.com
 * https://github.com/bartjoyce/
 */

const getYearInfo = require('./getYearInfo')
const getYearWeekArray = require('./getYearWeekArray')
const getDayArray = require('./getDayArray')

function getWeekArray(parentMonth) {

  const yearInfo = getYearInfo(parentMonth.date.year)
  const offset = yearInfo.getMonthDayOffset(parentMonth.month)
  const count = yearInfo.getMonthDayCount(parentMonth.month)

  return getYearWeekArray(parentMonth.date.year).filter(week =>
    (week[1] + 7 > offset && week[1] < offset + count) ||
    (week[1] >= offset && week[1] < offset + count)
  ).map(week => {

    let weekData = {
      firstDay: Math.max(week[1] - offset + 1, 1),
      lastDay: Math.min(week[1] - offset + 7, count),
      week: week[0],
      date: {
        year: parentMonth.date.year,
        month: parentMonth.month,
        week: week[0]
      },
      days: null,
      day: day => {
        for (let i = weekData.days.length - 1; i >= 0; i--)
          if (weekData.days[i].date.day === day)
            return weekData.days[i]

        return null
      },
      weekDay: weekDay => {
        for (let i = weekData.days.length - 1; i >= 0; i--)
          if (weekData.days[i].weekDay === weekDay)
            return weekData.days[i]

        return null
      }
    }

    weekData.days = getDayArray(weekData)

    return weekData

  })

}

module.exports = getWeekArray
