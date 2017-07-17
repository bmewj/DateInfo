/*
 * Date Info
 * src/day.js
 *
 * Bartholomew Joyce -- bartholomew.michael.joyce@gmail.com
 * https://github.com/bartjoyce/
 */

const mod = require('./mod')
const encode = require('./encode')
const decode = require('./decode')

function day(id) {

  let obj = decode(id)

  obj.jumpDays = x => day(id + x)
  obj.jumpWeeks = x => day(id + x * 7)
  obj.jumpMonths = x => {
    const years = Math.floor((obj.month + x - 1) / 12)
    const months = mod(obj.month + x - 1, 12) + 1
    return day(encode({
      year: obj.year + years,
      month: months,
      date: obj.date
    }))
  }
  obj.jumpYears = x => day(encode({
    year: obj.year + x,
    day: obj.day
  }))

  return obj

}

module.exports = day
