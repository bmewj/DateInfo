# DateInfo

- Node module that helps with the Gregorian calendar.
- Especially good for week numbering.
- No bloated feature set: six methods, four classes.

## Installation

```
npm install date-info
```

## Example Usage

### 1. Iterate over all weeks

```javascript

const DateInfo = require('date-info')

DateInfo.year(2017).weeks.forEach(week => {
  const begin = week.days.get(0)
  const end   = week.days.get(week.days.length - 1)

  const from  = `${begin.date}/${begin.month}`
  const to    = `${end.date}/${end.month}`

  console.log(`Week ${week.week}: ${from} to ${to}`)
})

```

Output:

```
Week 52: 1/1 to 1/1
Week 1:  2/1 to 8/1
Week 2:  9/1 to 15/1
Week 3: 16/1 to 22/1
...
Week 50: 11/12 to 17/12
Week 51: 18/12 to 24/12
Week 52: 25/12 to 31/12
```

### 2. Iterate over all weeks in every month

```javascript

DateInfo.year(2017).months.forEach(month => {

  console.log(`===== Month ${month.month} =====`)

  month.weeks.forEach(week => {
    const begin = week.days.get(0)
    const end   = week.days.get(week.days.length - 1)

    const from  = `${begin.date}/${begin.month}`
    const to    = `${end.date}/${end.month}`

    console.log(`Week ${week.week}: ${from} to ${to}`)
  })

})

```

Output:

```
===== Month 1 =====
Week 52: 1/1 to 1/1
Week 1: 2/1 to 8/1
Week 2: 9/1 to 15/1
Week 3: 16/1 to 22/1
Week 4: 23/1 to 29/1
Week 5: 30/1 to 31/1  <-- Notice how Week 5 is cut in half. One
===== Month 2 =====       part is in January, the other part is
Week 5: 1/2 to 5/2        in February.
Week 6: 6/2 to 12/2
Week 7: 13/2 to 19/2
Week 8: 20/2 to 26/2
Week 9: 27/2 to 28/2
===== Month 3 =====
Week 9: 1/3 to 5/3
Week 10: 6/3 to 12/3
Week 11: 13/3 to 19/3
Week 12: 20/3 to 26/3
Week 13: 27/3 to 31/3
...
```

### 3. Specific date information

```javascript

const info = DateInfo.date(2017, 8, 31)

console.log(`Year:  ${info.year}`)               // Year:  2017
console.log(`Month: ${info.month}`)              // Month: 8
console.log(`Date:  ${info.date}`)               // Date:  31

console.log(`Day:   ${info.day}rd day of 2017`)  // Day:   243rd day of 2017
console.log(`Week:  ${info.week}`)               // Week:  35
console.log(`Day of week: ${info.weekDay}`)      // Day of week: 4 (Thursday)

```

### 4. Jump forwards and backwards in time

```javascript

function print(msg, { year, month, date }) {
  console.log(`${msg} ${year}/${month}/${date}`)
}

const x = DateInfo.date(2017, 1, 5)
print('Original: ', x)                  // Original:  2017/1/5
print('+4 days:  ', x.jumpDays(4))      // +4 days:   2017/1/9
print('-8 days:  ', x.jumpDays(-8))     // -8 days:   2016/12/28
print('+1 week:  ', x.jumpWeeks(2))     // +1 week:   2017/1/19
print('+2 months:', x.jumpMonths(2))    // +2 months: 2017/3/5
print('-4 months:', x.jumpMonths(-4))   // -4 months: 2016/9/5
print('+2 years: ', x.jumpYears(2))     // +2 years:  2019/1/5

```

## Documentation: Methods

### `DateInfo.year(year)`

Takes one integer as the full year, returns a `year` object. Example usage:

```javascript

const yr2017 = DateInfo.year(2017)

```

### `DateInfo.month(year, month)`

Takes integer arguments, returns a `month` object. Months are counted from
1 (i.e. 1 = January, 12 = December). Alternatively you can use the built in
constants `DateInfo.JAN`, `DateInfo.FEB`, etc...

Example usage:

```javascript

const august = DateInfo.month(2017, DateInfo.AUG)

```

### `DateInfo.week(year, weekNumber)`

Takes integer arguments, returns a `week` object. Standard week numbers
are used.

Example usage:

```javascript

const week31 = DateInfo.week(2017, 31)

```

The week returned will only include days that are in the year you want. If a
week starts in your year but extends into the next, the days which are in
the next year won't be included in the returned `week` object. Instead they
will be in `DateInfo.year(year+1).weeks.get(0)`

### `DateInfo.week(year, month, weekNumber)` (alternative usage)

Takes integer arguments, returns a `week` object. By giving a month, the
days included in the week will only be those that are in the given month.

Example usage:

```javascript

// Normal:
const week31 = DateInfo.week(2017, 31)

// Week 31 starts in July and ends in August.
// If you only want the part of week 31 that
// is in August, do this:
const w31aug = DateInfo.week(2017, 8, 31)

// As a result:
console.log(week31.days.length)  // 7
console.log(w31aug.days.length)  // 6

```

### `DateInfo.date(year, month, date)`

Takes integer arguments, returns a `day` object. Example usage:

```javascript

const may1st = DateInfo.date(2017, 5, 1)

```

### `DateInfo.day(year, day)`

Takes integer arguments, returns a `day` object. Example usage:

```javascript

const day200 = DateInfo.day(2017, 200)  // 200th day of 2017

```

### `DateInfo.weekDay(year, weekNumber, weekDay)`

Takes integer arguments, returns a `day` object. Week days are counted
from 1 (i.e. 1 = Monday, 7 = Sunday). Alternatively you can use the
built in constants `DateInfo.MON`, `DateInfo.TUE`, etc...

Example usage:

```javascript

const wk6tue = DateInfo.weekDay(2017, 6, 2) // Tuesday, week 6

```

### `DateInfo.fromId(id)`

Takes an integer `id`, returns a `day` object. Every day is uniquely
identified with an `id`. The `id` represents the number of days since
`1970-01-01`. You can use `fromId()` to turn an `id` into a `day`
object.

Example usage:

```javascript

const may1st = DateInfo.date(2017, 5, 1)
const may2nd = DateInfo.fromId(may1st.id + 1)

```

## Documentation: Classes

### The `year` object

```javascript

yr2017 = {
  year: 2017,
  isLeapYear: false,
  months: VirtualizedArray,
  weeks: VirtualizedArray,
  days: VirtualizedArray
}

```

All arrays are in the form of `VirtualizedArray`s. None of their elements
are calculated unless you need them. See below how `VirtualizedArray` works.

## The `month` object

```javascript

august = {
  year: 2017,
  month: 8,
  weeks: VirtualizedArray,
  days: VirtualizedArray
}

```

## The `week` object

```javascript

week31 = {
  year: 2017,
  month: 7,   // Month of the first day
  week: 31,
  days: VirtualizedArray
}

```

## The `day` object

```javascript

may1st = {
  id:      17287,  // 1970/1/1 + 17287 = 2017/5/1
  year:    2017,
  day:     121,    // 121st day of 2017
  month:   5,
  date:    1,
  weekDay: 1,      // Monday
  week:    18,

  jumpDays:   n => ...,
  jumpWeeks:  n => ...,
  jumpMonths: n => ...,
  jumpYears:  n => ...
}

```

`jumpDays(2)` returns May 3rd, `jumpWeeks(1)` returns May 8th,
`jumpMonths(-2)` returns March 1st, `jumpYears(1)` return May 1st 2018.

## The `VirtualizedArray` object

Let's assume `virtual` is a virtualized version of the array: `actual`.
In that case:

```javascript

virtual.length      === actual.length
virtual.get(i)      === actual[i]
virtual.map(fn)     === actual.map(fn)
virtual.forEach(fn) === actual.forEach(fn)
virtual.filter(fn)  === actual.filter(fn)
virtual.toArray()   === actual

```

## Appendix: month numbering, week day numbering

Months are counted from 1 = January to 12 = December. Week days are
counted from 1 = Monday to 7 = Sunday. You can also use the constants
included in the package:

```javascript

DateInfo.MON === 1
DateInfo.TUE === 2
DateInfo.WED === 3
DateInfo.THU === 4
DateInfo.FRI === 5
DateInfo.SAT === 6
DateInfo.SUN === 7

DateInfo.JAN === 1
DateInfo.FEB === 2
DateInfo.MAR === 3
DateInfo.APR === 4
DateInfo.MAY === 5
DateInfo.JUN === 6
DateInfo.JUL === 7
DateInfo.AUG === 8
DateInfo.SEP === 9
DateInfo.OCT === 10
DateInfo.NOV === 11
DateInfo.DEC === 12

```