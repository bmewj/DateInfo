/*
 * Date Info
 * src/VirtualizedArray.js
 *
 * Bartholomew Joyce -- bartholomew.michael.joyce@gmail.com
 * https://github.com/bartjoyce/
 */

function VirtualizedArray(length, getFn) {
  this.length = length
  this.get = getFn
}

VirtualizedArray.prototype.toArray = function() {
  const length = this.length
  let array = new Array(length)
  for (let i = 0; i < length; i++) {
    array[i] = this.get(i)
  }
  return array
}

VirtualizedArray.prototype.map = function(cb, thisArg) {
  const length = this.length
  let array = new Array(length)
  for (let i = 0; i < length; i++) {
    array[i] = cb.call(thisArg, this.get(i), i, this)
  }
  return array
}

VirtualizedArray.prototype.forEach = function(cb, thisArg) {
  const length = this.length
  for (let i = 0; i < length; i++) {
    cb.call(thisArg, this.get(i), i, this)
  }
}

VirtualizedArray.prototype.filter = function(cb, thisArg) {
  const length = this.length
  let array = []
  for (let i = 0; i < length; i++) {
    let x = this.get(i)
    cb.call(thisArg, x, i, this) && array.push(x)
  }
  return array
}

module.exports = VirtualizedArray
