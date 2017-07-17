/*
 * Date Info
 * src/decode.js
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
const WEEK_COUNT = '0000100001000001000010000010'

const decode = id => {

  // Figure out the year, offset
  let offset = mod(id, Y4)
  let year = FIRST_YEAR + 4 * (id - offset) / Y4
  if (offset >= Y3) {
    offset -= Y3
    year += 3
  } else if (offset >= Y2) {
    offset -= Y2
    year += 2
  } else if (offset >= Y1) {
    offset -= Y1
    year += 1
  }

  const day = offset + 1
  const m28 = mod(year - 12, 28)
  const leapYear = mod(year, 4) === 0

  // Figure out the month, date
  const offsets = leapYear ? MONTH_OFFSETS_LEAP : MONTH_OFFSETS

  let l = 0, h = 12, mid, value

  mid = 0 | (h + l) / 2
  value = offsets[mid]
  if (offset >= value) { l = mid } else { h = mid }

  mid = 0 | (h + l) / 2
  value = offsets[mid]
  if (offset >= value) { l = mid } else { h = mid }

  mid = 0 | (h + l) / 2
  value = offsets[mid]
  if (offset >= value) { l = mid } else { h = mid }

  if (h - l !== 1) {
    mid = 0 | (h + l) / 2
    value = offsets[mid]
    if (offset >= value) { l = mid } else { h = mid }
  }

  const month = h
  const date = offset - offsets[l] + 1

  // Figure out the weekDay
  const firstDay = 0 | FIRST_DAYS[m28]
  const weekDay = mod(offset + firstDay - 1, 7) + 1

  // Figure out week
  const startWeek = [1, 52, 53][START_WEEK[m28]]
  const weekCount = [52, 53][WEEK_COUNT[m28]]

  const firstWeekOffset = (startWeek === 1 ? 1 : 8) - firstDay
  const weekDist = Math.floor((offset - firstWeekOffset) / 7) + 1
  const week = weekDist === 0 ? startWeek : (weekDist > weekCount ? 1 : weekDist)

  return { id, year, day, month, date, weekDay, week }
}

module.exports = decode
