import React, {Component} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import { updateMonthYear, setStartDay, renderCalender } from "../actions/index";

class CalWeekView extends Component{
// render week aun => sat

  render(){
    return(
      <div>
        week view
      </div>
    )
  };
};


function mapDispatchToProps(dispatch){
  return bindActionCreators({
    updateMonthYear: updateMonthYear,
    setStartDay:setStartDay,
    renderCalender:renderCalender
  }, dispatch)
}

function mapStateToProps(state){
  return {
    calender: state.calender
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(CalWeekView);
