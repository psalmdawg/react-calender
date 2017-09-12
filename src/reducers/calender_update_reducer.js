export default function(state = {
  dayDate: new Date().getUTCDate(),
  month: new Date().getMonth(),
  year: new Date().getFullYear(),
  startDay: 0,
  activeDay:0,
  months:["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],
  cal:[],
  activeDateForSearch:null
}, action){

  switch(action.type){
    case 'SET_START_DAY':
    return Object.assign({}, state, {
      startDay: getNewMonth(state.month, state.year)
    })

    case 'UPDATE_MONTH_YEAR':
    if(!action.year){
      const sameYear = state.year
      // have a check to make sure date of month displayed is not out of sink with what it can be.
      return Object.assign({}, state, {
        year: sameYear,
        month: action.month,
        startDay: getNewMonth(action.month, sameYear)
      })
    } else {
      return Object.assign({}, state, {
        year: action.year,
        month: action.month,
        startDay: getNewMonth(action.month, action.year)
      })
    }

    case 'RENDER_CALENDER':
    return Object.assign({}, state, {
      startDay: getNewMonth(state.month, state.year)
    })

    case 'INC_DAY':

    // console.log(action)
    let newDay = state.activeDay + 1;
    let newMonth = state.month
    let newYear = state.year

    let monthLength = howManyDaysInMonth(state.months[newMonth], newYear)

    if(newDay > monthLength){
      newDay = 1;
      if(newMonth === 11){
        newMonth = 0
        newYear ++
      } else {
        newMonth += 1
      }
    }

    let dayString = newDay.toString()
    let monthString = newMonth.toString()
    let yearString = newYear.toString()
    let bonzaResult = dayString + '/' + monthString + '/' + yearString;

    return Object.assign({}, state, {
      activeDay:newDay,
      month:newMonth,
      year:newYear,
      activeDateForSearch: bonzaResult
    }, setTimeout(function(){ console.log(state) }, 1000))

    case 'DEC_DAY':

    newDay = state.activeDay - 1;
    newMonth = state.month
    newYear = state.year
    monthLength = howManyDaysInMonth(state.months[newMonth], newYear)

    if(newDay < 1){
      if(newMonth <= 0){
        newMonth = 11
        newYear --
      } else {
        newMonth -= 1
      }
      newDay = howManyDaysInMonth(state.months[newMonth], newYear)
    }

    dayString = newDay.toString()
    monthString = newMonth.toString()
    yearString = newYear.toString()
    bonzaResult = dayString + '/' + monthString + '/' + yearString;

    return Object.assign({}, state, {
      activeDay:newDay,
      month:newMonth,
      year:newYear,
      activeDateForSearch:bonzaResult
    }, setTimeout(function(){ console.log(state) }, 1000))

    case 'SET_ACTIVE_DAY':
    console.log("set active day", action.payload)
    dayString = action.payload.toString()
    monthString = state.month.toString()
    yearString = state.year.toString()
    bonzaResult = dayString + '/' + monthString + '/' + yearString;

    console.log(bonzaResult)
    // console.log(typeof(bonzaResult))

    return Object.assign({}, state, {
      activeDay: action.payload,
      activeDateForSearch:bonzaResult
    }, setTimeout(function(){ console.log(state) }, 1000))

    case "GENERATE_EVENT_STORE":
    console.log('creating store')
    let cal = [];
    let year = 2016
    let month = 1
    let day = 1;

    for(var i=0;i<5;i++){
      for(var y=1;y<12;y++){
        month = y;
        for(var x=1;x<=getMonthLength2(month, year);x++){
          day = x;
          cal.push({date: day + '/' + month + '/' + year, events:[] })
        };
      };
      year++
    };

    return Object.assign({}, state, {
      cal:cal
    })

    case 'UPDATE_ACTIVE_SEARCH_DATE':

    return Object.assign({}, state, {
      activeDateForSearch:action.payload
    })

    default:
    return state
  }

}

export function getNewMonth(monthIn, yearIn){

  let newDate = new Date(yearIn, monthIn)
  let dateToString = newDate.toDateString()
  let firstDayOfMonth = dateToString.substring(0, 3);

  switch (firstDayOfMonth) {
    case "Sun":
      return 0;

    case "Mon":
      return 1;

    case "Tue":
      return 2;

    case "Wed":
      return 3;

    case "Thu":
      return 4;

    case "Fri":
      return 5;

    case "Sat":
      return 6;

  default:
      return("")
  }


  }


export function leapYear(year) {
    return ((year % 4 === 0) && (year % 100 !== 0)) || (year % 400 === 0);
  };

export function howManyDaysInMonth(currentmonth, year){

    if(currentmonth === "April" || currentmonth === "June" || currentmonth === "September" || currentmonth === "November") {
      return 30;
    } else if(currentmonth === "January" || currentmonth === "March" ||
    currentmonth === "May" || currentmonth === "July" || currentmonth ===  "August"
    || currentmonth ===  "October" || currentmonth ===  "December") {
        return 31
    } else {
      if(leapYear(year)){
        return 29
      } else {
        return 28
      }
    }
  };


  function getMonthLength2(monthInput, year){

  if(monthInput === 1 || monthInput ===  3 || monthInput ===  5 || monthInput ===  7 || monthInput ===  8 || monthInput ===  10 || monthInput ===  12){monthInput:
    return 31;
  } else if (monthInput === 4 || monthInput ===  6 || monthInput === 9 || monthInput === 11){
    return 30;
  } else if ( leapYear(year) ){
    return 29
  } else {
    return 28
  }
}
