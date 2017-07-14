/*
 * Date Info
 * src/getMonthArray.js
 *
 * Bartholomew Joyce -- bartholomew.michael.joyce@gmail.com
 * https://github.com/bartjoyce/
 */

const getWeekArray = require('./getWeekArray')

const months = [1,2,3,4,5,6,7,8,9,10,11,12]

function getMonthArray(parentYear) {

  return months.map(n => {

    let monthData = {
      month: n,
      date: {
        year: parentYear.year,
        month: n
      },
      weeks: null,
      week: week => {
        for (let i = monthData.weeks.length - 1; i >= 0; i--) {
          if (monthData.weeks[i].week === week) {
            return monthData.weeks[i]
          }
        }

        return null
      },
      day: day => {
        for (let i = monthData.weeks.length - 1; i >= 0; i--) {
          if (monthData.weeks[i].firstDay <= day &&
              monthData.weeks[i].lastDay >= day) {
            return monthData.weeks[i].day(day)
          }
        }

        return null
      }
    }

    monthData.weeks = getWeekArray(monthData)

    return monthData

  })

}

module.exports = getMonthArray
