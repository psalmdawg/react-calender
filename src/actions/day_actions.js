
export function showIndividualDay(date){

  return {
    type:'UPDATE_MONTH_YEAR',
    payload:date
  }

}

export function setActiveDay(day){

  return {
    type:'SET_ACTIVE_DAY',
    payload:day
  }

}


export function incrementDay(){

  return {
    type:'INC_DAY',

  }

}

export function decrementDay(){

  return {
    type:'DEC_DAY',
  }

}
