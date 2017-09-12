export function generateTheStore(){
  return {
    type:'GENERATE_EVENT_STORE',
  }
}


export function updateActiveSearchDate(date){
  return {
    type:'UPDATE_ACTIVE_SEARCH_DATE',
    payload: date
  }
}
