# DateInfo version 2

Not implemented yet. This is the plan for the new version.

```javascript

const yr2017 = DateInfo.year(2017)
const august = DateInfo.month(2017, 8)
const week31 = DateInfo.week(2017, 31)
const may1st = DateInfo.day(2017, 5, 1)
const day200 = DateInfo.day(2017, 200)      // 200th day of 2017
const wk6tue = DateInfo.weekDay(2017, 6, 2) // Tuesday, week 6

// Week 31 starts in July and ends in august.
// If you only want the part of week 31 that
// is in August, do this:
const w31aug = DateInfo.week(2017, 8, 31)

```

What can you do with the objects returned?

## Year objects

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

## Month objects

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
  DateInfo.day(2017, 8, 1),
  DateInfo.day(2017, 8, 2),
  ...
  DateInfo.day(2017, 8, 30),
  DateInfo.day(2017, 8, 31)
]
august.days.map(day => ...)
august.days.forEach(day => ...)
august.days.filter(day => ...)
august.days.get(i) === august.days.toArray()[i]
august.days.length === 31

```

## Week objects

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
  DateInfo.day(2017, 7, 31),
  DateInfo.day(2017, 8, 1),
  DateInfo.day(2017, 8, 2),
  DateInfo.day(2017, 8, 3),
  DateInfo.day(2017, 8, 4),
  DateInfo.day(2017, 8, 5),
  DateInfo.day(2017, 8, 6)
]
week31.days.map(day => ...)
week31.days.forEach(day => ...)
week31.days.filter(day => ...)
week31.days.get(i) === week31.days.toArray()[i]
week31.days.length === 7

```

## Day objects

```javascript

const wk6tue = DateInfo.weekDay(2017, 6, 2) // Tuesday, week 6
wk6tue.year === 2017
wk6tue.month === 2   // February
wk6tue.week === 6
wk6tue.day === 7     // 7th
wk6tue.weekDay === 2 // Tuesday

```