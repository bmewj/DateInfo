/*
 * Date Info
 * src/getYearInfo.js
 *
 * Bartholomew Joyce -- bartholomew.michael.joyce@gmail.com
 * https://github.com/bartjoyce/
 */

const mod = (a, b) => ((a%b)+b)%b

// (Spicy...)
const FIRST_DAYS = '6123467124567234571235671345'
const MONTH_CODES = 'acababaababa'

let memoized = {}

function getYearInfo(year) {

  if (memoized[year]) {
    return memoized[year]
  }

  const m4 = mod(year, 4);
  const m28 = mod(year - 12, 28);
  
  const data = {
    leapYear: (m4 === 0),
    dayCount: (m4 === 0) ? 366 : 365,
    weekCount: (m28 === 4 || m28 === 9 || m28 === 15 || m28 === 20 || m28 === 26) ? 53 : 52,
    startWeek: (m28 === 5 || m28 === 10 || m28 === 16 || m28 === 21 || m28 === 27) ? 53 : ((m28 === 0 || m28 === 6 || m28 === 11 || m28 === 12 || m28 === 17 || m28 === 22 || m28 === 23) ? 52 : 1),
    firstDay: 0 | FIRST_DAYS[m28],
    getMonthDayCount: month => {
      const code = MONTH_CODES[month - 1]
      return (code === 'a') ? 31 : ((code === 'b') ? 30 : ((data.leapYear) ? 29 : 28))
    },
    getMonthDayOffset: month => {
      let offset = 0
      for (let n = 1; n < month; n++) {
        offset += data.getMonthDayCount(n)
      }
      return offset
    }
  }

  memoized[year] = data
  return data

}

module.exports = getYearInfo
