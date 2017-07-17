# DateInfo

## Installation

```
npm install date-info
```

## Example: Iterate over all weeks

```javascript

DateInfo.year(2017).weeks.forEach(week => {
  const begin = week.days.get(0)
  const end   = week.days.get(week.days.length - 1)

  console.log(`Week ${week.week}: ${begin.date}/${begin.month} to ${end.date}/${end.month}`)
})

```

Output:

```
Week 52: 1/1 to 1/1
Week 1:  2/1 to 8/1
Week 2:  9/1 to 15/1
Week 3: 16/1 to 22/1
Week 4: 23/1 to 29/1
Week 5: 30/1 to  5/2
Week 6:  6/2 to 12/2
Week 7: 13/2 to 19/2
Week 8: 20/2 to 26/2
Week 9: 27/2 to  5/3
...
Week 50: 11/12 to 17/12
Week 51: 18/12 to 24/12
Week 52: 25/12 to 31/12
```

## Example: Iterate over all weeks in every month

```javascript

DateInfo.year(2017).months.forEach(month => {

  console.log(`===== Month ${month.month} =====`)

  month.weeks.forEach(week => {
    const begin = week.days.get(0)
    const end   = week.days.get(week.days.length - 1)

    console.log(`Week ${week.week}: ${begin.date}/${begin.month} to ${end.date}/${end.month}`)
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
Week 5: 1/2 to 5/2    <-- in February.
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
===== Month 4 =====
Week 13: 1/4 to 2/4
Week 14: 3/4 to 9/4
Week 15: 10/4 to 16/4
Week 16: 17/4 to 23/4
Week 17: 24/4 to 30/4
...
```

## Example: Specific date information

```javascript

const info = DateInfo.date(2017, 8, 31)

console.log(`Year:  ${info.year}`)
console.log(`Month: ${info.month}`)
console.log(`Date:  ${info.date}`)

console.log(`Day:   ${info.day}rd day of 2017`)
console.log(`Week:  ${info.week}`)
console.log(`Day of week: ${info.weekDay}`)

```

Output:

```
Year:  2017
Month: 8
Date:  31

Day:   243rd day of 2017
Week:  35
Day of week: 4 <-- Thursday
```

## Example: Jump forwards and backwards in time

```javascript

function print(msg, { year, month, date }) {
  console.log(`${msg} ${year}/${month}/${date}`)
}

const x = DateInfo.date(2017, 1, 5)
print('Original: ', x)
print('+4 days:  ', x.jumpDays(4))
print('-8 days:  ', x.jumpDays(-8))
print('+1 week:  ', x.jumpWeeks(2))
print('+2 months:', x.jumpMonths(2))
print('-4 months:', x.jumpMonths(-4))
print('+2 years: ', x.jumpYears(2))

```

Output:

```
Original:  2017/1/5
+4 days:   2017/1/9
-8 days:   2016/12/28
+1 week:   2017/1/19
+2 months: 2017/3/5
-4 months: 2016/9/5
+2 years:  2019/1/5
```

## Overall Features

You call one of the following functions to get your initial `year`,
`month`, `week` or `date` objects.

```javascript

const yr2017 = DateInfo.year(2017)
const august = DateInfo.month(2017, 8)
const week31 = DateInfo.week(2017, 31)
const may1st = DateInfo.date(2017, 5, 1)
const day200 = DateInfo.day(2017, 200)      // 200th day of 2017
const wk6tue = DateInfo.weekDay(2017, 6, 2) // Tuesday, week 6

// Week 31 starts in July and ends in August.
// If you only want the part of week 31 that
// is in August, do this:
const w31aug = DateInfo.week(2017, 8, 31)

```

What do these objects look like?

## `year` objects

```javascript

const yr2017 = DateInfo.year(2017)
yr2017.year === 2017
yr2017.isLeapYear === false

yr2017.months.toArray() === [
  DateInfo.month(2017, 1),
  DateInfo.month(2017, 2),
  ...
  DateInfo.month(2017, 11),
  DateInfo.month(2017, 12)
]
yr2017.months.map(month => ...)
yr2017.months.forEach(month => ...)
yr2017.months.filter(month => ...)
yr2017.months.get(i) === yr2017.months.toArray()[i]
yr2017.months.length === 12

yr2017.weeks.toArray() === [
  /* the days of 2016's week 52 that are in 2017 */,
  DateInfo.week(2017, 1),
  DateInfo.week(2017, 2),
  ...
  DateInfo.week(2017, 52)
]
yr2017.weeks.map(week => ...)
yr2017.weeks.forEach(week => ...)
yr2017.weeks.filter(week => ...)
yr2017.weeks.get(i) === yr2017.weeks.toArray()[i]
yr2017.weeks.length === 53

yr2017.days.toArray() === [
  DateInfo.day(2017, 1),
  DateInfo.day(2017, 2),
  ...
  DateInfo.day(2017, 364),
  DateInfo.day(2017, 365)
]
yr2017.days.map(day => ...)
yr2017.days.forEach(day => ...)
yr2017.days.filter(day => ...)
yr2017.days.get(i) === yr2017.days.toArray()[i]
yr2017.days.length === 365

```

The `months`, `weeks` and `days` properties are lazy arrays. Their sizes
are known, but none of their elements are generated.

By calling `toArray()` all elements will be generated. `map()` `forEach()`
and `filter()` are all lazy. `map()` will create one array as its result,
and so will `filter()`. No intermediate arrays will be created, though.

**All arrays in all objects are like this.**

## `month` objects

```javascript

const august = DateInfo.month(2017, 8)
august.year === 2017
august.month === 8

august.weeks.toArray() === [
  DateInfo.week(2017, 8, 31),
  DateInfo.week(2017, 8, 32),
  DateInfo.week(2017, 8, 33),
  DateInfo.week(2017, 8, 34),
  DateInfo.week(2017, 8, 35)
]
august.weeks.map(week => ...)
august.weeks.forEach(week => ...)
august.weeks.filter(week => ...)
august.weeks.get(i) === august.weeks.toArray()[i]
august.weeks.length === 5

august.days.toArray() === [
  DateInfo.date(2017, 8, 1),
  DateInfo.date(2017, 8, 2),
  ...
  DateInfo.date(2017, 8, 30),
  DateInfo.date(2017, 8, 31)
]
august.days.map(day => ...)
august.days.forEach(day => ...)
august.days.filter(day => ...)
august.days.get(i) === august.days.toArray()[i]
august.days.length === 31

```

## `week` objects

```javascript

const week31 = DateInfo.week(2017, 31)
week31.year === 2017
week31.week === 31
week31.month === 7 // starts in July

const w31aug = DateInfo.week(2017, 8, 31)
w31aug.year === 2017
w31aug.week === 31
w31aug.month === 8 // <-- notice the month change

week31.days.toArray() === [
  DateInfo.date(2017, 7, 31),
  DateInfo.date(2017, 8, 1),
  DateInfo.date(2017, 8, 2),
  DateInfo.date(2017, 8, 3),
  DateInfo.date(2017, 8, 4),
  DateInfo.date(2017, 8, 5),
  DateInfo.date(2017, 8, 6)
]
week31.days.map(day => ...)
week31.days.forEach(day => ...)
week31.days.filter(day => ...)
week31.days.get(i) === week31.days.toArray()[i]
week31.days.length === 7

```

## `day` objects

```javascript

const wk6tue = DateInfo.weekDay(2017, 6, 2) // Tuesday, week 6
wk6tue.year === 2017
wk6tue.month === 2   // February
wk6tue.week === 6
wk6tue.date === 7    // 7th
wk6tue.weekDay === 2 // Tuesday
wk6tue.day === 38    // 38th day of 2017

wk6tue.jumpDays(4)    === DateInfo.date(2017, 2, 7 + 4)
wk6tue.jumpDays(-6)   === DateInfo.date(2017, 2, 7 - 6)
wk6tue.jumpWeeks(2)   === DateInfo.date(2017, 2, 7 + 2*7)
wk6tue.jumpMonths(3)  === DateInfo.date(2017, 2 + 3, 7)
wk6tue.jumpMonths(-2) === DateInfo.date(2016, 12, 7)
wk6tue.jumpYears(2)   === DateInfo.date(2019, 2, 7)

```

## Appendix: month numbering, week day numbering

Months are counted from 1 = January to 12 = December. Week days are
counted from 1 = Monday to 7 = Sunday. You can also use the constants
included in the package:

```javascript

const DateInfo = require('date-info')

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