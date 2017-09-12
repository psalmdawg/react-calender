
export function updateMonthYear(year, month){

  return {
    type:'UPDATE_MONTH_YEAR',
    year:year,
    month:month
  }
}

export function renderCalender(){
  return {
    type:'RENDER_CALENDER',
    // payload:month
  }
}

export function setStartDay(day){
  // console.log('set start day')
  // console.log(day)
  return {
    type:'SET_START_DAY',
    payload:day
  }
}


export function updateMonthStartDay(month){
  return {
    type:'UPDATE_MONTH',
    payload:month
  }
}
