/*
 * Date Info
 * src/getDayArray.js
 *
 * Bartholomew Joyce -- bartholomew.michael.joyce@gmail.com
 * https://github.com/bartjoyce/
 */

function getDayArray(parentWeek) {

  let out = []

  if (parentWeek.firstDay === 1 && parentWeek.lastDay < 7) {
    for (let n = 1; n <= parentWeek.lastDay; n++) {
      out.push({
        weekDay: 7 - parentWeek.lastDay + n,
        date: {
          year: parentWeek.date.year,
          month: parentWeek.date.month,
          week: parentWeek.date.week,
          day: n
        }
      })
    }
  } else {
    for (let n = parentWeek.firstDay; n <= parentWeek.lastDay; n++) {
      out.push({
        weekDay: n - parentWeek.firstDay + 1,
        date: {
          year: parentWeek.date.year,
          month: parentWeek.date.month,
          week: parentWeek.date.week,
          day: n
        }
      })
    }
  }

  return out
}

module.exports = getDayArray
