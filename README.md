# Date Info

- Node module that helps with the Gregorian calendar.
- Especially good for week numbering.
- No bloated feature set. It does one thing, one thing only

## Installation

```
npm install date-info
```

## Year info

```javascript

const DateInfo = require('date-info')

DateInfo.year(2017) === {
    year: 2017,
    date: { year: 2017 },
    isLeapYear: false,
    numberOfDays: 365,
    numberOfWeeks: 52,
    month: (month) => /* month info */,
    months: [
        { /* jan month info */ },
        { /* feb month info */ },
        { /* mar month info */ },
        ...
        { /* oct month info */ },
        { /* nov month info */ },
        { /* dec month info */ }
    ]
}

```

## Month info

```javascript

const DateInfo = require('date-info')

DateInfo.year(2017).month(2) === {
    month: 2,
    date: { year: 2017, month: 2 },
    numberOfDays: 28,
    week: (week) => /* week info */,
    day: (day) => /* day info */,
    weeks: [
        { /* week 5 info */ },
        { /* week 6 info */ },
        { /* week 7 info */ },
        { /* week 8 info */ },
        { /* week 9 info */ }
    ]
}

```

## Week info

```javascript

const DateInfo = require('date-info')

DateInfo.year(2017).month(2).week(6) === {
    week: 6,
    date: { year: 2017, month: 2, week: 6 },
    firstDay: 6, // 6th of February
    lastDay: 12, // 12th of February
    day: (day) => /* day info */,
    weekDay: (weekDay) => /* day info */,
    days: [
        { /* mon info */ },
        { /* tue info */ },
        { /* wed info */ },
        { /* thu info */ },
        { /* fri info */ },
        { /* sat info */ },
        { /* sun info */ }
    ]
}

```

## Day info

```javascript

const DateInfo = require('date-info')

DateInfo.year(2017).month(2).week(6).day(7) === {
    weekDay: 2, // Tuesday
    date: { year: 2017, month: 2, week: 6, day: 7 }
}

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