/*
 * Date Info
 * src/encode.js
 *
 * Bartholomew Joyce -- bartholomew.michael.joyce@gmail.com
 * https://github.com/bartjoyce/
 */

const mod = require('./mod')

const FIRST_YEAR = 1970

const YEAR = 365
const LEAP_YEAR = 366

const Y1 = YEAR
const Y2 = YEAR + YEAR
const Y3 = YEAR + YEAR + LEAP_YEAR
const Y4 = YEAR + YEAR + LEAP_YEAR + YEAR

const MONTH_OFFSETS      = [0, 31, 59, 90, 120, 151, 181, 212, 243, 273, 304, 334, 365]
const MONTH_OFFSETS_LEAP = [0, 31, 60, 91, 121, 152, 182, 213, 244, 274, 305, 335, 366]

const FIRST_DAYS = '6123467124567234571235671345'
const START_WEEK = '1000021000211000210002110002'

const encode = ({ year, day, month, date, weekDay, week }) => {

  // Encode year, day
  if (day !== undefined) {
    let offset = Math.floor((year - FIRST_YEAR) / 4) * Y4
    const remainder = mod(year - FIRST_YEAR, 4)
    if (remainder === 3) {
      offset += Y3
    } else if (remainder === 2) {
      offset += Y2
    } else if (remainder === 1) {
      offset += Y1
    }

    return offset + day - 1
  }

  // Encode year, month, date
  if (month !== undefined) {
    const leapYear = mod(year, 4) === 0

    return encode({
      year,
      day: (leapYear ? MONTH_OFFSETS_LEAP : MONTH_OFFSETS)[month - 1] + date
    })
  }

  // Encode year, week, weekDay
  if (week !== undefined) {
    const m28 = mod(year - 12, 28)
    const firstWeekOffset = (START_WEEK[m28] == '0' ? 1 : 8) - FIRST_DAYS[m28]

    return encode({
      year,
      day: firstWeekOffset + (week - 1) * 7 + weekDay
    })
  }

  return 0
}

module.exports = encode
